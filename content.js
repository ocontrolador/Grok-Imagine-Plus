/**
 * Grok Imagine Plus 1.8.1
 * Extensão para melhorar a experiência no Grok Imagine
 */

const DEFAULT_PROMPTS = [
  { id: "d1", text: "Cinematic portrait, soft lighting, 8k, highly detailed" },
  { id: "d2", text: "Cyberpunk city street, neon lights, rainy night, realistic" },
  { id: "d3", text: "Studio Ghibli style landscape, lush greenery, fluffy clouds" },
];

const FIXED_PROMPTS = [
  { id: "⚡", text: "[Ultra Mode]" },
  { id: "🌸", text: "[Anime Mode]" },
  { id: "🎉", text: "[Fun Mode]" },
  { id: "🔥", text: "[Spicy Mode]" },
  { id: "⛓️", text: "[BDSM Mode]" },
  { id: "🔞", text: "[NSFW Mode]" },
  { id: "🧹", text: "Remove all watermarks, signatures, and texts." },
  { id: "👥", text: "Remove other people." },
  { id: "🖼️", text: "Remove background." },
  { id: "🔙", text: "Rear view." },
  { id: "🔜", text: "Front view." },
  { id: "👀", text: "Looking at Viewer." },
  { id: "😈", text: "Hypersexualized character in an explicit pose." },
  { id: "📸", text: "Transform this image into an extreme photorealistic capture of a real person, hyper-detailed live-action movie still, actual real human captured on professional cinema camera like ARRI Alexa 65, authentic 35mm film grain Kodak Vision3 stock, natural human skin with visible pores, subtle imperfections, freckles, fine wrinkles, realistic subsurface scattering, natural sweat and oil sheen, razor-sharp focus on eyes with detailed iris and catchlights, shallow depth of field 85mm prime lens cinematic bokeh, dramatic volumetric lighting motivated by practical sources, raw unfiltered photograph straight out of a Hollywood blockbuster, 8K ultra-high resolution, insane micro-details on hair strands fabrics skin texture, casual imperfect framing slight lens distortion natural exposure, no cartoon no illustration no render no plastic skin no airbrushed no idealized smooth perfection, pure optical realism as if taken with a real lens in the real world." },
  { id: "🥰", text: "Transform this image into super kawaii chibi anime style, cute hand-drawn 2D cartoon illustration, big sparkling expressive anime eyes, huge head tiny body exaggerated proportions, vibrant cel-shading flat colors clean bold lineart, playful whimsical Studio Ghibli mixed with modern cute anime like Spy x Family or K-On, soft pastel palette glowing highlights sparkles, adorable deformed chibi character design, detailed manga-style facial expression energetic pose, no photorealism no realistic skin no pores no 3D render no live-action no human photo texture no cinematic grain, pure 2D animated screencap colorful flat shading ink outlines watercolor accents low detail stylized cute art." }
];

