import { t, getSubjectOptions } from './locales/index.js';

// ====================================================================
// CONFIGURACIÓ DE SUPABASE I RUTES
// ====================================================================

const SUPABASE_URL = "https://amswkfdhwashotagrhfo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_J-PhmX7Awpb8UwDYXhYwWg_iISrccBy";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
    try {
        const { data, error } = await supabaseClient
            .from('prompts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error en carregar de Supabase:", error);
            return;
        }

        if (data && data.length > 0) {
            // Mapegem 'content' a 'body' internament per mantenir la compatibilitat del renderitzat
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
        const noResultsMsg = t('instructions.no_results', currentLang) || "No results.";
        container.innerHTML = `<p class="no-results" style="grid-column: 1/-1; text-align: center; color: #64748b;">${noResultsMsg}</p>`;
        return;
    }

    const copyBtnText = t('form.btn_copy', currentLang) || "📋 Copiar Prompt";
    const authorLabel = t('form.by_author', currentLang) || "Autor/a:";

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

    // Reassignar esdeveniments de còpia als botons generats
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
        alert(t('form.copy_success', currentLang) || "Copiado!");
    } catch (err) {
        console.error("Error en copiar:", err);
        alert(t('form.copy_error', currentLang) || "Error al copiar.");
    }
}

// ====================================================================
// GESTIÓ D'IDIOMES (SISTEMA LOCALES)
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
        el.textContent = t(key, currentLang);
    });

    // C. Actualitzar placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key, currentLang);
    });

    // D. Actualitzar el botó de la capçalera (Pujar Prompts)
    const adminBtn = document.getElementById('admin-login-btn') || document.getElementById('admin-btn');
    if (adminBtn) {
        adminBtn.innerHTML = `🔒 ${t('form.btn_upload_prompts', currentLang)}`;
    }

    // E. Actualitzar bloc d'instruccions
    const instrTitle = document.getElementById('instructions-title');
    const instrStep1 = document.getElementById('instructions-step-1');
    const instrStep2 = document.getElementById('instructions-step-2');
    const instrStep3 = document.getElementById('instructions-step-3');
    const instrNote = document.getElementById('instructions-note') || document.getElementById('upload-instruction-note');

    if (instrTitle) instrTitle.textContent = t('instructions.title', currentLang);
    if (instrStep1) instrStep1.textContent = t('instructions.step1', currentLang);
    if (instrStep2) instrStep2.textContent = t('instructions.step2', currentLang);
    if (instrStep3) instrStep3.textContent = t('instructions.step3', currentLang);
    if (instrNote) instrNote.textContent = t('instructions.upload_note', currentLang);

    // F. Actualitzar l'etiqueta i el <select> de les matèries del formulari
    const subjectLabel = document.getElementById('subject-label');
    if (subjectLabel) {
        subjectLabel.textContent = t('form.label_subject', currentLang);
    }
    updateSubjectDropdown();

    // G. Actualitzar enllaç de descàrrega del formulari de context
    const btnForm = document.getElementById('btn-download-form');
    if (btnForm) {
        btnForm.href = formUrls[currentLang] || formUrls['ca'];
        btnForm.setAttribute('download', `formulari_context_${currentLang}.txt`);
    }

    localStorage.setItem('preferred_lang', currentLang);
    renderPrompts(promptsData);
}

/**
 * Regenera les opcions del select de matèries dinàmicament segons l'idioma
 */
function updateSubjectDropdown() {
    const subjectSelect = document.getElementById('new-prompt-category') || document.getElementById('subject-select');
    if (!subjectSelect) return;

    const selectedValue = subjectSelect.value;
    subjectSelect.innerHTML = '';

    // Opció per defecte
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = t('form.select_subject_placeholder', currentLang);
    defaultOption.disabled = true;
    defaultOption.selected = !selectedValue;
    subjectSelect.appendChild(defaultOption);

    // Carregar matèries des de locales/index.js
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
            const title = document.getElementById('new-prompt-title').value;
            const author = document.getElementById('new-prompt-author').value;
            const category = document.getElementById('new-prompt-category').value;
            const body = document.getElementById('new-prompt-body').value;

            // Enviem 'content' en lloc de 'body' per adaptar-nos a la taula de Supabase
            const newPrompt = { 
                title: title, 
                author: author, 
                category: category, 
                content: body 
            };

            const { data, error } = await supabaseClient
                .from('prompts')
                .insert([newPrompt])
                .select();

            if (error) {
                console.error("Error detallat de Supabase:", error.message, error.details, error.hint);
                alert("Error al guardar el prompt a la base de dades.");
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

    // Assignar esdeveniments de canvi d'idioma
    document.getElementById('btn-es')?.addEventListener('click', () => setLanguage('es'));
    document.getElementById('btn-ca')?.addEventListener('click', () => setLanguage('ca'));
    document.getElementById('btn-pt')?.addEventListener('click', () => setLanguage('pt'));
    document.getElementById('btn-en')?.addEventListener('click', () => setLanguage('en'));

    document.getElementById('btn-lang-es')?.addEventListener('click', () => setLanguage('es'));
    document.getElementById('btn-lang-ca')?.addEventListener('click', () => setLanguage('ca'));
    document.getElementById('btn-lang-pt')?.addEventListener('click', () => setLanguage('pt'));
    document.getElementById('btn-lang-en')?.addEventListener('click', () => setLanguage('en'));

    document.getElementById('search-input')?.addEventListener('input', () => renderPrompts(promptsData));

    // Carregar idioma i prompts inicials
    setLanguage(initialLang);
    await fetchPromptsFromSupabase();
});
