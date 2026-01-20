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
"ROUPA": [
  { id: "👠", text: "Provocative luxury lace lingerie, 16-inch high heels, intricate patterns, sheer textures, boudoir atmosphere." },
  { id: "👗", text: "Elegant form-fitting dress, high side slit revealing legs, plunging neckline, silk texture." },
  { id: "🌊", text: "Stunning beach aesthetic, elegant bikini, sun-kissed oiled skin, wet hair look." },
  { id: "🏊‍♀️", text: "Athletic one-piece swimsuit clinging wetly to curves, emerging from turquoise water." },
  { id: "🏃‍♀️", text: "Sporty aesthetic, tiny running shorts and cropped top, sweat-glistened skin, dynamic energy." },
  { id: "🌸", text: "Sheer flowing sarong, translucent fabric catching the wind, draped loosely over curves." }
  ],
  "ROUPA_INTIMA": [
  { id: "👙", text: "Luxurious lace lingerie set, intricate floral patterns, sheer textures, garter belt details." },
  { id: "🎀", text: "Satin bodysuit with ribbons, plunging back, soft bedroom lighting, boudoir style." },
  { id: "👠", text: "Complete boudoir look, sheer thigh-high stockings with lace tops, elegant high heels." },
  { id: "🥀", text: "Dark silk robe partially open, revealing delicate lace underneath, intimate atmosphere." }
  ],
  "COSPLAY": [
  { id: "🦸‍♀️", text: "Female superhero, powerful pose, form-fitting spandex suit, flowing cape, city skyline." },
  { id: "🧚‍♀️", text: "Enchanting fairy, iridescent wings, ethereal sheer dress of leaves and flowers, magical glade." },
  { id: "🧛‍♀️", text: "Gothic vampire queen, lace corset, deep crimson lips, mysterious castle, moody red lighting." },
  { id: "🖤", text: "Dominant aesthetic, glossy black latex catsuit, red neon accents, cyber-gothic atmosphere." },
  { id: "🔗", text: "Artistic Shibari, delicate red silk ropes wrapped around curves, serene and vulnerable expression." },
  { id: "🥷", text: "Seductive kunoichi (ninja) cosplay, form-fitting dark mesh armor, masked face with intense eyes, moonlight rooftop." },
  { id: "⚔️", text: "Warrior Princess, ornate golden chestplate over sheer silk, holding a glowing sword, dramatic battlefield sunset." },
  { id: "🛰️", text: "Galactic Pilot, unzipped futuristic flight suit, holographic interfaces reflecting on skin, starship cockpit." },
  { id: "🐾", text: "Wild feline-inspired huntress, faux-fur accents, tribal markings, prowling pose in a jungle setting." },
  { id: "🏛️", text: "Greek Goddess cosplay, translucent white chiton, gold leaf crown, leaning against marble pillars at twilight." }
  ],
  "AESTHETICS": [
  { id: "🏙", text: "Cyberpunk city street, neon lights, rainy night, realistic" },
  { id: "😃", text: "Studio Ghibli style landscape, lush greenery, fluffy clouds" },
  { id: "🌌", text: "Epic hard sci-fi, advanced futuristic technology, starships, 8K cinematic quality." },
  { id: "🌃", text: "Ultra-detailed cyberpunk, neon-drenched rainy night, gritty dystopian atmosphere, 8K." },
  { id: "🗡️", text: "High fantasy epic style, ancient castles, dragons, magical runes, cinematic atmosphere." },
  { id: "🌀", text: "Surrealism art style, dream-like scene, melting clocks, Salvador Dalí influence, hypnotic mood." }
  ],
  "FITNESS": [
  { id: "🏋️‍♀️", text: "Athletic woman in gym pose, sports bra and high-cut shorts, defined muscles, sweat-glistened skin." },
  { id: "🏃‍♀️", text: "Runner mid-sprint at golden hour, toned legs, wind-swept hair, dynamic motion blur." },
  { id: "🤸‍♀️", text: "Gymnast in split leap pose, elegant bodysuit, soft studio lighting, focused expression." },
  { id: "💪", text: "Female bodybuilder flexing, oiled skin under stage lights, powerful sensual strength, 8K." },
  { id: "🧗‍♀️", text: "Rock climber on boulder wall, body stretched taut, back muscles defined, sunset cliff setting." },
  { id: "🏊‍♀️", text: "Swimmer emerging from pool, water droplets on toned body, athletic swimsuit, blue water glow." },
  ],
  "LUGAR": [
  { id: "🛁", text: "Luxurious clawfoot bathtub, thick white foam bubbles, steam rising, warm candlelight." },
  { id: "🛏️", text: "Luxurious bedroom, silk sheets, soft morning light through sheer curtains, intimate mood." },
  { id: "🌿", text: "Enchanted tropical forest at dawn, soft mist, golden rays piercing through leaves." },
  { id: "🕯️", text: "Dimly lit room, multiple candles, dramatic shadows (chiaroscuro), velvet textures." },
  { id: "🌃", text: "Modern balcony overlooking a neon-drenched city at night, rainy atmosphere, blue glow." }
  ],
  "YOGA_TANTRA": [
  { id: "🕉️", text: "Sacred tantric connection, seated embrace, soul-gazing, golden energy aura, peaceful mood." },
  { id: "🧘‍♀️", text: "Graceful yoga flow, Cat-Cow pose, arched back, golden hour sunlight, serene studio." },
  { id: "🐍", text: "Cobra Pose (Bhujangasana), chest lifted, back arched gracefully, peaceful yet charged atmosphere." },
  { id: "🕊️", text: "Pigeon Pose, deep hip-opening stretch, elegant torso, morning light, calm expression." },
  { id: "🧘", text: "Sensual lotus meditation, bare torso with oil sheen, candlelight, inner bliss." },
  { id: "💫", text: "Divine tantric harmony, bodies aligned in rhythm of breath, cosmic chakra glow, visionary art." }
  ],
  "ROMANCE": [
  { id: "💋", text: "Intimate close-up of a passionate kiss, soft lips pressed together, warm flushed cheeks." },
  { id: "👩‍❤️‍💋‍👨", text: "Man and woman in close embrace, deep sensual kiss, candlelight, intimate loving connection." },
  { id: "👩‍❤️‍👩", text: "Passionate lesbian couple, deep kiss, soft candlelight, intense longing and bliss." },
  { id: "🫂", text: "Mixed couple embrace, skin-to-skin contact, sunset glow, profound love and desire." },
  { id: "💞", text: "Two women in affectionate embrace, looking into eyes with desire, photorealistic emotional intimacy." }
  ]
};

