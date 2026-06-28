/**
 * socar-careers.js  v5.10.8
 */

(function ($) {
  'use strict';

  var SAP_URL  = 'https://career5.successfactors.eu/careers?company=socarturkeP';
  var COOKIE_KEY = 'sc_cookie_consent';
  var BREAKPOINT = 1200;

  var Nav = {
    openMenu: function () {
      $('#burger-btn').attr('aria-expanded', 'true');
      $('#nav-overlay').addClass('is-open').attr('aria-hidden', 'false');
      $('#nav-backdrop').addClass('is-visible');
      document.body.style.overflow = 'hidden';
      setTimeout(function () { $('#nav-close-btn').trigger('focus'); }, 60);
    },

    closeMenu: function () {
      $('#burger-btn').attr('aria-expanded', 'false');
      $('#nav-overlay').removeClass('is-open').attr('aria-hidden', 'true');
      $('#nav-backdrop').removeClass('is-visible');
      document.body.style.overflow = '';
      if ($(window).width() < BREAKPOINT) {
        $('#burger-btn').trigger('focus');
      }
    },

    initBurger: function () {
      var self = this;
      $('#burger-btn').on('click', function () {
        $(this).attr('aria-expanded') === 'true' ? self.closeMenu() : self.openMenu();
      });
      $('#nav-close-btn').on('click', function () { self.closeMenu(); });
      $('#nav-backdrop').on('click', function () { self.closeMenu(); });
      $('#nav-drawer-auth-btn').on('click', function () {
        self.closeMenu();
        setTimeout(function () { openAuthModal('login'); }, 200);
      });
      var resizeTimer;
      $(window).on('resize.navResize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if ($(window).width() >= BREAKPOINT && $('#nav-overlay').hasClass('is-open')) {
            self.closeMenu();
          }
        }, 150);
      });
    },

    initMobileSubmenu: function () {
      $('#mobile-gelisim-btn').on('click', function () {
        var $btn = $(this);
        var $panel = $('#mobile-gelisim-panel');
        var open = $panel.hasClass('is-open');
        $panel.toggleClass('is-open', !open).attr('aria-hidden', String(open));
        $btn.toggleClass('is-open', !open).attr('aria-expanded', String(!open));
      });
    },

    initDesktopDropdown: function () {
      var $dd = $('#gelisim-dropdown');
      if (!$dd.length) return;
      var $btn = $dd.find('.nav-item--trigger');
      var $panel = $dd.find('.nav-dropdown__menu');
      var closeTimer;
      function openDd() { clearTimeout(closeTimer); $dd.addClass('is-open'); $btn.attr('aria-expanded', 'true'); }
      function closeDd() { $dd.removeClass('is-open'); $btn.attr('aria-expanded', 'false'); }
      function scheduleDdClose() { closeTimer = setTimeout(closeDd, 220); }
      $dd.on('mouseenter', openDd).on('mouseleave', scheduleDdClose);
      $panel.on('mouseenter', function () { clearTimeout(closeTimer); }).on('mouseleave', scheduleDdClose);
      $btn.on('click', function (e) {
        e.stopPropagation();
        $dd.hasClass('is-open') ? closeDd() : openDd();
      });
      $(document).on('click.navDropdown', function (e) {
        if (!$dd[0].contains(e.target)) closeDd();
      });
    },

    initScroll: function () {
      var $header = $('#site-header');
      if (!$header.length) return;
      var update = function () {
        $header.toggleClass('is-scrolled', window.scrollY > 20);
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
    },

    initActiveState: function () {
      var parts = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
      var path = 'home';
      if (parts.length) {
        var last = parts[parts.length - 1];
        if (last === 'index.html') {
          path = parts.length > 1 ? parts[parts.length - 2] : 'home';
        } else if (/\.html$/i.test(last)) {
          path = last.slice(0, -5);
        } else {
          path = last;
        }
      }
      /* Aktif durum build-nav.js ile HTML'de; JS yalnızca yedek */
      document.querySelectorAll(
        '.nav-links .nav-item[data-nav-page], .nav-dropdown__link[data-nav-page], .nav-drawer__link[data-nav-page], .nav-drawer__sublink[data-nav-page]'
      ).forEach(function (el) {
        if (el.getAttribute('data-nav-page') === path && !el.classList.contains('is-active')) {
          el.classList.add('is-active');
          el.setAttribute('aria-current', 'page');
        }
      });
    },

    init: function () {
      this.initBurger();
      this.initMobileSubmenu();
      this.initDesktopDropdown();
      this.initScroll();
      this.initActiveState();
    }
  };

  function initCookieBanner() {
    var $banner = $('#cookie-banner');
    if (!$banner.length) return;
    if (!localStorage.getItem(COOKIE_KEY)) {
      setTimeout(function () { $banner.addClass('is-visible'); }, 1200);
    }
    $('#cookie-accept').on('click', function () {
      localStorage.setItem(COOKIE_KEY, 'accepted');
      $banner.removeClass('is-visible');
    });
    $('#cookie-manage').on('click', function () {
      localStorage.setItem(COOKIE_KEY, 'managed');
      $banner.removeClass('is-visible');
    });
  }

  function openAuthModal(tab) {
    $('#auth-modal-overlay').addClass('is-open').attr('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (tab) switchAuthTab(tab);
    var heroEmail = $('#hero-email').val().trim();
    if (heroEmail) $('#auth-email-login, #auth-email-register').val(heroEmail);
    setTimeout(function () {
      var $first = $('.auth-tab-pane.is-active input:first');
      if ($first.length) $first.trigger('focus');
    }, 120);
  }

  function closeAuthModal() {
    $('#auth-modal-overlay').removeClass('is-open').attr('aria-hidden', 'true');
    document.body.style.overflow = '';
    $('#auth-modal-btn').trigger('focus');
  }

  function switchAuthTab(tab) {
    $('.auth-tab-btn').removeClass('is-active').attr('aria-selected', 'false');
    $('.auth-tab-btn[data-tab="' + tab + '"]').addClass('is-active').attr('aria-selected', 'true');
    $('.auth-tab-pane').removeClass('is-active');
    $('#tab-' + tab).addClass('is-active');
  }

  function initAuthModal() {
    $('#auth-modal-btn').on('click', function () { openAuthModal('login'); });
    $('#hero-register-btn').on('click', function () {
      openAuthModal('register');
      var email = $('#hero-email').val().trim();
      if (email) setTimeout(function () { $('#auth-email-register').val(email); }, 60);
    });
    $('#auth-modal-overlay').on('click', function (e) { if (e.target === this) closeAuthModal(); });
    $('#auth-modal-close').on('click', closeAuthModal);
    $('.auth-tab-btn').on('click', function () { switchAuthTab($(this).data('tab')); });
    $('#auth-form-login, #auth-form-register').on('submit', function (e) {
      e.preventDefault();
      window.open(SAP_URL, '_blank', 'noopener,noreferrer');
    });
  }

  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }

  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    function update() {
      btn.classList.toggle('is-visible', window.scrollY > 0);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initJobSearch() {
    if (!$('#search-btn').length) return;
    $('#search-btn').on('click', function () {
      var q = $('#keyword-input').val().trim();
      var loc = $('#location-input').val().trim();
      var p = new URLSearchParams();
      if (q) p.set('q', q);
      if (loc) p.set('location', loc);
      window.open(SAP_URL + (p.toString() ? '&' + p.toString() : ''), '_blank', 'noopener,noreferrer');
    });
    var $moreBtn = $('#show-more-filters');
    var $filters = $('#advanced-filters');
    if (!$moreBtn.length || !$filters.length) return;
    function setAdvancedFilters(open) {
      $filters.toggleClass('is-open', open).attr('aria-hidden', String(!open));
      $moreBtn.toggleClass('is-hidden', open).attr('aria-expanded', String(open));
    }
    $moreBtn.on('click', function () { setAdvancedFilters(true); });
    $('#show-less-filters').on('click', function () { setAdvancedFilters(false); });
  }

  function initCtaRegister() {
    $(document).on('click', '#cta-register-btn', function () { openAuthModal('register'); });
  }

  function initLogoMaskGallery() {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var SVG_NS = 'http://www.w3.org/2000/svg';
    var XLINK_NS = 'http://www.w3.org/1999/xlink';
    var VB_W = 486.56;
    var VB_H = 114.39;
    var COLS = 10;
    var ROWS = 3;
    var FADE_CYCLE = 12;
    var STAGGER_STEP = 0.42;
    var PRIORITY_COUNT = 12;
    var BG_CONCURRENCY = 4;
    var preloadCache = {};
    var deferIdle = window.requestIdleCallback
      ? function (fn) { window.requestIdleCallback(fn, { timeout: 2000 }); }
      : function (fn) { setTimeout(fn, 120); };

    document.querySelectorAll('[data-logo-gallery]').forEach(function (root) {
      var stage = root.querySelector('.logo-mask-gallery__stage');
      var sourceEls = root.querySelectorAll('.logo-gallery-sources img');
      if (!stage || !sourceEls.length) return;

      var pool = Array.prototype.slice.call(sourceEls).map(function (img) {
        return {
          src: img.getAttribute('data-src') || img.getAttribute('src'),
          alt: img.getAttribute('alt') || ''
        };
      }).filter(function (item) { return item.src; });

      if (!pool.length) return;

      var cellW = VB_W / COLS;
      var cellH = VB_H / ROWS;
      var slots = [];
      var r;
      var c;
      for (r = 0; r < ROWS; r++) {
        for (c = 0; c < COLS; c++) {
          slots.push({
            x: c * cellW,
            y: r * cellH,
            w: cellW,
            h: cellH
          });
        }
      }

      var allTiles = [];
      var cellTiles = [];

      function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var t = a[i];
          a[i] = a[j];
          a[j] = t;
        }
        return a;
      }

      function preloadSrc(src, cb) {
        if (preloadCache[src]) {
          if (cb) cb();
          return;
        }
        if (preloadCache[src] === false) {
          preloadCache[src].push(cb || function () {});
          return;
        }
        preloadCache[src] = false;
        var img = new Image();
        img.decoding = 'async';
        img.onload = img.onerror = function () {
          var waiting = preloadCache[src];
          preloadCache[src] = true;
          if (typeof waiting === 'object') {
            waiting.forEach(function (fn) { fn(); });
          }
          if (cb) cb();
        };
        img.src = src;
      }

      function preloadParallel(srcs, cb) {
        if (!srcs.length) {
          if (cb) cb();
          return;
        }
        var pending = srcs.length;
        srcs.forEach(function (src) {
          preloadSrc(src, function () {
            pending--;
            if (pending === 0 && cb) cb();
          });
        });
      }

      function preloadQueued(srcs) {
        var queue = srcs.slice();
        var active = 0;
        function pump() {
          while (active < BG_CONCURRENCY && queue.length) {
            active++;
            preloadSrc(queue.shift(), function () {
              active--;
              pump();
            });
          }
        }
        pump();
      }

      function getUsedSrcs(excludeTile) {
        return allTiles.map(function (t) {
          if (t === excludeTile) return null;
          return t.getAttribute('href') || t.getAttributeNS(XLINK_NS, 'href');
        }).filter(Boolean);
      }

      function pickUniqueItem(excludeTile) {
        var used = getUsedSrcs(excludeTile);
        var available = pool.filter(function (p) {
          return used.indexOf(p.src) === -1;
        });
        if (!available.length) available = pool.slice();
        return available[Math.floor(Math.random() * available.length)];
      }

      function applyTileHref(tile, src) {
        tile.setAttributeNS(XLINK_NS, 'href', src);
        tile.setAttribute('href', src);
        tile.removeAttribute('title');
      }

      function setTileImage(tile, item, cb) {
        preloadSrc(item.src, function () {
          applyTileHref(tile, item.src);
          if (cb) cb();
        });
      }

      function applySlot(tile, slot) {
        tile.setAttribute('x', slot.x.toFixed(4));
        tile.setAttribute('y', slot.y.toFixed(4));
        tile.setAttribute('width', slot.w.toFixed(4));
        tile.setAttribute('height', slot.h.toFixed(4));
      }

      function createTileLayer(className) {
        var tile = document.createElementNS(SVG_NS, 'image');
        tile.setAttribute('class', className);
        tile.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        tile.setAttribute('focusable', 'false');
        tile.setAttribute('aria-hidden', 'true');
        return tile;
      }

      function scheduleLayerRefresh(tile, slotIndex, phaseOffset) {
        var halfMs = (FADE_CYCLE * 1000) / 2;
        var startMs = ((slotIndex * STAGGER_STEP * 1000) + phaseOffset) % (FADE_CYCLE * 1000);

        function refresh() {
          setTileImage(tile, pickUniqueItem(tile));
        }

        setTimeout(function loop() {
          refresh();
          setTimeout(loop, halfMs);
        }, startMs);
      }

      function startAnimations() {
        cellTiles.forEach(function (entry, index) {
          var tileA = entry.tileA;
          var tileB = entry.tileB;
          if (!reducedMotion) {
            var fadeDelay = -((index * STAGGER_STEP) % FADE_CYCLE);
            [tileA, tileB].forEach(function (tile) {
              tile.style.setProperty('--fade-cycle', FADE_CYCLE + 's');
              tile.style.setProperty('--fade-delay', fadeDelay + 's');
              tile.style.animationDuration = FADE_CYCLE + 's';
              tile.style.animationDelay = fadeDelay + 's';
            });
            scheduleLayerRefresh(tileB, index, FADE_CYCLE * 1000 * 0.04);
            scheduleLayerRefresh(tileA, index, FADE_CYCLE * 1000 * 0.54);
          } else {
            tileA.style.opacity = '1';
            tileB.style.opacity = '0';
          }
        });
      }

      var priorityItems = pool.slice(0, Math.min(PRIORITY_COUNT, pool.length));
      var prioritySrcs = priorityItems.map(function (p) { return p.src; });
      var restSrcs = pool.slice(priorityItems.length).map(function (p) { return p.src; });
      var shuffledPriority = shuffle(priorityItems);
      var visibleBatch = [];
      for (var vi = 0; vi < slots.length; vi++) {
        visibleBatch.push(shuffledPriority[vi % shuffledPriority.length]);
      }
      var secondaryBatch = shuffle(pool).slice(0, slots.length);

      slots.forEach(function (slot, index) {
        var cell = document.createElementNS(SVG_NS, 'g');
        cell.setAttribute('class', 'logo-mask-gallery__cell');

        var tileA = createTileLayer('logo-mask-gallery__tile logo-mask-gallery__tile--a');
        var tileB = createTileLayer('logo-mask-gallery__tile logo-mask-gallery__tile--b');

        applySlot(tileA, slot);
        applySlot(tileB, slot);

        allTiles.push(tileA, tileB);
        cellTiles.push({ tileA: tileA, tileB: tileB, index: index });

        cell.appendChild(tileA);
        cell.appendChild(tileB);
        stage.appendChild(cell);
      });

      preloadParallel(prioritySrcs, function () {
        cellTiles.forEach(function (entry) {
          applyTileHref(entry.tileA, visibleBatch[entry.index].src);
          setTileImage(
            entry.tileB,
            secondaryBatch[entry.index] || pool[entry.index % pool.length]
          );
        });
        root.classList.add('is-ready');
        startAnimations();

        deferIdle(function () {
          preloadQueued(restSrcs);
        });
      });
    });
  }

  function initPhotoCarousel() {
    var section = document.getElementById('hayat-carousel');
    if (!section) return;

    var track = section.querySelector('.photo-carousel-track');
    var inner = section.querySelector('.photo-carousel-inner');
    if (!track || !inner) return;

    var imgs = inner.querySelectorAll('img');
    var preloaded = {};

    imgs.forEach(function (img) {
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      img.setAttribute('draggable', 'false');
    });

    function preloadFirstUnique(count) {
      var seen = {};
      var loaded = 0;
      for (var i = 0; i < imgs.length && loaded < count; i++) {
        var src = imgs[i].currentSrc || imgs[i].src;
        if (!src || seen[src] || preloaded[src]) continue;
        seen[src] = true;
        preloaded[src] = true;
        var pre = new Image();
        pre.src = src;
        loaded++;
      }
    }

    if ('IntersectionObserver' in window) {
      var carouselObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            preloadFirstUnique(3);
            carouselObserver.disconnect();
          }
        });
      }, { rootMargin: '200px' });
      carouselObserver.observe(section);
    } else {
      preloadFirstUnique(3);
    }

    section.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });

    section.addEventListener('dragstart', function (e) {
      e.preventDefault();
    });

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    inner.classList.add('is-js-driven');

    var pos = 0;
    var halfWidth = 0;
    var speedPxPerSec = 0;
    var isDragging = false;
    var paused = false;
    var startX = 0;
    var startPos = 0;
    var lastTime = 0;
    var wheelTimer = null;
    var dragResumeTimer = null;

    function measure() {
      halfWidth = inner.scrollWidth / 2;
      speedPxPerSec = halfWidth > 0 ? halfWidth / 42 : 0;
    }

    imgs.forEach(function (img) {
      if (!img.complete) {
        img.addEventListener('load', measure);
      }
    });

    function wrap() {
      if (halfWidth <= 0) return;
      while (pos <= -halfWidth) pos += halfWidth;
      while (pos > 0) pos -= halfWidth;
    }

    function apply() {
      inner.style.transform = 'translate3d(' + pos + 'px,0,0)';
    }

    function tick(now) {
      if (!lastTime) lastTime = now;
      var dt = (now - lastTime) / 1000;
      lastTime = now;
      if (!reducedMotion && !paused && !isDragging && speedPxPerSec > 0) {
        pos -= speedPxPerSec * dt;
        wrap();
        apply();
      }
      requestAnimationFrame(tick);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      pos = startPos + (e.clientX - startX);
      apply();
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      wrap();
      apply();
      paused = true;
      clearTimeout(dragResumeTimer);
      dragResumeTimer = setTimeout(function () { paused = false; }, 800);
    }

    track.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      isDragging = true;
      paused = true;
      startX = e.clientX;
      startPos = pos;
      track.classList.add('is-dragging');
      window.addEventListener('pointermove', onPointerMove, { passive: false });
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    });

    track.addEventListener('wheel', function (e) {
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      pos -= delta;
      wrap();
      apply();
      paused = true;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(function () { paused = false; }, 1200);
    }, { passive: false });

    measure();
    apply();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    setTimeout(measure, 250);
    requestAnimationFrame(tick);
  }

  function initVendorsMarquee() {
    var section = document.getElementById('oduller-ortakliklar');
    if (!section) return;

    var inner = section.querySelector('.marquee-inner');
    if (!inner) return;

    inner.querySelectorAll('img').forEach(function (img) {
      img.draggable = false;
      img.setAttribute('draggable', 'false');
    });

    section.addEventListener('contextmenu', function (e) {
      if (e.target.closest('.award-logo')) e.preventDefault();
    });

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    inner.classList.add('is-js-driven');

    var pos = 0;
    var halfWidth = 0;
    var speedPxPerSec = 0;
    var lastTime = 0;

    function measure() {
      halfWidth = inner.scrollWidth / 2;
      speedPxPerSec = halfWidth > 0 ? halfWidth / 55 : 0;
    }

    inner.querySelectorAll('img').forEach(function (img) {
      if (!img.complete) {
        img.addEventListener('load', measure);
      }
    });

    function wrap() {
      if (halfWidth <= 0) return;
      while (pos <= -halfWidth) pos += halfWidth;
      while (pos > 0) pos -= halfWidth;
    }

    function tick(now) {
      if (!lastTime) lastTime = now;
      var dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (speedPxPerSec > 0) {
        pos -= speedPxPerSec * dt;
        wrap();
        inner.style.transform = 'translate3d(' + pos.toFixed(2) + 'px,0,0)';
      }
      requestAnimationFrame(tick);
    }

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    setTimeout(measure, 300);
    requestAnimationFrame(tick);
  }

  function initPageLoader() {
    var loader = document.getElementById('page-loader');
    if (!loader || loader.hidden) return;

    var minMs = 500;
    var start = Date.now();

    function finish() {
      var wait = Math.max(0, minMs - (Date.now() - start));
      setTimeout(function () {
        try { sessionStorage.setItem('socar_intro_seen', '1'); } catch (e) {}
        loader.classList.add('is-done');
        document.documentElement.classList.remove('is-loading');
        document.body.classList.remove('is-loading');
        loader.setAttribute('aria-hidden', 'true');
        setTimeout(function () {
          if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 620);
      }, wait);
    }

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
  }

  function initCevherHexGrid() {
    var list = document.querySelector('.js-cevher-hex-list');
    if (!list) return;

    var items = list.querySelectorAll('.js-cevher-hex-item');
    if (!items.length) return;

    var prevNums = [0, 0];

    function getItemWidth() {
      var frWidth = parseFloat(window.getComputedStyle(list).getPropertyValue('--fr_width'));
      return frWidth * 2;
    }

    function layout() {
      var itemWidth = getItemWidth();
      if (!itemWidth) return;

      var num0 = list.clientWidth / itemWidth;
      var num1 = Math.floor(num0);
      var num2 = (num0 % 1 <= 0.5) ? num1 - 1 : num1;

      if (num1 === prevNums[0] && num2 === prevNums[1]) return;

      if (num1 < 1) {
        items.forEach(function (item, index) {
          item.classList.remove('cevher-hex-list__item--top', 'cevher-hex-list__item--ex');
          if (index === 0) item.classList.add('cevher-hex-list__item--top');
        });
        prevNums = [num1, num2];
        return;
      }

      var modBase = num1 + num2;

      items.forEach(function (item, index) {
        var flg = modBase > 0 && (index + num2) % modBase === 0;
        item.classList.remove('cevher-hex-list__item--top', 'cevher-hex-list__item--ex');
        if (index < num1) item.classList.add('cevher-hex-list__item--top');
        if (flg && num0 > 1.5) item.classList.add('cevher-hex-list__item--ex');
      });

      prevNums = [num1, num2];
    }

    if (typeof ResizeObserver !== 'undefined') {
      var ro = new ResizeObserver(layout);
      ro.observe(list);
    } else {
      window.addEventListener('resize', layout);
    }

    layout();
  }

  function cevherLoadImageSize(src) {
    return new Promise(function (resolve) {
      var probe = new Image();
      probe.onload = function () {
        resolve({ w: probe.naturalWidth || 4, h: probe.naturalHeight || 3 });
      };
      probe.onerror = function () {
        resolve({ w: 4, h: 3 });
      };
      probe.src = src;
    });
  }

  function cevherHexStartRect(item) {
    var box = item.getBoundingClientRect();
    var scale = 0.96;
    var style = window.getComputedStyle(item);
    var matrix = style.transform;
    if (matrix && matrix !== 'none') {
      var match = matrix.match(/matrix\(([^)]+)\)/);
      if (match) {
        var parts = match[1].split(',').map(parseFloat);
        if (parts.length >= 1 && parts[0] > 0) scale = parts[0];
      }
    }
    var w = box.width * scale;
    var h = box.height * scale;
    return {
      left: box.left + (box.width - w) / 2,
      top: box.top + (box.height - h) / 2,
      width: w,
      height: h
    };
  }

  function cevherPopupFit(naturalW, naturalH) {
    var pad = 10;
    var maxW = Math.min(window.innerWidth * 0.92, 920);
    var maxH = window.innerHeight * 0.88;
    var innerMaxW = maxW - pad * 2;
    var innerMaxH = maxH - pad * 2;
    var scale = Math.min(innerMaxW / naturalW, innerMaxH / naturalH, 1);
    var imgW = Math.round(naturalW * scale);
    var imgH = Math.round(naturalH * scale);
    var w = imgW + pad * 2;
    var h = imgH + pad * 2;
    return {
      width: w,
      height: h,
      left: Math.round((window.innerWidth - w) / 2),
      top: Math.round((window.innerHeight - h) / 2)
    };
  }

  var CEVHER_HEX_HW = 2 / Math.sqrt(3);

  function cevherHexPopupFit() {
    var margin = 24;
    var maxW = Math.min(window.innerWidth * 0.82, window.innerWidth - margin * 2, 520);
    var maxH = window.innerHeight - margin * 2;
    var w = maxW;
    var h = Math.round(w * CEVHER_HEX_HW);
    if (h > maxH) {
      h = maxH;
      w = Math.round(h / CEVHER_HEX_HW);
    }
    return {
      width: w,
      height: h,
      left: Math.round((window.innerWidth - w) / 2),
      top: Math.round((window.innerHeight - h) / 2)
    };
  }

  var CEVHER_CLIP_HEX = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
  var CEVHER_CLIP_SQUARISH = 'polygon(35% 0%, 100% 8%, 100% 92%, 65% 100%, 0% 92%, 0% 8%)';
  var CEVHER_CLIP_RECT = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)';
  var CEVHER_CLIP_INSET = 'inset(0 round 2px)';
  var CEVHER_RADIUS_FINAL = '2px';
  var CEVHER_BORDER_FINAL = 'color-mix(in srgb, var(--strip-blue) 35%, var(--border))';
  var CEVHER_SHADOW_FLY = '0 10px 32px rgba(17, 24, 39, 0.2)';
  var CEVHER_SHADOW_FINAL = '0 24px 64px rgba(17, 24, 39, 0.28)';

  function cevherApplyShellBox(shell, box, clip, radius) {
    shell.style.left = box.left + 'px';
    shell.style.top = box.top + 'px';
    shell.style.width = box.width + 'px';
    shell.style.height = box.height + 'px';
    if (clip) {
      shell.style.clipPath = clip;
      shell.style.webkitClipPath = clip;
    }
    shell.style.borderRadius = radius || '0px';
  }

  function cevherSettleShell(shell, rectBox) {
    var box = rectBox || (function () {
      var r = shell.getBoundingClientRect();
      return { left: r.left, top: r.top, width: r.width, height: r.height };
    })();
    cevherApplyShellBox(shell, box, CEVHER_CLIP_INSET, CEVHER_RADIUS_FINAL);
    shell.style.borderColor = CEVHER_BORDER_FINAL;
    shell.style.boxShadow = CEVHER_SHADOW_FINAL;
  }

  var CEVHER_OPEN_DURATION = 1280;
  var CEVHER_OPEN_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
  var CEVHER_FLY_OFFSET = 720 / 1280;

  function cevherBoxProps(box, extra) {
    var props = {
      left: box.left + 'px',
      top: box.top + 'px',
      width: box.width + 'px',
      height: box.height + 'px'
    };
    if (extra) {
      Object.keys(extra).forEach(function (key) {
        props[key] = extra[key];
      });
    }
    return props;
  }

  function cevherCancelOpenAnims(shell) {
    if (!shell) return;
    ['_cevherMainAnim', '_cevherInnerAnim', '_cevherBlurAnim'].forEach(function (key) {
      if (shell[key] && shell[key].cancel) shell[key].cancel();
      shell[key] = null;
    });
    if (shell._cevherRectPhaseTimer) {
      window.clearTimeout(shell._cevherRectPhaseTimer);
      shell._cevherRectPhaseTimer = null;
    }
  }

  function cevherAnimateOpen(shell, start, hexEnd, rectEnd) {
    var inner = shell.querySelector('.cevher-lightbox__inner');
    var blur = shell.querySelector('.cevher-lightbox__img--blur');

    shell.classList.add('is-transitioning');
    cevherApplyShellBox(shell, start, CEVHER_CLIP_HEX, '0px');
    shell.style.borderColor = 'transparent';
    shell.style.boxShadow = CEVHER_SHADOW_FLY;

    if (!shell.animate) {
      cevherSettleShell(shell, rectEnd);
      shell.classList.remove('is-transitioning', 'is-transitioning--rect');
      return Promise.resolve();
    }

    var shellAnim = shell.animate([
      cevherBoxProps(start, {
        clipPath: CEVHER_CLIP_HEX,
        webkitClipPath: CEVHER_CLIP_HEX,
        borderRadius: '0px',
        borderColor: 'transparent',
        boxShadow: CEVHER_SHADOW_FLY
      }),
      cevherBoxProps(hexEnd, {
        clipPath: CEVHER_CLIP_HEX,
        webkitClipPath: CEVHER_CLIP_HEX,
        borderRadius: '0px',
        borderColor: 'transparent',
        boxShadow: CEVHER_SHADOW_FLY,
        offset: CEVHER_FLY_OFFSET
      }),
      cevherBoxProps(rectEnd, {
        clipPath: CEVHER_CLIP_SQUARISH,
        webkitClipPath: CEVHER_CLIP_SQUARISH,
        borderRadius: '1px',
        borderColor: CEVHER_BORDER_FINAL,
        boxShadow: CEVHER_SHADOW_FINAL,
        offset: 0.82
      }),
      cevherBoxProps(rectEnd, {
        clipPath: CEVHER_CLIP_RECT,
        webkitClipPath: CEVHER_CLIP_RECT,
        borderRadius: CEVHER_RADIUS_FINAL,
        borderColor: CEVHER_BORDER_FINAL,
        boxShadow: CEVHER_SHADOW_FINAL
      })
    ], {
      duration: CEVHER_OPEN_DURATION,
      easing: CEVHER_OPEN_EASING,
      fill: 'forwards'
    });
    shell._cevherMainAnim = shellAnim;

    if (inner && inner.animate) {
      inner.style.padding = '4%';
      shell._cevherInnerAnim = inner.animate([
        { padding: '4%' },
        { padding: '4%', offset: CEVHER_FLY_OFFSET },
        { padding: '0.625rem' }
      ], {
        duration: CEVHER_OPEN_DURATION,
        easing: CEVHER_OPEN_EASING,
        fill: 'forwards'
      });
    }

    if (blur && blur.animate) {
      shell._cevherBlurAnim = blur.animate([
        { top: '4%', right: '4%', bottom: '4%', left: '4%' },
        { top: '4%', right: '4%', bottom: '4%', left: '4%', offset: CEVHER_FLY_OFFSET },
        { top: '0.625rem', right: '0.625rem', bottom: '0.625rem', left: '0.625rem' }
      ], {
        duration: CEVHER_OPEN_DURATION,
        easing: CEVHER_OPEN_EASING,
        fill: 'forwards'
      });
    }

    shell._cevherRectPhaseTimer = window.setTimeout(function () {
      shell.classList.add('is-transitioning--rect');
    }, Math.round(CEVHER_OPEN_DURATION * CEVHER_FLY_OFFSET));

    function finishOpen() {
      if (shell._cevherRectPhaseTimer) {
        window.clearTimeout(shell._cevherRectPhaseTimer);
        shell._cevherRectPhaseTimer = null;
      }
      cevherCancelOpenAnims(shell);
      cevherSettleShell(shell, rectEnd);
      shell.classList.remove('is-transitioning', 'is-transitioning--rect');
      if (inner) inner.style.padding = '0.625rem';
      if (blur) {
        blur.style.top = '0.625rem';
        blur.style.right = '0.625rem';
        blur.style.bottom = '0.625rem';
        blur.style.left = '0.625rem';
      }
    }

    return shellAnim.finished.then(finishOpen).catch(finishOpen);
  }

  function openCevherLightbox(links, slides, index) {
    var state = openCevherLightbox._state;
    if (state.busy || state.open) return;

    var link = links[index];
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var item = link.closest('.cevher-hex-list__item') || link;
    var href = slides[index].href;
    var start = cevherHexStartRect(item);

    if (!href || start.width < 2) return;

    function closeLightbox() {
      if (!state.portal) return;
      var portal = state.portal;
      var shell = portal.querySelector('.cevher-lightbox__shell');
      if (shell) {
        cevherCancelOpenAnims(shell);
      }
      portal.classList.remove('is-ui-ready');
      portal.classList.add('is-closing');
      window.setTimeout(function () {
        if (portal._cevherItem) portal._cevherItem.classList.remove('is-flying');
        if (portal.parentNode) portal.parentNode.removeChild(portal);
        state.portal = null;
        state.open = false;
        state.busy = false;
        document.body.style.overflow = '';
      }, 260);
    }

    function showControls(portal) {
      if (portal._cevherReady) return;
      portal._cevherReady = true;
      var shell = portal.querySelector('.cevher-lightbox__shell');
      if (shell) {
        shell.classList.remove('is-transitioning', 'is-transitioning--rect', 'is-animating', 'is-morphing', 'is-morphed');
        shell.classList.add('is-settled');
      }
      portal.classList.add('is-ui-ready');
      state.open = true;
      state.busy = false;
    }

    function buildPortal(slide, startBox) {
      item.classList.add('is-flying');

      var portal = document.createElement('div');
      portal.className = 'cevher-lightbox';
      portal.setAttribute('role', 'dialog');
      portal.setAttribute('aria-modal', 'true');
      portal.setAttribute('aria-label', slide.alt || 'Görsel önizleme');
      portal.innerHTML =
        '<div class="cevher-lightbox__backdrop" aria-hidden="true"></div>' +
        '<div class="cevher-lightbox__shell">' +
          '<button type="button" class="cevher-lightbox__close" aria-label="Kapat">' +
            '<i class="bi bi-x-lg" aria-hidden="true"></i>' +
          '</button>' +
          '<div class="cevher-lightbox__inner"></div>' +
        '</div>';

      var shell = portal.querySelector('.cevher-lightbox__shell');
      var inner = portal.querySelector('.cevher-lightbox__inner');
      var blurNode = link.querySelector('.cevher-hex-list__image--blur');

      if (blurNode) {
        var flyBlur = document.createElement('img');
        flyBlur.className = 'cevher-lightbox__img cevher-lightbox__img--blur';
        flyBlur.src = blurNode.currentSrc || blurNode.getAttribute('src');
        flyBlur.alt = '';
        flyBlur.draggable = false;
        inner.appendChild(flyBlur);
      }

      var fly = document.createElement('img');
      fly.className = 'cevher-lightbox__img';
      fly.src = href;
      fly.alt = slide.alt;
      fly.draggable = false;
      inner.appendChild(fly);

      cevherApplyShellBox(shell, startBox, CEVHER_CLIP_HEX, '0px');
      document.body.appendChild(portal);

      portal._cevherItem = item;
      portal._cevherClose = closeLightbox;
      portal.querySelector('.cevher-lightbox__close').addEventListener('click', closeLightbox);
      portal.querySelector('.cevher-lightbox__backdrop').addEventListener('click', function () {
        if (portal.classList.contains('is-ui-ready')) closeLightbox();
      });

      document.body.style.overflow = 'hidden';
      return portal;
    }

    state.busy = true;
    state.index = index;
    state.portal = buildPortal(slides[index], start);
    state.portal.classList.add('is-active');

    var shell = state.portal.querySelector('.cevher-lightbox__shell');

    if (reduceMotion) {
      cevherLoadImageSize(href).then(function (size) {
        var end = cevherPopupFit(size.w, size.h);
        cevherApplyShellBox(shell, end, CEVHER_CLIP_INSET, CEVHER_RADIUS_FINAL);
        shell.style.borderColor = CEVHER_BORDER_FINAL;
        shell.style.boxShadow = CEVHER_SHADOW_FINAL;
        shell.classList.add('is-settled');
        showControls(state.portal);
      });
      return;
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        cevherLoadImageSize(href).then(function (size) {
          var hexEnd = cevherHexPopupFit();
          var rectEnd = cevherPopupFit(size.w, size.h);
          return cevherAnimateOpen(shell, start, hexEnd, rectEnd);
        }).then(function () {
          showControls(state.portal);
        }).catch(function () {
          showControls(state.portal);
        });
      });
    });
  }
  openCevherLightbox._state = { portal: null, open: false, busy: false, index: 0 };

  function initCevherLightbox() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('#ne-cevherler-var .js-cevher-open')
    );
    if (!links.length) return;

    var slides = links.map(function (link) {
      var sharp = link.querySelector('.cevher-hex-list__image--sharp');
      return {
        href: link.getAttribute('href'),
        alt: sharp ? (sharp.getAttribute('alt') || '') : ''
      };
    });

    links.forEach(function (link, index) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openCevherLightbox(links, slides, index);
      });
    });
  }

  function initLazySections() {
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      if (!img.getAttribute('decoding')) {
        img.decoding = 'async';
      }
      function markLoaded() {
        img.classList.add('is-loaded');
      }
      if (img.complete) {
        markLoaded();
      } else {
        img.addEventListener('load', markLoaded, { once: true });
      }
    });
  }

  function initContentProtection() {
    var allowCopy = 'input, textarea, select, [contenteditable="true"]';

    function isCopyAllowed(target) {
      return target && target.closest && target.closest(allowCopy);
    }

    document.addEventListener('contextmenu', function (e) {
      if (!isCopyAllowed(e.target)) e.preventDefault();
    });

    document.addEventListener('dragstart', function (e) {
      if (!isCopyAllowed(e.target)) e.preventDefault();
    });

    document.addEventListener('copy', function (e) {
      if (!isCopyAllowed(e.target)) e.preventDefault();
    });

    document.addEventListener('cut', function (e) {
      if (!isCopyAllowed(e.target)) e.preventDefault();
    });

    document.querySelectorAll('img, video').forEach(function (el) {
      el.draggable = false;
      el.setAttribute('draggable', 'false');
    });
  }

  function initEscKey() {
    $(document).on('keydown.esc', function (e) {
      if (e.key !== 'Escape') return;
      var state = openCevherLightbox._state;
      if (state.open && state.portal && state.portal._cevherClose) {
        state.portal._cevherClose();
        return;
      }
      if ($('#nav-overlay').hasClass('is-open')) Nav.closeMenu();
      if ($('#auth-modal-overlay').hasClass('is-open')) closeAuthModal();
    });
  }

  $(function () {
    initLogoMaskGallery();
    initPageLoader();
    initContentProtection();
    initCookieBanner();
    Nav.init();
    initAuthModal();
    initReveal();
    initBackToTop();
    initJobSearch();
    initCtaRegister();
    initVendorsMarquee();
    initPhotoCarousel();
    initLazySections();
    initCevherHexGrid();
    initCevherLightbox();
    initEscKey();
  });

}(jQuery));