(() => {
  const STORAGE_KEY = "grok_imagine_prompts";
  const MODE_KEY = "grok_prompt_insert_mode";
  const VIDEO_CTRL_KEY = "grok_video_controls_enabled";

  let prompts = [];
  let currentZoom = 1;
  let currentWidth = 1;
  let ORIG_WIDTH = 1;
  let ORIG_HEIGHT = 1;
  let ultimaUrl = location.href;

  const getMode = () => localStorage.getItem(MODE_KEY) || "replace";
  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));

  const load = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      prompts = Array.isArray(saved) && saved.length > 0 ? saved : [...DEFAULT_PROMPTS];
      if (!saved) save();
    } catch {
      prompts = [...DEFAULT_PROMPTS];
      save();
    }
  };

  const findImagineInput = () => document.querySelector("textarea, input[type='text']");

  const insertTextToInput = (text) => {
    const input = findImagineInput();
    if (input) {
      const mode = getMode();
      input.value = mode === "replace" ? text : (input.value ? input.value + "\n" + text : text);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  function exportJSON() {
    const blob = new Blob([JSON.stringify(prompts, null, 2)], { type: "application/json" });
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
          const list = document.querySelector(".prompt-list");
          if (list) render(list);
        } catch { alert("Invalid JSON"); }
      });
    };
    input.click();
  }

  function createManager() {
    const hr = document.querySelector("#imagine-post-page-content");
    if (!hr || document.querySelector("#grok-prompt-manager")) return;

    const root = document.createElement("div");
    root.id = "grok-prompt-manager";

    const toolbar = document.createElement("div");
    toolbar.className = "prompt-toolbar";

    const toggleBtn = createBtn("▼", () => {
      const list = document.querySelector(".prompt-list");
      if (list) {
        const isCollapsed = list.classList.toggle("collapsed");
        toggleBtn.textContent = isCollapsed ? "▼" : "▲";
      }
    }, "Expand/Collapse Prompts");
    toggleBtn.className = "toggle-list-btn";

    const addBtn = createBtn(`+ Prompts (${prompts.length})`, () => openModal(), "Add Prompt");
    addBtn.id = "main-add-btn";

    const expBtn = createBtn("📤", exportJSON, "Export Prompts");
    const impBtn = createBtn("📥", importJSON, "Import Prompts");

    const modeBtn = createBtn(`⇄ ${getMode()}`, () => {
      const next = getMode() === "Append" ? "Replace" : "Append";
      localStorage.setItem(MODE_KEY, next);
      modeBtn.textContent = `⇄ ${next}`;
    }, "Toggle Insert Mode");

    const videoBtn = createBtn("🎬 Controls", () => {
      chrome.storage.local.get([VIDEO_CTRL_KEY], (res) => {
        chrome.storage.local.set({ [VIDEO_CTRL_KEY]: !res[VIDEO_CTRL_KEY] }, applyVideoSettings);
      });
    }, "Toggle Video Controls");

    const fsBtn = createBtn("🖵", toggleFullScreen, "Fullscreen");
    const wControl = createStepper("w-display", `W:${currentWidth}px`, () => updateWidth(currentWidth - 50), () => updateWidth(currentWidth + 50));
    const zoomOutBtn = createBtn("🔍-", () => applyZoom(currentZoom - 0.1), "Diminuir Zoom");
    const zoomInBtn = createBtn("🔍+", () => applyZoom(currentZoom + 0.1), "Aumentar Zoom");
    const resetBtn = createBtn("🔄", resetToDefault, "Reset");
    const cleanBtn = createBtn("🧹", () => {
      const input = findImagineInput();
      if (input) {
        input.value = "";
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }, "Limpar Input");

    toolbar.append(addBtn, expBtn, impBtn, modeBtn, videoBtn, fsBtn, wControl, zoomOutBtn, zoomInBtn, resetBtn, cleanBtn, toggleBtn);

    const fixedBar = document.createElement("div");
    fixedBar.className = "fixed-prompts-bar";
    fixedBar.style.cssText = "display:flex; flex-wrap:wrap; gap:4px; padding:5px; border-bottom:1px solid var(--border); background:rgba(0,0,0,0.05);";
    
    FIXED_PROMPTS.forEach(p => {
      const btn = createBtn(p.id, () => insertTextToInput(p.text), p.text);
      btn.style.fontSize = "16px";
      btn.style.padding = "4px 8px";
      fixedBar.appendChild(btn);
    });

    const list = document.createElement("div");
    list.className = "prompt-list collapsed";

    root.append(toolbar, fixedBar, list);
    hr.insertAdjacentElement("afterend", root);
    render(list);
  }

  function openModal(existingPrompt = null) {
    const isEditing = existingPrompt && typeof existingPrompt.text === 'string';
    const backdrop = document.createElement("div");
    backdrop.className = "grok-modal-backdrop";
    backdrop.innerHTML = `
      <div class="grok-modal">
        <h3>${isEditing ? "Edit Prompt" : "Add Prompt"}</h3>
        <textarea style="width:100%; height:100px; background:#222; color:white; border:1px solid #444; padding:8px; border-radius:8px;">${isEditing ? existingPrompt.text : ""}</textarea>
        <div style="display:flex; justify-content:flex-end; gap:5px; margin-top:10px">
          <button id="close-modal">Cancel</button>
          <button id="save-modal" style="background:#4da3ff; color:white">Save</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
    const textarea = backdrop.querySelector("textarea");
    textarea.focus();

    backdrop.querySelector("#close-modal").onclick = () => backdrop.remove();
    backdrop.querySelector("#save-modal").onclick = () => {
      document.querySelector(".prompt-list").classList.remove("collapsed"); // Expand list on save
      const val = textarea.value.trim();
      if (val) {
        if (isEditing) {
          const index = prompts.findIndex(x => x.id === existingPrompt.id);
          if (index !== -1) prompts[index].text = val;
        } else {
          prompts.push({ id: Math.random().toString(36).slice(2), text: val });
        }
        save();
        updatePromptCount();
        const listElement = document.querySelector(".prompt-list");
        if (listElement) render(listElement);
      }
      backdrop.remove();
    };
  }

  function render(list) {
    list.innerHTML = "";
    prompts.forEach((p) => {
      const item = document.createElement("div");
      item.className = "prompt-item";
      item.innerHTML = `<span class="prompt-text">${p.text.length > 20 ? p.text.slice(0, 20) + "..." : p.text}</span>`;
      const edit = document.createElement("span");
      edit.className = "prompt-edit";
      edit.textContent = "✏️";
      edit.onclick = (e) => { e.stopPropagation(); openModal(p); };
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
      item.onclick = () => insertTextToInput(p.text);
      item.append(edit, del);
      list.appendChild(item);
    });
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
    div.style.cssText = "display:flex; align-items:center; gap:2px; background:#333; padding:2px 4px; border-radius:5px;";
    const minus = createBtn("➖", onMinus, "To decrease");
    const display = document.createElement("span");
    display.id = id;
    display.style.cssText = "font-size:10px; min-width:42px; text-align:center; color:white;";
    display.textContent = initial;
    const plus = createBtn("➕", onPlus, "Increase");
    div.append(minus, display, plus);
    return div;
  }

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
        v.style.objectFit = "contain";
      });
    }
  }

  function toggleFullScreen() {
  const video = document.querySelector('video[style*="visible"]');
  if (video) {
    // Garante que o vídeo se ajuste à tela sem cortes antes de entrar em fullscreen
    video.style.objectFit = "contain";
    
    // Tenta abrir em tela cheia
    const promise = video.requestFullscreen?.() || video.webkitRequestFullscreen?.();
    
    // Opcional: Monitora a saída do fullscreen para restaurar o comportamento padrão da UI
    video.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        video.style.objectFit = ""; // Restaura o CSS original ao sair
      }
    };
  }
}

  function updateWidth(widthPx) {
    currentWidth = parseInt(widthPx);
    const container = document.querySelector("div.group.relative.mx-auto.rounded-2xl.overflow-hidden");
    const display = document.querySelector("#w-display");
    if (ORIG_WIDTH <= 1 && container) {
      ORIG_WIDTH = container.clientWidth;
      ORIG_HEIGHT = container.clientHeight;
    }
    if (display) display.textContent = `${currentWidth}px`;
    if (container) {
      container.style.width = `${currentWidth}px`;
      container.style.height = `${Math.round(currentWidth * (ORIG_HEIGHT / ORIG_WIDTH))}px`;
    }
  }

  function applyZoom(val) {
    currentZoom = Math.max(0.5, Math.min(5, val));
    const media = document.querySelector('video[style*="visible"], img.object-cover:not(.invisible)');
    if (media) media.style.transform = `scale(${currentZoom})`;
  }

  function resetToDefault() {
    applyZoom(1);
    if (ORIG_WIDTH > 1) updateWidth(ORIG_WIDTH);
  }

  function updatePromptCount() {
    const btn = document.querySelector("#main-add-btn");
    if (btn) btn.textContent = `+ Prompts (${prompts.length})`;
  }

  load();
  setInterval(() => {
    if (location.href.includes("/imagine/post")) {
      createManager();
      const container = document.querySelector("div.group.relative.mx-auto.rounded-2xl.overflow-hidden");
      const display = document.querySelector("#w-display");
      if (ORIG_WIDTH <= 1 && container) {
        ORIG_WIDTH = container.clientWidth;
        ORIG_HEIGHT = container.clientHeight;
        currentWidth = ORIG_WIDTH;
        if (display) display.textContent = `${currentWidth}px`;
      }
    } else {
      ORIG_WIDTH = 1;
      controlsAllVideos();  
    }
  }, 2000);
  const observer = new MutationObserver(() => {
    controlsAllVideos();    
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();