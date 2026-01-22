/**
 * Grok Imagine Plus 1.8.1
 * Extensão para melhorar a experiência no Grok Imagine
 */

const DEFAULT_PROMPTS = [
  { id: "d1", text: "Cinematic portrait, soft lighting, 8k, highly detailed" },
  { id: "d2", text: "Cyberpunk city street, neon lights, rainy night, realistic" },
  { id: "d3", text: "Studio Ghibli style landscape, lush greenery, fluffy clouds" },
];

const FIXED_PROMPTS = {
  "FIXED": [
  { id: "⚡", text:  "[Ultra Mode]" },
  { id: "🌸", text: "[Anime Mode]" },
  { id: "🎉", text: "[Fun Mode]" },
  { id: "🔥", text: "[Spicy Mode]" },
  { id: "⛓", text:  "[BDSM Mode]" },
  { id: "🔞", text: "[NSFW Mode]" },
  { id: "©", text:  "Remove all watermarks, signatures, Copyright, and texts." },
  { id: "👥", text: "Remove other people." },
  { id: "🖼️", text: "Remove background." },
  ],
  "CONTROLS": [
  { id: "🔙", text: "Rear view." },
  { id: "🔜", text: "Front view." },
  { id: "👀", text: "Looking at Viewer." },
  { id: "🔍+", text:"Zoom in." },
  { id: "🔍-", text:"Zoom out." },
  { id: "⏱️", text: "Slow Motion." },
  { id: "🎦", text: "Cinematic portrait, soft lighting, 8k, highly detailed" },
  { id: "📸", text: "Extreme photorealistic capture, ARRI Alexa 65 style, 35mm film grain, natural skin with pores, 8K ultra-high resolution, pure optical realism." },
  { id: "🥰", text: "Super kawaii chibi anime style, cute 2D cartoon, big sparkling eyes, vibrant cel-shading, soft pastel palette." },
  ],
  "POSICAO": [
  { id: "🧎‍♀️", text: "Graceful pose on all fours, elegant arched back, looking back over shoulder." },
  { id: "🔙", text: "Bent over, graceful back arch, arms reaching forward, emphasizing silhouette." },
  { id: "🌙", text: "Side profile reclining, exaggerated S-curve from waist to hips, soft lighting." },
  { id: "🤸‍♀️", text: "Graceful gymnast in split leap pose, arched back, focused expression of bliss." },
  { id: "🐍", text: "Cobra Pose, chest lifted sensually, back arched, head tilted back in ecstasy." }
  ],
  "SENSUAL": [
  { id: "🔥", text: "Enhances sensual lighting and feminine curves." },
  { id: "🍑", text: "Aesthetic focus on curves, firm and lifted silhouette, subtle skin sheen." },
    { id: "⌛", text:  "Hourglass silhouette from side view, emphasizing waist and hip lines." },
  { id: "🌙", text: "Side profile lying down, exaggerated S-curve of waist to hips, moonlit glow." },
  { id: "👄", text: "Sensual expression, biting lower lip, focused on collarbones and cleavage." },
  { id: "🛁", text: "Sensual woman in a bathtub overflowing with foam, steam rising, wet hair, soft candlelight." },
  { id: "💦", text: "Hyper-detailed wet skin glistening with water droplets, post-shower glow, fresh and vibrant." },
  { id: "🌊", text: "Golden hour beach scene, elegant bikini, sun-kissed oiled skin, waves lapping at feet." },
  { id: "🕯️", text: "Reclining on velvet sheets, chiaroscuro lighting, dramatic shadows, artistic oil painting vibe." },
  { id: "🌹", text: "Lying amid red rose petals, soft morning light, romantic and passionate mood." },
  { id: "😈", text: "Intense seductive expression, arched back, dramatic rim lighting, raw cinematic energy." }
  ],
};

async function carregarEIncorporarPrompts() {
  try {
    // Busca o caminho interno da extensão
    const urlArquivo = chrome.runtime.getURL('extra_prompts.json');
    const resposta = await fetch(urlArquivo);
    
    if (!resposta.ok) throw new Error("Falha ao carregar arquivo");

    const EXTRA_PROMPTS = await resposta.json();

    // Incorpora ao seu objeto fixo
    Object.assign(FIXED_PROMPTS, EXTRA_PROMPTS);

    console.log("Prompts carregados com sucesso!", FIXED_PROMPTS);
    
  } catch (erro) {
    console.error("Erro ao carregar o JSON:", erro);
  }
}

