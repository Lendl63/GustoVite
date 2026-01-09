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

//=============================================================
// 5. APPLICATION DU RESPONSIVE MODAL SUR MOBILE
//=============================================================

/*===== Throttle helper pour performance =====*/
const throttle = (func, delay) => {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
};

/*===== Verification du type d'appareil =====*/
const isMobile = () => {
    const width = window.innerWidth;
    const nav = document.querySelector('.nav');
    const menu = document.querySelector('.menu');

    if (width < 1025) {
        nav.style.display = "none";
        menu.style.display = "flex";
    } else {
        nav.style.display = "flex";
        menu.style.display = "none";
    }
}

/*===== Application du responsive (nav modal) sur tablette et modile =====*/
window.addEventListener('resize', throttle(isMobile, 250));
isMobile();