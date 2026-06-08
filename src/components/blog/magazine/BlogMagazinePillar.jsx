import { PILLAR_CATEGORY_LABEL, PILLAR_DEFAULT_HERO } from '../../../blog/pillar-magazine';
import { BailBondGuideArticle } from './BailBondGuideArticle';
import { MagazineToc } from './MagazineToc';
import '../../../blog-magazine.css';

const MAGAZINE_READ_MIN = 12;

const BENEFITS = [
  { icon: 'fa-clock', label: '24/7 Available', sub: 'Delaware Agents' },
  { icon: 'fa-shield-alt', label: 'Licensed & Insured', sub: 'State Certified' },
  { icon: 'fa-gavel', label: 'Court Process', sub: 'Step-by-Step Guide' },
  { icon: 'fa-dollar-sign', label: 'Clear Pricing', sub: 'Bond Cost Explained' },
];

const ARTICLE_TAGS = [
  'Delaware Bail Bonds',
  'Bail Bond Agent',
  'Bail Bond Cost',
  'Secured Bond',
  'Family Guide',
];

const DEFAULT_BLOG_CTA = {
  enabled: true,
  title: 'Need Bail Bond Help Now?',
  description: 'Speak with a local agent for fast, clear guidance after an arrest.',
  button_label: 'Start the Process',
  button_href: '#/contact',
};

function truncateBreadcrumbTitle(title, max = 48) {
  if (title.length <= max) return title;
  return `${title.slice(0, max - 1).trimEnd()}…`;
}

