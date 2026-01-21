// Initialize EmailJS
(function() {
    // REPLACE 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
    emailjs.init("YOUR_PUBLIC_KEY"); 
})();

// Typing Effect
const typingText = document.getElementById('typing-text');
const phrases = ["Full Stack Developer", "Java Expert", "AI/ML Enthusiast"];
let phraseIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < phrases[phraseIndex].length) {
        typingText.textContent += phrases[phraseIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    type();
    initScrollReveal();
});

// Scroll Reveal with Intersection Observer
function initScrollReveal() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Trigger counters if visible
                if (entry.target.classList.contains('about-section')) {
                    startCounters();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// Animated Counters
function startCounters() {
    const counters = document.querySelectorAll('.number');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200; 
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
}

// Certification Slider
const slider = document.getElementById('cert-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => isDown = false);
slider.addEventListener('mouseup', () => isDown = false);
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
});

// Modal for Certificates
const modal = document.getElementById('cert-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close-modal');

document.querySelectorAll('.cert-item img').forEach(img => {
    img.onclick = function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
    }
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

// Contact Form with EmailJS
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const loader = document.getElementById('loader');
const responseMsg = document.getElementById('form-response');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Visual feedback
    btnText.classList.add('hidden');
    loader.classList.remove('hidden');
    submitBtn.disabled = true;

    // Parameters for EmailJS
    // Replace IDs with your specific EmailJS Service/Template IDs
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            loader.classList.add('hidden');
            btnText.classList.remove('hidden');
            btnText.innerText = "Sent Successfully!";
            submitBtn.style.background = "#28a745";
            contactForm.reset();
            
            setTimeout(() => {
                btnText.innerText = "Send Message";
                submitBtn.style.background = "";
                submitBtn.disabled = false;
            }, 5000);
        }, (err) => {
            loader.classList.add('hidden');
            btnText.classList.remove('hidden');
            alert("Failed to send message. Error: " + JSON.stringify(err));
            submitBtn.disabled = false;
        });
});
// --- ANIMATED BACKGROUND SCRIPT ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;

// Resize canvas to fit window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        // Mix of Matte Orange and Navy/Gold
        const colors = ['#e67e22', '#ffca2c', '#112240', '#cf6a12'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
    }
}

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw a very subtle base gradient
    const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, canvas.width
    );
    gradient.addColorStop(0, '#112240');
    gradient.addColorStop(1, '#0a0b10');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateBackground);
}

createParticles();
animateBackground();