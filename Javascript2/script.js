// Animal Drum Kit - Same base logic
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(e) {
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return;
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

// Also allow clicking with mouse
function playSoundByClick(e) {
  const keyDiv = e.currentTarget;
  const keyCode = keyDiv.getAttribute('data-key');
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (!audio) return;
  keyDiv.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);
  key.addEventListener('click', playSoundByClick);
});
window.addEventListener('keydown', playSound);
