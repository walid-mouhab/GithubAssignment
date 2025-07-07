/* 
   Walid Mouhab  
  07/06/2025 
 Animal Sound Drum Kit
  Adapted from Wes Bos' JavaScript30: https://github.com/wesbos/JavaScript30  

  What I Improved:
  - Kept the same logic from the original JavaScript30 Drum Kit
  - Added support for clicking the animal icons (not just keyboard keys)
  - Now users can play sounds by pressing keys A–L or clicking the images
  - Used animal sounds and icons instead of drum sounds
*/


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

//  allow clicking with mouse
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
