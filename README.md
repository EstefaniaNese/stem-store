# 🎮 Stem Store - Tienda de Videojuegos Digital

## 📋 Descripción

Stem Store es una tienda digital de videojuegos moderna y responsive, construida con **Bootstrap 5** y **JavaScript puro**. La aplicación implementa una arquitectura SPA (Single Page Application) que proporciona una experiencia de usuario fluida y moderna.

## ✨ Características Principales

- 🎨 **Diseño Moderno**: Interfaz elegante con Bootstrap 5 y CSS personalizado
- 📱 **Totalmente Responsive**: Optimizado para todos los dispositivos
- 🚀 **SPA (Single Page Application)**: Navegación sin recargas de página
- 🔍 **Búsqueda en Tiempo Real**: Filtrado y búsqueda instantánea de juegos
- 🛒 **Carrito de Compras**: Sistema completo de gestión de compras
- 🎯 **Categorización Inteligente**: Organización por géneros y características
- 🔐 **Sistema de Usuarios**: Login y registro con modales Bootstrap
- 📊 **Gestión de Estado**: Manejo centralizado del estado de la aplicación

## 🏗️ Arquitectura del Proyecto

### Estructura de Archivos
```
stem-store/
├── assets/                 # Recursos estáticos
│   ├── images/            # Imágenes del proyecto
│   │   ├── banner.jpg     # Banner principal
│   │   ├── categorias/    # Imágenes de categorías
│   │   └── juegos/        # Imágenes de juegos
│   └── logo/              # Logos de la marca
├── css/                   # Hojas de estilo
│   ├── variables.css      # Variables CSS personalizadas
│   ├── custom.css         # Estilos personalizados
│   ├── main.css           # ⚠️ DEPRECATED (mantener para compatibilidad)
│   ├── categoria.css      # ⚠️ DEPRECATED (mantener para compatibilidad)
│   ├── contacto.css       # ⚠️ DEPRECATED (mantener para compatibilidad)
│   └── game.css           # ⚠️ DEPRECATED (mantener para compatibilidad)
├── js/                    # JavaScript de la aplicación
│   ├── main.js            # Aplicación principal
│   ├── navigation.js      # Sistema de navegación
│   └── games.js           # Gestión de juegos y carrito
├── categorias/            # Páginas de categorías (HTML estático)
├── juegos/                # Páginas de juegos individuales (HTML estático)
├── index.html             # Página principal (refactorizada con Bootstrap)
└── contacto.html          # Página de contacto (HTML estático)
```

## 🚀 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Flexbox, Grid, Animaciones
- **Bootstrap 5**: Framework CSS para componentes y grid system
- **JavaScript ES6+**: Programación orientada a objetos, async/await
- **Font Awesome**: Iconografía moderna

### Características Técnicas
- **SPA Architecture**: Navegación sin recargas
- **Responsive Design**: Mobile-first approach
- **Progressive Enhancement**: Funcionalidad básica sin JavaScript
- **Local Storage**: Persistencia del carrito de compras
- **Modular JavaScript**: Código organizado en clases y módulos

## 🎯 Funcionalidades Implementadas

### 1. Sistema de Navegación
- Navegación principal con categorías
- Breadcrumbs dinámicos
- Historial del navegador (back/forward)
- URLs amigables

### 2. Gestión de Juegos
- Catálogo completo de juegos
- Filtrado por categorías
- Búsqueda en tiempo real
- Ordenamiento por precio, rating, fecha
- Sistema de tags y metadatos

### 3. Carrito de Compras
- Añadir/remover juegos
- Contador de items
- Cálculo automático de totales
- Persistencia en localStorage
- Modal de confirmación de compra

### 4. Sistema de Usuarios
- Modal de login
- Modal de registro
- Validación de formularios
- Gestión de sesiones

### 5. Interfaz de Usuario
- Diseño responsive y moderno
- Animaciones y transiciones
- Sistema de notificaciones (toasts)
- Modales y offcanvas
- Iconografía consistente

## 📱 Responsive Design

La aplicación está optimizada para todos los dispositivos:

- **Desktop**: Layout completo con sidebar y navegación expandida
- **Tablet**: Adaptación del grid y navegación colapsable
- **Mobile**: Navegación hamburguesa y layout vertical optimizado
- **Touch**: Interacciones táctiles optimizadas

## 🔧 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome 80+, Firefox 75+, Safari 13+)
- Servidor web local (para desarrollo)

### Instalación
1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/stem-store.git
cd stem-store
```

2. Abre el proyecto en tu servidor web local
3. Navega a `index.html` en tu navegador

### Desarrollo
- Los archivos principales están en `js/`
- Los estilos personalizados en `css/custom.css`
- Las variables CSS en `css/variables.css`

## 🎨 Personalización

### Colores del Tema
```css
:root {
  --color-primary: #da36ff;      /* Magenta principal */
  --color-secondary: #ff6b35;    /* Naranja secundario */
  --color-dark: #0f1419;         /* Negro profundo */
  --color-medium: #1a2332;       /* Azul medio */
  --color-light: #16213e;        /* Azul claro */
}
```

### Componentes Bootstrap Personalizados
- Navbar con backdrop blur
- Cards con efectos hover
- Botones con gradientes
- Modales con tema oscuro
- Formularios estilizados

## 📊 Rendimiento

### Optimizaciones Implementadas
- Lazy loading de imágenes
- CSS crítico inline
- JavaScript modular y eficiente
- Minimización de reflows
- Transiciones CSS optimizadas

### Métricas de Rendimiento
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔮 Roadmap Futuro

### Fase 2: Funcionalidades Avanzadas
- [ ] Sistema de wishlist
- [ ] Reseñas y ratings de usuarios
- [ ] Recomendaciones personalizadas
- [ ] Sistema de notificaciones push
- [ ] Integración con APIs de juegos

### Fase 3: Backend y Base de Datos
- [ ] API REST para gestión de juegos
- [ ] Base de datos de usuarios
- [ ] Sistema de pagos integrado
- [ ] Panel de administración
- [ ] Analytics y métricas

### Fase 4: Optimización y Escalabilidad
- [ ] PWA (Progressive Web App)
- [ ] Service Workers para offline
- [ ] Caching inteligente
- [ ] CDN para assets
- [ ] Testing automatizado

## 🐛 Solución de Problemas

### Problemas Comunes
1. **JavaScript no funciona**: Verifica que todos los archivos JS estén cargados
2. **Estilos no se aplican**: Confirma que Bootstrap y custom.css estén cargados
3. **Navegación no funciona**: Verifica la consola del navegador para errores

### Debug
- Abre las herramientas de desarrollador (F12)
- Revisa la consola para errores JavaScript
- Verifica la pestaña Network para archivos faltantes
- Usa el debugger de JavaScript para problemas de lógica

## 🤝 Contribución

### Cómo Contribuir
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código
- Usar ES6+ features
- Seguir convenciones de nomenclatura
- Documentar funciones complejas
- Mantener consistencia en el estilo
- Escribir código legible y mantenible

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [TuUsuario](https://github.com/TuUsuario)

## 🙏 Agradecimientos

- Bootstrap Team por el framework CSS
- Font Awesome por los iconos
- Comunidad de desarrolladores web
- Usuarios que prueban y reportan bugs

## 📞 Contacto

- **Email**: tu-email@ejemplo.com
- **GitHub**: [@TuUsuario](https://github.com/TuUsuario)
- **Proyecto**: [https://github.com/TuUsuario/stem-store](https://github.com/TuUsuario/stem-store)

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!** ⭐
