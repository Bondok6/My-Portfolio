'use strict';

// SIDE NAVBAR
const icons = document.querySelectorAll('.icons span');

const clearActive = function () {
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
  isMoved: false,
};

const Particle = function () {
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
  update: function () {
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
  render: function (ctx) {
    ctx.save();
    ctx.fillStyle =
      'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },
  reset: function (tx, ty) {
    this.x = tx;
    this.y = ty;
    this.vx = Math.random() * 4 - 1;
    this.vy = Math.random() * 4 - 1;
    this.life = 150;
    this.a = 1;
    this.g = Math.round(255 * (this.x / WIDTH));
    this.b = Math.round(255 * (this.y / HEIGHT));
    this.radius = Math.random() * 5;
  },
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
  y: HEIGHT / 2,
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

c.addEventListener('mousemove', function (e) {
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
$(document).ready(function () {
  const entries = [
    { label: 'JavaScript' },
    { label: 'HTML5' },
    { label: 'CSS3' },
    { label: 'Bootstrap5' },
    { label: 'BEM' },
    { label: 'Git' },
    { label: 'Github' },
    { label: 'SASS' },
    { label: 'Python3' },
    { label: 'React.js' },
    { label: 'Redux' },
    { label: '@toolkit' },
    { label: 'OOP' },
    { label: 'JSON' },
    { label: 'ES5/ES6' },
    { label: 'npm' },
    { label: 'Ajax' },
    { label: 'Figma' },
    { label: 'Webpack' },
    { label: 'Jest' },
    { label: 'Vue' },
    { label: 'Vuex' },
    { label: 'Nuxt' },
    { label: 'Ruby' },
    { label: 'Ruby on Rails' },
    { label: 'RSpec' },
    { label: 'PostgreSQL' },
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
    fontColor: '#08fdd8',
  };

  $('#tag').svg3DTagCloud(settings);
});

// Contact me Form
const form = document.getElementById('my-form');

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById('status');
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      status.classList.add('success');
      status.innerHTML = 'Thanks for your submission!';
      form.reset();
    })
    .catch((error) => {
      status.classList.add('error');
      status.innerHTML = 'Oops! There was a problem submitting your form';
    });
}
form.addEventListener('submit', handleSubmit);
// Scroll animation
const scrollAnimation = function () {
  window.addEventListener('scroll', () => {
    const content = document.querySelector('.about__info');
    let contentPos = content.getBoundingClientRect().top;
    let screenPos = window.innerHeight;
    if (contentPos < screenPos) {
      content.classList.add('about_scroll');
    } else {
      content.classList.remove('about_scroll');
    }
  });
};
scrollAnimation();

// The Sound

const soundBtn = document.querySelector('#sound span');
const soundLogo = document.querySelector('path');
const sound = new Audio();
sound.setAttribute('src', '../audio/sound.mp3');

const turnOnSound = function () {
  soundBtn.textContent = 'ON';
  soundBtn.style.color = '#08fdd8';
  soundLogo.style.fill = '#08fdd8';
  sound.play();
};

const turnOffSound = function () {
  soundBtn.textContent = 'OFF';
  soundBtn.style.color = '#fd1056';
  soundLogo.style.fill = '#fd1056';
  sound.pause();
};

const theSound = function () {
  soundBtn.addEventListener('click', () => {
    soundBtn.textContent == 'ON' ? turnOffSound() : turnOnSound();
  });
};
theSound();

// Disable inspect element

// Disable Right Click
// document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable keyboard
document.onkeydown = function (e) {
  if (e.code == 'F12') return false;
  if (e.ctrlKey && e.shiftKey && e.code === 'KeyI') return false;
  if (e.ctrlKey && e.shiftKey && e.code == 'KeyJ') return false;
  if (e.ctrlKey && e.code == 'KeyU') return false;
};

// Leaflet -> third-party library to display map

const coords = [31.2508271, 32.3189202];
const map = L.map('map').setView(coords, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker(coords).addTo(map).bindPopup('Hi, I am here 👋').openPopup();

// My Projects
const projects = [
  {
    img: '../imgs/worldData.PNG',
    title: 'World Data',
    description:
      'A web application that provides information about each country in the world. The App is based on an external API that allows users to filter these countries by selecting a specific country.',
    live: 'https://bondok-world-data.herokuapp.com/',
    github: 'https://github.com/Bondok6/world-data',
  },
  {
    img: '../imgs/taste-food.PNG',
    title: 'Taste Food',
    description:
      'Taste food is a web application based on an external food API, showing data about foods and we used Used involvement API to record the different user interactions (likes, comments).',
    live: 'https://bondok6.github.io/Taste-Food/',
    github: 'https://github.com/Bondok6/taste-food/',
  },
  {
    img: '../imgs/todo-list.PNG',
    title: 'Todo List',
    description:
      'In this project, I built a simple To-Do App for managing the daily tasks and to keep track on tasks during the day.',
    live: 'https://bondok6.github.io/ToDo-List/',
    github: 'https://github.com/Bondok6/ToDo-List/',
  },
  {
    img: '../imgs/space-travelers.PNG',
    title: 'Space Travelers',
    description:
      'A web app that provides commercial and scientific space travel services. The app allows users to book rockets and join selected space missions using real live data from the SpaceX API.',
    live: 'https://space-travelers.herokuapp.com/',
    github: 'https://github.com/Bondok6/space-travelers',
  },
  {
    img: '../imgs/natours.PNG',
    title: 'Natours',
    live: 'https://bondok6.github.io/Natours/',
    github: 'https://github.com/Bondok6/Natours',
  },
  {
    img: '../imgs/math-magicians.PNG',
    title: 'Math Magicians',
    description:
      'A website for all fans of mathematics. It is a React.js project that allows users to make simple calculations and read a random math-related quote.',
    live: 'https://bondok6.github.io/math-magicians/',
    github: 'https://github.com/Bondok6/math-magicians',
  },
  {
    img: '../imgs/Leaderboard.PNG',
    title: 'Leaderboard',
    description:
      'A website displays scores submitted by different players. All data is preserved thanks to the external Leaderboard API.',
    live: 'https://bondok6.github.io/Leaderboard/',
    github: 'https://github.com/Bondok6/Leaderboard/',
  },
  {
    img: '../imgs/green-travel.PNG',
    title: 'Green Travel',
    description:
      'This is a website for tourism and traveling around the world, exploring the world, and offering exciting tours for adventurers.',
    live: 'https://bondok6.github.io/Green-Travel/',
    github: 'https://github.com/Bondok6/Green-Travel',
  },
  {
    img: '../imgs/awesome-books.PNG',
    title: 'Awesome Books',
    description:
      'In this project, I built a basic website that allows users to add/remove books from a book list.',
    live: 'https://bondok6.github.io/Awesome-Books/',
    github: 'https://github.com/Bondok6/Awesome-Books',
  },
  {
    img: '../imgs/mapty-app.PNG',
    title: 'Mapty App',
    description:
      'In this app, you can log your running or cycling workouts with location,distance, time, and steps/minute. You can also see all your workouts on a map.',
    live: 'https://bondok6.github.io/Mapty-app/',
    github: 'https://github.com/Bondok6/Mapty-app',
  },
  {
    img: '../imgs/pigGame.PNG',
    title: 'Pig Game',
    description:
      'Dice Game. Each turn, a player repeatedly rolls a die until either a 1 is rolled or the player decides to "hold". Go to Github to read more...',
    live: 'https://bondok6.github.io/Pig-Game/',
    github: 'https://github.com/Bondok6/Pig-Game',
  },
  {
    img: '../imgs/Bankist.PNG',
    title: 'Bankist',
    description:
      'A beautiful website with a lot of different components and visual effects that require some pretty advanced DOM manipulation techniques.',
    live: 'https://bondok6.github.io/Bankist/',
    github: 'https://github.com/Bondok6/Bankist',
  },
  {
    img: '../imgs/expense-tracker.PNG',
    title: 'Expense Tracker',
    description:
      'App helps you manage your money on the go. By understanding what you spend money on and how much you spend, you can see exactly where your cash is going.',
    live: 'https://bondok6.github.io/Expense-tracker-app/',
    github: 'https://github.com/Bondok6/Expense-tracker-app',
  },
  {
    img: '../imgs/zenva.png',
    title: 'Zenva',
    description:
      'A website for Zenva, a company that provides a variety of services to the people of the world.',
    live: 'https://bondok6.github.io/Zenva/',
    github: 'https://github.com/Bondok6/ZENVA',
  },
  {
    img: '../imgs/qualby.jpg',
    title: 'Qualby Etmaa`n',
    description:
      'Qualby_Etmaa`n, A website to display episodes of a famous Arabic program shown on YouTube',
    live: 'https://qalby-etma2n.herokuapp.com/',
    github: 'https://github.com/Bondok6/qalby_etmaa-n',
  },
];

const cards = document.querySelector('.cards');

const createCard = (projects) => {
  projects.forEach((project) => {
    let html = `
              <div class="card">
                <div class="face face1">
                    <div class="content">
                        <img src="${project.img}" alt="project-icon" />
                        <h3>${project.title}</h3>
                    </div>
                </div>
                <div class="face face2">
                    <div class="content">
                        <p>${project.description}</p>
                        <a href="${project.live}" target="_blank"
                            class="btnCard">Go
                            Live</a>
                        <a href="${project.github}" target="_blank"
                            class="btnCard">Github</a>
                    </div>
                </div>
            </div>`;
    cards.innerHTML += html;
  });
};

createCard(projects);
