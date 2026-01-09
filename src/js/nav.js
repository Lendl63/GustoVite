/*===== ANIMATION NAV LINKS AU SCROLL =====*/

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


/*===== ANIMATION DES SECTIONS AU SCROLL =====*/
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
