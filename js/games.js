// Gestión de Juegos para Stem Store
class GamesManager {
    constructor() {
        this.games = new Map();
        this.categories = new Map();
        this.cart = [];
        this.init();
    }
    
    init() {
        this.loadGamesData();
        this.loadCategoriesData();
        this.setupEventListeners();
    }
    
    loadGamesData() {
        // Datos de todos los juegos
        const gamesData = [
            {
                id: '7-days-to-die',
                name: '7 Days to Die',
                price: 'CLP$21.500',
                category: 'estrategia',
                releaseDate: '25 de Julio 2024',
                tags: ['Supervivencia', 'Zombies', 'Multijugador', 'Vóxel'],
                description: '7 Days to Die es un juego de mundo abierto que combina de forma extraordinaria juegos de disparos en primera persona, supervivencia de terror, defensa de torres y rol.',
                image: 'assets/images/juegos/7-days-to-die.webp',
                rating: 4.5,
                features: ['Mundo abierto', 'Construcción', 'Supervivencia', 'Zombies']
            },
            {
                id: 'baldurs-gate-3',
                name: 'Baldur\'s Gate 3',
                price: 'CLP$49.999',
                category: 'rol',
                releaseDate: '03 de Agosto de 2023',
                tags: ['Rol', 'Personalización', 'Buena trama', 'D&D'],
                description: 'Reúne a tu grupo y vuelve a los Reinos Olvidados en un relato de compañerismo y traición, sacrificio y supervivencia.',
                image: 'assets/images/juegos/baldurs-gate-3.webp',
                rating: 4.8,
                features: ['RPG por turnos', 'Cooperativo', 'Historia épica', 'D&D 5e']
            },
            {
                id: 'battlefield-6',
                name: 'Battlefield 6',
                price: 'CLP$62.900',
                category: 'accion',
                releaseDate: '10 de Octubre de 2025',
                tags: ['Acción', 'FPS', 'Multijugador', 'Militares'],
                description: 'La experiencia bélica definitiva. En una guerra de tanques, cazas y gigantescos arsenales de combate, el arma más mortífera es tu patrulla.',
                image: 'assets/images/juegos/battlefield-6.jpg',
                rating: 4.6,
                features: ['FPS multijugador', 'Combate vehicular', 'Destrucción ambiental', 'Modo campaña']
            },
            {
                id: 'black-myth-wukong',
                name: 'Black Myth: Wukong',
                price: 'CLP$39.999',
                category: 'accion',
                releaseDate: '19 de Agosto del 2024',
                tags: ['Mitología', 'Acción', 'Rol de acción', 'Combate'],
                description: 'Black Myth: Wukong es un RPG de acción inspirado en la mitología china. Encarnarás al Predestinado en un viaje repleto de peligros y maravillas.',
                image: 'assets/images/juegos/black-myth-wukong.webp',
                rating: 4.7,
                features: ['Acción RPG', 'Mitología china', 'Mundo abierto', 'Combate fluido']
            },
            {
                id: 'civilization-vii',
                name: 'Civilization VII',
                price: 'CLP$44.099',
                category: 'estrategia',
                releaseDate: '10 de Febrero de 2025',
                tags: ['Gran estrategia', 'Históricos', 'Militares', '4X'],
                description: 'La galardonada saga de juegos de estrategia regresa con una nueva y revolucionaria entrega.',
                image: 'assets/images/juegos/civilization-vii.jpg',
                rating: 4.4,
                features: ['Estrategia por turnos', 'Construcción de imperios', 'Historia mundial', 'Multijugador']
            },
            {
                id: 'forza-horizon-5',
                name: 'Forza Horizon 5',
                price: 'CLP$43.900',
                category: 'deportes',
                releaseDate: '08 de Noviembre de 2021',
                tags: ['Carreras', 'Mundo abierto', 'Conducción', 'Realistas'],
                description: 'Explora los coloridos paisajes del mundo abierto de México con una acción de conducción ilimitada y divertida.',
                image: 'assets/images/juegos/forza-horizon-5.webp',
                rating: 4.6,
                features: ['Mundo abierto', 'Carreras', 'Personalización', 'Física realista']
            },
            {
                id: 'peak',
                name: 'Peak',
                price: 'CLP$2.604',
                category: 'aventura',
                releaseDate: '16 de Junio de 2025',
                tags: ['Multijugador', 'Cooperativo', 'Física', '3D'],
                description: 'PEAK es un juego cooperativo de escalada en el que un solo error puede ser fatal.',
                image: 'assets/images/juegos/peak.jpg',
                rating: 4.3,
                features: ['Cooperativo', 'Escalada', 'Física realista', 'Multijugador']
            },
            {
                id: 'rematch',
                name: 'Rematch',
                price: 'CLP$15.500',
                category: 'deportes',
                releaseDate: '19 de Junio de 2025',
                tags: ['Deportes', 'Fútbol', 'Multijugador', 'E-Sports'],
                description: 'Rematch es un juego de fútbol multijugador online. Controla un jugador de tu equipo y compite en veloces partidos 5 contra 5.',
                image: 'assets/images/juegos/rematch.jpg',
                rating: 4.2,
                features: ['Fútbol', 'Multijugador', 'E-Sports', 'Tercera persona']
            },
            {
                id: 'subnautica',
                name: 'Subnautica',
                price: 'CLP$5.075',
                category: 'aventura',
                releaseDate: '23 de Enero de 2018',
                tags: ['Supervivencia', 'Mundo abierto', 'Submarino', 'VR'],
                description: 'Desciende a las profundidades de un mundo submarino alienígena lleno de belleza y peligros.',
                image: 'assets/images/juegos/subnautica.jpg',
                rating: 4.7,
                features: ['Mundo submarino', 'Supervivencia', 'Exploración', 'Construcción']
            },
            {
                id: 'warframe',
                name: 'Warframe',
                price: 'Gratuito',
                category: 'rol',
                releaseDate: '25 de Marzo de 2013',
                tags: ['Free to play', 'Disparos', 'Rol de acción', 'Cooperativo'],
                description: 'Despierta como un guerrero imparable y lucha junto a tus amigos en este juego de acción gratuito en línea.',
                image: 'assets/images/juegos/warframe.jpg',
                rating: 4.5,
                features: ['Free to play', 'Acción cooperativa', 'RPG', 'Multijugador']
            }
        ];
        
        // Cargar juegos en el Map
        gamesData.forEach(game => {
            this.games.set(game.id, game);
        });
    }
    
