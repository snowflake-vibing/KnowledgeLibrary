// Shared interactive fill-in-the-blank engine for PTDLKD Chuong 6 (P2)
let lastFocusedInput = null;

document.addEventListener('DOMContentLoaded', () => {
    // Track last focused blank input for symbol insertion
    document.addEventListener('focusin', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('blank-input')) {
            lastFocusedInput = e.target;
        }
    });

    // Clear validation styling when user edits an input
    document.addEventListener('input', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('blank-input')) {
            e.target.classList.remove('correct', 'incorrect');
        }
    });

    // Pressing Enter inside a blank checks the nearest card/section
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target && e.target.classList && e.target.classList.contains('blank-input')) {
            e.preventDefault();
            const container = e.target.closest('[data-section]');
            if (container) {
                checkSection(container.getAttribute('data-section'));
            }
        }
    });

    // Initialize sub-tabs if present
    initSubTabs();

    // Update page score summary on load
    updatePageProgress(false);
});

function initSubTabs() {
    const btns = document.querySelectorAll('.sub-tab-btn');
    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.sub-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const panel = document.getElementById(target);
            if (panel) panel.classList.add('active');
        });
    });
}

function insertSymbol(sym) {
    if (!lastFocusedInput) {
        const first = document.querySelector('.blank-input');
        if (first) lastFocusedInput = first;
        else return;
    }
    const input = lastFocusedInput;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    const val = input.value;
    input.value = val.slice(0, start) + sym + val.slice(end);
    input.focus();
    const pos = start + sym.length;
    input.setSelectionRange(pos, pos);
    input.classList.remove('correct', 'incorrect');
}

