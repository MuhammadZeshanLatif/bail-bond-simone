<?php
// Public read-only settings for blog-router.php and sitemap.php.
// The publishable (anon) key is browser-safe: Row Level Security only exposes published, due posts.
return [
  'origin' => 'https://delawarebailbond.com',
  'supabaseUrl' => 'https://iyaoylugxjhmblnlkjky.supabase.co',
  'anonKey' => 'sb_publishable_DLwvuu3uikUAMKNRJK57KA_6QmQ4JVX',
  'table' => 'bail_bond_blog_posts',
];
