/* =========================================
   EXPERIENCE TIMELINE — Scroll Animations (Opcional)
   Añade animaciones cuando las tarjetas entran en viewport
   ========================================= */

// Inicializar Intersection Observer para animaciones al scroll
document.addEventListener('DOMContentLoaded', function() {
  
  // Configuración del observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Se activa cuando el 15% es visible
  };

  // Callback cuando un elemento es visible
  const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Añadir clase con delay progresivo
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        
        // Opcional: dejar de observar después de animar
        observer.unobserve(entry.target);
      }
    });
  };

  // Crear el observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observar todas las tarjetas
  const cards = document.querySelectorAll('.about-summary__card');
  cards.forEach(card => {
    // Remover la animación inicial del CSS
    card.style.animation = 'none';
    card.style.opacity = '0';
    
    observer.observe(card);
  });
});

/* =========================================
   CSS adicional para las animaciones de scroll
   (Pegar en tu CSS o agregar mediante JS)
   ========================================= */

const scrollAnimationStyles = `
  .about-summary__card {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .about-summary__card.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Inyectar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = scrollAnimationStyles;
document.head.appendChild(styleSheet);

/* =========================================
   PARALLAX EFFECT en el timeline (Avanzado - Opcional)
   ========================================= */

// Efecto parallax sutil en las tarjetas al hacer scroll
let ticking = false;

function updateParallax() {
  const cards = document.querySelectorAll('.about-summary__card.visible');
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const scrollPercent = (rect.top / window.innerHeight) - 0.5;
    const translateY = scrollPercent * 20; // Ajusta el multiplicador para más/menos efecto
    
    // Aplicar transformación solo si está cerca del viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      card.style.transform = `translateY(${translateY}px)`;
    }
  });
  
  ticking = false;
}

// Throttle para optimizar performance
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

// Activar parallax (comentar si no lo quieres)
// window.addEventListener('scroll', onScroll);

/* =========================================
   HOVER EFFECT mejorado con mouse tracking
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.about-summary__card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-4px)
        scale3d(1.02, 1.02, 1.02)
      `;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale3d(1, 1, 1)';
    });
  });
});

/* =========================================
   CONTADOR ANIMADO para años de experiencia (Extra)
   ========================================= */

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Uso (si tienes un elemento con años de experiencia):
// const yearElement = document.querySelector('.experience-years');
// if (yearElement) {
//   const targetYears = parseInt(yearElement.textContent);
//   animateCounter(yearElement, targetYears);
// }

/* =========================================
   LAZY LOADING para imágenes/iconos (Optimización)
   ========================================= */

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  // Usar con imágenes que tengan data-src en lugar de src
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

/* =========================================
   SMOOTH SCROLL (si tienes navegación interna)
   ========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* =========================================
   PERFORMANCE MONITORING (Dev only)
   ========================================= */

// console.log('Timeline animations initialized');
// console.log(`Cards found: ${document.querySelectorAll('.about-summary__card').length}`);