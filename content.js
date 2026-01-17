/**
 * Grok Imagine Plus 
 * Extensão para melhorar a experiência no Grok Imagine
 * Autor: Diaslasd
 * Inspirado em: Grok Imagine Prompt Manager
 * Desenvolvido em colaboração com Gemini AI (Google)
 */

const DEFAULT_PROMPTS = [
  { id: "d1", text: "Cinematic portrait, soft lighting, 8k, highly detailed" },
  {
    id: "d2",
    text: "Cyberpunk city street, neon lights, rainy night, realistic",
  },
  {
    id: "d3",
    text: "Studio Ghibli style landscape, lush greenery, fluffy clouds",
  },
];

(() => {
  const STORAGE_KEY = "grok_imagine_prompts";
  const MODE_KEY = "grok_prompt_insert_mode";
  const VIDEO_CTRL_KEY = "grok_video_controls_enabled";

  let prompts = [];
  let currentZoom = 1;

  let currentWidth = 1; // Valor inicial padrão

  let ORIG_WIDTH = 1;
  let ORIG_HEIGHT = 1;

  let ultimaUrl = location.href;


  // ----------------------------
  // Configurações e Persistência
  // ----------------------------
  const getMode = () => localStorage.getItem(MODE_KEY) || "replace";
  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));

  const load = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      prompts =
        Array.isArray(saved) && saved.length > 0 ? saved : [...DEFAULT_PROMPTS];
      if (!saved) save();
    } catch {
      prompts = [...DEFAULT_PROMPTS];
      save();
    }
  };

  const findImagineInput = () =>
    document.querySelector("textarea, input[type='text']");

  // ----------------------------
  // Funções Plus (Video, Zoom, Size, Fullscreen)
  // ----------------------------
  function applyVideoSettings() {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.get([VIDEO_CTRL_KEY], (res) => {
        const enabled = !!res[VIDEO_CTRL_KEY];
        document.querySelectorAll("video").forEach((v) => {
          const container = v.closest(".group.relative.mx-auto");
          if (enabled) {
            v.setAttribute("controls", "true");
            v.style.pointerEvents = "auto";
            if (container) {
              container.querySelectorAll("div.absolute").forEach((d) => {
                if (!d.querySelector('button[aria-label="Mais opções"]')) {
                  d.style.setProperty("display", "none", "important");
                }
              });
            }
          } else {
            v.removeAttribute("controls");
            if (container)
              container
                .querySelectorAll("div.absolute")
                .forEach((d) => (d.style.display = ""));
          }
        });
      });
    }
  }
   
  // Ativa controles em todos os vídeos em Favoreite
  function controlsAllVideos() {
    const urlAtual = window.location.href;    
    
    if (urlAtual === "https://grok.com/imagine/favorites") {
    document.querySelectorAll("video").forEach((v) => {
      v.setAttribute("controls", "true");
      v.style.pointerEvents = "auto";
    });
    }
  }

  function toggleFullScreen() {
    const video = document.querySelector('video[style*="visible"]');
    if (video) {
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
      else if (video.msRequestFullscreen) video.msRequestFullscreen();
    }
  }

  function updateWidth(widthPx) {
    currentWidth = parseInt(widthPx);
    const container = document.querySelector(
      "div.group.relative.mx-auto.rounded-2xl.overflow-hidden",
    );
    const display = document.querySelector("#w-display");

    if (ORIG_WIDTH <= 1 && container) {
      ORIG_WIDTH = container.clientWidth;
      ORIG_HEIGHT = container.clientHeight;
      currentWidth = ORIG_WIDTH + 50;
    }

    if (display) display.textContent = `${currentWidth}px`;

    if (container) {
      const ratio = ORIG_HEIGHT / ORIG_WIDTH;
      container.style.width = `${currentWidth}px`;
      container.style.height = `${Math.round(currentWidth * ratio)}px`;
    }
  }

  function applyZoom(val) {
    currentZoom = Math.max(0.5, Math.min(5, val));
    const media = document.querySelector(
      'video[style*="visible"], img.object-cover:not(.invisible)',
    );
    if (media) {
      media.style.transform = `scale(${currentZoom})`;
      media.style.transition = "transform 0.1s ease";
    }
  }

  function resetToDefault() {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.set({ [VIDEO_CTRL_KEY]: false }, applyVideoSettings);
    }
    applyZoom(1);
    if (ORIG_WIDTH > 1) {
      updateWidth(ORIG_WIDTH);
    }
  }

  // ----------------------------
  // Interface (UI)
  // ----------------------------
  function createManager() {
    const hr = document.querySelector("#imagine-post-page-content");
    if (!hr || document.querySelector("#grok-prompt-manager")) return;

    const root = document.createElement("div");
    root.id = "grok-prompt-manager";
    const toolbar = document.createElement("div");
    toolbar.className = "prompt-toolbar";

    // --- NOVO: Botão para Colapsar/Expandir ---
    const toggleBtn = createBtn(
      "▼",
      () => {
        const list = document.querySelector(".prompt-list");
        if (list) {
          const isCollapsed = list.classList.toggle("collapsed");
          toggleBtn.textContent = isCollapsed ? "▼" : "▲";
        }
      },
      "Expand/Collapse Prompts",
    );
    toggleBtn.className = "toggle-list-btn";

    // Botões Principais
    const addBtn = createBtn(
      `+ Prompts (${prompts.length})`,
      openModal,
      "Add Prompt",
    );
    addBtn.id = "main-add-btn";

    const modeBtn = createBtn(
      `⇄ ${getMode()}`,
      () => {
        const next = getMode() === "Append" ? "Replace" : "Append";
        localStorage.setItem(MODE_KEY, next);
        modeBtn.textContent = `⇄ ${next}`;
      },
      "Toggle Insert Mode",
    );

    const videoBtn = createBtn(
      "🎬 Controls",
      () => {
        chrome.storage.local.get([VIDEO_CTRL_KEY], (res) => {
          chrome.storage.local.set(
            { [VIDEO_CTRL_KEY]: !res[VIDEO_CTRL_KEY] },
            applyVideoSettings,
          );
        });
      },
      "Toggle Video Controls",
    );

    const fsBtn = createBtn("◻", toggleFullScreen, "Fullscreen");
    fsBtn.title = "Tela Cheia";

    // Stepper de Largura (W)
    const wControl = createStepper(
      "w-display",
      `W:${currentWidth}px`,
      () => updateWidth(currentWidth - 50),
      () => updateWidth(currentWidth + 50),
    );

    const zoomOutBtn = createBtn(
      "🔍-",
      () => applyZoom(currentZoom - 0.1),
      "Diminuir Zoom",
    );
    const zoomInBtn = createBtn(
      "🔍+",
      () => applyZoom(currentZoom + 0.1),
      "Aumentar Zoom",
    );
    const resetBtn = createBtn("🔄", resetToDefault, "Reset");
    const cleanBtn = createBtn(
      "🧹",
      () => {
        const input = findImagineInput();
        if (input) {
          input.value = "";
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      },
      "Limpar Input",
    );

    const expBtn = createBtn("📤", exportJSON, "Export Prompts");
    const impBtn = createBtn("📥", importJSON, "Import Prompts");

    toolbar.append(
      addBtn,
      modeBtn,
      videoBtn,
      fsBtn,
      wControl,
      zoomOutBtn,
      zoomInBtn,
      resetBtn,
      cleanBtn,
      expBtn,
      impBtn,
      toggleBtn,
    );

    const list = document.createElement("div");
    list.className = "prompt-list collapsed";
    root.append(toolbar, list);
    hr.insertAdjacentElement("afterend", root);
    render(list);
    //applyVideoSettings();
  }

  function createBtn(text, onclick, title = "") {
    const b = document.createElement("button");
    b.textContent = text;
    b.onclick = onclick;
    b.title = title;
    return b;
  }

  function createStepper(id, initial, onMinus, onPlus) {
    const div = document.createElement("div");
    div.style.cssText =
      "display:flex; align-items:center; gap:2px; background:#333; padding:2px 4px; border-radius:5px;";
    const minus = createBtn("➖", onMinus, "To decrease");
    const display = document.createElement("span");
    display.id = id;
    display.style.cssText =
      "font-size:10px; min-width:42px; text-align:center; color:white;";
    display.textContent = initial;
    const plus = createBtn("➕", onPlus, "Increase");
    div.append(minus, display, plus);
    return div;
  }

  // ----------------------------
  // Render e Modais
  // ----------------------------
  function updatePromptCount() {
    const btn = document.querySelector("#main-add-btn");
    if (btn) btn.textContent = `+ Prompts (${prompts.length})`;
  }

  function render(list) {
    list.innerHTML = "";
    prompts.forEach((p) => {
      const item = document.createElement("div");
      item.className = "prompt-item";
      item.title = p.text;
      item.innerHTML = `<span class="prompt-text">${p.text.slice(0, 15)}...</span>`;
      const del = document.createElement("span");
      del.className = "prompt-delete";
      del.textContent = "❌";
      del.onclick = (e) => {
        e.stopPropagation();
        if (confirm("Delete?")) {
          prompts = prompts.filter((x) => x.id !== p.id);
          save();
          updatePromptCount();
          render(list);
        }
      };
      item.onclick = () => {
        const input = findImagineInput();
        if (input) {
          const mode = getMode();
          input.value =
            mode === "replace"
              ? p.text
              : input.value
                ? input.value + "\n" + p.text
                : p.text;
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      };
      item.appendChild(del);
      list.appendChild(item);
    });
  }

  function openModal() {
    const backdrop = document.createElement("div");
    backdrop.className = "grok-modal-backdrop";
    backdrop.innerHTML = `
      <div class="grok-modal">
        <h3>Add Prompt</h3>
        <textarea style="width:100%; height:100px; background:#222; color:white; border:1px solid #444"></textarea>
        <div style="display:flex; justify-content:flex-end; gap:5px; margin-top:10px">
          <button id="close-modal">Cancel</button>
          <button id="save-modal" style="background:#4da3ff; color:white">Save</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
    backdrop.querySelector("#close-modal").onclick = () => backdrop.remove();
    backdrop.querySelector("#save-modal").onclick = () => {
      const val = backdrop.querySelector("textarea").value.trim();
      if (val) {
        prompts.push({ id: Math.random().toString(36).slice(2), text: val });
        save();
        updatePromptCount();
        render(document.querySelector(".prompt-list"));
      }
      backdrop.remove();
    };
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(prompts, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "grok-prompts.json";
    a.click();
  }

  function importJSON() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;
      file.text().then((text) => {
        try {
          prompts = JSON.parse(text);
          save();
          updatePromptCount();
          render(document.querySelector(".prompt-list"));
        } catch {
          alert("Invalid JSON");
        }
      });
    };
    input.click();
  }

  load();
  setInterval(() => {
    if (location.href.includes("/imagine/post")) {
    createManager();
    container = document.querySelector("div.group.relative.mx-auto.rounded-2xl.overflow-hidden",);    
    const display = document.querySelector("#w-display");
    if (ORIG_WIDTH <= 1 && container) {
      ORIG_WIDTH = container.clientWidth;
      ORIG_HEIGHT = container.clientHeight;
      currentWidth = ORIG_WIDTH;
      if (display) display.textContent = `${currentWidth}px`;  
    }
  }    
  }, 2000);
  const observer = new MutationObserver(() => {
    controlsAllVideos();
    if (location.href !== ultimaUrl) ORIG_WIDTH = 1; 
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