const FIXED_PROMPTS_KEY = "grok_fixed_prompts_enabled";
let enabledCategories = ["FIXED", "CONTROLS", "POSICAO", "SENSUAL"]; // Padrão

(() => {
  const STORAGE_KEY = "grok_imagine_prompts";
  const MODE_KEY = "grok_prompt_insert_mode";
  const VIDEO_CTRL_KEY = "grok_video_controls_enabled";
  const FIXED_PROMPTS_KEY = "grok_fixed_prompts_enabled";

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
    
enabledCategories.forEach(catName => {
  const items = FIXED_PROMPTS[catName];
  if (items) {
    items.forEach(p => {
      const btn = createBtn(p.id, () => insertTextToInput(p.text), p.text);
      btn.style.fontSize = "16px";
      btn.style.padding = "2px 4px";
      
      // Adiciona o atributo de categoria para o CSS encontrar
      btn.setAttribute("data-cat", catName); 
      
      fixedBar.appendChild(btn);
    });
  }
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

function openModalFix() {
  const modal = document.createElement("div");
  // Estilo garantindo que apareça sobre tudo
  modal.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:99999;font-family:sans-serif;";
  
  // Cria os checkboxes baseados nas SUAS chaves (FIXED, CONTROLS, POSICAO, etc)
  const optionsHtml = Object.keys(FIXED_PROMPTS).map(cat => `
    <div style="margin: 10px 0; display: flex; align-items: center; gap: 10px; color: white;">
      <input type="checkbox" id="cat-${cat}" ${enabledCategories.includes(cat) ? 'checked' : ''} value="${cat}" style="width:18px; height:18px; cursor:pointer;">
      <label for="cat-${cat}" style="cursor:pointer; font-size:14px; user-select:none;">${cat}</label>
    </div>
  `).join('');

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
      item.innerHTML = `<span class="prompt-text" title="${p.text}">${p.text.length > 20 ? p.text.slice(0, 20) + "..." : p.text}</span>`;
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