    loadCategoriesData() {
        // Datos de las categorías
        const categoriesData = [
            {
                id: 'accion',
                name: 'Acción',
                description: 'Juegos de acción y aventura con combate dinámico',
                image: 'assets/images/categorias/accion.webp',
                games: ['black-myth-wukong', 'battlefield-6']
            },
            {
                id: 'rol',
                name: 'Rol',
                description: 'Juegos de rol con historias épicas y personajes personalizables',
                image: 'assets/images/categorias/rol.webp',
                games: ['baldurs-gate-3', 'warframe']
            },
            {
                id: 'aventura',
                name: 'Aventura',
                description: 'Juegos de exploración y aventura en mundos únicos',
                image: 'assets/images/categorias/aventura.jpg',
                games: ['peak', 'subnautica']
            },
            {
                id: 'estrategia',
                name: 'Estrategia',
                description: 'Juegos de estrategia y táctica para mentes brillantes',
                image: 'assets/images/categorias/estrategia.webp',
                games: ['civilization-vii', '7-days-to-die']
            },
            {
                id: 'deportes',
                name: 'Deportes y Carreras',
                description: 'Juegos de deportes y carreras para la adrenalina',
                image: 'assets/images/categorias/deportes-carreras.jpg',
                games: ['forza-horizon-5', 'rematch']
            }
        ];
        
        // Cargar categorías en el Map
        categoriesData.forEach(category => {
            this.categories.set(category.id, category);
        });
    }
    
    setupEventListeners() {
        // Filtros de categoría
        document.addEventListener('click', (e) => {
            if (e.target.matches('.category-filter')) {
                e.preventDefault();
                const category = e.target.getAttribute('data-category');
                this.filterGamesByCategory(category);
            }
        });
        
        // Búsqueda de juegos
        document.addEventListener('input', (e) => {
            if (e.target.matches('#gameSearch')) {
                const query = e.target.value;
                this.searchGames(query);
            }
        });
        
        // Ordenamiento
        document.addEventListener('change', (e) => {
            if (e.target.matches('#gameSort')) {
                const sortBy = e.target.value;
                this.sortGames(sortBy);
            }
        });
        
        // Botones de compra
        document.addEventListener('click', (e) => {
            if (e.target.matches('.add-to-cart-btn')) {
                e.preventDefault();
                const gameId = e.target.getAttribute('data-game-id');
                this.addToCart(gameId);
            }
        });
    }
    
    filterGamesByCategory(category) {
        const gameCards = document.querySelectorAll('.game-card');
        
        gameCards.forEach(card => {
            const gameCategory = card.getAttribute('data-category');
            if (category === 'all' || gameCategory === category) {
                card.style.display = 'block';
                card.classList.add('animate-fade-in-up');
            } else {
                card.style.display = 'none';
            }
        });
        
        // Actualizar filtro activo
        this.updateActiveFilter(category);
    }
    
