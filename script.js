(function () {
  var dict = {
    en: {
      book: "Book via LINE",
      roomsBtn: "See the rooms",
      welcome: "Sawasdee",
      homestay: "The homestay",
      rooms: "Rooms",
      cooking: "Cooking with Son",
      trips: "Trips",
      around: "Around Chiang Rai",
      guests: "By our guests",
      find: "Find us",
      call: "Call",
      line: "LINE",
      map: "Map",
      morning: "Morning",
      evening: "Evening",
      menu: "Menu",
      close: "Close",
      prev: "Previous",
      next: "Next",
      send: "Send message",
      sendPackage: "Send package request",
      name: "Name",
      email: "Email",
      message: "Message",
      package: "Package",
      arrival: "Arrival date",
      remarks: "Notes",
      personalized: "Personalized trip",
      packages: "Packages"
    },
    th: {
      book: "จองทาง LINE",
      roomsBtn: "ดูห้องพัก",
      welcome: "สวัสดี",
      homestay: "โฮมสเตย์",
      rooms: "ห้องพัก",
      cooking: "ทำอาหารกับสอน",
      trips: "ทริป",
      around: "รอบเชียงราย",
      guests: "จากผู้เข้าพัก",
      find: "ติดต่อเรา",
      call: "โทร",
      line: "LINE",
      map: "แผนที่",
      morning: "เช้า",
      evening: "ค่ำ",
      menu: "เมนู",
      close: "ปิด",
      prev: "ก่อนหน้า",
      next: "ถัดไป",
      send: "ส่งข้อความ",
      sendPackage: "ส่งคำขอแพ็กเกจ",
      name: "ชื่อ",
      email: "อีเมล",
      message: "ข้อความ",
      package: "แพ็กเกจ",
      arrival: "วันมาถึง",
      remarks: "หมายเหตุ",
      personalized: "ทริปส่วนตัว",
      packages: "แพ็กเกจ"
    },
    nl: {
      book: "Boek via LINE",
      roomsBtn: "Bekijk de kamers",
      welcome: "Welkom",
      homestay: "De homestay",
      rooms: "Kamers",
      cooking: "Koken met Son",
      trips: "Uitjes",
      around: "Rond Chiang Rai",
      guests: "Van onze gasten",
      find: "Vind ons",
      call: "Bellen",
      line: "LINE",
      map: "Kaart",
      morning: "Ochtend",
      evening: "Avond",
      menu: "Menu",
      close: "Sluiten",
      prev: "Vorige",
      next: "Volgende",
      send: "Verstuur bericht",
      sendPackage: "Verstuur pakketverzoek",
      name: "Naam",
      email: "E-mail",
      message: "Bericht",
      package: "Pakket",
      arrival: "Aankomstdatum",
      remarks: "Opmerkingen",
      personalized: "Trip op maat",
      packages: "Pakketten"
    }
  };

  var lang = "en";
  var light = "morning";
  try {
    lang = localStorage.getItem("bljh-lang") || "en";
    light = localStorage.getItem("bljh-light") || "morning";
  } catch (e) {}
  if (!dict[lang]) lang = "en";
  if (light !== "evening") light = "morning";

  function applyLang() {
    var table = dict[lang];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!table[key]) return;
      el.textContent = table[key];
      el.lang = lang;
    });
    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
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
    shot.src = img.currentSrc || img.src;
    shot.alt = img.alt;
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

  if (window.ScrollCraft) ScrollCraft.mount(document.body);
})();
