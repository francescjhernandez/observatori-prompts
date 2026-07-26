// ====================================================================
// CONFIGURACIÓ I RUTES DELS FITXERS (RAW GitHub)
// ====================================================================

// URLs directes als 4 formularis de context en GitHub
const formUrls = {
  ca: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulari_context_docent_ca.txt",
  es: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulario_contexto_docente_es.txt",
  pt: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulario_contexto_docente_pt.txt",
  en: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/teacher_context_form_en.txt"
};

// Textos per al botó de descàrrega segons l'idioma seleccionat
const formButtonTexts = {
  ca: "📥 Descarregar formulari de context",
  es: "📥 Descargar formulario de contexto",
  pt: "📥 Baixar formulário de contexto",
  en: "📥 Download context form"
};

// Estructura base dels prompts (apuntant als fitxers de la carpeta /prompts/)
const defaultPrompts = [
  {
    id: 1,
    title: "Guía Docente de Competencia Digital (DigCompEdu + RNA)",
    category: "Competència Digital",
    file: "prompts/prompt-1-competencia-digital.txt",
    body: "Carregant contingut..."
  },
  {
    id: 2,
    title: "Guía Docente de Inclusión (EF, Plástica y Música)",
    category: "Inclusió i Diversitat",
    file: "prompts/prompt-2-inclusion.txt",
    body: "Carregant contingut..."
  },
  {
    id: 3,
    title: "Guía Docente de Didáctica de la Historia y Ciencias Sociales",
    category: "Didàctiques Específiques",
    file: "prompts/prompt-3-historia.txt",
    body: "Carregant contingut..."
  }
];

// Estat global
let currentLang = 'ca';
let promptsData = [];

// ====================================================================
// CÀRREGA DE CONTINGUTS EXTERNS (.txt)
// ====================================================================

/**
 * Carrega el text de cada prompt des dels fitxers individuals .txt
 */
async function loadPromptsContent() {
  for (let p of promptsData) {
    if (p.file) {
      try {
        const response = await fetch(p.file);
        if (response.ok) {
          p.body = await response.text();
        } else {
          p.body = `Error en carregar el fitxer: ${p.file}`;
        }
      } catch (error) {
        console.error(`Error de xarxa en carregar ${p.file}:`, error);
        p.body = `No s'ha pogut carregar el contingut des de ${p.file}`;
      }
    }
  }
  renderPrompts(promptsData);
}

// ====================================================================
// INTERFÍCIE I RENDERITZAT
// ====================================================================

/**
 * Pinta les targetes de prompts en el DOM
 */
function renderPrompts(promptsToRender) {
  const container = document.getElementById('prompts-container');
  if (!container) return;

  const searchQuery = document.getElementById('search-input')?.value.toLowerCase() || '';

  const filtered = promptsToRender.filter(p => {
    return p.title.toLowerCase().includes(searchQuery) ||
           p.category.toLowerCase().includes(searchQuery) ||
           p.body.toLowerCase().includes(searchQuery);
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
 * Copia el text d'un prompt al porta-retalls
 */
async function copyPromptToClipboard(id) {
  const prompt = promptsData.find(p => p.id === id);
  if (!prompt) return;

  try {
    await navigator.clipboard.writeText(prompt.body);
    alert("Prompt copiat al porta-retalls amb èxit!");
  } catch (err) {
    console.error("Error en copiar:", err);
    alert("No s'ha pogut copiar automàticament. Selecciona el text i copia'l manualment.");
  }
}

// ====================================================================
// GESTIÓ D'IDIOMES I MULTILINGÜISME
// ====================================================================

/**
 * Actualitza l'idioma i recalcula l'enllaç de descàrrega del formulari
 */
function setLanguage(lang) {
  currentLang = formUrls[lang] ? lang : 'ca';

  // Actualitza l'estat dels botons d'idioma
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === `btn-${currentLang}`);
  });

  // Actualitza l'enllaç i text del botó de descàrrega
  const btnForm = document.getElementById('btn-download-form');
  if (btnForm) {
    btnForm.href = formUrls[currentLang];
    btnForm.textContent = formButtonTexts[currentLang];
    btnForm.setAttribute('download', `formulari_context_${currentLang}.txt`);
  }

  localStorage.setItem('preferred_lang', currentLang);
}

/**
 * Neteja cadenes per a evitar injecció de codi HTML
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
// INICIALITZACIÓ
// ====================================================================

document.addEventListener('DOMContentLoaded', async () => {
  // Neteja de memòria local anterior per a forçar l'actualització del nou catàleg
  localStorage.removeItem('custom_prompts');
  
  const saved = localStorage.getItem('custom_prompts_v2');
  promptsData = saved ? JSON.parse(saved) : defaultPrompts;

  // Idioma inicial (URL > localStorage > 'ca')
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  const savedLang = localStorage.getItem('preferred_lang');
  const initialLang = langParam || savedLang || 'ca';

  setLanguage(initialLang);

  // Escuchadors per als botons d'idioma
  document.getElementById('btn-es')?.addEventListener('click', () => setLanguage('es'));
  document.getElementById('btn-ca')?.addEventListener('click', () => setLanguage('ca'));
  document.getElementById('btn-pt')?.addEventListener('click', () => setLanguage('pt'));
  document.getElementById('btn-en')?.addEventListener('click', () => setLanguage('en'));

  // Cercador en temps real
  document.getElementById('search-input')?.addEventListener('input', () => renderPrompts(promptsData));

  // Carrega el contingut dels fitxers .txt
  await loadPromptsContent();
});
