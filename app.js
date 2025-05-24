let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
let dots = []; // Changed to let for re-assignment on resize
const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];
const numberOfDots = 200; // Increased number of dots

function init() {
    dots = [];
    for (let index = 0; index < numberOfDots; index++) {
        dots.push({
            x:  Math.random() * canvas.width, // Adjusted for smoother initial distribution
            y:  Math.random() * canvas.height, // Adjusted for smoother initial distribution
            size: Math.random() * 3 + 2, // Slightly adjusted size range
            color: arrayColors[Math.floor(Math.random()* arrayColors.length)],
            speedX: (Math.random() - 0.5) * 0.8, // Add horizontal speed
            speedY: (Math.random() - 0.5) * 0.8  // Add vertical speed
        });
    }
}

const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI*2);
        ctx.fill();
    });
}

const moveDots = () => {
    dots.forEach(dot => {
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        // Bounce off the edges
        if (dot.x + dot.size > canvas.width || dot.x - dot.size < 0) {
            dot.speedX = -dot.speedX;
        }
        if (dot.y + dot.size > canvas.height || dot.y - dot.size < 0) {
            dot.speedY = -dot.speedY;
        }
    });
}

let mouseX = 0;
let mouseY = 0;

banner.addEventListener('mousemove', (event) => {
    mouseX = event.pageX - banner.getBoundingClientRect().left;
    mouseY = event.pageY - banner.getBoundingClientRect().top;
});

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveDots();
    drawDots();

    dots.forEach(dot => {
        let distance = Math.sqrt((mouseX - dot.x) ** 2 + (mouseY - dot.y) ** 2);
        if(distance < 150){ // Reduced the connection distance for better visibility with more dots
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 0.5; // Reduced line width
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        }
    });

    requestAnimationFrame(animate);
}

banner.addEventListener('mouseout', () => {
    mouseX = -Infinity; // Effectively disables connections when mouse is out
    mouseY = -Infinity;
});

window.addEventListener('resize', () => {
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;
    init(); // Re-initialize dots on resize
});

init(); // Initialize dots
animate(); // Start the animation loop


document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});