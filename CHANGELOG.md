# Changelog

Bu proje [Keep a Changelog](https://keepachangelog.com/tr/1.1.0/) formatını takip eder; sürüm numaralandırması [Semantic Versioning](https://semver.org/lang/tr/) ile uyumludur.

## [1.0.0] — 2026-06-28

İlk kararlı sürüm. SOCAR Türkiye Kariyer sitesi için kurumsal statik redesign prototipi.

### Eklenenler

- **7 sayfalık site** — Ana sayfa, SOCAR Türkiye, SOCAR'da Hayat, Genç Yetenekler, SOCAR'da Gelişim, Programlar ve İş Fırsatları
- **Kurumsal tasarım dili** — SOCAR renk paleti, Inter tipografi, navbar/footer gradyan şeritleri
- **Görsel optimizasyonu** — Tüm raster görseller WebP; hero `srcset` (800 / 1280 / 1920w); LCP preload
- **SEO** — Sayfa başına meta, canonical, Open Graph / Twitter Card, Schema.org JSON-LD
- **Erişilebilirlik** — ARIA, klavye erişimi, anlamlı `alt` metinleri, `prefers-reduced-motion`
- **Temiz URL** — Klasör tabanlı yönlendirme; eski `.html` adresleri için redirect dosyaları
- **Performans** — Lazy loading, carousel IntersectionObserver, `content-visibility` optimizasyonları
- **GitHub Pages** — `.nojekyll` ile statik yayın; build adımı gerekmez

### Teknik

- CSS `v5.10.7` · JS `v5.10.3`
- Vanilla JavaScript + jQuery 3.7.1 slim
- Bootstrap Icons, Inter (Google Fonts CDN)

[1.0.0]: https://github.com/yildirim-alican/socar-careers-redesign/releases/tag/v1.0.0
