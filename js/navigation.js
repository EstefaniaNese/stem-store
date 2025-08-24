// Sistema de Navegación para Stem Store
class Navigation {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.init();
    }
    
    init() {
        this.setupRoutes();
        this.setupNavigationEvents();
        this.handleInitialRoute();
    }
    
    setupRoutes() {
        // Definir todas las rutas disponibles
        this.routes.set('home', {
            path: '/',
            title: 'Stem Store - Inicio',
            template: 'home',
            category: null
        });
        
        this.routes.set('accion', {
            path: '/categorias/accion',
            title: 'Acción - Stem Store',
            template: 'category',
            category: 'accion'
        });
        
        this.routes.set('rol', {
            path: '/categorias/rol',
            title: 'Rol - Stem Store',
            template: 'category',
            category: 'rol'
        });
        
        this.routes.set('aventura', {
            path: '/categorias/aventura',
            title: 'Aventura - Stem Store',
            template: 'category',
            category: 'aventura'
        });
        
        this.routes.set('estrategia', {
            path: '/categorias/estrategia',
            title: 'Estrategia - Stem Store',
            template: 'category',
            category: 'estrategia'
        });
        
        this.routes.set('deportes', {
            path: '/categorias/deportes',
            title: 'Deportes y Carreras - Stem Store',
            template: 'category',
            category: 'deportes'
        });
        
        this.routes.set('contacto', {
            path: '/contacto',
            title: 'Contacto - Stem Store',
            template: 'contact',
            category: null
        });
        
        // Rutas de juegos individuales
        this.routes.set('game-7-days-to-die', {
            path: '/juegos/7-days-to-die',
            title: '7 Days to Die - Stem Store',
            template: 'game',
            gameId: '7-days-to-die'
        });
        
        this.routes.set('game-baldurs-gate-3', {
            path: '/juegos/baldurs-gate-3',
            title: 'Baldur\'s Gate 3 - Stem Store',
            template: 'game',
            gameId: 'baldurs-gate-3'
        });
        
        this.routes.set('game-battlefield-6', {
            path: '/juegos/battlefield-6',
            title: 'Battlefield 6 - Stem Store',
            template: 'game',
            gameId: 'battlefield-6'
        });
        
        this.routes.set('game-black-myth-wukong', {
            path: '/juegos/black-myth-wukong',
            title: 'Black Myth: Wukong - Stem Store',
            template: 'game',
            gameId: 'black-myth-wukong'
        });
        
        this.routes.set('game-civilization-vii', {
            path: '/juegos/civilization-vii',
            title: 'Civilization VII - Stem Store',
            template: 'game',
            gameId: 'civilization-vii'
        });
        
        this.routes.set('game-forza-horizon-5', {
            path: '/juegos/forza-horizon-5',
            title: 'Forza Horizon 5 - Stem Store',
            template: 'game',
            gameId: 'forza-horizon-5'
        });
        
        this.routes.set('game-peak', {
            path: '/juegos/peak',
            title: 'Peak - Stem Store',
            template: 'game',
            gameId: 'peak'
        });
        
        this.routes.set('game-rematch', {
            path: '/juegos/rematch',
            title: 'Rematch - Stem Store',
            template: 'game',
            gameId: 'rematch'
        });
        
        this.routes.set('game-subnautica', {
            path: '/juegos/subnautica',
            title: 'Subnautica - Stem Store',
            template: 'game',
            gameId: 'subnautica'
        });
        
        this.routes.set('game-warframe', {
            path: '/juegos/warframe',
            title: 'Warframe - Stem Store',
            template: 'game',
            gameId: 'warframe'
        });
    }
    
    setupNavigationEvents() {
        // Interceptar clicks en enlaces de navegación
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && this.isInternalLink(link.href)) {
                e.preventDefault();
                this.navigateToLink(link);
            }
        });
        
        // Interceptar clicks en botones de navegación
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                this.navigateToRoute(route);
            }
        });
        
        // Manejar navegación del navegador
        window.addEventListener('popstate', (e) => {
            this.handlePopState(e);
        });
    }
    
    isInternalLink(href) {
        try {
            const url = new URL(href);
            return url.origin === window.location.origin;
        } catch {
            return false;
        }
    }
    
    navigateToLink(link) {
        const href = link.getAttribute('href');
        const route = this.getRouteFromHref(href);
        
        if (route) {
            this.navigateToRoute(route);
        } else {
            // Si no es una ruta conocida, cargar directamente
            this.loadPage(href);
        }
    }
    
    getRouteFromHref(href) {
        // Extraer la ruta del href
        const path = href.split(window.location.origin)[1] || href;
        
        // Buscar coincidencias en las rutas
        for (const [route, routeInfo] of this.routes) {
            if (routeInfo.path === path) {
                return route;
            }
        }
        
        // Buscar rutas de juegos
        if (path.includes('/juegos/')) {
            const gameId = path.split('/juegos/')[1];
            return `game-${gameId}`;
        }
        
        return null;
    }
    
    navigateToRoute(route) {
        if (!this.routes.has(route)) {
            // Removido: console.error(`Ruta no encontrada: ${route}`);
            return;
        }
        
        const routeInfo = this.routes.get(route);
        this.currentRoute = route;
        
        // Actualizar URL
        this.updateURL(routeInfo.path);
        
        // Actualizar título
        document.title = routeInfo.title;
        
        // Cargar contenido
        this.loadRouteContent(routeInfo);
        
        // Actualizar navegación activa
        this.updateActiveNavigation(route);
        
        // Animar transición
        this.animatePageTransition();
    }
    
    async loadRouteContent(routeInfo) {
        try {
            let content;
            
            switch (routeInfo.template) {
                case 'home':
                    content = await this.loadHomeContent();
                    break;
                case 'category':
                    content = await this.loadCategoryContent(routeInfo.category);
                    break;
                case 'game':
                    content = await this.loadGameContent(routeInfo.gameId);
                    break;
                case 'contact':
                    content = await this.loadContactContent();
                    break;
                default:
                    content = await this.loadPage(routeInfo.path);
            }
            
            this.updateMainContent(content);
            
        } catch (error) {
            console.error('Error cargando contenido de ruta:', error);
            // Removido: this.showError('Error cargando el contenido solicitado');
        }
    }
    
    async loadHomeContent() {
        const response = await fetch('index.html');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extraer secciones específicas
        const banner = doc.querySelector('.banner');
        const categories = doc.querySelector('.tarjetas-container');
        
        return `
            ${banner ? banner.outerHTML : ''}
            ${categories ? categories.outerHTML : ''}
        `;
    }
    
    async loadCategoryContent(category) {
        const response = await fetch(`categorias/${category}.html`);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const mainContent = doc.querySelector('main');
        return mainContent ? mainContent.innerHTML : '';
    }
    
    async loadGameContent(gameId) {
        const response = await fetch(`juegos/${gameId}.html`);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const mainContent = doc.querySelector('main');
        return mainContent ? mainContent.innerHTML : '';
    }
    
    async loadContactContent() {
        const response = await fetch('contacto.html');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const mainContent = doc.querySelector('main');
        return mainContent ? mainContent.innerHTML : '';
    }
    
    async loadPage(path) {
        const response = await fetch(path);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const mainContent = doc.querySelector('main');
        return mainContent ? mainContent.innerHTML : '';
    }
    
    updateMainContent(content) {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = content;
        }
    }
    
    updateURL(path) {
        window.history.pushState({ path }, '', path);
    }
    
    updateActiveNavigation(route) {
        // Remover clase activa de todos los enlaces
        document.querySelectorAll('.nav-link, [data-route]').forEach(link => {
            link.classList.remove('active');
        });
        
        // Agregar clase activa al enlace correspondiente
        const activeLink = document.querySelector(`[data-route="${route}"], [href*="${route}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
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
    
    handlePopState(event) {
        if (event.state && event.state.path) {
            const route = this.getRouteFromHref(event.state.path);
            if (route) {
                this.navigateToRoute(route);
            }
        }
    }
    
    handleInitialRoute() {
        // Determinar la ruta inicial basada en la URL actual
        const path = window.location.pathname;
        const route = this.getRouteFromHref(path);
        
        if (route) {
            this.navigateToRoute(route);
        } else {
            // Ruta por defecto
            this.navigateToRoute('home');
        }
    }
    
    showError(message) {
        // Solo registrar en consola, no mostrar alertas visuales
        console.error(message);
        
        // Removido: Crear notificación visual automática
        // const notification = document.createElement('div');
        // notification.className = 'alert alert-danger alert-dismissible fade show';
        // notification.innerHTML = `
        //     ${message}
        //     <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        // `;
        
        // // Agregar al DOM
        // const container = document.querySelector('.container') || document.body;
        // container.insertBefore(notification, container.firstChild);
        
        // // Auto-remover después de 5 segundos
        // setTimeout(() => {
        //     notification.remove();
        // }, 5000);
    }
    
    // Métodos de utilidad
    getCurrentRoute() {
        return this.currentRoute;
    }
    
    getRouteInfo(route) {
        return this.routes.get(route);
    }
    
    getAllRoutes() {
        return Array.from(this.routes.keys());
    }
}

// Exportar para uso global
window.Navigation = Navigation;
