/*
  Walid Mouhab | 07/20/2025

  Based on Wes Bos' JavaScript30 - Mouse Shadow project

  I added and improved:
  - A modern animated gradient background
  - A styled input box with a prompt to enter a custom name
  - Five rainbow-colored circles that follow the mouse
  - Modern CSS effects (shadows, transitions, responsive layout)

  Help and references:
  - "Coding Sameer" Facebook page
*/

const hero = document.querySelector('.hero');
const text = document.getElementById('shadowText');
const nameField = document.getElementById('nameField');
const walk = 500;


function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;

  if (e.target !== hero) {
    x += e.target.offsetLeft;
    y += e.target.offsetTop;
  }

  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
  `;
}
hero.addEventListener('mousemove', shadow);

// Update text if user types a name
nameField.addEventListener('input', () => {
  const name = nameField.value.trim();
  text.textContent = name || 'JavaScript';
});

//  Circles follow mouse
const circles = document.querySelectorAll('.circle');
const coords = { x: 0, y: 0 };

circles.forEach((circle, i) => {
  circle.style.zIndex = i;
});

window.addEventListener('mousemove', e => {
  coords.x = e.clientX;
  coords.y = e.clientY;

  circles.forEach((circle, i) => {
    setTimeout(() => {
      circle.style.left = `${coords.x}px`;
      circle.style.top = `${coords.y}px`;
    }, i * 60);
  });
});
