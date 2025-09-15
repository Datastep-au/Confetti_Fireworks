class ConfettiPiece {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = Math.random() * -15 - 5;
        this.gravity = 0.3;
        this.friction = 0.99;
        this.size = Math.random() * 8 + 4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#10ac84', '#ee5a24'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.shape = Math.random() > 0.5 ? 'square' : 'circle';
        this.life = 1.0;
        this.decay = Math.random() * 0.01 + 0.005;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.rotation += this.rotationSpeed;
        this.life -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);

        ctx.fillStyle = this.color;

        if (this.shape === 'square') {
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    isDead() {
        return this.life <= 0;
    }
}

class ConfettiSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.confetti = [];
        this.isAnimating = false;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createConfetti(x, y, amount = 50) {
        for (let i = 0; i < amount; i++) {
            this.confetti.push(new ConfettiPiece(x, y));
        }

        if (!this.isAnimating) {
            this.animate();
        }
    }

    animate() {
        this.isAnimating = true;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.confetti.length - 1; i >= 0; i--) {
            const piece = this.confetti[i];
            piece.update();
            piece.draw(this.ctx);

            if (piece.isDead() || piece.y > this.canvas.height + 100) {
                this.confetti.splice(i, 1);
            }
        }

        if (this.confetti.length > 0) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.isAnimating = false;
        }
    }

    burst(x, y) {
        const burstAmount = Math.random() * 50 + 30;

        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createConfetti(
                    x + (Math.random() - 0.5) * 100,
                    y + (Math.random() - 0.5) * 50,
                    burstAmount / 3
                );
            }, i * 100);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('confetti-canvas');
    const button = document.getElementById('confetti-btn');
    const confettiSystem = new ConfettiSystem(canvas);

    button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        confettiSystem.burst(centerX, centerY);

        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});