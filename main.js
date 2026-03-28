import './style.css'

// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle')
const htmlElement = document.documentElement

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'light'
if (savedTheme === 'dark') {
  htmlElement.classList.add('dark')
}

// Navbar Scroll Logic
const navbar = document.querySelector('.navbar')
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled')
  } else {
    navbar.classList.remove('navbar-scrolled')
  }
})

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn')
const navMenu = document.getElementById('nav-menu')

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active')
    
    // Toggle menu icon between burger and close
    const isExpanded = navMenu.classList.contains('active')
    mobileMenuBtn.innerHTML = isExpanded 
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  })

  // Close menu when a link is clicked
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active')
      mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    })
  })
}

// Ensure star/moon is animated well
themeBtn.addEventListener('click', () => {
  htmlElement.classList.toggle('dark')
  
  if (htmlElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark')
  } else {
    localStorage.setItem('theme', 'light')
  }
})

// Scroll Reveal with IntersectionObserver
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el)
})

// Smooth Parallax Effects
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    let scrollY = window.pageYOffset;
    parallaxElements.forEach(el => {
      let speed = el.getAttribute('data-speed') || 0.1;
      // move element on Y axis based on scroll speed
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
});

// Sparkle Generation
function createSparkles() {
  const container = document.getElementById('sparkles');
  if (!container) return;
  
  const numSparkles = 15;
  for (let i = 0; i < numSparkles; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // random positions
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    
    // random animation delays
    sparkle.style.animationDelay = `${Math.random() * 5}s`;
    
    // random size
    const size = Math.random() * 10 + 10; // 10px to 20px
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    container.appendChild(sparkle);
  }
}

// Contact Form Reveal
const sayHelloBtn = document.getElementById('say-hello-btn');
const contactForm = document.getElementById('contact-form');

if (sayHelloBtn && contactForm) {
  sayHelloBtn.addEventListener('click', () => {
    sayHelloBtn.style.display = 'none';
    contactForm.classList.remove('hidden');
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    try {
      // Send data to Vercel Serverless Function
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response.ok) {
        btn.innerHTML = 'Message Sent! 🚀';
        btn.style.backgroundColor = '#4CAF50';
        btn.style.color = '#fff';
        contactForm.reset();
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
          btn.disabled = false;
          contactForm.classList.add('hidden');
          sayHelloBtn.style.display = 'inline-block';
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
      btn.innerHTML = 'Error Sending ❌';
      btn.style.backgroundColor = '#f44336';
      btn.style.color = '#fff';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3000);
    }
  });
}

createSparkles();
