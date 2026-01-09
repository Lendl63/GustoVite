//==================================
// 1. NAVIGATION ENTRE LES PAGES
//==================================

//  index.html
const navBtn = document.querySelectorAll(".more-btn");

navBtn.forEach((btn) => {
    btn.addEventListener('click', function() {
        // recuperation de href de la page
        const hrefPage = this.dataset.href;

        if (hrefPage) {
            window.location.href = hrefPage;
        }
    });
});

