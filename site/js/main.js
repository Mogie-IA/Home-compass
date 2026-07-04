/* Home Compass — shared behaviour */
(function () {
  'use strict';

  /* ---------- sticky nav ---------- */
  var header = document.getElementById('siteHeader');
  var lastFixed = false;
  function onScroll() {
    var fixed = window.scrollY > 320;
    if (fixed !== lastFixed) {
      header.classList.toggle('is-fixed', fixed);
      lastFixed = fixed;
    }
  }
  if (header) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.documentElement.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // close menu when a link inside it is used
    var menu = document.getElementById('mobileMenu');
    if (menu) {
      menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          document.documentElement.classList.remove('nav-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }
  }

  /* ---------- reveal on scroll ---------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- forms ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, message) {
    field.classList.add('has-error');
    var err = field.querySelector('.field-error');
    if (err) err.textContent = message;
  }
  function clearError(field) {
    field.classList.remove('has-error');
  }

  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field) clearError(field);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var firstBad = null;

      form.querySelectorAll('.field').forEach(function (field) {
        var input = field.querySelector('input, select, textarea');
        if (!input) return;
        clearError(field);
        var value = input.value.trim();
        if (input.required && !value) {
          setError(field, 'Please complete this field.');
          valid = false;
          if (!firstBad) firstBad = input;
        } else if (input.type === 'email' && value && !EMAIL_RE.test(value)) {
          setError(field, 'Please enter a valid email address.');
          valid = false;
          if (!firstBad) firstBad = input;
        }
      });

      if (!valid) {
        if (firstBad) firstBad.focus();
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      var label = button ? button.textContent : '';
      if (button) {
        button.disabled = true;
        button.textContent = 'Submitting...';
      }

      // Simulate a request, then show the success state.
      window.setTimeout(function () {
        var wrap = form.closest('.form-wrap');
        if (wrap) {
          wrap.classList.add('is-done');
          var success = wrap.querySelector('.form-success');
          if (success) {
            success.setAttribute('tabindex', '-1');
            success.focus({ preventScroll: false });
          }
        }
        if (button) {
          button.disabled = false;
          button.textContent = label;
        }
      }, 700);
    });
  });
})();
