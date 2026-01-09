//=============================================================
// 1. ANIMATION NAV LINKS AU SCROLL
//=============================================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const options = {
    root: null,
    threshold: 0.4,
}

const navObserver = new IntersectionObserver( (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id"); // recuperation de l'id de la section observé

            // retire la class 'active de tous les liens        }
            navLinks.forEach((link) => {
                link.classList.remove("active");

                // Ajout de la classe active au lien correcpondant
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, options);

// observation de toutes les sections
sections.forEach((section) => {
    navObserver.observe(section);
});


//=============================================================
// 2. NAVIGATION ENTRE LES PAGES
//=============================================================

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
// 3. NAVIGATION AVEC MENU MODAL
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

//=============================================================
// 4. NETTOYAGE APRÈS CHARGEMENT
//=============================================================

window.addEventListener('load', () => {
    history.replaceState(null, null, window.location.pathname);
    window.scrollTo(0, 0);
});
