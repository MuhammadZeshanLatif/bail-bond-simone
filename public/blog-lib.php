<?php
// Shared helpers for blog-router.php and sitemap.php (Hostinger, no build step).
// Keep render_body() in step with renderArticle() in src/lib/blogMarkdown.js.

const A2F_HTML_MARKER = '<!--a2f-html-->';

function a2f_config() {
  static $config = null;
  if ($config === null) $config = require __DIR__ . '/blog-config.php';
  return $config;
}

function esc($s) { return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

// Live posts only: published and due. Returns null when Supabase cannot be reached.
function a2f_fetch_posts(array $query) {
  $c = a2f_config();
  $query = array_merge(['select' => '*', 'status' => 'eq.published', 'published_at' => 'lte.' . gmdate('Y-m-d\TH:i:s\Z')], $query);
  $curl = curl_init($c['supabaseUrl'] . '/rest/v1/' . $c['table'] . '?' . http_build_query($query));
  curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 8,
    CURLOPT_HTTPHEADER => ['apikey: ' . $c['anonKey'], 'Accept: application/json'],
  ]);
  $body = curl_exec($curl);
  $status = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
  curl_close($curl);
  $rows = json_decode($body ?: 'null', true);
  if ($status !== 200 || !is_array($rows)) return null;
  return $rows;
}

function heading_id($text) {
  $id = trim(preg_replace('/[^a-z0-9]+/', '-', strtolower(strip_tags($text))), '-');
  return substr($id, 0, 80) ?: 'section';
}

function safe_href($url) {
  if (substr($url, 0, 2) === '//') return '';
  if ($url !== '' && ($url[0] === '/' || $url[0] === '#')) return $url;
  return preg_match('~^(https?:|mailto:|tel:)~i', $url) ? $url : '';
}

function emphasis($html) {
  $html = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $html);
  return preg_replace('/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/', '$1<em>$2</em>', $html);
}

function inline_md($text) {
  $c = a2f_config();
  $out = '';
  $cursor = 0;
  preg_match_all('/\[([^\]]+)\]\(([^)\s]+)\)/', $text, $matches, PREG_OFFSET_CAPTURE | PREG_SET_ORDER);
  foreach ($matches as $m) {
    $out .= emphasis(esc(substr($text, $cursor, $m[0][1] - $cursor)));
    $href = safe_href($m[2][0]);
    $label = emphasis(esc($m[1][0]));
    if ($href !== '') {
      $external = preg_match('~^https?:~i', $href) && strpos($href, $c['origin']) !== 0;
      $out .= '<a href="' . esc($href) . '"' . ($external ? ' target="_blank" rel="noopener noreferrer"' : '') . '>' . $label . '</a>';
    } else {
      $out .= $label;
    }
    $cursor = $m[0][1] + strlen($m[0][0]);
  }
  return $out . emphasis(esc(substr($text, $cursor)));
}

function md_cells($line) { return array_map('trim', explode('|', substr(trim($line), 1, -1))); }

// Returns ['html' => string, 'faqs' => [['question' => ..., 'answer' => ...]]]
function render_body($content) {
  if (strpos(ltrim($content), A2F_HTML_MARKER) === 0) {
    $html = preg_replace('~<script\b[\s\S]*?</script>~i', '', str_replace(A2F_HTML_MARKER, '', $content));
    return ['html' => $html, 'faqs' => []];
  }
  $source = preg_replace('/^(#{2,3}\s+[^\n]+)\n(?!\n)/m', "$1\n\n", str_replace("\r\n", "\n", $content));
  $blocks = array_values(array_filter(array_map('trim', preg_split('/\n\s*\n/', $source)), 'strlen'));
  $html = '';
  $faqs = [];
  $used = [];
  $inFaq = false;
  for ($i = 0; $i < count($blocks); $i++) {
    $block = $blocks[$i];
    if (preg_match('/^(#{2,3})\s+(.+)$/', $block, $m)) {
      $level = strlen($m[1]);
      $text = trim($m[2]);
      if ($level === 2) $inFaq = (bool)preg_match('/frequently asked questions|\bfaqs?\b/i', $text);
      $next = $blocks[$i + 1] ?? null;
      if ($inFaq && $level === 3 && $next !== null && !preg_match('/^#{2,3}\s/', $next)) {
        $faqs[] = ['question' => $text, 'answer' => str_replace(['**', '*'], '', preg_replace('/\[([^\]]+)\]\([^)]+\)/', '$1', $next))];
        $html .= '<h3>' . inline_md($text) . '</h3><p>' . str_replace("\n", '<br>', inline_md($next)) . '</p>';
        $i++;
        continue;
      }
      $base = heading_id($text);
      $id = $base;
      for ($n = 2; isset($used[$id]); $n++) $id = $base . '-' . $n;
      $used[$id] = true;
      $html .= '<h' . $level . ' id="' . esc($id) . '">' . inline_md($text) . '</h' . $level . '>';
      continue;
    }
    if (preg_match('/^!\[([^\]]*)\]\(([^)\s]+)\)$/', $block, $m)) {
      $src = safe_href($m[2]);
      if ($src !== '') $html .= '<figure class="bm-article-figure"><img src="' . esc($src) . '" alt="' . esc($m[1]) . '" loading="lazy" decoding="async">' . ($m[1] !== '' ? '<figcaption>' . esc($m[1]) . '</figcaption>' : '') . '</figure>';
      continue;
    }
    $lines = explode("\n", $block);
    $isTable = count($lines) >= 2
      && count(array_filter($lines, function ($l) { return preg_match('/^\|.*\|$/', trim($l)); })) === count($lines)
      && preg_match('/^(\|\s*:?-{3,}:?\s*)+\|$/', trim($lines[1]));
    if ($isTable) {
      $html .= '<div class="bm-table-wrap"><table class="blog-data-table"><thead><tr>';
      foreach (md_cells($lines[0]) as $cell) $html .= '<th scope="col">' . inline_md($cell) . '</th>';
      $html .= '</tr></thead><tbody>';
      foreach (array_slice($lines, 2) as $row) {
        $html .= '<tr>';
        foreach (md_cells($row) as $cell) $html .= '<td>' . inline_md($cell) . '</td>';
        $html .= '</tr>';
      }
      $html .= '</tbody></table></div>';
      continue;
    }
    $all = function ($pattern) use ($lines) { return count(array_filter($lines, function ($l) use ($pattern) { return preg_match($pattern, $l); })) === count($lines); };
    if ($all('/^[-*]\s+/')) {
      $html .= '<ul>';
      foreach ($lines as $l) $html .= '<li>' . inline_md(preg_replace('/^[-*]\s+/', '', $l)) . '</li>';
      $html .= '</ul>';
      continue;
    }
    if ($all('/^\d+[.)]\s+/')) {
      $html .= '<ol>';
      foreach ($lines as $l) $html .= '<li>' . inline_md(preg_replace('/^\d+[.)]\s+/', '', $l)) . '</li>';
      $html .= '</ol>';
      continue;
    }
    if ($all('/^>/')) {
      $html .= '<div class="bm-quick-answer">' . inline_md(implode(' ', array_map(function ($l) { return preg_replace('/^>\s?/', '', $l); }, $lines))) . '</div>';
      continue;
    }
    $html .= '<p>' . implode('<br>', array_map('inline_md', $lines)) . '</p>';
  }
  return ['html' => $html, 'faqs' => $faqs];
}

function absolute_url($url) {
  $c = a2f_config();
  return ($url !== '' && $url[0] === '/') ? $c['origin'] . $url : $url;
}
