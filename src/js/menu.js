// ============================================
// 1. CHARGEMENT DES MENUS
// ============================================

const categories = [
    { id: "entrees", label: "Entrées", file: "entrees.json" },
    { id: "plats", label: "Plats", file: "plats.json" },
    { id: "desserts", label: "Desserts", file: "desserts.json" },
    { id: "boissons", label: "Boissons", file: "boissons.json" }
];

/**
 * Charge les menus depuis les fichiers JSON
 * @param {HTMLElement} container 
 * @param {string} category 
 * @param {string} file 
 */
async function loadMenu(container, category, file) {
    try {
        const response = await fetch(`menu/${file}`);
        const menu = await response.json();

        const title = document.createElement("h2");
        title.classList.add("section-title");
        title.innerHTML = `<span>${category}</span>`;
        container.appendChild(title);

        const grid = document.createElement("div");
        grid.classList.add("menu-grid");

        menu.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("menu-item");
            card.innerHTML = `
                <img src="${item.image}" alt="${item.nom}" loading="lazy" decoding="async" width="400" height="500">
                <div class="menu-info">
                    <h3>${item.nom}</h3>
                    <p>${item.description}</p>
                    <div class="menu-price">${item.prix} FCFA</div>
                </div>
            `;
            grid.appendChild(card);
        });

        container.appendChild(grid);
        animateMenuItem();
    } catch (error) {
        console.error("Erreur chargement menu: ", error);
    }
}

const menuContainer = document.getElementById("menu-container");
if (menuContainer) {
    categories.forEach(cat => {
        loadMenu(menuContainer, cat.label, cat.file);
    });
}


// ============================================
// 2. ANIMATION DES MENUS
// ============================================


const menuItemObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-item");
            observer.unobserve(entry.target); // Libère la mémoire
        }
    });
}, { threshold: 0.3 });

function animateMenuItem() {
    //Réutilise le même observeur pour tous les menu-items
    document.querySelectorAll(".menu-item").forEach(item => {
        menuItemObserver.observe(item);
    });
}