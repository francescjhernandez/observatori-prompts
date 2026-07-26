import { t, getSubjectOptions } from './locales/index.js';

// ====================================================================
// CONFIGURACIÓ DE SUPABASE I RUTES
// ====================================================================

const SUPABASE_URL = "https://amswkfdhwashotagrhfo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_J-PhmX7Awpb8UwDYXhYwWg_iISrccBy";

let supabaseClient = null;

// Inicialització en retard i segura del client Supabase per a evitar ReferenceError
function getSupabaseClient() {
    if (!supabaseClient) {
        const supabaseLib = window.supabase;
        if (supabaseLib && typeof supabaseLib.createClient === 'function') {
            supabaseClient = supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } else {
            console.error("El SDK de Supabase no s'ha trobat a window.supabase.");
        }
    }
    return supabaseClient;
}

const formUrls = {
    ca: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulari_context_docent_ca.txt",
    es: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulario_contexto_docente_es.txt",
    pt: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulario_contexto_docente_pt.txt",
    en: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/teacher_context_form_en.txt"
};

let currentLang = 'ca';
let promptsData = [];

// ====================================================================
// TRADUCCIÓ DE CATEGORIES MULTILLENGUA
// ====================================================================

function getLocalizedCategory(categoryString) {
    if (!categoryString) return '';
    const parts = categoryString.split('|').map(s => s.trim());
    if (parts.length < 4) return categoryString;

    const langIndex = { 'ca': 0, 'es': 1, 'pt': 2, 'en': 3 };
    const index = langIndex[currentLang] !== undefined ? langIndex[currentLang] : 0;
    return parts[index] || parts[0];
}

// ====================================================================
// CARREGAR DES DE SUPABASE
// ====================================================================

async function fetchPromptsFromSupabase() {
    const client = getSupabaseClient();
    if (!client) return;

    try {
        const { data, error } = await client
            .from('prompts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error en carregar de Supabase:", error);
            return;
        }

        if (data && data.length > 0) {
            promptsData = data.map(item => ({
                ...item,
                body: item.content || item.body
            }));
        }
        renderPrompts(promptsData);
    } catch (err) {
        console.error("Excepció en connectar a Supabase:", err);
    }
}

// ====================================================================
// RENDERITZAT I INTERFÍCIE
// ====================================================================

function renderPrompts(promptsToRender) {
    const container = document.getElementById('prompts-container');
    if (!container) return;

    const searchQuery = document.getElementById('search-input')?.value.toLowerCase() || '';

    const filtered = promptsToRender.filter(p => {
        const title = p.title || '';
        const category = p.category || '';
        const body = p.body || '';
        const author = p.author || p.autor || '';
        return title.toLowerCase().includes(searchQuery) ||
               category.toLowerCase().includes(searchQuery) ||
               body.toLowerCase().includes(searchQuery) ||
               author.toLowerCase().includes(searchQuery);
    });

    if (filtered.length === 0) {
        const noResultsMsg = t('no_results', currentLang) || t('instructions.no_results', currentLang) || "No s'han trobat resultats.";
        container.innerHTML = `<p class="no-results" style="grid-column: 1/-1; text-align: center; color: #64748b;">${noResultsMsg}</p>`;
        return;
    }

    const copyBtnText = t('btn_copy', currentLang) || "📋 Copiar Prompt";
    const authorLabel = t('by_author', currentLang) || "Autor/a:";

    container.innerHTML = filtered.map(prompt => {
        const promptAuthor = prompt.author || prompt.autor;
        const localizedCat = getLocalizedCategory(prompt.category);
        return `
            <article class="prompt-card" id="prompt-${prompt.id}">
                <div class="prompt-header">
                    <span class="prompt-badge">${escapeHtml(localizedCat)}</span>
                    <h3>${escapeHtml(prompt.title)}</h3>
                    ${promptAuthor ? `<div class="prompt-author">${authorLabel} ${escapeHtml(promptAuthor)}</div>` : ''}
                </div>
                <div class="prompt-body">
                    <pre><code>${escapeHtml(prompt.body)}</code></pre>
                </div>
                <div class="prompt-actions">
                    <button class="btn-copy" data-id="${prompt.id}">
                        ${copyBtnText}
                    </button>
                </div>
            </article>
        `;
    }).join('');

    container.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            copyPromptToClipboard(id);
        });
    });
}

async function copyPromptToClipboard(id) {
    const prompt = promptsData.find(p => p.id == id);
    if (!prompt) return;

    try {
        await navigator.clipboard.writeText(prompt.body);
        alert(t('copy_success', currentLang) || "Copiat!");
    } catch (err) {
        console.error("Error en copiar:", err);
        alert(t('copy_error', currentLang) || "Error en copiar.");
    }
}

