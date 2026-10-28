(function () {
  "use strict";

  var listEl = document.getElementById("faq-list");
  var filterEl = document.getElementById("category-filter");
  var searchEl = document.getElementById("search-input");
  var countEl = document.getElementById("result-count");
  var noResultEl = document.getElementById("no-result");
  var errorEl = document.getElementById("load-error");
  var themeToggleBtn = document.getElementById("theme-toggle");

  /* テーマ管理 */
  var THEME_STORAGE_KEY = "bob-theme";

  function getInitialTheme() {
    try {
      var stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        return stored;
      }
    } catch (e) {
      // file:// 等の制限時フォールバック
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function updateThemeToggleUI(theme) {
    if (!themeToggleBtn) return;
    var isDark = theme === "dark";
    themeToggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
    themeToggleBtn.setAttribute("aria-label", isDark ? "ライトテーマに切り替える" : "ダークテーマに切り替える");

    var iconEl = themeToggleBtn.querySelector(".theme-toggle-icon");
    var textEl = themeToggleBtn.querySelector(".theme-toggle-text");
    if (iconEl) iconEl.textContent = isDark ? "☀️" : "🌙";
    if (textEl) textEl.textContent = isDark ? "ライト" : "ダーク";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    updateThemeToggleUI(theme);
  }

  function setTheme(theme) {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      // localStorageアクセス不可時のフォールバック
    }
  }

  var currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(currentTheme);
    });
  }

  if (typeof FAQ_ITEMS === "undefined" || typeof FAQ_CATEGORIES === "undefined") {
    errorEl.hidden = false;
    return;
  }

  var ALL = "all";
  var state = { query: "", category: ALL };
  var openIds = {};

  function normalize(text) {
    return String(text).normalize("NFKC").toLowerCase();
  }

  function inlineToText(parts) {
    return parts
      .map(function (p) {
        if (typeof p === "string") return p;
        return p.b || p.code || "";
      })
      .join("");
  }

  function answerToText(blocks) {
    return blocks
      .map(function (block) {
        if (block.type === "ul") {
          return block.items.map(inlineToText).join(" ");
        }
        return inlineToText(block.content);
      })
      .join(" ");
  }

  // 検索用テキストを事前計算する
  FAQ_ITEMS.forEach(function (item) {
    item.searchText = normalize(item.question + " " + answerToText(item.answer));
  });

  function matches(item) {
    if (state.category !== ALL && item.category !== state.category) return false;
    var words = normalize(state.query).split(/\s+/).filter(Boolean);
    return words.every(function (w) {
      return item.searchText.indexOf(w) !== -1;
    });
  }

  function renderInline(parent, parts) {
    parts.forEach(function (p) {
      if (typeof p === "string") {
        parent.appendChild(document.createTextNode(p));
      } else if (p.b !== undefined) {
        var strong = document.createElement("strong");
        strong.textContent = p.b;
        parent.appendChild(strong);
      } else if (p.code !== undefined) {
        var code = document.createElement("code");
        code.textContent = p.code;
        parent.appendChild(code);
      }
    });
  }

  function renderAnswer(container, blocks) {
    blocks.forEach(function (block) {
      if (block.type === "ul") {
        var ul = document.createElement("ul");
        block.items.forEach(function (parts) {
          var li = document.createElement("li");
          renderInline(li, parts);
          ul.appendChild(li);
        });
        container.appendChild(ul);
      } else {
        var p = document.createElement("p");
        renderInline(p, block.content);
        container.appendChild(p);
      }
    });
  }

  function createItem(item) {
    var wrapper = document.createElement("div");
    wrapper.className = "faq-item";

    var heading = document.createElement("h3");
    heading.className = "faq-question";

    var button = document.createElement("button");
    button.type = "button";
    button.className = "faq-toggle";
    button.id = "q-" + item.id;
    button.setAttribute("aria-controls", "a-" + item.id);
    button.textContent = item.question;

    var answer = document.createElement("div");
    answer.className = "faq-answer";
    answer.id = "a-" + item.id;
    answer.setAttribute("role", "region");
    answer.setAttribute("aria-labelledby", button.id);
    renderAnswer(answer, item.answer);

    function setOpen(open) {
      button.setAttribute("aria-expanded", open ? "true" : "false");
      answer.hidden = !open;
    }

    setOpen(!!openIds[item.id]);

    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") !== "true";
      openIds[item.id] = open;
      setOpen(open);
    });

    heading.appendChild(button);
    wrapper.appendChild(heading);
    wrapper.appendChild(answer);
    return wrapper;
  }

  function renderFilter() {
    while (filterEl.firstChild) filterEl.removeChild(filterEl.firstChild);
    var entries = [{ id: ALL, label: "すべて" }].concat(FAQ_CATEGORIES);
    entries.forEach(function (c) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-btn";
      btn.textContent = c.label;
      btn.setAttribute("aria-pressed", state.category === c.id ? "true" : "false");
      btn.addEventListener("click", function () {
        state.category = c.id;
        renderFilter();
        renderList();
      });
      filterEl.appendChild(btn);
    });
  }

  function renderList() {
    while (listEl.firstChild) listEl.removeChild(listEl.firstChild);
    var total = 0;

    FAQ_CATEGORIES.forEach(function (cat) {
      var items = FAQ_ITEMS.filter(function (item) {
        return item.category === cat.id && matches(item);
      });
      if (items.length === 0) return;
      total += items.length;

      var section = document.createElement("section");
      section.className = "faq-section";
      section.setAttribute("aria-labelledby", "cat-" + cat.id);

      var h2 = document.createElement("h2");
      h2.id = "cat-" + cat.id;
      h2.textContent = cat.label;
      section.appendChild(h2);

      items.forEach(function (item) {
        section.appendChild(createItem(item));
      });
      listEl.appendChild(section);
    });

    countEl.textContent = total + "件のFAQを表示中";
    noResultEl.hidden = total !== 0;
  }

  searchEl.addEventListener("input", function () {
    state.query = searchEl.value;
    renderList();
  });

  renderFilter();
  renderList();
})();
