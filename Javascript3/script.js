// Walid Mouhab | 07/13/2025  
// Adapted from Wes Bos' JavaScript30: https://github.com/wesbos/JavaScript30  
// Additional help from: https://stackoverflow.com  
//
//  new functionality:
// - Upload an image
// - Apply filters: blur, brightness, zoom
// - Reset the filters
// - Download the edited image using a canvas snapshot




const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

//  Photo Editor Controls
const photoInput = document.getElementById('photoInput');
const uploadedPhoto = document.getElementById('uploadedPhoto');

const blurControl = document.getElementById('blurControl');
const brightnessControl = document.getElementById('brightnessControl');
const scaleControl = document.getElementById('scaleControl');
const bgColorPicker = document.getElementById('bgColorPicker');
const photoBox = document.querySelector('.photo-box');

//  Load image from file input
photoInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    uploadedPhoto.src = URL.createObjectURL(file);
    uploadedPhoto.style.display = 'block';
    photoBox.style.backgroundColor = 'transparent';
    photoBox.style.backgroundImage = 'none';
  }
});

//  Apply filters to image or background
function updateImageStyles() {
  if (uploadedPhoto.style.display === 'none') {
    photoBox.style.filter = `blur(${blurControl.value}px) brightness(${brightnessControl.value}%)`;
  } else {
    uploadedPhoto.style.filter = `blur(${blurControl.value}px) brightness(${brightnessControl.value}%)`;
    photoBox.style.filter = 'none';
  }
  uploadedPhoto.style.transform = `scale(${scaleControl.value})`;
}

blurControl.addEventListener('input', updateImageStyles);
brightnessControl.addEventListener('input', updateImageStyles);
scaleControl.addEventListener('input', updateImageStyles);

//  Reset Button
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', () => {
  blurControl.value = 0;
  brightnessControl.value = 100;
  scaleControl.value = 1;
  updateImageStyles();
});

//  Download Button
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = uploadedPhoto;

  if (!img.src) return;

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.filter = `blur(${blurControl.value}px) brightness(${brightnessControl.value}%)`;
  ctx.drawImage(img, 0, 0);

  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

//  Background Color Picker
bgColorPicker.addEventListener('input', () => {
  uploadedPhoto.style.display = 'none';
  photoBox.style.backgroundColor = bgColorPicker.value;
  photoBox.style.backgroundImage = 'none';
});

//  Mode Toggle: "Image" or "Color"
const modeRadios = document.querySelectorAll('input[name="mode"]');

function updateModeUI(mode) {
  if (mode === 'image') {
    photoInput.style.display = 'block';
    uploadedPhoto.style.display = 'block';
    bgColorPicker.parentElement.style.display = 'none';
    photoBox.style.backgroundColor = 'transparent';
  } else {
    photoInput.style.display = 'none';
    uploadedPhoto.style.display = 'none';
    bgColorPicker.parentElement.style.display = 'flex';
    photoBox.style.backgroundColor = bgColorPicker.value;
  }
}

modeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    updateModeUI(radio.value);
  });
});

updateModeUI('image'); 


