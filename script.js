import { Application } from 'https://unpkg.com/@splinetool/runtime@1.0.50/build/runtime.js';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/gBVxx9uvdJZBlYNO/scene.splinecode');

const cursorLight = document.getElementById('cursorLight');
const shapes = document.querySelectorAll('.geometric-shape');

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  cursorLight.style.left = mouseX + 'px';
  cursorLight.style.top = mouseY + 'px';

  const normalizedX = (mouseX / window.innerWidth - 0.5) * 2;
  const normalizedY = (mouseY / window.innerHeight - 0.5) * 2;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.02;
    const x = normalizedX * speed * 20;
    const y = normalizedY * speed * 20;

    const rect = shape.getBoundingClientRect();
    const shapeCenterX = rect.left + rect.width / 2;
    const shapeCenterY = rect.top + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(mouseX - shapeCenterX, 2) + Math.pow(mouseY - shapeCenterY, 2)
    );

    if (distance < 200) {
      shape.classList.add('illuminated');
    } else {
      shape.classList.remove('illuminated');
    }

    shape.style.transform += ` translate(${x}px, ${y}px)`;
  });
});

document.addEventListener('mouseleave', () => {
  cursorLight.classList.add('hidden');
  shapes.forEach(shape => {
    shape.classList.remove('illuminated');
    shape.style.transform = shape.style.transform.replace(/translate\([^)]*\)/g, '');
  });
});

document.addEventListener('mouseenter', () => {
  cursorLight.classList.remove('hidden');
});

document.addEventListener('mouseleave', () => {
  shapes.forEach(shape => {
    shape.style.transform = shape.style.transform.replace(/translate\([^)]*\)/g, '');
  });
});

// Load tsParticles
const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/tsparticles-slim@2.0.6/tsparticles.slim.bundle.min.js";
script.onload = () => {
  tsParticles.load("tsparticles", {
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
      },
      modes: {
        push: { quantity: 6 },
        repulse: { distance: 100 },
      },
    },
    particles: {
      links: {
        enable: true,
        opacity: 0.2,
        distance: 150,
      },
      move: {
        enable: true,
        speed: { min: 1, max: 3 },
      },
      opacity: {
        value: { min: 0.0 },
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
  });
};
document.head.appendChild(script);


const text = "hey! i'm Parth";
const speed = 100;    
const delayBeforeStart = 1000; 
const holdTime = 1500;   
const resetTime = 500;  

let i = 0;
const element = document.getElementById("typewriter");

function typeEffect() {
  if (i < text.length) {
    element.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, speed);
  } else {
    setTimeout(() => {
      element.textContent = ""; 
      i = 0;
      setTimeout(typeEffect, resetTime);
    }, holdTime);
  }
}

// Start after 1-second delay
window.onload = () => {
  setTimeout(typeEffect, delayBeforeStart);
};

function animateCountUp(element, target, duration) {
    let start = 0;
    let startTime = null;
  
    function updateCount(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.textContent = Math.floor(progress * target) + "+";
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    }
    requestAnimationFrame(updateCount);
  }
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCountUp(document.getElementById('count-leetcode'), 250, 2000);
        animateCountUp(document.getElementById('count-hackathons'), 7, 2000);
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(document.querySelector('.stats-section'));
  
