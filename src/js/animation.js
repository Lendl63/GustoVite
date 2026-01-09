// ============================================
// 1. FADE-IN AU SCROLL 
// ============================================

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); //libère la mémoire
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in').forEach(fader => {
    appearOnScroll.observe(fader);
});

// ===========================================
// 2. ANIMATION DES VALEURS
// ===========================================

let valeurAnimated = false; //Flag pour exécuter une seule fois

const valueObservation = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        //CRITIQUE: Vérifier le flag avant d'exécuter
        if (entry.isIntersecting && !valeurAnimated) {
            valeurAnimated = true;
            
            document.querySelectorAll(".value").forEach((value, i) => {
                setTimeout(() => {
                    value.classList.add("fade-in-value");
                }, i * 200);
            });
            
            observer.unobserve(entry.target); //Libère la mémoire
        }
    });
}, { threshold: 0.2 });

const valeurContain = document.querySelector(".values");
if (valeurContain) valueObservation.observe(valeurContain);

// ========================================
// 3. ANIMATION DE LA RÉSERVATION 
// ========================================

let reservationAnimated = false; //Flag pour exécuter une seule fois

const infoObservation = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !reservationAnimated) {
            reservationAnimated = true;
            
            // Animation de l'image
            const img = entry.target.querySelector(".reservation-icon");
            if (img) img.classList.add("slide-img");

            // Animations des infos
            entry.target.querySelectorAll(".info").forEach((info, i) => {
                setTimeout(() => {
                    info.classList.add("show-info");
                }, (i + 1) * 300);
            });

            // Animation du formulaire
            const form = entry.target.querySelector(".form");
            if (form) {
                setTimeout(() => {
                    form.classList.add("show-form");
                }, 600);
            }
            
            observer.unobserve(entry.target); //Libère la mémoire
        }
    });
}, { threshold: 0.4 });

const reservation = document.querySelector(".reservation");
if (reservation) infoObservation.observe(reservation);


// Export pour utilisation dans script.js
// window.animateMenuItem = animateMenuItem;
