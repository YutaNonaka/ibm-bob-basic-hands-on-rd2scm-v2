(function () {
  "use strict";

  var selectedCategory = "all";
  var query = "";

  var filtersEl = document.getElementById("filters");
  var listEl = document.getElementById("faq-list");
  var countEl = document.getElementById("count");
  var emptyEl = document.getElementById("empty");
  var searchEl = document.getElementById("search");

  // インライン要素（文字列 / {b} / {code}）を親ノードに追加する
  function appendInline(parent, inlines) {
    inlines.forEach(function (part) {
      if (typeof part === "string") {
        parent.appendChild(document.createTextNode(part));
      } else if (part.b !== undefined) {
        var strong = document.createElement("strong");
        strong.textContent = part.b;
        parent.appendChild(strong);
      } else if (part.code !== undefined) {
        var code = document.createElement("code");
        code.textContent = part.code;
        parent.appendChild(code);
      }
    });
  }

  function inlineToText(inlines) {
    return inlines
      .map(function (part) {
        if (typeof part === "string") return part;
        return part.b !== undefined ? part.b : part.code;
      })
      .join("");
  }

  function answerToText(answer) {
    return answer
      .map(function (block) {
        if (block.type === "ul") {
          return block.items.map(inlineToText).join(" ");
        }
        return inlineToText(block.text);
      })
      .join(" ");
  }

  // 検索用の平文を事前計算する
  FAQ_ITEMS.forEach(function (item) {
    item.searchText = (item.question + " " + answerToText(item.answer)).toLowerCase();
  });

  function matches(item) {
    if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
    if (query && item.searchText.indexOf(query) === -1) return false;
    return true;
  }

  function buildAnswer(item) {
    var wrap = document.createElement("div");
    wrap.className = "faq-answer";
    wrap.id = "answer-" + item.id;
    wrap.hidden = true;

    item.answer.forEach(function (block) {
      if (block.type === "ul") {
        var ul = document.createElement("ul");
        block.items.forEach(function (inlines) {
          var li = document.createElement("li");
          appendInline(li, inlines);
          ul.appendChild(li);
        });
        wrap.appendChild(ul);
      } else {
        var p = document.createElement("p");
        appendInline(p, block.text);
        wrap.appendChild(p);
      }
    });
    return wrap;
  }

  function buildItem(item) {
    var div = document.createElement("div");
    div.className = "faq-item";

    var button = document.createElement("button");
    button.type = "button";
    button.className = "faq-question";
    button.id = "question-" + item.id;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "answer-" + item.id);

    var label = document.createElement("span");
    label.textContent = item.question;
    var icon = document.createElement("span");
    icon.className = "faq-icon";
    icon.setAttribute("aria-hidden", "true");
    button.appendChild(label);
    button.appendChild(icon);

    var answer = buildAnswer(item);
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      answer.hidden = expanded;
    });

    div.appendChild(button);
    div.appendChild(answer);
    return div;
  }

  function render() {
    listEl.textContent = "";
    var total = 0;

    FAQ_CATEGORIES.forEach(function (category) {
      var items = FAQ_ITEMS.filter(function (item) {
        return item.category === category.id && matches(item);
      });
      if (items.length === 0) return;

      var section = document.createElement("section");
      var heading = document.createElement("h2");
      heading.className = "category-title";
      heading.textContent = category.label;
      section.appendChild(heading);
      items.forEach(function (item) {
        section.appendChild(buildItem(item));
      });
      listEl.appendChild(section);
      total += items.length;
    });

    countEl.textContent = total + "件の質問";
    emptyEl.hidden = total !== 0;
    listEl.hidden = total === 0;
  }

  function updateFilterButtons() {
    Array.prototype.forEach.call(filtersEl.children, function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.category === selectedCategory));
    });
  }

  function buildFilters() {
    [{ id: "all", label: "すべて" }].concat(FAQ_CATEGORIES).forEach(function (category) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn";
      btn.dataset.category = category.id;
      btn.textContent = category.label;
      btn.addEventListener("click", function () {
        selectedCategory = category.id;
        updateFilterButtons();
        render();
      });
      filtersEl.appendChild(btn);
    });
    updateFilterButtons();
  }

  searchEl.addEventListener("input", function () {
    query = searchEl.value.trim().toLowerCase();
    render();
  });

  buildFilters();
  render();
})();
