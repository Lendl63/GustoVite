//=============================================================
// 1. ANIMATION DES SECTIONS AU SCROLL
//=============================================================

const sectionObserver = new IntersectionObserver( function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('show'); //appliquer l'animation
            observer.unobserve(entry.target); //ne repete pas l'animation
        }
    });
},{threshold: 0.3}); // section visible a 40%

const fadeEls = document.querySelectorAll('.fade-in');

fadeEls.forEach(fader => {
    sectionObserver.observe(fader);
});


//=============================================================
// 2. ACCORDÉON DES VALEURS
//=============================================================

const fleches = document.querySelectorAll(".value .scroll");
const valeurs = document.querySelectorAll('.value');

fleches.forEach(fleche => {
    fleche.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        
        let valeur = fleche.closest(".value");
        valeurs.forEach(v => {
            if (v !== valeur) {
                v.classList.remove("active");
            }
        });
        valeur.classList.toggle("active");
    });
});


// ============================================
// 3. CAROUSEL D'AVIS (OPTIMISÉ)
// ============================================

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let cards = document.querySelectorAll('.review-card');
    let current = Math.floor(cards.length / 2);
    let autoSlide = null;

    function calculateCardTotalWidth(card) {
        const rect = card.getBoundingClientRect();
        const style = getComputedStyle(card);
        const marginLeft = parseFloat(style.marginLeft) || 0;
        const marginRight = parseFloat(style.marginRight) || 0;
        return rect.width + marginLeft + marginRight;
    }

    function updateCarousel() {
        if (cards.length === 0) return;
        if (current < 0) current = 0;
        if (current >= cards.length) current = cards.length - 1;

        const totalWidth = calculateCardTotalWidth(cards[0]);
        const containerWidth = track.parentElement.clientWidth;
        const offset = -(current * totalWidth) + (containerWidth / 2 - totalWidth / 2);

        track.style.transform = `translateX(${offset}px)`;

        cards.forEach((card, i) => {
            card.classList.toggle('active', i === current);
            card.setAttribute('aria-hidden', i === current ? 'false' : 'true');
        });
    }

    function startAuto() {
        stopAuto();
        autoSlide = setInterval(() => {
            current = (current + 1) % cards.length;
            updateCarousel();
        }, 5000);
    }

    function stopAuto() {
        if (autoSlide) {
            clearInterval(autoSlide);
            autoSlide = null;
        }
    }

    function navigate(direction) {
        stopAuto();
        current = (current + direction + cards.length) % cards.length;
        updateCarousel();
        startAuto();
    }

    nextBtn.addEventListener('click', () => navigate(1));
    prevBtn.addEventListener('click', () => navigate(-1));

    // Pause au survol
    const container = track.parentElement;
    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', startAuto);

    window.addEventListener('resize', updateCarousel);

    updateCarousel();
    startAuto();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}