// ====================================================================
// GESTIÓ D'IDIOMES
// ====================================================================

function setLanguage(lang) {
    currentLang = ['ca', 'es', 'en', 'pt'].includes(lang) ? lang : 'ca';
    document.documentElement.lang = currentLang;

    // A. Actualitzar botons d'idioma actius
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === `btn-${currentLang}` || btn.id === `btn-lang-${currentLang}`);
    });

    // B. Actualitzar elements amb atribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translatedText = t(key, currentLang);
        if (translatedText && translatedText !== key) {
            el.textContent = translatedText;
        }
    });

    // C. Actualitzar placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translatedPlaceholder = t(key, currentLang);
        if (translatedPlaceholder && translatedPlaceholder !== key) {
            el.placeholder = translatedPlaceholder;
        }
    });

    // D. Actualitzar el botó de la capçalera mantenint l'ícona
    const adminBtnSpan = document.querySelector('#admin-login-btn [data-i18n], #admin-btn [data-i18n]');
    if (adminBtnSpan) {
        const btnText = t('btn_admin', currentLang) || t('btn_upload_prompts', currentLang) || "Pujar Prompts";
        adminBtnSpan.textContent = btnText;
    }

    // E. Actualitzar opcions del desplegable de matèries
    updateSubjectDropdown();

    // F. Actualitzar enllaç de descàrrega del formulari de context
    const btnForm = document.getElementById('btn-download-form');
    if (btnForm) {
        btnForm.href = formUrls[currentLang] || formUrls['ca'];
        btnForm.setAttribute('download', `formulari_context_${currentLang}.txt`);
        const downloadText = t('btn_download', currentLang);
        if (downloadText && downloadText !== 'btn_download') {
            btnForm.textContent = `📥 ${downloadText}`;
        }
    }

    localStorage.setItem('preferred_lang', currentLang);
    renderPrompts(promptsData);
}

function updateSubjectDropdown() {
    const subjectSelect = document.getElementById('new-prompt-category');
    if (!subjectSelect) return;

    const selectedValue = subjectSelect.value;
    subjectSelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = t('select_category_default', currentLang) || "-- Selecciona una opció --";
    defaultOption.disabled = true;
    defaultOption.selected = !selectedValue;
    subjectSelect.appendChild(defaultOption);

    const subjects = getSubjectOptions(currentLang);

    subjects.forEach((subject) => {
        const option = document.createElement('option');
        option.value = subject.code;
        option.textContent = subject.label;

        if (subject.code === selectedValue) {
            option.selected = true;
        }

        subjectSelect.appendChild(option);
    });
}

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
// MODAL D'ADMINISTRACIÓ I INSERCIÓ A SUPABASE
// ====================================================================

function setupAdminModal() {
    const adminBtn = document.getElementById('admin-login-btn') || document.getElementById('admin-btn');
    const modal = document.getElementById('admin-modal');
    const closeBtn = document.getElementById('btn-close-modal');
    const form = document.getElementById('add-prompt-form');

    if (adminBtn && modal) {
        adminBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const client = getSupabaseClient();
            if (!client) {
                alert("Error de connexió amb la base de dades.");
                return;
            }

            const title = document.getElementById('new-prompt-title').value;
            const author = document.getElementById('new-prompt-author').value;
            const category = document.getElementById('new-prompt-category').value;
            const body = document.getElementById('new-prompt-body').value;

            const newPrompt = { 
                title: title, 
                author: author, 
                category: category, 
                content: body 
            };

            const { data, error } = await client
                .from('prompts')
                .insert([newPrompt])
                .select();

            if (error) {
                console.error("Error detallat de Supabase:", error);
                alert("Error en guardar el prompt a la base de dades.");
                return;
            }

            if (data && data.length > 0) {
                const inserted = data[0];
                promptsData.unshift({
                    ...inserted,
                    body: inserted.content || inserted.body
                });
                renderPrompts(promptsData);
            }

            form.reset();
            modal.style.display = 'none';
        });
    }
}

// ====================================================================
// INICIALITZACIÓ
// ====================================================================

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const savedLang = localStorage.getItem('preferred_lang');
    const initialLang = langParam || savedLang || 'ca';

    setupAdminModal();

    document.getElementById('btn-es')?.addEventListener('click', () => setLanguage('es'));
    document.getElementById('btn-ca')?.addEventListener('click', () => setLanguage('ca'));
    document.getElementById('btn-pt')?.addEventListener('click', () => setLanguage('pt'));
    document.getElementById('btn-en')?.addEventListener('click', () => setLanguage('en'));

    document.getElementById('search-input')?.addEventListener('input', () => renderPrompts(promptsData));

    setLanguage(initialLang);
    await fetchPromptsFromSupabase();
});
