# SOCAR Türkiye Kariyer — Kurumsal Redesign

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-canlı-2ea44f?style=flat-square&logo=github&logoColor=white)](https://yildirim-alican.github.io/socar-careers-redesign/)
[![Release](https://img.shields.io/badge/dynamic/json?url=https://api.github.com/repos/yildirim-alican/socar-careers-redesign/releases/latest&query=%24.tag_name&label=Release&style=flat-square&logo=github&color=003DA5)](https://github.com/yildirim-alican/socar-careers-redesign/releases/latest)
[![License](https://img.shields.io/badge/License-Proprietary-CC0000?style=flat-square)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](css/socar-careers.css)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](js/socar-careers.js)
[![Accessibility](https://img.shields.io/badge/Erişilebilirlik-WCAG%202.1-003DA5?style=flat-square)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Static Site](https://img.shields.io/badge/Statik%20Site-GitHub%20Pages-24292f?style=flat-square&logo=githubpages&logoColor=white)](https://pages.github.com/)

> **Tasarım önerisi / prototip (v1.0.0)** — [careers.socar.com.tr](https://careers.socar.com.tr/) resmî sitesinin yerine geçmez.

---

## Yönetici özeti

SOCAR Türkiye Kariyer web sitesi, mevcut ön yüzün kurumsal kimlik beklentileriyle tam örtüşmemesi nedeniyle **statik HTML/CSS/JS** ile yeniden tasarlanmıştır. Amaç; markanın enerji sektöründeki konumunu yansıtan, tutarlı tipografi ve renk dili kullanan, erişilebilir ve hızlı bir kariyer deneyimi sunmaktır.

| | |
|---|---|
| **Canlı demo** | https://yildirim-alican.github.io/socar-careers-redesign/ |
| **Orijinal referans** | https://careers.socar.com.tr/ |
| **Kaynak kod** | https://github.com/yildirim-alican/socar-careers-redesign |
| **Sürüm** | [v1.0.0](https://github.com/yildirim-alican/socar-careers-redesign/releases/tag/v1.0.0) |
| **Yayın** | GitHub Pages — build veya sunucu gerekmez |
| **Lisans** | [Proprietary — Tasarım önerisi](LICENSE) |

### Teslim edilen iyileştirmeler

- **7 sayfalık kurumsal redesign** — Ana sayfa ve alt sayfalar (SOCAR Türkiye, Hayat, Genç Yetenekler, Gelişim, Programlar, İş Fırsatları)
- **Görsel optimizasyonu** — Tüm raster görseller WebP formatında; depo boyutu ~50 MB → ~5 MB; hero görsellerde responsive `srcset` ile hızlı ilk yükleme (LCP)
- **SEO** — Sayfa başına benzersiz meta, canonical URL, Open Graph / Twitter Card, Schema.org JSON-LD
- **Erişilebilirlik** — Anlamlı `alt` metinleri, ARIA, klavye erişimi, `prefers-reduced-motion` desteği
- **Temiz URL** — `.html` uzantısız klasör tabanlı adresleme (`/socar-turkiye/`)
- **UTF-8 Türkçe** — Tüm metinler doğru karakter kodlamasıyla sunulur

### Sayfa haritası

| Sayfa | Canlı URL | İçerik özeti |
|-------|-----------|--------------|
| Ana Sayfa | `/` | Hero, değerler, logo galerisi, işte deneyim, ödüller |
| SOCAR Türkiye | `/socar-turkiye/` | Kurumsal tanıtım, video, saha, ekonomik iş birliği |
| SOCAR'da Hayat | `/sokarda-hayat/` | Yaşam banner, carousel, gönüllülük, hexagon galeri |
| Genç Yetenekler | `/genc-yetenekler/` | Staj programı, Kariyer Yolculuğu, Next Gen Talks |
| SOCAR'da Gelişim | `/sokarda-gelisim/` | Academy banner, STAR Rafineri videosu, milestone |
| Programlar | `/programlar-ve-is-birlikleri/` | Academy header + program tablosu |
| İş Fırsatları | `/is-firsatlari/` | Filtrelenebilir pozisyon listesi, başvuru CTA |

Eski `.html` adresleri (`socar-turkiye.html` vb.) otomatik olarak temiz URL'lere yönlendirilir.

---

## Kurum yetkilileri için

- Bu depo **bağımsız bir tasarım çalışmasıdır**; SOCAR Turkey Enerji A.Ş.'nin resmî ürünü değildir.
- SOCAR markası, logosu ve görselleri ilgili hak sahiplerine aittir. Ticari veya resmî kullanım için **SOCAR Türkiye onayı** gereklidir.
- Canlı demo GitHub Pages üzerinde barındırılır; `main` dalına push ile otomatik güncellenir.
- Canonical ve paylaşım URL'leri demo adresiyle eşleşir; Schema.org içindeki `careers.socar.com.tr` referansları orijinal marka sitesine yöneliktir.

---

## Önizleme

1. **`index.html`** dosyasını tarayıcıda açın, veya
2. Proje klasöründe basit bir yerel sunucu kullanın (video ve göreli yollar için önerilir):

```bash
npx --yes serve .
# veya: python -m http.server 8080
```

---

## Teknik özet

| Katman | Dosya / teknoloji |
|--------|-------------------|
| Markup | HTML5 — semantik, ARIA, lazy loading |
| Stil | `css/socar-careers.css` (v5.10.86) |
| Etkileşim | `js/socar-careers.js` (v5.10.8) — Vanilla JS + jQuery 3.7.1 slim |
| İkonlar | Bootstrap Icons (CDN) |
| Font | Inter (Google Fonts CDN) |
| Görseller | WebP raster + SVG logo; hero `srcset` (800 / 1280 / 1920w) |
| Video | Yerel MP4 (`assets/video/`) |

Framework yok (React, Vue, Bootstrap CSS kullanılmaz).

### Klasör yapısı

```
socar-careers-redesign/
├── index.html
├── .nojekyll                  # GitHub Pages — Jekyll devre dışı
├── .gitattributes             # UTF-8 / LF satır sonları
├── LICENSE                    # Proprietary — SOCAR tasarım önerisi
├── CHANGELOG.md               # Sürüm geçmişi
├── socar-turkiye/index.html   # (+ 5 alt sayfa klasörü)
├── socar-turkiye.html         # Eski URL yönlendirme
├── css/socar-careers.css
├── js/socar-careers.js
├── assets/
│   ├── img/                   # Banner ve bölüm görselleri (.webp)
│   ├── gallery/               # Hexagon galeri, kariyer kartları
│   ├── carousel/              # Carousel + manifest.json
│   ├── vendors/               # Ödül logoları
│   └── video/                 # Tanıtım videoları
└── .github/                   # Issue/PR şablonları, güvenlik politikası
```

### Görsel standardı

Raster görseller yalnızca **WebP** formatındadır. Dosya adlandırma: `socar-{konu}-{açıklama}.webp` (boşluk ve Türkçe karakter yok).

| Klasör | Kullanım |
|--------|----------|
| `assets/img/` | Sayfa banner ve bölüm görselleri |
| `assets/gallery/` | Hexagon galeri, kariyer kartları |
| `assets/carousel/` | Carousel kareleri |
| `assets/vendors/` | Ödül ve sertifika logoları |

Her ana klasörde **`manifest.json`** — dosya adı, `src`, `alt` metni tutulur.

Yeni görsel eklerken: WebP'ye dönüştürün ([Squoosh](https://squoosh.app/) vb.), manifest'i güncelleyin, HTML'de `src`/`alt`/`width`/`height` ekleyin. Hero görseller için `-800.webp` ve `-1280.webp` srcset varyantları önerilir.

### SEO ve performans (kısa)

- Sayfa başına **1 LCP hero preload** (`imagesrcset` + `imagesizes="100vw"`)
- Below-fold görseller: `loading="lazy"`, `decoding="async"`
- Carousel: viewport'a girince ilk 3 karo preload (`IntersectionObserver`)
- CSS/JS değişikliğinde tüm HTML dosyalarında `?v=` sürüm parametresini artırın

### Ortak bileşenler

Navbar, footer, cookie banner ve giriş modalı **7 sayfada aynı blok** olarak yer alır (`<!-- NAVBAR:START -->` … `<!-- FOOTER:END -->`). Bir değişiklik yapıldığında tüm sayfalar birlikte güncellenmelidir.

### Karakter kodlaması

Tüm dosyalar **UTF-8** olarak kaydedilmelidir. Windows PowerShell ile toplu düzenleme Türkçe karakterleri bozabilir; düzenlemeleri UTF-8 destekleyen bir editörle yapın.

---

## Tasarım dili (özet)

| Öğe | Değer |
|-----|-------|
| Birincil renk | `#CC0000` (SOCAR kırmızısı) |
| Kurumsal mavi | `#003DA5` |
| Navbar şerit | Mavi → kırmızı → yeşil gradyan |
| Font | Inter |
| Maks. içerik genişliği | Tam genişlik − responsive `--site-gutter` (mobil ~14–18px, masaüstü max 100px) |

Detaylı renk token'ları ve tipografi ölçeği için `css/socar-careers.css` içindeki `:root` bloğuna bakın.

---

## Depoyu klonlama

```bash
git clone https://github.com/yildirim-alican/socar-careers-redesign.git
cd socar-careers-redesign
```

GitHub Pages: **Settings → Pages → Source:** Deploy from branch → `main` / `/ (root)`.

> **`assets/` klasörünün tamamı** repoda bulunmalıdır; görseller olmadan site boş görünür.

---

## Sürüm geçmişi

Değişiklikler [CHANGELOG.md](CHANGELOG.md) dosyasında tutulur. İlk kararlı sürüm: **[v1.0.0](https://github.com/yildirim-alican/socar-careers-redesign/releases/tag/v1.0.0)** (28 Haziran 2026).

---

## Katkı ve güvenlik

- Katkı kuralları: [CONTRIBUTING.md](CONTRIBUTING.md)
- Güvenlik bildirimi: [.github/SECURITY.md](.github/SECURITY.md)

---

## Lisans ve telif

Bu proje [LICENSE](LICENSE) dosyasındaki **Proprietary — Tasarım Önerisi** lisansına tabidir.

SOCAR®, SOCAR Türkiye ve ilgili marka öğeleri SOCAR Turkey Enerji A.Ş. ve/veya ilgili hak sahiplerine aittir. Resmî veya ticari kullanım için SOCAR Türkiye yazılı onayı gereklidir.
