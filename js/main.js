// Stem Store - Aplicación Principal
class StemStore {
    constructor() {
        this.currentPage = 'home';
        this.pages = {
            home: 'index.html',
            accion: 'categorias/accion.html',
            rol: 'categorias/rol.html',
            aventura: 'categorias/aventura.html',
            estrategia: 'categorias/estrategia.html',
            deportes: 'categorias/deportes-carreras.html',
            contacto: 'contacto.html'
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadPage(this.currentPage);
        this.updateNavigation();
    }
    
    setupEventListeners() {
        // Navegación principal
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-page]')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.navigateTo(page);
            }
            
            // Enlaces de categorías
            if (e.target.closest('.category-link')) {
                e.preventDefault();
                const link = e.target.closest('.category-link');
                const category = link.getAttribute('data-category');
                this.navigateTo(category);
            }
            
            // Enlaces de juegos
            if (e.target.closest('.game-link')) {
                e.preventDefault();
                const link = e.target.closest('.game-link');
                const game = link.getAttribute('data-game');
                this.navigateToGame(game);
            }
        });
        
        // Botones de compra
        document.addEventListener('click', (e) => {
            if (e.target.matches('.purchase-btn')) {
                e.preventDefault();
                this.handlePurchase(e.target);
            }
        });
        
        // Búsqueda
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }
    
    navigateTo(page) {
        if (this.pages[page]) {
            this.currentPage = page;
            this.loadPage(this.pages[page]);
            this.updateNavigation();
            this.updateURL(page);
        }
    }
    
    navigateToGame(game) {
        const gamePage = `juegos/${game}.html`;
        this.loadPage(gamePage);
        this.updateURL(`game-${game}`);
    }
    
    async loadPage(pagePath) {
        try {
            const response = await fetch(pagePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extraer el contenido principal
            const mainContent = doc.querySelector('main') || doc.querySelector('.main-content');
            const mainContentElement = document.getElementById('main-content');
            if (mainContent && mainContentElement) {
                mainContentElement.innerHTML = mainContent.innerHTML;
            }
            
            // Actualizar título
            const title = doc.querySelector('title');
            if (title) {
                document.title = title.textContent;
            }
            
            // Ejecutar scripts específicos de la página
            this.executePageScripts(pagePath);
            
            // Animar entrada
            this.animatePageTransition();
            
        } catch (error) {
            console.error('Error cargando página:', error);
            // Removido: this.showError('Error cargando la página solicitada');
        }
    }
    
    executePageScripts(pagePath) {
        // Ejecutar lógica específica según la página
        if (pagePath.includes('categorias/')) {
            this.initCategoryPage();
        } else if (pagePath.includes('juegos/')) {
            this.initGamePage();
        } else if (pagePath.includes('contacto.html')) {
            this.initContactPage();
        }
    }
    
    initCategoryPage() {
        // Inicializar funcionalidad específica de páginas de categorías
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            card.addEventListener('click', () => {
                const gameId = card.getAttribute('data-game-id');
                this.navigateToGame(gameId);
            });
        });
    }
    
    initGamePage() {
        // Inicializar funcionalidad específica de páginas de juegos
        const purchaseBtn = document.querySelector('.purchase-btn');
        if (purchaseBtn) {
            purchaseBtn.addEventListener('click', () => {
                this.handlePurchase(purchaseBtn);
            });
        }
    }
    
    initContactPage() {
        // Inicializar funcionalidad específica de la página de contacto
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit(e.target);
            });
        }
    }
    
    handlePurchase(button) {
        const gameName = button.getAttribute('data-game');
        const gamePrice = button.getAttribute('data-price');
        
        // Mostrar modal de confirmación
        this.showPurchaseModal(gameName, gamePrice);
    }
    
    showPurchaseModal(gameName, gamePrice) {
        const modal = `
            <div class="modal fade" id="purchaseModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Confirmar Compra</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>¿Estás seguro de que quieres comprar <strong>${gameName}</strong> por <strong>${gamePrice}</strong>?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" onclick="stemStore.confirmPurchase('${gameName}', '${gamePrice}')">
                                Confirmar Compra
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Agregar modal al DOM
        document.body.insertAdjacentHTML('beforeend', modal);
        
        // Mostrar modal
        const bootstrapModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
        bootstrapModal.show();
        
        // Limpiar modal después de cerrar
        document.getElementById('purchaseModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }
    
    confirmPurchase(gameName, gamePrice) {
        // Aquí iría la lógica de procesamiento de compra
        console.log(`Compra confirmada: ${gameName} - ${gamePrice}`);
        
        // Mostrar mensaje de éxito
        this.showSuccess(`¡${gameName} ha sido añadido a tu carrito!`);
        
        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('purchaseModal'));
        modal.hide();
    }
    
    handleSearch(query) {
        if (query.length < 2) return;
        
        // Implementar búsqueda en tiempo real
        this.performSearch(query);
    }
    
    async performSearch(query) {
        // Aquí implementarías la lógica de búsqueda
        console.log('Buscando:', query);
        
        // Por ahora, solo mostrar un mensaje
        this.showInfo(`Buscando: ${query}`);
    }
    
    handleContactSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Aquí implementarías el envío del formulario
        console.log('Datos del formulario:', data);
        
        // Mostrar mensaje de éxito
        this.showSuccess('Mensaje enviado correctamente');
        
        // Limpiar formulario
        form.reset();
    }
    
    updateNavigation() {
        // Actualizar estado activo en la navegación
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === this.currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    updateURL(page) {
        // Actualizar URL sin recargar la página
        const url = new URL(window.location);
        url.searchParams.set('page', page);
        window.history.pushState({}, '', url);
    }
    
    animatePageTransition() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.add('animate-fade-in-up');
            
            setTimeout(() => {
                if (mainContent) {
                    mainContent.classList.remove('animate-fade-in-up');
                }
            }, 600);
        }
    }
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    showError(message) {
        this.showNotification(message, 'danger');
    }
    
    showInfo(message) {
        this.showNotification(message, 'info');
    }
    
    showNotification(message, type) {
        const toast = `
            <div class="toast align-items-center text-white bg-${type} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        // Agregar toast al contenedor
        const toastContainer = document.getElementById('toastContainer') || this.createToastContainer();
        toastContainer.insertAdjacentHTML('beforeend', toast);
        
        // Mostrar toast
        const toastElement = toastContainer.lastElementChild;
        const bsToast = new bootstrap.Toast(toastElement);
        bsToast.show();
        
        // Limpiar toast después de mostrar
        toastElement.addEventListener('hidden.bs.toast', function() {
            this.remove();
        });
    }
    
    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
        return container;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.stemStore = new StemStore();
});

// Manejar navegación del navegador (botones atrás/adelante)
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        stemStore.navigateTo(event.state.page);
    }
});
