<?php
// Server-renders blog posts published from the admin dashboard (Supabase) so crawlers get the
// full article, title, meta tags, canonical and JSON-LD on first load. React then takes over.
// .htaccess sends /blog/<slug> here only when no prerendered static page exists for that slug.
require __DIR__ . '/blog-lib.php';

$c = a2f_config();
$shellFile = file_exists(__DIR__ . '/spa-shell.html') ? __DIR__ . '/spa-shell.html' : __DIR__ . '/index.html';
$shell = file_get_contents($shellFile);
$slug = isset($_GET['slug']) ? (string)$_GET['slug'] : '';

header('Content-Type: text/html; charset=utf-8');

if (!preg_match('/^[a-z0-9]+(-[a-z0-9]+)*$/', $slug)) {
  http_response_code(404);
  exit($shell);
}

$rows = a2f_fetch_posts(['slug' => 'eq.' . $slug, 'limit' => 1]);
if ($rows === null) {
  // Supabase unreachable: hand over to the client app, which retries the fetch itself.
  header('Cache-Control: no-store');
  exit($shell);
}
if (count($rows) === 0) {
  // Draft, scheduled (not yet due) or deleted: not public.
  http_response_code(404);
  header('Cache-Control: no-store');
  exit($shell);
}

$p = $rows[0];
$url = $c['origin'] . '/blog/' . $p['slug'];
$canonical = !empty($p['canonical_url']) ? $p['canonical_url'] : $url;
$title = (!empty($p['seo_title']) ? $p['seo_title'] : $p['title']);
$description = !empty($p['seo_description']) ? $p['seo_description'] : $p['excerpt'];
$social = !empty($p['social_description']) ? $p['social_description'] : $description;
$image = absolute_url(!empty($p['og_image']) ? $p['og_image'] : (!empty($p['image']) ? $p['image'] : '/og-image.jpg'));
$keywords = implode(', ', array_filter(array_merge([$p['primary_keyword'] ?? ''], $p['secondary_keywords'] ?? [], $p['tags'] ?? [])));
$author = !empty($p['author']) ? $p['author'] : 'Simone Harris';
$rendered = render_body($p['content']);
$rendered['html'] = unlink_dead_blog_links($rendered['html']);
$published = date('F j, Y', strtotime($p['published_at']));

$graph = [
  [
    '@type' => 'BlogPosting',
    'url' => $url,
    'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => $canonical],
    'headline' => $p['title'],
    'description' => $description,
    'image' => $image,
    'inLanguage' => 'en-US',
    'datePublished' => $p['published_at'],
    'dateModified' => $p['updated_at'] ?: $p['published_at'],
    'author' => ['@type' => 'Person', 'name' => $author],
    'publisher' => ['@type' => 'Organization', 'name' => 'A Way to Freedom Bail Bonds', 'url' => $c['origin'] . '/'],
  ],
  [
    '@type' => 'BreadcrumbList',
    'itemListElement' => [
      ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => $c['origin'] . '/'],
      ['@type' => 'ListItem', 'position' => 2, 'name' => 'Blog', 'item' => $c['origin'] . '/blog'],
      ['@type' => 'ListItem', 'position' => 3, 'name' => $p['title'], 'item' => $url],
    ],
  ],
];
if (count($rendered['faqs'])) {
  $graph[] = ['@type' => 'FAQPage', 'mainEntity' => array_map(function ($f) {
    return ['@type' => 'Question', 'name' => $f['question'], 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f['answer']]];
  }, $rendered['faqs'])];
}
$jsonLd = json_encode(['@context' => 'https://schema.org', '@graph' => $graph], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP);

// --- head: replace the shell's homepage tags with this article's tags ---
$set = function ($pattern, $replacement) use (&$shell) {
  $shell = preg_replace($pattern, str_replace(['\\', '$'], ['\\\\', '\\$'], $replacement), $shell, 1);
};
$set('~<title>.*?</title>~s', '<title>' . esc($title) . '</title>');
$set('~<meta name="title" content="[^"]*"\s*/?>~', '<meta name="title" content="' . esc($title) . '" />');
$set('~<meta name="description" content="[^"]*"\s*/?>~', '<meta name="description" content="' . esc($description) . '" />');
$set('~<meta name="keywords" content="[^"]*"\s*/?>~', '<meta name="keywords" content="' . esc($keywords) . '" />');
$set('~<link rel="canonical" href="[^"]*"\s*/?>~', '<link rel="canonical" href="' . esc($canonical) . '" />');
$set('~<meta property="og:type" content="[^"]*"\s*/?>~', '<meta property="og:type" content="article" />');
$set('~<meta property="og:url" content="[^"]*"\s*/?>~', '<meta property="og:url" content="' . esc($url) . '" />');
$set('~<meta property="og:title" content="[^"]*"\s*/?>~', '<meta property="og:title" content="' . esc($title) . '" />');
$set('~<meta property="og:description" content="[^"]*"\s*/?>~', '<meta property="og:description" content="' . esc($social) . '" />');
$set('~<meta property="og:image" content="[^"]*"\s*/?>~', '<meta property="og:image" content="' . esc($image) . '" />');
$shell = preg_replace('~\s*<meta property="og:image:(width|height|type)" content="[^"]*"\s*/?>~', '', $shell);
$set('~<meta name="twitter:url" content="[^"]*"\s*/?>~', '<meta name="twitter:url" content="' . esc($url) . '" />');
$set('~<meta name="twitter:title" content="[^"]*"\s*/?>~', '<meta name="twitter:title" content="' . esc($title) . '" />');
$set('~<meta name="twitter:description" content="[^"]*"\s*/?>~', '<meta name="twitter:description" content="' . esc($social) . '" />');
$set('~<meta name="twitter:image" content="[^"]*"\s*/?>~', '<meta name="twitter:image" content="' . esc($image) . '" />');
$set('~</head>~', '<meta property="article:published_time" content="' . esc($p['published_at']) . '" />'
  . '<meta property="article:modified_time" content="' . esc($p['updated_at']) . '" />'
  . '<script type="application/ld+json">' . $jsonLd . '</script></head>');

// --- body: crawlable article inside #root (React replaces it on load) ---
$hero = !empty($p['image']) ? '<img src="' . esc($p['image']) . '" alt="' . esc($p['image_alt'] ?: $p['title']) . '" width="1600" height="900" fetchpriority="high">' : '';
$article = '<div class="blog-magazine blog-post-page"><main class="bm-inner"><article class="bm-article">'
  . '<nav class="bm-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog">Blog</a> › <span>' . esc($p['category']) . '</span></nav>'
  . '<h1 class="bm-h1">' . esc($p['title']) . '</h1>'
  . '<p class="bm-meta-row">By <strong>' . esc($author) . '</strong> · <time datetime="' . esc($p['published_at']) . '">' . esc($published) . '</time></p>'
  . $hero
  . '<p>' . esc($p['excerpt']) . '</p>'
  . $rendered['html']
  . '</article></main></div>';
$set('~<div id="root">\s*</div>~', '<div id="root">' . $article . '</div>');

header('Cache-Control: public, max-age=300');
echo $shell;