// Executa a função
carregarEIncorporarPrompts();

// Incluir todos os EXTRA_PROMPTS em FIXED_PROMPTS
// Object.assign(FIXED_PROMPTS, EXTRA_PROMPTS);

const FIXED_PROMPTS_KEY = "grok_fixed_prompts_enabled";
let enabledCategories = ["FIXED", "CONTROLS", "POSICAO", "SENSUAL"]; // Padrão

(() => {
  const STORAGE_KEY = "grok_imagine_prompts";
  const MODE_KEY = "grok_prompt_insert_mode";
  const VIDEO_CTRL_KEY = "grok_video_controls_enabled";
  const FIXED_PROMPTS_KEY = "grok_fixed_prompts_enabled";
  const COLLAPSED_KEY = "grok_prompts_collapsed";

  let prompts = [];
  let currentZoom = 1;
  let currentWidth = 1;
  let ORIG_WIDTH = 1;
  let ORIG_HEIGHT = 1;
  let ultimaUrl = location.href;

  const getMode = () => localStorage.getItem(MODE_KEY) || "replace";
  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));

  const getCollapsed = () => localStorage.getItem(COLLAPSED_KEY) === "true";
  const setCollapsed = (isCollapsed) => localStorage.setItem(COLLAPSED_KEY, isCollapsed);

  const load = async () => {
  try {
    // Carrega o JSON extra primeiro
    await carregarEIncorporarPrompts();

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    prompts = Array.isArray(saved) && saved.length > 0 ? saved : [...DEFAULT_PROMPTS];
    
    // Carrega as categorias que o usuário escolheu manter visíveis
    const savedEnabled = JSON.parse(localStorage.getItem(FIXED_PROMPTS_KEY));
    if (savedEnabled) {
        enabledCategories = savedEnabled;
    }

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
      input.value = mode === "Replace" ? text : (input.value ? input.value + "\n" + text : text);
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
    // 1. Tenta localizar o novo container alvo (h-fit w-full pb-5)
    // Usamos um seletor que combine as classes para precisão
    const targetContainer = document.querySelector('div.h-fit.w-full.pb-5');
  
    // Caso não ache o container novo, mantemos o fallback para o original ou paramos
    if (!targetContainer || document.querySelector("#grok-prompt-manager")) return;

    // const hr = document.querySelector("#imagine-post-page-content");
    // if (!hr || document.querySelector("#grok-prompt-manager")) return;

    const root = document.createElement("div");
    root.id = "grok-prompt-manager";

    const toolbar = document.createElement("div");
    toolbar.className = "prompt-toolbar";

    // --- LÓGICA DE COLLAPSE ATUALIZADA ---
    const currentlyCollapsed = getCollapsed(); // Lê o estado salvo

    const toggleBtn = createBtn(currentlyCollapsed ? "▼" : "▲", () => {
      const list = document.querySelector(".prompt-list");
      if (list) {
        const isNowCollapsed = list.classList.toggle("collapsed");
        toggleBtn.textContent = isNowCollapsed ? "▼" : "▲";
        setCollapsed(isNowCollapsed); // Guarda o novo estado
      }
    });
    toggleBtn.className = "toggle-list-btn";

    // FIXED_PROMPTS
    const fixBtn = createBtn(`📌`, () => openModalFix(), "Manage Fixed Prompts");


    const addBtn = createBtn(`+ Prompts (${prompts.length})`, () => openModal(), "Add Prompt");
    addBtn.id = "main-add-btn";

    const expBtn = createBtn("📥", exportJSON, "Export Prompts");
    const impBtn = createBtn("📤", importJSON, "Import Prompts");

    const modeBtn = createBtn(`⇄ ${getMode()}`, () => {
      const next = getMode() === "Append" ? "Replace" : "Append";
      localStorage.setItem(MODE_KEY, next);
      modeBtn.textContent = `⇄ ${next}`;
    }, "Toggle Insert Mode");

    const videoBtn = createBtn("🎬", () => {
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

    toolbar.append(addBtn, modeBtn, fixBtn, videoBtn, fsBtn, wControl, zoomOutBtn, zoomInBtn, resetBtn, cleanBtn, expBtn, impBtn, toggleBtn);

    const fixedBar = document.createElement("div");
    fixedBar.className = "fixed-prompts-bar";
    fixedBar.style.cssText = "display:flex; flex-wrap:wrap; gap:4px; padding:5px; border-bottom:1px solid var(--border); background:rgba(0,0,0,0.05);";
    
// Pegamos todas as chaves para saber o índice de cada categoria
const allCategoryKeys = Object.keys(FIXED_PROMPTS);

enabledCategories.forEach(catName => {
  const items = FIXED_PROMPTS[catName];
  if (items) {
    // Descobrimos o índice (0, 1, 2...) e usamos o resto da divisão por 10 (% 10)
    const catIndex = allCategoryKeys.indexOf(catName) % 10;
    
    items.forEach(p => {
      const btn = createBtn(p.id, () => insertTextToInput(p.text), p.text);
      btn.style.fontSize = "16px";
      btn.style.padding = "2px 4px";
      
      // Agora usamos um atributo de estilo numérico em vez do nome
      btn.setAttribute("data-style-idx", catIndex); 
      
      fixedBar.appendChild(btn);
    });
  }
});

    const list = document.createElement("div");
    // Aplica o estado inicial com base no que foi recuperado do storage
    list.className = `prompt-list ${currentlyCollapsed ? "collapsed" : ""}`;

    root.append(toolbar, fixedBar, list);
    targetContainer.insertAdjacentElement("afterend", root);
    //hr.insertAdjacentElement("afterend", root);
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

function openModalFix() {
  const modal = document.createElement("div");
  // Estilo garantindo que apareça sobre tudo
  modal.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:99999;font-family:sans-serif;";
  
  // Cria os checkboxes baseados nas SUAS chaves KEYs
  const allCategoryKeys = Object.keys(FIXED_PROMPTS);

  const optionsHtml = allCategoryKeys.map((cat, index) => {
    const styleIdx = index % 10;
    return `
      <div style="margin: 6px 0; display: flex; align-items: center; gap: 10px; color: white;">
        <input type="checkbox" id="cat-${cat}" ${enabledCategories.includes(cat) ? 'checked' : ''} value="${cat}" style="width:32px; height:16px; cursor:pointer;">
        <label for="cat-${cat}" data-style-idx="${styleIdx}" style="cursor:pointer; padding: 2px 8px; font-size:14px; user-select:none; border-radius:4px;">${cat}</label>
      </div>
    `;
  }).join('');

  modal.innerHTML = `
    <div style="background: #1e1e1e; padding: 25px; border-radius: 16px; border: 1px solid #333; min-width: 280px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <h3 style="color:white; margin: 0 0 15px 0; font-size:18px;">Categorias Visíveis</h3>
      <div style="max-height: 400px; overflow-y: auto; padding-right: 10px;">
        ${optionsHtml}
      </div>
      <div style="margin-top:20px; display:flex; gap:10px; justify-content: flex-end;">
        <button id="fix-cancel" style="padding:8px 15px; background:transparent; border:none; color:#999; cursor:pointer;">Cancelar</button>
        <button id="fix-save" style="padding:8px 20px; background:#4da3ff; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">Salvar e Recarregar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("fix-save").onclick = () => {
    const selected = Object.keys(FIXED_PROMPTS).filter(cat => document.getElementById(`cat-${cat}`).checked);
    enabledCategories = selected;
    localStorage.setItem(FIXED_PROMPTS_KEY, JSON.stringify(selected));
    location.reload(); // Necessário para reconstruir a barra com os novos filtros
  };

  document.getElementById("fix-cancel").onclick = () => modal.remove();
}



  function render(list) {
    list.innerHTML = "";
    prompts.forEach((p) => {
      const item = document.createElement("div");
      item.className = "prompt-item";
      item.innerHTML = `<span class="prompt-text" title="${p.text}">${p.text.length > 18 ? p.text.slice(0, 18) + "..." : p.text}</span>`;
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
    // Selecionando o elemento pelo atributo aria-label
    const notificationsSection = document.querySelector('section[aria-label="Notifications alt+T"]');

    // Verificando se o elemento existe antes de limpar o conteúdo
    if (notificationsSection) {
      //notificationsSection.innerHTML = '';
    } 
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
