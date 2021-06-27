'use strict';

// SIDE NAVBAR
const icons = document.querySelectorAll('.icons span');

const clearActive = function() {
	icons.forEach((icon) => {
		icon.style.borderBottom = `none`;
		icon.classList.remove('active');
	});
};

icons.forEach((icon) => {
	icon.addEventListener('click', () => {
		clearActive();
		icon.style.borderBottom = `2px solid cyan`;
		icon.classList.add('active');
	});
});

// Mouse Hover Animation
const c = document.getElementById('c');
const ctx = c.getContext('2d');

const WIDTH = (c.width = window.innerWidth);
const HEIGHT = (c.height = window.innerHeight);
const mouse = {
	x: 0,
	y: 0,
	isMoved: false
};

const Particle = function() {
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.r = 255;
	this.g = 255;
	this.b = 255;
	this.a = 0;
	this.life = 0;
	this.radius = Math.random() * 5;
};

Particle.prototype = {
	constructor: Particle,
	update: function() {
		if (this.life > 0) {
			this.life -= 2;
			if (this.life < 50) {
				this.vx += Math.random() * 4 - 2;
				this.vy += Math.random() * 4 - 2;
				this.vx *= 0.9;
				this.vy *= 0.9;
				this.x += this.vx;
				this.y += this.vy;
				this.a = this.life / 50;
			}
		}
	},
	render: function(ctx) {
		ctx.save();
		ctx.fillStyle = 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
		ctx.translate(this.x, this.y);
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	},
	reset: function(tx, ty) {
		this.x = tx;
		this.y = ty;
		this.vx = Math.random() * 4 - 1;
		this.vy = Math.random() * 4 - 1;
		this.life = 150;
		this.a = 1;
		this.g = Math.round(255 * (this.x / WIDTH));
		this.b = Math.round(255 * (this.y / HEIGHT));
		this.radius = Math.random() * 5;
	}
};

let particles = [];
let particle = null;
let particleCount = 500;
let tx = 0;
let ty = HEIGHT / 2;
let idx = 0;
let temp = {
	vx: Math.random() * 4 - 2,
	vy: Math.random() * 4 - 2,
	x: WIDTH / 2,
	y: HEIGHT / 2
};

for (var i = 0; i < particleCount; i++) {
	particle = new Particle();
	particles.push(particle);
}

function spawn(target) {
	tx += (target.x - tx) * 0.2;
	ty += (target.y - ty) * 0.2;

	particles[idx].reset(tx, ty);
	if (++idx >= particles.length) idx = 0;
}

c.addEventListener('mousemove', function(e) {
	let rect = c.getBoundingClientRect();
	mouse.x = e.clientX - rect.left;
	mouse.y = e.clientY - rect.top;
	mouse.isMoved = true;

	spawn(mouse);
});

requestAnimationFrame(function loop() {
	requestAnimationFrame(loop);
	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	if (!mouse.isMoved) {
		temp.vx += Math.random() * 4 - 2;
		temp.vy += Math.random() * 4 - 2;
		temp.vx *= 0.98;
		temp.vy *= 0.98;
		temp.x += temp.vx;
		temp.y += temp.vy;
		if (temp.x > WIDTH) {
			temp.x = WIDTH;
			temp.vx *= -1;
		}
		if (temp.x < 0) {
			temp.x = 0;
			temp.vx *= -1;
		}
		if (temp.y > HEIGHT) {
			temp.y = HEIGHT;
			temp.vy *= -1;
		}
		if (temp.y < 0) {
			temp.y = 0;
			temp.vy *= -1;
		}
		spawn(temp);
	}

	for (let i = 0; i < particleCount; i++) {
		particle = particles[i];
		particle.update();
		particle.render(ctx);
	}
});

// Skills 3D animations
$(document).ready(function() {
	const entries = [
		{ label: 'HTML' },
		{ label: 'CSS' },
		{ label: 'JavaScript' },
		{ label: 'HTML5' },
		{ label: 'CSS3' },
		{ label: 'BEM' },
		{ label: 'Git' },
		{ label: 'Github' },
		{ label: 'SASS' },
		{ label: 'Python' },
		{ label: 'React.js' },
		{ label: 'OOP' },
		{ label: 'JSON' },
		{ label: 'ES5/ES6' },
		{ label: 'npm' },
		{ label: 'Ajax' }
	];

	const settings = {
		entries: entries,
		width: 640,
		height: 480,
		raduis: '65%',
		raduisMin: 75,
		bgDraw: true,
		bgColor: '#1d1d1d',
		opacityOver: 1.0,
		opacityOut: 0.05,
		opacitySpeed: 6,
		fov: 800,
		speed: 1.2,
		fontFamily: 'Courier, Arial, sans-serif',
		fontSize: '1.5rem',
		fontColor: '#08fdd8'
	};

	$('#tag').svg3DTagCloud(settings);
});