import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BLOG_CATEGORIES,
  adminDeletePost,
  adminFetchPosts,
  adminSavePost,
  adminSetVisibility,
  emptyPost,
  postState,
  uploadBlogImage,
} from '../../lib/blogPosts';
import { HTML_CONTENT_MARKER, SITE_ORIGIN, isHtmlContent, renderArticle, stripHtmlMarker } from '../../lib/blogMarkdown';
import { MAGAZINE_POSTS } from '../../blog/magazine-registry';
import './BlogManager.css';

const STATE_LABEL = { draft: 'Draft', scheduled: 'Scheduled', published: 'Published' };
const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
// Slugs already used by the articles built into the site code.
const STATIC_SLUGS = new Set(Object.keys(MAGAZINE_POSTS));

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const formatWhen = (iso) => (iso ? new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—');
const toLocalInput = (date) => new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
const IMAGE_URL = /^(https:\/\/\S+|\/\S+)\.(webp|png|jpe?g)(\?\S*)?$/i;

export default function BlogManager({ onPostsChange }) {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(emptyPost);
  const [contentMode, setContentMode] = useState('markdown');
  const [notice, setNotice] = useState('');
  const [setupError, setSetupError] = useState('');
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [screen, setScreen] = useState('list');
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleAt, setScheduleAt] = useState('');
  const [previewPost, setPreviewPost] = useState(null);
  const importInput = useRef(null);

  async function load() {
    try {
      const rows = await adminFetchPosts();
      setPosts(rows);
      setSetupError('');
      onPostsChange?.(rows);
    } catch (error) {
      setSetupError(error.message);
    }
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function edit(key, value) {
    setDirty(true);
    setPost((current) => ({ ...current, [key]: value }));
  }

  function choose(next) {
    if (dirty && !window.confirm('Discard unsaved article edits?')) return;
    setPost(next);
    setContentMode(isHtmlContent(next.content) ? 'html' : 'markdown');
    setDirty(false);
    setScheduleOpen(false);
    setNotice('');
    setScreen('editor');
  }

  function backToList() {
    if (dirty && !window.confirm('Discard unsaved article edits?')) return;
    setDirty(false);
    setNotice('');
    setScreen('list');
  }

  async function importArticle(file) {
    if (!file) return;
    try {
      const raw = await file.text();
      let title = file.name.replace(/\.(md|markdown|html?|txt)$/i, '').replace(/[-_]+/g, ' ').trim();
      let content = raw;
      let excerpt = '';
      if (/\.html?$/i.test(file.name)) {
        const doc = new DOMParser().parseFromString(raw, 'text/html');
        title = doc.querySelector('h1')?.textContent?.trim() || doc.title || title;
        excerpt = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        doc.querySelector('h1')?.remove();
        content = `${HTML_CONTENT_MARKER}\n${doc.body.innerHTML.trim()}`;
      } else {
        title = raw.match(/^#\s+(.+)$/m)?.[1]?.trim() || title;
        content = raw.replace(/^#\s+.+$/m, '').trim();
        excerpt = content.split(/\n\s*\n/).find((block) => !/^[#!|>-]/.test(block.trim()))?.replace(/[*_`[\]]/g, '').replace(/\([^)]*\)/g, '').trim().slice(0, 300) || '';
      }
      if (!content.trim()) throw new Error('The selected file is empty.');
      if (dirty && !window.confirm('Discard unsaved article edits?')) return;
      setPost({ ...emptyPost(), title, slug: slugify(title), excerpt, content });
      setContentMode(isHtmlContent(content) ? 'html' : 'markdown');
      setDirty(true);
      setScheduleOpen(false);
      setScreen('editor');
      setNotice('Article imported as an unsaved draft. Review the content, settings and image, then save.');
    } catch (error) {
      setNotice(error.message || 'The file could not be imported.');
    } finally {
      if (importInput.current) importInput.current.value = '';
    }
  }

  function switchMode(mode) {
    setContentMode(mode);
    setDirty(true);
    setPost((current) => {
      const body = stripHtmlMarker(current.content);
      return { ...current, content: mode === 'html' ? `${HTML_CONTENT_MARKER}\n${body}` : body };
    });
  }

  async function upload(file, key) {
    if (!file) return;
    setBusy(true);
    setNotice('Converting to WebP and uploading...');
    try {
      edit(key, await uploadBlogImage(file));
      setNotice('Image uploaded. Save the article to keep it.');
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy(false);
    }
  }

  function openSchedule() {
    const current = postState(post) === 'scheduled' ? new Date(post.publishedAt) : new Date(Date.now() + 24 * 3600000);
    setScheduleAt(toLocalInput(current));
    setScheduleOpen(true);
  }

  function validate(action) {
    if (!post.title.trim()) throw new Error('Add an article title.');
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) throw new Error('Use lowercase words separated by hyphens for the URL slug.');
    if (STATIC_SLUGS.has(post.slug)) throw new Error('This slug is already used by a built-in article on the website. Choose another slug.');
    if (post.image && !IMAGE_URL.test(post.image)) throw new Error('Hero image must be an HTTPS or site path ending in .webp, .png or .jpg.');
    if (post.image && !post.imageAlt.trim()) throw new Error('Describe the hero image (alt text) before saving.');
    if (post.canonicalUrl.trim() && !/^https:\/\//.test(post.canonicalUrl.trim())) throw new Error('Canonical URL must start with https://');
    if (action !== 'draft') {
      if (stripHtmlMarker(post.content).trim().length < 100) throw new Error('Add at least 100 characters of article content before publishing or scheduling.');
      if (!post.excerpt.trim()) throw new Error('Add a short introduction (excerpt) before publishing.');
    }
  }

  // action: 'draft' | 'publish' | 'schedule' | 'update'
  async function persist(action, when) {
    setBusy(true);
    setNotice('');
    try {
      validate(action);
      // A draft has no publication date. "Publish now" always uses this moment, so an article written
      // days ago gets today's date when it goes live. A normal edit keeps the existing date.
      let publishedAt = action === 'draft' ? null : action === 'update' ? post.publishedAt : new Date().toISOString();
      if (action === 'schedule') {
        const at = new Date(when || '');
        if (Number.isNaN(at.getTime()) || at.getTime() < Date.now() + 60000) throw new Error('Choose a publish time at least one minute in the future.');
        publishedAt = at.toISOString();
      }
      const saved = await adminSavePost({ ...post, status: action === 'draft' ? 'draft' : 'published', publishedAt });
      setPost(saved);
      setContentMode(isHtmlContent(saved.content) ? 'html' : 'markdown');
      setDirty(false);
      setScheduleOpen(false);
      setNotice(action === 'draft' ? 'Draft saved. It is hidden from the website and sitemap.'
        : action === 'schedule' ? `Scheduled for ${formatWhen(saved.publishedAt)} (${TIME_ZONE}). It goes live on the blog and sitemap automatically at that time.`
          : action === 'update' ? 'Article updated. Its publication date is unchanged.'
            : `Published now (${formatWhen(saved.publishedAt)}). It is live on the blog and in the sitemap.`);
      await load();
    } catch (error) {
      setNotice(error.message || 'The article could not be saved.');
    } finally {
      setBusy(false);
    }
  }

  function submit(event) {
    event.preventDefault();
    const current = postState(post);
    persist(current === 'draft' ? 'draft' : current === 'scheduled' ? 'schedule' : 'update', current === 'scheduled' ? post.publishedAt : undefined);
  }

  async function remove(selected) {
    if (!window.confirm(`Delete "${selected.title}" permanently? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await adminDeletePost(selected.id);
      if (post.id === selected.id) { setPost(emptyPost()); setScreen('list'); }
      setNotice('Article deleted.');
      await load();
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function toggleVisibility(selected) {
    const live = postState(selected) === 'published';
    if (!live && (stripHtmlMarker(selected.content).trim().length < 100 || (selected.image && !selected.imageAlt.trim()))) {
      choose(selected);
      setNotice('Add at least 100 characters of content, and alt text for the hero image, before publishing.');
      return;
    }
    if (live && !window.confirm(`Unpublish "${selected.title}"? It will disappear from the blog and sitemap.`)) return;
    setBusy(true);
    try {
      await adminSetVisibility(selected.id, live ? 'draft' : 'published', live ? null : new Date().toISOString());
      setNotice(live ? 'Article unpublished.' : 'Article published now.');
      await load();
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy(false);
    }
  }

  const state = postState(post);
  const counts = posts.reduce((acc, p) => { acc[postState(p)] += 1; return acc; }, { draft: 0, scheduled: 0, published: 0 });
  const visible = (filter === 'all' ? posts : posts.filter((p) => postState(p) === filter))
    .filter((p) => `${p.title} ${p.slug} ${p.category}`.toLowerCase().includes(search.toLowerCase()));
  const editorContent = useMemo(() => stripHtmlMarker(post.content), [post.content]);
  const rendered = useMemo(() => renderArticle(post.content), [post.content]);
  const seoTitle = `${post.seoTitle || post.title}`;
  const seoDescription = post.seoDescription || post.excerpt;
  const publicUrl = `${SITE_ORIGIN}/blog/${post.slug || 'article-slug'}`;
  const ready = !setupError;

  return (
    <section className="bm-admin">
      <div className="bm-admin-heading">
        <div>
          <span className="bm-admin-eyebrow">CONTENT STUDIO</span>
          <h2>Blogs</h2>
          <p>Import, write, schedule and publish blog posts.</p>
        </div>
        <div className="bm-admin-heading-actions">
          <input ref={importInput} type="file" accept=".md,.markdown,.html,.htm,.txt" hidden onChange={(e) => importArticle(e.target.files?.[0])} />
          <button type="button" className="bm-btn" disabled={busy || !ready} onClick={() => importInput.current?.click()}>Import blog</button>
          <button type="button" className="bm-btn bm-btn--primary" disabled={busy || !ready} onClick={() => choose(emptyPost())}>+ New article</button>
        </div>
      </div>

      {setupError && <div className="bm-admin-alert"><strong>Setup needed:</strong> {setupError} <button type="button" className="bm-btn" onClick={load}>Check again</button></div>}
      {notice && <p className="bm-admin-notice" role="status">{notice}</p>}

      {screen === 'list' ? (
        <div className="bm-admin-card">
          <div className="bm-admin-toolbar">
            <div className="bm-admin-tabs" role="tablist" aria-label="Filter articles">
              {['all', 'draft', 'scheduled', 'published'].map((f) => (
                <button key={f} type="button" role="tab" aria-selected={filter === f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
                  {f === 'all' ? `All ${posts.length}` : `${STATE_LABEL[f]} ${counts[f]}`}
                </button>
              ))}
            </div>
            <input type="search" aria-label="Search posts" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="bm-admin-scroll">
            <table className="bm-admin-table">
              <thead><tr><th>Title</th><th>Status</th><th>Category</th><th>Public URL</th><th>Publish date</th><th>Updated</th><th>Actions</th></tr></thead>
              <tbody>
                {visible.length === 0 && <tr><td colSpan={7} className="bm-admin-empty">{posts.length === 0 ? 'No saved articles yet. Click "New article" to write one.' : 'No articles in this view.'}</td></tr>}
                {visible.map((p) => {
                  const s = postState(p);
                  return (
                    <tr key={p.id}>
                      <td><button type="button" className="bm-admin-title" onClick={() => choose(p)}><strong>{p.title}</strong><small>{p.excerpt || 'No introduction yet'}</small></button></td>
                      <td><span className={`bm-status bm-status--${s}`}>{STATE_LABEL[s]}</span></td>
                      <td>{p.category}</td>
                      <td>{s === 'published' ? <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer">/blog/{p.slug} ↗</a> : <span className="bm-muted">Not public</span>}</td>
                      <td>{s === 'draft' ? <span className="bm-muted">—</span> : formatWhen(p.publishedAt)}</td>
                      <td>{formatWhen(p.updatedAt)}</td>
                      <td>
                        <div className="bm-admin-actions">
                          {s === 'published'
                            ? <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" title="View live article">View</a>
                            : <button type="button" title="Preview" onClick={() => setPreviewPost(p)}>Preview</button>}
                          <button type="button" title="Edit" onClick={() => choose(p)}>Edit</button>
                          <button type="button" disabled={busy || s === 'scheduled'} title={s === 'draft' ? 'Publish now' : 'Unpublish'} onClick={() => toggleVisibility(p)}>{s === 'draft' ? 'Publish' : 'Unpublish'}</button>
                          <button type="button" className="danger" disabled={busy} title="Delete" onClick={() => remove(p)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bm-admin-editor-screen">
          <button type="button" className="bm-admin-back" onClick={backToList}>← All posts</button>
          <div className="bm-admin-editor-header">
            <div>
              <span className={`bm-status bm-status--${state}`}>{post.id ? STATE_LABEL[state] : 'New draft'}</span>
              <h3>{post.title || 'New article'}</h3>
            </div>
            {post.id && state === 'published' && <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">View live ↗</a>}
          </div>

          <div className="bm-admin-editor-grid">
            <form onSubmit={submit} className="bm-admin-form">
              <div className="bm-admin-row">
                <label>Article title
                  <input required maxLength={180} value={post.title} onChange={(e) => { edit('title', e.target.value); if (!post.id) edit('slug', slugify(e.target.value)); }} />
                </label>
                <label>URL slug {post.id && <small>(locked after first save)</small>}
                  <input required pattern="[a-z0-9]+(-[a-z0-9]+)*" readOnly={Boolean(post.id)} value={post.slug} onChange={(e) => edit('slug', slugify(e.target.value))} />
                </label>
              </div>
              <label>Short introduction (shown on blog cards)
                <textarea required rows={3} maxLength={500} value={post.excerpt} onChange={(e) => edit('excerpt', e.target.value)} />
              </label>

              <div className="bm-admin-mode" role="tablist" aria-label="Content format">
                <button type="button" className={contentMode === 'markdown' ? 'active' : ''} onClick={() => switchMode('markdown')}>Markdown</button>
                <button type="button" className={contentMode === 'html' ? 'active' : ''} onClick={() => switchMode('html')}>HTML</button>
              </div>
              <label>Article content
                <textarea
                  required
                  rows={20}
                  className="bm-admin-content"
                  value={editorContent}
                  onChange={(e) => edit('content', contentMode === 'html' ? `${HTML_CONTENT_MARKER}\n${e.target.value}` : e.target.value)}
                  placeholder={contentMode === 'html'
                    ? '<h2 id="section">Heading</h2>\n<p>Your HTML...</p>'
                    : 'Write paragraphs separated by a blank line.\n\n## Section heading\n\nParagraph with a [link](/blog/how-much-is-a-surety-bond).\n\n- A point\n- Another point\n\n| Column | Column |\n|---|---|\n| Cell | Cell |\n\n![Image alt text](https://.../image.webp)\n\n## Frequently Asked Questions\n\n### Question one?\n\nAnswer one.'}
                />
              </label>
              <p className="bm-admin-help">Markdown: <code>##</code> section, <code>###</code> sub-heading, <code>- </code> list, <code>1. </code> numbered list, <code>| table |</code>, <code>&gt; </code> highlighted answer box, <code>**bold**</code>, <code>[text](url)</code>, <code>![alt](image-url)</code>. Questions under a “Frequently Asked Questions” heading become FAQ schema automatically.</p>

              <div className="bm-admin-row">
                <label>Hero image · JPG, PNG or WebP (auto-converted to WebP)
                  <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy || !ready} onChange={(e) => upload(e.target.files?.[0], 'image')} />
                </label>
                <label>Hero image alt text
                  <input value={post.imageAlt} onChange={(e) => edit('imageAlt', e.target.value)} placeholder="Describe the image" />
                </label>
              </div>
              <label>Or use an existing image URL
                <input value={post.image} onChange={(e) => edit('image', e.target.value.trim())} placeholder="/images/blog/... .webp or https://... .webp" />
              </label>
              {post.image && <div className="bm-admin-preview-img"><img src={post.image} alt={post.imageAlt} /></div>}

              <details open className="bm-admin-details">
                <summary>Search and social preview</summary>
                <div className="bm-admin-row">
                  <label>SEO title <small className={seoTitle.length > 60 ? 'bad' : 'ok'}>{seoTitle.length}/60</small>
                    <input maxLength={180} placeholder={post.title} value={post.seoTitle} onChange={(e) => edit('seoTitle', e.target.value)} />
                  </label>
                  <label>SEO description <small className={seoDescription.length < 120 || seoDescription.length > 160 ? 'bad' : 'ok'}>{seoDescription.length} (aim 120–160)</small>
                    <textarea maxLength={500} rows={3} placeholder={post.excerpt} value={post.seoDescription} onChange={(e) => edit('seoDescription', e.target.value)} />
                  </label>
                  <label>Primary keyword
                    <input value={post.primaryKeyword} onChange={(e) => edit('primaryKeyword', e.target.value)} placeholder="The one keyword this article owns" />
                  </label>
                  <label>Secondary keywords, separated by commas
                    <input value={post.secondaryKeywords.join(', ')} onChange={(e) => edit('secondaryKeywords', e.target.value.split(','))} />
                  </label>
                  <label>Social share description <small className={post.socialDescription.length > 200 ? 'bad' : 'ok'}>{post.socialDescription.length}/200</small>
                    <textarea maxLength={300} rows={2} placeholder={seoDescription} value={post.socialDescription} onChange={(e) => edit('socialDescription', e.target.value)} />
                  </label>
                  <label>Separate social (OG) image
                    <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy || !ready} onChange={(e) => upload(e.target.files?.[0], 'ogImage')} />
                  </label>
                  <label>Tags, separated by commas
                    <input value={post.tags.join(', ')} onChange={(e) => edit('tags', e.target.value.split(','))} />
                  </label>
                  <label>Canonical URL (leave empty for this post's own URL)
                    <input type="url" placeholder={publicUrl} value={post.canonicalUrl} onChange={(e) => edit('canonicalUrl', e.target.value)} />
                  </label>
                </div>
                <div className="bm-admin-serp">
                  {(post.ogImage || post.image) && <img src={post.ogImage || post.image} alt="" />}
                  <small>{publicUrl}</small>
                  <strong>{seoTitle || 'Your article title'}</strong>
                  <p>{seoDescription || 'Your search description appears here.'}</p>
                </div>
              </details>

              <details className="bm-admin-details">
                <summary>Article preview</summary>
                <div className="bm-admin-prose blog-magazine"><div className="bm-article" dangerouslySetInnerHTML={{ __html: rendered.html }} /></div>
                {rendered.faqs.length > 0 && <p className="bm-admin-help">{rendered.faqs.length} FAQ question(s) found. They will be added to FAQ schema.</p>}
              </details>

              <p className="bm-admin-state">
                <span className={`bm-status bm-status--${state}`}>{post.id ? STATE_LABEL[state] : 'New'}</span>
                {state === 'scheduled' ? `Goes live ${formatWhen(post.publishedAt)} (${TIME_ZONE})` : state === 'published' ? `Live since ${formatWhen(post.publishedAt)}` : 'Not visible on the website'}
              </p>

              {scheduleOpen && (
                <div className="bm-admin-schedule">
                  <label>Publish on · {TIME_ZONE}
                    <input type="datetime-local" min={toLocalInput(new Date())} value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} />
                  </label>
                  <button type="button" className="bm-btn bm-btn--primary" disabled={busy || !scheduleAt} onClick={() => persist('schedule', scheduleAt)}>{state === 'scheduled' ? 'Confirm new time' : 'Confirm schedule'}</button>
                  <button type="button" className="bm-btn" onClick={() => setScheduleOpen(false)}>Cancel</button>
                </div>
              )}

              <div className="bm-admin-form-actions">
                {state === 'draft' && <>
                  <button type="submit" className="bm-btn bm-btn--primary" disabled={busy || !ready}>{busy ? 'Working...' : 'Save draft'}</button>
                  <button type="button" className="bm-btn" disabled={busy || !ready} onClick={() => persist('publish')}>Publish now</button>
                  <button type="button" className="bm-btn" disabled={busy || !ready} onClick={openSchedule}>Schedule</button>
                </>}
                {state === 'scheduled' && <>
                  <button type="submit" className="bm-btn bm-btn--primary" disabled={busy || !ready}>{busy ? 'Working...' : 'Save changes'}</button>
                  <button type="button" className="bm-btn" disabled={busy || !ready} onClick={openSchedule}>Reschedule</button>
                  <button type="button" className="bm-btn" disabled={busy || !ready} onClick={() => persist('publish')}>Publish now</button>
                  <button type="button" className="bm-btn" disabled={busy || !ready} onClick={() => persist('draft')}>Cancel schedule</button>
                </>}
                {state === 'published' && <>
                  <button type="submit" className="bm-btn bm-btn--primary" disabled={busy || !ready}>{busy ? 'Working...' : 'Update article'}</button>
                  <button type="button" className="bm-btn" disabled={busy || !ready} onClick={() => { if (window.confirm('Republish now? The publish date changes to today.')) persist('publish'); }}>Republish now</button>
                  <button type="button" className="bm-btn" disabled={busy || !ready} onClick={() => { if (window.confirm('Unpublish this article? It will disappear from the blog and sitemap until you publish it again.')) persist('draft'); }}>Unpublish</button>
                </>}
                <span className="bm-muted">{dirty ? 'Unsaved changes' : ''}</span>
              </div>
            </form>

            <aside className="bm-admin-settings">
              <h4>Post settings</h4>
              <section>
                <h5>Publishing</h5>
                <p><span className={`bm-status bm-status--${state}`}>{post.id ? STATE_LABEL[state] : 'New draft'}</span></p>
                <p>{state === 'scheduled' ? `Goes live ${formatWhen(post.publishedAt)}` : state === 'published' ? `Published ${formatWhen(post.publishedAt)}` : 'Visible only in this dashboard'}</p>
                {post.updatedAt && <p className="bm-muted">Last saved {formatWhen(post.updatedAt)}</p>}
              </section>
              <section>
                <h5>Organization</h5>
                <label>Category
                  <select value={post.category} onChange={(e) => edit('category', e.target.value)}>
                    {[...new Set([...BLOG_CATEGORIES, post.category])].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </label>
                <label>Author
                  <input required value={post.author} onChange={(e) => edit('author', e.target.value)} />
                </label>
                <label className="bm-admin-check"><input type="checkbox" checked={post.featured} onChange={(e) => edit('featured', e.target.checked)} /> Feature this article</label>
              </section>
              <section>
                <h5>On this page</h5>
                {rendered.toc.length ? <ol className="bm-admin-toc">{rendered.toc.map((item) => <li key={item.id}>{item.label}</li>)}</ol> : <p className="bm-muted">Add ## headings to build the table of contents.</p>}
              </section>
            </aside>
          </div>
        </div>
      )}

      {previewPost && (
        <div className="bm-admin-modal" role="presentation" onClick={() => setPreviewPost(null)}>
          <section className="bm-admin-modal__panel" role="dialog" aria-modal="true" aria-label={`Preview ${previewPost.title}`} onClick={(e) => e.stopPropagation()}>
            <div className="bm-admin-modal__head"><strong>Draft preview</strong><button type="button" onClick={() => setPreviewPost(null)} aria-label="Close preview">×</button></div>
            <h2>{previewPost.title}</h2>
            <p className="bm-muted">{previewPost.excerpt}</p>
            {previewPost.image && <img src={previewPost.image} alt={previewPost.imageAlt} />}
            <div className="bm-admin-prose blog-magazine"><div className="bm-article" dangerouslySetInnerHTML={{ __html: renderArticle(previewPost.content).html }} /></div>
          </section>
        </div>
      )}
    </section>
  );
}
