// State
let selectedGame = null;

// Select game
function selectGame(game) {
    selectedGame = game;

    // Reset all cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.classList.remove('border-orange-500', 'border-purple-500');
        card.classList.add('border-transparent');
    });

    // Highlight selected card
    const card = document.getElementById(game === 'FREEFIRE' ? 'card-freefire' : 'card-rov');
    card.classList.remove('border-transparent');
    card.classList.add(game === 'FREEFIRE' ? 'border-orange-500' : 'border-purple-500');
}

// Check UID
async function checkUID() {
    const uid = document.getElementById('uid-input').value.trim();

    // Validate
    if (!selectedGame) {
        showError('กรุณาเลือกเกมก่อน');
        return;
    }
    if (!uid) {
        showError('กรุณากรอก UID');
        return;
    }
    if (!/^\d+$/.test(uid)) {
        showError('UID ต้องเป็นตัวเลขเท่านั้น');
        return;
    }

    // Loading
    setLoading(true);
    hideResults();

    try {
        const res = await fetch('/api/check-uid', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ game: selectedGame, player_id: uid })
        });

        const data = await res.json();

        if (res.ok && data.status === 200) {
            showSuccess(data);
        } else {
            showError(data.message || 'ไม่พบข้อมูลผู้เล่น');
        }
    } catch (err) {
        showError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
        setLoading(false);
    }
}

// Set loading state
function setLoading(loading) {
    const btn = document.getElementById('check-btn');
    btn.disabled = loading;
    document.getElementById('btn-text').classList.toggle('hidden', loading);
    document.getElementById('btn-loader').classList.toggle('hidden', !loading);
}

// Hide results
function hideResults() {
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('result-success').classList.add('hidden');
    document.getElementById('result-error').classList.add('hidden');
}

// Show success
function showSuccess(data) {
    document.getElementById('result-game-name').textContent = selectedGame === 'FREEFIRE' ? 'Free Fire' : 'ROV';
    document.getElementById('result-player-name').textContent = data.player_name || data.nickname || '-';
    document.getElementById('result-player-id').textContent = data.player_id || '-';

    document.getElementById('result-section').classList.remove('hidden');
    document.getElementById('result-success').classList.remove('hidden');
}

// Show error
function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('result-section').classList.remove('hidden');
    document.getElementById('result-error').classList.remove('hidden');
}

// Enter key to submit
document.getElementById('uid-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkUID();
});
