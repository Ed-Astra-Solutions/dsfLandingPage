/* GA4 CTA tracking — Dion Samuel Coaching System
   Sends one event per click on any link that takes a visitor to Instagram.
   - ig.me/m/dionsamuel_  → "Enquire" / "Message Dion" DM buttons  → generate_lead
   - instagram.com/...    → profile links (footer, body copy)      → instagram_profile_click
   Loaded on every public page; the gtag base snippet lives inline in each <head>. */
(function () {
  'use strict';

  function ctaLocation(a) {
    if (a.closest('header')) return 'nav';
    if (a.closest('footer')) return 'footer';
    if (a.closest('.cta')) return 'article-cta';
    var section = a.closest('section[id]');
    if (section) return section.id;
    section = a.closest('section[class]');
    if (section) return section.className.split(/\s+/)[0];
    if (a.closest('main.post')) return 'article-body';
    if (a.closest('.doc')) return 'legal-body';
    var main = a.closest('main[class]');
    if (main) return main.className.split(/\s+/)[0];
    return 'other';
  }

  function label(a) {
    var text = (a.textContent || '').replace(/\s+/g, ' ').trim();
    if (!text) text = a.getAttribute('aria-label') || 'unlabelled';
    return text.slice(0, 60);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || typeof window.gtag !== 'function') return;

    var href = a.href || '';
    var isDM = href.indexOf('ig.me/') > -1;
    var isProfile = !isDM && href.indexOf('instagram.com/') > -1;
    if (!isDM && !isProfile) return;

    window.gtag('event', isDM ? 'generate_lead' : 'instagram_profile_click', {
      cta_location: ctaLocation(a),
      cta_label: label(a),
      link_url: href,
      page_path: location.pathname
    });
  }, true);
})();
