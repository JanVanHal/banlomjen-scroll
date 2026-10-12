(function () {
  var dict = window.BLJH_I18N || { en: {}, th: {}, nl: {} };

  var lang = "en";
  var light = "morning";
  try {
    lang = localStorage.getItem("bljh-lang") || "en";
    light = localStorage.getItem("bljh-light") || "morning";
  } catch (e) {}
  if (!dict[lang]) lang = "en";
  if (light !== "evening") light = "morning";

  function applyKeyed(selector, attr, write) {
    var table = dict[lang];
    document.querySelectorAll(selector).forEach(function (el) {
      var key = el.getAttribute(attr);
      if (!table[key]) return;
      write(el, table[key]);
    });
  }

  function applyLang() {
    var table = dict[lang];
    applyKeyed("[data-i18n]", "data-i18n", function (el, value) {
      el.textContent = value;
      el.lang = lang;
    });
    applyKeyed("[data-i18n-html]", "data-i18n-html", function (el, value) {
      el.innerHTML = value;
      el.lang = lang;
    });
    applyKeyed("[data-i18n-alt]", "data-i18n-alt", function (el, value) {
      el.alt = value;
    });
    applyKeyed("[data-i18n-aria]", "data-i18n-aria", function (el, value) {
      el.setAttribute("aria-label", value);
    });
    if (table.docTitle) document.title = table.docTitle;
    document.documentElement.lang = lang === "th" || lang === "nl" ? lang : "en";
    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
    var dialog = document.getElementById("lightbox");
    var shot = document.getElementById("lb-img");
    var cap = document.getElementById("lb-cap");
    if (dialog && dialog.open && shot && cap) {
      var buttons = document.querySelectorAll(".wall button");
      var open = buttons[Number(shot.getAttribute("data-i"))];
      var img = open && open.querySelector("img");
      if (img) {
        shot.alt = img.alt;
        cap.textContent = img.alt;
      }
    }
  }

  function syncLanternLabel() {
    var span = document.querySelector("[data-lantern] [data-i18n-light]");
    if (!span) return;
    span.setAttribute("data-i18n", light === "evening" ? "evening" : "morning");
  }

  function applyLight() {
    document.documentElement.setAttribute("data-light", light);
    var btn = document.querySelector("[data-lantern]");
    if (btn) {
      btn.setAttribute("aria-pressed", light === "evening" ? "true" : "false");
    }
    document.querySelectorAll("input[name='Light']").forEach(function (input) {
      input.value = light;
    });
    syncLanternLabel();
    applyLang();
  }

  applyLight();

  document.querySelectorAll("[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      lang = btn.getAttribute("data-lang");
      try { localStorage.setItem("bljh-lang", lang); } catch (e) {}
      applyLang();
    });
  });

  var lantern = document.querySelector("[data-lantern]");
  if (lantern) {
    lantern.addEventListener("click", function () {
      light = light === "evening" ? "morning" : "evening";
      try { localStorage.setItem("bljh-light", light); } catch (e) {}
      applyLight();
    });
  }

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".bar-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var links = Array.prototype.slice.call(document.querySelectorAll(".bar-nav a[href^='#']"));
  var sections = links.map(function (a) {
    return document.querySelector(a.getAttribute("href"));
  }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var current = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + entry.target.id;
          if (on) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    sections.forEach(function (section) { current.observe(section); });
  }

  var dialog = document.getElementById("lightbox");
  var shot = document.getElementById("lb-img");
  var cap = document.getElementById("lb-cap");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".wall button"));
  var index = 0;
  var opener = null;

  function show(i) {
    if (!buttons.length) return;
    index = (i + buttons.length) % buttons.length;
    var img = buttons[index].querySelector("img");
    var pic = img.closest("picture");
    var source = pic ? pic.querySelector("source[srcset]") : null;
    var fromSource = source ? source.getAttribute("srcset").trim().split(/\s+/)[0] : "";
    shot.src = img.currentSrc || fromSource || img.src;
    shot.alt = img.alt;
    shot.setAttribute("data-i", String(index));
    cap.textContent = img.alt;
  }

  if (dialog && shot) {
    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        opener = btn;
        show(i);
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
      });
    });
    dialog.addEventListener("click", function (event) {
      var act = event.target.closest("[data-lb]");
      if (!act) return;
      if (act.getAttribute("data-lb") === "close") dialog.close();
      if (act.getAttribute("data-lb") === "prev") show(index - 1);
      if (act.getAttribute("data-lb") === "next") show(index + 1);
    });
    dialog.addEventListener("close", function () {
      if (opener) opener.focus();
    });
  }

  // Lazy images inside a transformed rail, or inside CSS columns, often never
  // intersect the viewport, so the browser never fetches them. Warm a section
  // as it approaches, and warm a section the moment someone jumps to it.
  function warmImg(img) {
    if (!img || img.dataset.warmed === "1") return;
    img.dataset.warmed = "1";
    img.decoding = "async";
    if (img.getAttribute("loading") === "lazy") img.loading = "eager";
    var pic = img.parentElement;
    var source = pic && pic.tagName === "PICTURE" ? pic.querySelector("source[srcset]") : null;
    var early = source ? source.getAttribute("srcset").trim().split(/\s+/)[0] : (img.getAttribute("src") || "");
    if (!early) return;
    var pre = new Image();
    pre.decoding = "async";
    pre.src = early;
  }

  function warmRoot(root) {
    if (!root) return;
    Array.prototype.forEach.call(root.querySelectorAll("img"), warmImg);
  }

  if ("IntersectionObserver" in window) {
    var near = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        warmImg(entry.target);
        near.unobserve(entry.target);
      });
    }, { rootMargin: "0px 60% 80% 60%" });
    Array.prototype.forEach.call(document.querySelectorAll('img[loading="lazy"]'), function (img) {
      near.observe(img);
    });

    var packs = document.querySelectorAll("[data-sc-act='pan'], #cooking, #guests, #rooms, #trips, #welcome");
    var packObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        warmRoot(entry.target);
        packObs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px 140% 0px" });
    Array.prototype.forEach.call(packs, function (el) { packObs.observe(el); });
  } else {
    Array.prototype.forEach.call(document.querySelectorAll("img"), warmImg);
  }

  document.addEventListener("click", function (event) {
    var a = event.target.closest && event.target.closest("a[href^='#']");
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (id) warmRoot(document.getElementById(id));
  });

  if (window.ScrollCraft) ScrollCraft.mount(document.body);
})();
