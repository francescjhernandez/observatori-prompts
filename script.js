// ====================================================================
// CONFIGURACIÓ I RUTES DELS FITXERS
// ====================================================================

// URLs directes als 4 formularis de context en GitHub (versió RAW)
const formUrls = {
  ca: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulari_context_docent_ca.txt",
  es: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulario_contexto_docente_es.txt",
  pt: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulario_contexto_docente_pt.txt",
  en: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/teacher_context_form_en.txt"
};

// Textos per al botó de descàrrega del formulari segons l'idioma
const formButtonTexts = {
  ca: "📥 Descarregar formulari de context",
  es: "📥 Descargar formulario de contexto",
  pt: "📥 Baixar formulário de contexto",
  en: "📥 Download context form"
};

// Estructura base dels prompts (apuntant als fitxers externs de la carpeta /prompts/)
const defaultPrompts = [
  {
    id: 1,
    title: "Guía Docente de Competencia Digital (DigCompEdu + RNA)",
    category: "Competència Digital",
    file: "prompts/prompt-1-competencia-digital.txt",
    body: "Cargando contenido..."
  },
  {
    id: 2,
    title: "Guía Docente de Inclusión (EF, Plástica y Música)",
    category: "Inclusió i Diversitat",
    file: "prompts/prompt-2-inclusion.txt",
    body: "Cargando contenido..."
  },
  {
    id: 3,
    title: "Guía Docente de Didáctica de la Historia y Ciencias Sociales",
    category: "Didàctiques Específiques",
    file: "prompts/prompt-3-historia.txt",
    body: "Cargando contenido..."
  }
];

// Estat global de l'aplicació
let currentLang = 'ca';
let promptsData = [];

// ====================================================================
// CÀRREGA DE CONTINGUTS I FITXERS EXTERNS
// ====================================================================

/**
 * Carrega el text pla de cada prompt des dels fitxers .txt de la carpeta /prompts/
 */
async function loadPromptsContent() {
  for (let p of promptsData) {
    if (p.file) {
      try {
        const response = await fetch(p.file);
        if (response.ok) {
          p.body = await response.text();
        } else {
          console.warn(`No s'ha pogut carregar el fitxer: ${p.file}`);
        }
      } catch (error) {
        console.error(`Error de xarxa en carregar el prompt ${p.file}:`, error);
      }
    }
  }
  renderPrompts(promptsData);
}

// ====================================================================
// INTERFÍCIE I RENDERITZAT
// ====================================================================

/**
 * Pinta les targetes de prompts en el contenidor HTML
 */
function renderPrompts(promptsToRender) {
  const container = document.getElementById('prompts-container');
  if (!container) return;

  const searchQuery = document.getElementById('search-input')?.value.toLowerCase() || '';

  const filtered = promptsToRender.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery) ||
                          p.category.toLowerCase().includes(searchQuery) ||
                          p.body.toLowerCase().includes(searchQuery);
    return matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p class="no-results">No s'han trobat prompts que coincidisquen amb la cerca.</p>`;
    return;
  }

  container.innerHTML = filtered.map(prompt => `
    <article class="prompt-card" id="prompt-${prompt.id}">
      <div class="prompt-header">
        <span class="prompt-badge">${escapeHtml(prompt.category)}</span>
        <h3>${escapeHtml(prompt.title)}</h3>
      </div>
      <div class="prompt-body">
        <pre><code>${escapeHtml(prompt.body)}</code></pre>
      </div>
      <div class="prompt-actions">
        <button class="btn-copy" onclick="copyPromptToClipboard(${prompt.id})">
          📋 Copiar Prompt
        </button>
      </div>
    </article>
  `).join('');
}

/**
 * Copia el text d'un prompt al porta-retalls de l'usuari
 */
async function copyPromptToClipboard(id) {
  const prompt = promptsData.find(p => p.id === id);
  if (!prompt) return;

  try {
    await navigator.clipboard.writeText(prompt.body);
    alert(" Prompt copiat al porta-retalls amb èxit!");
  } catch (err) {
    console.error("Error en copiar al porta-retalls:", err);
    alert("No s'ha pogut copiar automàticament. Selecciona el text i copia'l manualment.");
  }
}

// ====================================================================
// GESTIÓ D'IDIOMES I MULTILINGÜISME
// ====================================================================

/**
 * Canvia l'idioma actiu, actualitza el botó del formulari i la interfície
 */
function setLanguage(lang) {
  currentLang = formUrls[lang] ? lang : 'ca';

  // Actualitzar botons de selecció d'idioma en la UI
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === `btn-${currentLang}`);
  });

  // Actualitzar l'enllaç i text del botó de descàrrega del formulari
  const btnForm = document.getElementById('btn-download-form');
  if (btnForm) {
    btnForm.href = formUrls[currentLang];
    btnForm.textContent = formButtonTexts[currentLang];
    btnForm.setAttribute('download', `formulari_context_${currentLang}.txt`);
  }

  // Desar la preferència de l'usuari
  localStorage.setItem('preferred_lang', currentLang);
}

/**
 * Funció d'escapament per a evitar injeccions HTML/XSS
 */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ====================================================================
// INICIALITZACIÓ DE L'APLICACIÓ
// ====================================================================

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Usar custom_prompts_v2 per a evitar conflictes amb la versió anterior
  const saved = localStorage.getItem('custom_prompts_v2');
  promptsData = saved ? JSON.parse(saved) : defaultPrompts;

  // 2. Detectar idioma de la URL o del localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  const savedLang = localStorage.getItem('preferred_lang');
  const initialLang = langParam || savedLang || 'ca';

  setLanguage(initialLang);

  // 3. Escuchadors d'esdeveniments per als botons d'idioma
  document.getElementById('btn-es')?.addEventListener('click', () => setLanguage('es'));
  document.getElementById('btn-ca')?.addEventListener('click', () => setLanguage('ca'));
  document.getElementById('btn-pt')?.addEventListener('click', () => setLanguage('pt'));
  document.getElementById('btn-en')?.addEventListener('click', () => setLanguage('en'));

  // 4. Cercador en temps real
  document.getElementById('search-input')?.addEventListener('input', () => renderPrompts(promptsData));

  // 5. Carregar els continguts reals des dels fitxers .txt
  await loadPromptsContent();
});
