<?php
// /sitemap.xml = the static sitemap (built-in pages) + every live blog post from the admin dashboard.
// Scheduled posts appear automatically once their publish time has passed.
require __DIR__ . '/blog-lib.php';

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: public, max-age=600');

$static = file_get_contents(__DIR__ . '/sitemap.xml');
$rows = a2f_fetch_posts(['select' => 'slug,updated_at,published_at', 'order' => 'published_at.desc', 'limit' => 1000]);
if (!$rows) exit($static);

$c = a2f_config();
$extra = '';
foreach ($rows as $row) {
  $loc = $c['origin'] . '/blog/' . $row['slug'];
  if (strpos($static, '<loc>' . $loc . '</loc>') !== false) continue;
  $lastmod = substr($row['updated_at'] ?: $row['published_at'], 0, 10);
  $extra .= "  <url>\n    <loc>" . esc($loc) . "</loc>\n    <lastmod>" . esc($lastmod) . "</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n";
}
echo str_replace('</urlset>', $extra . '</urlset>', $static);