function removeAccents(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

function normalizeMathString(raw) {
    let s = String(raw || '').trim().toLowerCase();
    // Standardize math symbols to canonical tokens so ASCII or Unicode both pass
    s = s
        .replace(/×|·|\*/g, '*')
        .replace(/−|–/g, '-')
        .replace(/σ/g, 'sigma')
        .replace(/η/g, 'eta')
        .replace(/γ/g, 'gamma')
        .replace(/θ/g, 'theta')
        .replace(/∇/g, 'nabla')
        .replace(/∂/g, 'd')
        .replace(/⊙/g, 'odot')
        .replace(/∑/g, 'sum')
        .replace(/∈/g, 'in')
        .replace(/∞/g, 'inf')
        .replace(/≥/g, '>=')
        .replace(/≤/g, '<=')
        .replace(/≈/g, '=')
        .replace(/\s+/g, '');
    return s;
}

function normalizeTextString(raw) {
    let s = removeAccents(String(raw || '').trim().toLowerCase());
    s = s.replace(/\s+/g, ' ');
    return s;
}

function evaluateBlank(input) {
    const ansAttr = input.getAttribute('data-ans') || '';
    const type = input.getAttribute('data-type') || 'math';
    const userRaw = input.value.trim();
    if (!userRaw) return false;

    const candidates = ansAttr.split('|').map(x => x.trim()).filter(Boolean);

    if (type === 'number') {
        const cleaned = userRaw.replace(/,/g, '.').replace(/\s+/g, '');
        const userVal = Number(cleaned);
        if (Number.isNaN(userVal)) return false;
        const tol = parseFloat(input.getAttribute('data-tol') || '0.01');
        return candidates.some(c => {
            const target = Number(c);
            return !Number.isNaN(target) && Math.abs(userVal - target) <= tol;
        });
    }

    if (type === 'text') {
        const userNorm = normalizeTextString(userRaw);
        return candidates.some(c => normalizeTextString(c) === userNorm);
    }

    // Default: 'math' normalization (spaces stripped, Unicode/ASCII aliases unified)
    const userMath = normalizeMathString(userRaw);
    return candidates.some(c => normalizeMathString(c) === userMath);
}

function checkSection(sectionId) {
    const sec = document.querySelector(`[data-section="${sectionId}"]`);
    if (!sec) return { correct: 0, total: 0 };

    const inputs = sec.querySelectorAll('.blank-input');
    let correctCount = 0;

    inputs.forEach(input => {
        const ok = evaluateBlank(input);
        input.classList.remove('correct', 'incorrect');
        if (ok) {
            input.classList.add('correct');
            correctCount++;
        } else {
            input.classList.add('incorrect');
        }
    });

    const fb = sec.querySelector('.feedback-box');
    if (fb) {
        fb.classList.remove('success', 'partial', 'error');
        fb.classList.add('show');
        const total = inputs.length;
        if (correctCount === total && total > 0) {
            fb.classList.add('success');
            fb.innerHTML = `✅ <strong>Xuất sắc!</strong> Bạn đã điền đúng toàn bộ <strong>${correctCount}/${total}</strong> ô trống trong phần này.`;
        } else if (correctCount > 0) {
            fb.classList.add('partial');
            fb.innerHTML = `⚠️ <strong>Gần xong rồi:</strong> Đúng <strong>${correctCount}/${total}</strong> ô. Các ô viền đỏ cần kiểm tra lại!`;
        } else {
            fb.classList.add('error');
            fb.innerHTML = `❌ <strong>Chưa đúng (0/${total}):</strong> Hãy bấm <em>Gợi ý</em> hoặc xem lại công thức trong bài giảng.`;
        }
    }

    updatePageProgress(true);
    return { correct: correctCount, total: inputs.length };
}

function checkAllOnPage() {
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(sec => {
        checkSection(sec.getAttribute('data-section'));
    });
}

function toggleHint(sectionId) {
    const sec = document.querySelector(`[data-section="${sectionId}"]`);
    if (!sec) return;
    const hint = sec.querySelector('.hint-box');
    if (hint) {
        hint.classList.toggle('show');
    }
}

function revealSection(sectionId) {
    const sec = document.querySelector(`[data-section="${sectionId}"]`);
    if (!sec) return;
    const inputs = sec.querySelectorAll('.blank-input');
    inputs.forEach(input => {
        const displayAns = input.getAttribute('data-display') || (input.getAttribute('data-ans') || '').split('|')[0];
        input.value = displayAns;
        input.classList.remove('incorrect');
        input.classList.add('correct');
    });

    const fb = sec.querySelector('.feedback-box');
    if (fb) {
        fb.classList.remove('error', 'partial');
        fb.classList.add('show', 'success');
        fb.innerHTML = `💡 <strong>Đã hiển thị đáp án chuẩn</strong> cho ${inputs.length} ô trống. Hãy tự làm lại sau khi ghi nhớ nhé!`;
    }
    updatePageProgress(true);
}

function resetSection(sectionId) {
    const sec = document.querySelector(`[data-section="${sectionId}"]`);
    if (!sec) return;
    const inputs = sec.querySelectorAll('.blank-input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('correct', 'incorrect');
    });
    const fb = sec.querySelector('.feedback-box');
    if (fb) {
        fb.className = 'feedback-box';
        fb.innerHTML = '';
    }
    const hint = sec.querySelector('.hint-box');
    if (hint) {
        hint.classList.remove('show');
    }
    updatePageProgress(true);
}

function resetAllOnPage() {
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(sec => resetSection(sec.getAttribute('data-section')));
}

function updatePageProgress(save) {
    const allInputs = document.querySelectorAll('.blank-input');
    const total = allInputs.length;
    let correct = 0;
    allInputs.forEach(inp => {
        if (inp.classList.contains('correct')) correct++;
    });

    const scoreEl = document.getElementById('pageScoreValue');
    if (scoreEl) {
        scoreEl.textContent = `${correct} / ${total}`;
    }

    if (save && typeof PAGE_KEY !== 'undefined' && PAGE_KEY) {
        try {
            const store = JSON.parse(localStorage.getItem('ptdlkd_chuong6_progress') || '{}');
            store[PAGE_KEY] = { correct, total, updatedAt: Date.now() };
            localStorage.setItem('ptdlkd_chuong6_progress', JSON.stringify(store));
        } catch (err) {
            // Ignore storage errors on restricted file:// environments
        }
    }
}