    searchGames(query) {
        if (query.length < 2) {
            this.showAllGames();
            return;
        }
        
        const gameCards = document.querySelectorAll('.game-card');
        const searchTerm = query.toLowerCase();
        
        gameCards.forEach(card => {
            const gameName = card.querySelector('.game-title').textContent.toLowerCase();
            const gameTags = card.querySelector('.game-tags').textContent.toLowerCase();
            const gameDesc = card.querySelector('.game-description').textContent.toLowerCase();
            
            if (gameName.includes(searchTerm) || 
                gameTags.includes(searchTerm) || 
                gameDesc.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('animate-fade-in-up');
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    sortGames(sortBy) {
        const gameContainer = document.querySelector('.games-container');
        const gameCards = Array.from(gameContainer.querySelectorAll('.game-card'));
        
        gameCards.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    const nameA = a.querySelector('.game-title').textContent;
                    const nameB = b.querySelector('.game-title').textContent;
                    return nameA.localeCompare(nameB);
                
                case 'price':
                    const priceA = this.extractPrice(a.querySelector('.game-price').textContent);
                    const priceB = this.extractPrice(b.querySelector('.game-price').textContent);
                    return priceA - priceB;
                
                case 'rating':
                    const ratingA = parseFloat(a.getAttribute('data-rating') || 0);
                    const ratingB = parseFloat(b.getAttribute('data-rating') || 0);
                    return ratingB - ratingA;
                
                case 'release':
                    const releaseA = new Date(a.getAttribute('data-release') || '1900-01-01');
                    const releaseB = new Date(b.getAttribute('data-release') || '1900-01-01');
                    return releaseB - releaseA;
                
                default:
                    return 0;
            }
        });
        
        // Reordenar en el DOM
        gameCards.forEach(card => {
            gameContainer.appendChild(card);
        });
    }
    
    extractPrice(priceText) {
        if (priceText === 'Gratuito') return 0;
        const match = priceText.match(/CLP\$([\d,]+)/);
        return match ? parseInt(match[1].replace(/,/g, '')) : 0;
    }
    
    addToCart(gameId) {
        const game = this.games.get(gameId);
        if (!game) return;
        
        // Verificar si ya está en el carrito
        const existingItem = this.cart.find(item => item.id === gameId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: gameId,
                name: game.name,
                price: game.price,
                quantity: 1,
                image: game.image
            });
        }
        
        // Actualizar contador del carrito
        this.updateCartCounter();
        
        // Mostrar notificación
        this.showAddToCartNotification(game.name);
        
        // Guardar en localStorage
        this.saveCartToStorage();
    }
    
    removeFromCart(gameId) {
        this.cart = this.cart.filter(item => item.id !== gameId);
        this.updateCartCounter();
        this.saveCartToStorage();
    }
    
    updateCartCounter() {
        const cartCounter = document.getElementById('cartCounter');
        if (cartCounter) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCounter.textContent = totalItems;
            cartCounter.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }
    
    getCartTotal() {
        return this.cart.reduce((total, item) => {
            const price = this.extractPrice(item.price);
            return total + (price * item.quantity);
        }, 0);
    }
    
    saveCartToStorage() {
        localStorage.setItem('stemStoreCart', JSON.stringify(this.cart));
    }
    
    loadCartFromStorage() {
        const savedCart = localStorage.getItem('stemStoreCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
            this.updateCartCounter();
        }
    }
    
    showAddToCartNotification(gameName) {
        // Crear notificación toast
        const toast = `
            <div class="toast align-items-center text-white bg-success border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas fa-check-circle me-2"></i>
                        ¡${gameName} añadido al carrito!
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        // Agregar al contenedor de toasts
        const toastContainer = document.getElementById('toastContainer') || this.createToastContainer();
        toastContainer.insertAdjacentHTML('beforeend', toast);
        
        // Mostrar toast
        const toastElement = toastContainer.lastElementChild;
        const bsToast = new bootstrap.Toast(toastElement);
        bsToast.show();
        
        // Limpiar después de mostrar
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
    
    updateActiveFilter(category) {
        // Remover clase activa de todos los filtros
        document.querySelectorAll('.category-filter').forEach(filter => {
            filter.classList.remove('active');
        });
        
        // Agregar clase activa al filtro seleccionado
        const activeFilter = document.querySelector(`[data-category="${category}"]`);
        if (activeFilter) {
            activeFilter.classList.add('active');
        }
    }
    
    showAllGames() {
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            card.style.display = 'block';
        });
    }
    
    // Métodos de utilidad
    getGameById(id) {
        return this.games.get(id);
    }
    
    getGamesByCategory(category) {
        return Array.from(this.games.values()).filter(game => game.category === category);
    }
    
    getAllGames() {
        return Array.from(this.games.values());
    }
    
    getCategoryById(id) {
        return this.categories.get(id);
    }
    
    getAllCategories() {
        return Array.from(this.categories.values());
    }
    
    getCart() {
        return this.cart;
    }
    
    clearCart() {
        this.cart = [];
        this.updateCartCounter();
        this.saveCartToStorage();
    }
}

// Exportar para uso global
window.GamesManager = GamesManager;
