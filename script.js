// --- DICCIONARIO DE TRADUCCIONES ---
const translations = {
  es: {
    page_title: "Observatorio de Igualdad Educativa Inclusivo",
    main_title: "Observatorio de Igualdad Educativa Inclusivo",
    instructions_title: "PARA USAR LOS PROMPTS DE ESTE REPOSITORIO, DEBES:",
    step_1: "1) Descargar y rellenar el formulario.",
    step_2: "2) Descargar o copiar el prompt.",
    step_3: "3) Introducir el prompt y el formulario en una IA (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
    step_upload: "Si quieres subir un prompt a la plataforma, usa el botón «Administración» y rellena el formulario.",
    search_placeholder: "Buscar prompts por palabra clave, materia, nivel...",
    btn_admin: "Administración",
    admin_login_title: "Acceso de Administración",
    admin_panel_title: "Panel de Gestión de Prompts",
    modal_close: "Cancelar",
    btn_enter: "Entrar",
    btn_add_prompt: "Guardar Prompt",
    btn_copy: "Copiar Prompt",
    btn_copied: "¡Copiado!",
    footer_text: "PROYECTO OBSERVATORIO DE IGUALDAD EDUCATIVA INCLUSIVO © 2026 — Universitat de València"
  },
  ca: {
    page_title: "Observatori d'Igualtat Educativa Inclusiu",
    main_title: "Observatori d'Igualtat Educativa Inclusiu",
    instructions_title: "PER A UTILITZAR ELS PROMPTS D'AQUEST REPOSITORI, CAL:",
    step_1: "1) Descarregar i emplenar el formulari.",
    step_2: "2) Descarregar o copiar el prompt.",
    step_3: "3) Introduir el prompt i el formulari en una IA (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
    step_upload: "Si vols pujar un prompt a la plataforma, utilitza el botó «Administració» i emplena el formulari.",
    search_placeholder: "Cercar prompts per paraula clau, matèria, nivell...",
    btn_admin: "Administració",
    admin_login_title: "Accés d'Administració",
    admin_panel_title: "Panell de Gestió de Prompts",
    modal_close: "Cancel·lar",
    btn_enter: "Entrar",
    btn_add_prompt: "Guardar Prompt",
    btn_copy: "Copiar Prompt",
    btn_copied: "Copiat!",
    footer_text: "PROJECTE OBSERVATORI D'IGUALTAT EDUCATIVA INCLUSIU © 2026 — Universitat de València"
  },
  "pt-BR": {
    page_title: "Observatório de Igualdade Educativa Inclusivo",
    main_title: "Observatório de Igualdade Educativa Inclusivo",
    instructions_title: "PARA USAR OS PROMPTS DESTE REPOSITÓRIO, VOCÊ DEVE:",
    step_1: "1) Baixar e preencher o formulário.",
    step_2: "2) Baixar ou copiar o prompt.",
    step_3: "3) Inserir o prompt e o formulário em uma IA (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
    step_upload: "Se você quiser enviar um prompt para a plataforma, use o botão «Administração» e preencha o formulário.",
    search_placeholder: "Pesquisar prompts por palavra-chave, matéria, nível...",
    btn_admin: "Administração",
    admin_login_title: "Acesso de Administração",
    admin_panel_title: "Painel de Gestão de Prompts",
    modal_close: "Cancelar",
    btn_enter: "Entrar",
    btn_add_prompt: "Salvar Prompt",
    btn_copy: "Copiar Prompt",
    btn_copied: "Copiado!",
    footer_text: "PROJETO OBSERVATÓRIO DE IGUALDADE EDUCATIVA INCLUSIVO © 2026 — Universitat de València"
  },
  en: {
    page_title: "Inclusive Educational Equality Observatory",
    main_title: "Inclusive Educational Equality Observatory",
    instructions_title: "TO USE THE PROMPTS IN THIS REPOSITORY, YOU MUST:",
    step_1: "1) Download and fill out the form.",
    step_2: "2) Download or copy the prompt.",
    step_3: "3) Input the prompt and the form into an AI tool (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
    step_upload: "If you want to upload a prompt to the platform, use the 'Administration' button and fill out the form.",
    search_placeholder: "Search prompts by keyword, subject, level...",
    btn_admin: "Administration",
    admin_login_title: "Admin Access",
    admin_panel_title: "Prompt Management Panel",
    modal_close: "Cancel",
    btn_enter: "Enter",
    btn_add_prompt: "Save Prompt",
    btn_copy: "Copy Prompt",
    btn_copied: "Copied!",
    footer_text: "INCLUSIVE EDUCATIONAL EQUALITY OBSERVATORY PROJECT © 2026 — Universitat de València"
  }
};

