const DEFAULT_PROMPTS = [
  {
    id: "default-1",
    text: "Cinematic portrait, soft lighting, shallow depth of field, ultra-detailed, 35mm photography, dramatic mood, professional color grading"
  },
  {
    id: "default-2",
    text: "High-quality anime illustration, vibrant colors, dynamic pose, detailed background, studio ghibli inspired style, soft shading"
  },
  {
    id: "default-3",
    text: "Surreal fantasy artwork, dreamlike atmosphere, floating objects, magical lighting, ultra-detailed, concept art style"
  }
];

(() => {
  const STORAGE_KEY = "grok_imagine_prompts";
  const MODE_KEY = "grok_prompt_insert_mode";
  const VIDEO_CTRL_KEY = "grok_video_controls_enabled";

  let prompts = [];
  let selectedId = null;
  let currentZoom = 1;
  let currentWidth = 464; // Valor inicial padrão
  
  const ORIG_WIDTH = 464;
  const ORIG_HEIGHT = 688;

  // ----------------------------
  // Utilities & Settings
  // ----------------------------
  const getMode = () => localStorage.getItem(MODE_KEY) || "replace";
  const setMode = (mode) => localStorage.setItem(MODE_KEY, mode);

  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));

  const load = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      prompts = (Array.isArray(saved) && saved.length > 0) ? saved : [...DEFAULT_PROMPTS];
      if (!saved) save();
    } catch {
      prompts = [...DEFAULT_PROMPTS];
      save();
    }
  };

  const findImagineInput = () => document.querySelector("textarea, input[type='text']");

  // ----------------------------
  // Plus Features (Video, Zoom, Size)
  // ----------------------------
  function applyVideoSettings() {
    // Verificação de segurança para garantir que a API de storage está disponível
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get([VIDEO_CTRL_KEY], (res) => {
        const enabled = !!res[VIDEO_CTRL_KEY];
        document.querySelectorAll('video').forEach(v => {
          const container = v.closest('.group.relative.mx-auto');
          if (enabled) {
            v.setAttribute('controls', 'true');
            v.style.pointerEvents = 'auto';
            if (container) {
              container.querySelectorAll('div.absolute').forEach(d => {
                if (!d.querySelector('button[aria-label="Mais opções"]')) {
                  d.style.setProperty('display', 'none', 'important');
                }
              });
            }
          } else {
            v.removeAttribute('controls');
            if (container) container.querySelectorAll('div.absolute').forEach(d => d.style.display = '');
          }
        });
      });
    }
  }

  function applyZoom(val) {
    currentZoom = Math.max(0.5, Math.min(5, val));
    const media = document.querySelector('video[style*="visible"], img.object-cover:not(.invisible)');
    if (media) {
      media.style.transform = `scale(${currentZoom})`;
      media.style.transition = "transform 0.1s ease";
    }
  }

  function updateSize(widthPx) {
    currentWidth = parseInt(widthPx);
    const container = document.querySelector('div.group.relative.mx-auto.rounded-2xl.overflow-hidden');
    const display = document.querySelector('#size-display');
    
    if (display) display.textContent = `${currentWidth}px`;
    
    if (container) {
      const ratio = ORIG_HEIGHT / ORIG_WIDTH;
      container.style.width = `${currentWidth}px`;
      container.style.height = `${Math.round(currentWidth * ratio)}px`;
    }
  }

  function resetToDefault() {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ [VIDEO_CTRL_KEY]: false }, applyVideoSettings);
    }
    applyZoom(1);
    updateSize(ORIG_WIDTH);
    console.log("Resetado para o padrão.");
  }

  // ----------------------------
  // UI Creation
  // ----------------------------
  function createManager() {
    const hr = document.querySelector("#imagine-post-page-content");
    if (!hr || document.querySelector("#grok-prompt-manager")) return;

    const root = document.createElement("div");
    root.id = "grok-prompt-manager";

    const toolbar = document.createElement("div");
    toolbar.className = "prompt-toolbar";

    // 1. Botão Add com contador
    const addBtn = createBtn(`+ Prompts (${prompts.length})`, openModal);
    addBtn.id = "main-add-btn";

    // 2. Botão Mode (Voltou)
    const modeBtn = createBtn("", () => {
      const next = getMode() === "append" ? "replace" : "append";
      setMode(next);
      modeBtn.textContent = "⇄ " + next.charAt(0).toUpperCase() + next.slice(1);
    });
    modeBtn.textContent = "⇄ " + getMode().charAt(0).toUpperCase() + getMode().slice(1);

    // 3. Botão Video
    const videoBtn = createBtn("🎬 Controls", () => {
      chrome.storage.local.get([VIDEO_CTRL_KEY], (res) => {
        chrome.storage.local.set({ [VIDEO_CTRL_KEY]: !res[VIDEO_CTRL_KEY] }, applyVideoSettings);
      });
    });

    // 4. Controle de Tamanho (Botões + e -)
    const sizeControl = document.createElement("div");
    sizeControl.className = "size-stepper";
    sizeControl.style.display = "flex";
    sizeControl.style.alignItems = "center";
    sizeControl.style.gap = "4px";
    sizeControl.style.background = "#333";
    sizeControl.style.padding = "2px 6px";
    sizeControl.style.borderRadius = "5px";
    
    const btnMinus = createBtn("➖", () => updateSize(currentWidth - 20));
    const sizeDisplay = document.createElement("span");
    sizeDisplay.id = "size-display";
    sizeDisplay.style.fontSize = "11px";
    sizeDisplay.style.minWidth = "35px";
    sizeDisplay.style.textAlign = "center";
    sizeDisplay.textContent = `${currentWidth}px`;
    const btnPlus = createBtn("➕", () => updateSize(currentWidth + 20));
    
    sizeControl.append(btnMinus, sizeDisplay, btnPlus);

    // 5. Botões Zoom
    const zoomInBtn = createBtn("🔍+", () => applyZoom(currentZoom + 0.1));
    const zoomOutBtn = createBtn("🔍-", () => applyZoom(currentZoom - 0.1));

    // 6. Botão Reset (Default)
    const resetBtn = createBtn("🔄", resetToDefault);

    // 7. Utilitários (Clean, Export, Import)
    const cleanBtn = createBtn("🧹 Clean", () => {
      const input = findImagineInput();
      if (input) {
        input.value = "";
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    const expBtn = createBtn("↑ 📤", exportJSON);
    const impBtn = createBtn("↓ 📥", importJSON);

    // Montagem da Toolbar
    toolbar.append(addBtn, modeBtn, videoBtn, sizeControl, zoomOutBtn, zoomInBtn, resetBtn, cleanBtn, expBtn, impBtn);

    const list = document.createElement("div");
    list.className = "prompt-list";

    root.append(toolbar, list);
    hr.insertAdjacentElement("afterend", root);

    render(list);
    applyVideoSettings();
  }

  function createBtn(text, onclick) {
    const b = document.createElement("button");
    b.textContent = text;
    b.onclick = onclick;
    return b;
  }

  // ----------------------------
  // Modals, Render, Data
  // ----------------------------
  function openModal() {
    createModal("Add Prompt", "", (value) => {
      prompts.push({ id: Math.random().toString(36).slice(2), text: value });
      save();
      updatePromptCount();
      render(document.querySelector(".prompt-list"));
    });
  }

  function updatePromptCount() {
    const btn = document.querySelector("#main-add-btn");
    if (btn) btn.textContent = `+ Prompts (${prompts.length})`;
  }

  function render(list) {
    list.innerHTML = "";
    prompts.forEach((p) => {
      const item = document.createElement("div");
      item.className = "prompt-item";
      item.innerHTML = `<span class="prompt-text">${p.text.slice(0, 15)}...</span>`;
      
      const del = document.createElement("span");
      del.className = "prompt-delete";
      del.textContent = "❌";
      del.onclick = (e) => {
        e.stopPropagation();
        if (confirm("Delete?")) {
          prompts = prompts.filter(x => x.id !== p.id);
          save();
          updatePromptCount();
          render(list);
        }
      };
      item.onclick = () => {
        const input = findImagineInput();
        if (input) {
          const mode = getMode();
          input.value = mode === "replace" ? p.text : (input.value ? input.value + "\n" + p.text : p.text);
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      };
      item.appendChild(del);
      list.appendChild(item);
    });
  }

  function createModal(title, initialValue, onSave) {
    const backdrop = document.createElement("div");
    backdrop.className = "grok-modal-backdrop";
    backdrop.innerHTML = `
      <div class="grok-modal">
        <h3>${title}</h3>
        <textarea style="width:100%; height:100px; background:#222; color:white; border:1px solid #444">${initialValue}</textarea>
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
      if (val) onSave(val);
      backdrop.remove();
    };
  }

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
      file.text().then(text => {
        try {
          prompts = JSON.parse(text);
          save();
          updatePromptCount();
          render(document.querySelector(".prompt-list"));
        } catch { alert("Invalid JSON"); }
      });
    };
    input.click();
  }

  // ----------------------------
  // Init
  // ----------------------------
  load();
  setInterval(() => { if (location.href.includes("/imagine")) createManager(); }, 1000);
  const observer = new MutationObserver(() => { 
    createManager(); 
    applyVideoSettings(); 
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();