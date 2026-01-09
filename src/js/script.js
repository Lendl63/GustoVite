//=============================================================
// 1. NAVIGATION ENTRE LES PAGES
//=============================================================

//  index.html
const linkBtn = document.querySelectorAll(".more-btn");

linkBtn.forEach((btn) => {
    btn.addEventListener('click', function() {
        // recuperation de href de la page
        const hrefPage = this.dataset.href;

        if (hrefPage) {
            window.location.href = hrefPage;
        }
    });
});

//=============================================================
// 2. NAVIGATION AVEC MENU MODAL
//=============================================================

const navBtn = document.getElementById("navBtn");
const menuModal = document.getElementById("menuModal");
const closeBtn = document.getElementById("closeBtn");

const openModal = () => {
    menuModal.classList.add("active");
    document.body.style.overflow = "hidden";
};

const closeModal = () => {
    menuModal.classList.remove("active");
    document.body.style.overflow = "";
};

navBtn?.addEventListener('click', openModal);
closeBtn?.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    // Ferme modal nav si click extérieur
    if (event.target === menuModal) {
        closeModal();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && menuModal.classList.contains('active')) {
        closeModal();
    }
});

// Fermer avec Escape (plus standard que Espace)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (menuModal.classList.contains("active")) closeModal();
    }
});