export function BlogMagazinePillar({
  navigate,
  slug,
  title,
  excerpt,
  imageUrl,
  publishedAt,
  updatedAt,
  author,
  authorAvatarUrl,
  authorRole,
  authorBio,
  relatedPosts = [],
  blogCta,
  onContactClick,
}) {
  const cta = { ...DEFAULT_BLOG_CTA, ...(blogCta ?? {}) };
  const displayAuthor = author ?? 'Simone Harris';
  const trimmed = imageUrl?.trim() ?? '';
  const heroSrc = trimmed && (trimmed.startsWith('/') || trimmed.startsWith('http')) ? trimmed : PILLAR_DEFAULT_HERO;
  const heroAlt =
    'How bail bonds work in Delaware family guide by Simone Harris';

  const publishedLabel = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const updatedLabel = new Date(updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (onContactClick) onContactClick(e);
    else navigate('/contact');
  };

  const prevPost = relatedPosts[0];
  const nextPost = relatedPosts[1];

  return (
    <div className="blog-magazine blog-post-page">
      <main className="bm-inner">
        <div className="bm-back">
          <a href="#/blog" onClick={(e) => handleNav(e, '/blog')}>
            <i className="fas fa-arrow-left" aria-hidden /> All Articles
          </a>
        </div>

        <div className="bm-grid">
          <div className="bm-toc-col">
            <MagazineToc navigate={navigate} onContactClick={onContactClick} />
          </div>

          <div className="bm-center">
            <header className="bm-hero-block">
              <nav className="bm-breadcrumb" aria-label="Breadcrumb">
                <a href="#/home" onClick={(e) => handleNav(e, '/home')}>Home</a>
                {' › '}
                <a href="#/blog" onClick={(e) => handleNav(e, '/blog')}>Blog</a>
                {' › '}
                <span>{PILLAR_CATEGORY_LABEL}</span>
                {' › '}
                <span aria-current="page">{truncateBreadcrumbTitle(title)}</span>
              </nav>

              <h1 className="bm-h1">{title}</h1>
              {excerpt && <p className="bm-subtitle">{excerpt}</p>}

              <div className="bm-meta-row">
                {authorAvatarUrl ? (
                  <img src={authorAvatarUrl} alt="" className="bm-meta-avatar" />
                ) : (
                  <img src="/images/simoneimg.webp" alt="" className="bm-meta-avatar" />
                )}
                <span className="bm-meta-item">By <strong>{displayAuthor}</strong></span>
                <span className="bm-meta-item"><i className="far fa-calendar" aria-hidden /><time dateTime={publishedAt}>{publishedLabel}</time></span>
                <span className="bm-meta-item"><i className="far fa-clock" aria-hidden />{MAGAZINE_READ_MIN} min read</span>
                <span className="bm-meta-item"><i className="fas fa-eye" aria-hidden />12.4K views</span>
                <span className="bm-meta-item bm-meta-item--updated"><i className="fas fa-sync-alt" aria-hidden />Updated: <time dateTime={updatedAt}>{updatedLabel}</time></span>
              </div>

              <div className="bm-hero-image-wrap">
                <img src={heroSrc} alt={heroAlt} className="bm-hero-img" width={1200} height={630} />
              </div>

              <div className="bm-benefits" role="list">
                {BENEFITS.map((b) => (
                  <div className="bm-benefit" role="listitem" key={b.label}>
                    <div className="bm-benefit-icon"><i className={`fas ${b.icon} bm-icon-gold`} aria-hidden /></div>
                    <div className="bm-benefit-text"><strong>{b.label}</strong><span>{b.sub}</span></div>
                  </div>
                ))}
              </div>
            </header>

            <article className="bm-article">
              <BailBondGuideArticle navigate={navigate} onContactClick={onContactClick} />

              <div className="bm-tags-share">
                <div className="bm-tags-row">
                  <span className="bm-tags-label">Tags:</span>
                  {ARTICLE_TAGS.map((tag) => (
                    <span key={tag} className="bm-tag-pill">{tag}</span>
                  ))}
                </div>
                <div className="bm-share-row">
                  <span className="bm-share-label">Share this article:</span>
                  <a href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener noreferrer" className="bm-share-btn" aria-label="Share on Facebook"><i className="fab fa-facebook-f" /></a>
                  <a href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer" className="bm-share-btn" aria-label="Share on X"><i className="fab fa-twitter" /></a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/" target="_blank" rel="noopener noreferrer" className="bm-share-btn" aria-label="Share on LinkedIn"><i className="fab fa-linkedin-in" /></a>
                  <button type="button" className="bm-share-btn" aria-label="Copy link" onClick={() => navigator.clipboard?.writeText(window.location.href)}><i className="fas fa-link" /></button>
                </div>
              </div>

              <div className="bm-prev-next">
                {prevPost ? (
                  <a href={`#/blog/${prevPost.slug}`} className="bm-prev-card" onClick={(e) => handleNav(e, `/blog/${prevPost.slug}`)}>
                    <p className="bm-nav-direction"><i className="fas fa-arrow-left" aria-hidden />Previous Post</p>
                    <p className="bm-nav-title">{prevPost.title}</p>
                  </a>
                ) : (
                  <a href="#/blog" className="bm-prev-card" onClick={(e) => handleNav(e, '/blog')}>
                    <p className="bm-nav-direction"><i className="fas fa-arrow-left" aria-hidden />Previous Post</p>
                    <p className="bm-nav-title">Back to Blog</p>
                  </a>
                )}
                {nextPost ? (
                  <a href={`#/blog/${nextPost.slug}`} className="bm-next-card" onClick={(e) => handleNav(e, `/blog/${nextPost.slug}`)}>
                    <p className="bm-nav-direction bm-nav-direction--right">Next Post<i className="fas fa-arrow-right" aria-hidden /></p>
                    <p className="bm-nav-title">{nextPost.title}</p>
                  </a>
                ) : (
                  <a href="#/blog" className="bm-next-card" onClick={(e) => handleNav(e, '/blog')}>
                    <p className="bm-nav-direction bm-nav-direction--right">Next Post<i className="fas fa-arrow-right" aria-hidden /></p>
                    <p className="bm-nav-title">Browse All Articles</p>
                  </a>
                )}
              </div>
            </article>
          </div>

          <aside className="bm-sidebar" aria-label="Article sidebar">
            <div className="bm-widget">
              <p className="bm-widget-label">About the Author</p>
              <img src={authorAvatarUrl || '/images/simoneimg.webp'} alt={`${displayAuthor} avatar`} className="bm-author-avatar" width={56} height={56} />
              <div className="bm-author-name"><span>{displayAuthor.toUpperCase()}</span><i className="fas fa-check-circle bm-icon-gold" aria-label="Verified" /></div>
              <p className="bm-author-role">{authorRole?.trim() || 'Licensed Bail Bond Agent'}</p>
              <p className="bm-author-bio">{authorBio?.trim() || 'In my experience helping Delaware families, the most important thing is calm guidance. Families do not need confusing legal talk during a crisis. They need clear steps, honest answers, and support they can trust.'}</p>
            </div>

            {relatedPosts.length > 0 && (
              <div className="bm-widget">
                <p className="bm-widget-label">Related Articles</p>
                {relatedPosts.map((post) => (
                  <a
                    key={post.slug}
                    href={`#/blog/${post.slug}`}
                    className="bm-related-link"
                    onClick={(e) => handleNav(e, `/blog/${post.slug}`)}
                  >
                    <img src={post.image || post.image_url} alt={post.title} className="bm-related-thumb" width={56} height={56} />
                    <div className="bm-related-body">
                      <p className="bm-related-title">{post.title}</p>
                      {post.excerpt && <p className="bm-related-date"><i className="far fa-calendar" aria-hidden />{post.excerpt}</p>}
                    </div>
                  </a>
                ))}
              </div>
            )}

            {cta.enabled !== false && (
              <div className="bm-consult-cta">
                <div className="bm-consult-icon-wrap"><i className="far fa-calendar-alt bm-icon-gold" style={{ fontSize: '22px' }} aria-hidden /></div>
                <h3>{cta.title}</h3>
                <p>{cta.description}</p>
                <a href={cta.button_href} className="bm-btn bm-btn--primary bm-btn--full" onClick={handleCtaClick}>
                  {cta.button_label}
                </a>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