// --- BASE DE DATOS INICIAL DE PROMPTS ---
const defaultPrompts = [
  {
    id: 1,
    title: "Adaptación Curricular Individualizada (NEAE)",
    category: "Adaptaciones",
    body: "Actúa como un orientador educativo experto en DUA (Diseño Universal para el Aprendizaje). Diseña una adaptación para una unidad didáctica de Secundaria dirigida a un estudiante con TDAH, especificando metodologías activas, tiempo estimado y criterios de evaluación accesibles."
  },
  {
    id: 2,
    title: "Rúbrica de Evaluación Inclusiva",
    category: "Evaluación",
    body: "Genera una rúbrica cualitativa en formato tabla para evaluar la competencia colaborativa en un proyecto de Ciencias Sociales de Educación Primaria, incorporando autoevaluación y coevaluación accesibles."
  }
];

let currentLang = 'es';
let promptsData = [];

// --- GESTIÓN DE IDIOMAS ---
function setLanguage(lang) {
  if (!translations[lang]) lang = 'es';
  currentLang = lang;

  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtnId = `btn-${lang.toLowerCase().replace('-br', '')}`;
  const activeBtn = document.getElementById(activeBtnId);
  if (activeBtn) activeBtn.classList.add('active');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  document.documentElement.lang = lang;
  renderPrompts(promptsData);
}

// --- RENDERIZADO DE PROMPTS Y BÚSQUEDA ---
function renderPrompts(data) {
  const container = document.getElementById('prompts-container');
  if (!container) return;

  const searchTerm = (document.getElementById('search-input')?.value || '').toLowerCase();
  
  const filtered = data.filter(p => 
    p.title.toLowerCase().includes(searchTerm) || 
    p.category.toLowerCase().includes(searchTerm) || 
    p.body.toLowerCase().includes(searchTerm)
  );

  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 2rem;">No se encontraron prompts que coincidan con la búsqueda.</p>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="prompt-card">
      <div>
        <span class="prompt-badge">${p.category}</span>
        <h3 class="prompt-title">${p.title}</h3>
        <p class="prompt-body">${p.body}</p>
      </div>
      <button class="btn-copy" onclick="copyToClipboard('${p.body.replace(/'/g, "\\'")}', this)">
        ${translations[currentLang].btn_copy || 'Copiar Prompt'}
      </button>
    </div>
  `).join('');
}

// --- COPIAR AL PORTAPAPELES ---
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btnElement.textContent;
    btnElement.textContent = translations[currentLang].btn_copied || "¡Copiado!";
    btnElement.style.backgroundColor = "#16a34a";
    
    setTimeout(() => {
      btnElement.textContent = originalText;
      btnElement.style.backgroundColor = "";
    }, 2000);
  });
}

// --- PANEL DE ADMINISTRACIÓN ---
function setupAdminPanel() {
  const adminBtn = document.getElementById('admin-login-btn');
  const modal = document.getElementById('admin-modal');
  const authView = document.getElementById('admin-auth-view');
  const panelView = document.getElementById('admin-panel-view');
  
  const closeBtn = document.getElementById('btn-close-modal');
  const closePanelBtn = document.getElementById('btn-close-panel');
  const submitAuthBtn = document.getElementById('btn-submit-auth');
  const savePromptBtn = document.getElementById('btn-save-prompt');

  if (!adminBtn || !modal) return;

  adminBtn.addEventListener('click', () => {
    modal.classList.add('active');
    authView.style.display = 'block';
    panelView.style.display = 'none';
  });

  const closeModal = () => modal.classList.remove('active');
  closeBtn?.addEventListener('click', closeModal);
  closePanelBtn?.addEventListener('click', closeModal);

  // Clave de acceso por defecto: admin123
  submitAuthBtn?.addEventListener('click', () => {
    const passInput = document.getElementById('admin-password');
    if (passInput && passInput.value === 'admin123') {
      authView.style.display = 'none';
      panelView.style.display = 'block';
      passInput.value = '';
    } else {
      alert('Contraseña incorrecta');
    }
  });

  savePromptBtn?.addEventListener('click', () => {
    const title = document.getElementById('new-prompt-title').value;
    const category = document.getElementById('new-prompt-category').value;
    const body = document.getElementById('new-prompt-body').value;

    if (title && body) {
      const newPrompt = { id: Date.now(), title, category, body };
      promptsData.unshift(newPrompt);
      localStorage.setItem('custom_prompts', JSON.stringify(promptsData));
      renderPrompts(promptsData);

      document.getElementById('new-prompt-title').value = '';
      document.getElementById('new-prompt-body').value = '';
      closeModal();
    } else {
      alert('Por favor, completa el título y el cuerpo del prompt.');
    }
  });
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('custom_prompts');
  promptsData = saved ? JSON.parse(saved) : defaultPrompts;

  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');

  setLanguage(langParam && translations[langParam] ? langParam : 'es');

  document.getElementById('btn-es')?.addEventListener('click', () => setLanguage('es'));
  document.getElementById('btn-ca')?.addEventListener('click', () => setLanguage('ca'));
  document.getElementById('btn-pt')?.addEventListener('click', () => setLanguage('pt-BR'));
  document.getElementById('btn-en')?.addEventListener('click', () => setLanguage('en'));

  document.getElementById('search-input')?.addEventListener('input', () => renderPrompts(promptsData));

  setupAdminPanel();
  renderPrompts(promptsData);
});
