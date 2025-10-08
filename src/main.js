import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="wimmelbild-container">
    <div class="header-section">
      <h1>Wimmelbild</h1>
      <div class="settings-controls">
        <button class="settings-button" id="settingsButton">
          <svg class="settings-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="color-picker-container hidden" id="colorPickerContainer">
      <label class="color-picker-label" for="gridColorPicker">Gitterlinienfarbe:</label>
      <input type="color" id="gridColorPicker" class="color-picker" value="#ffffff" />
      
      <div class="preset-colors">
        <div class="preset-color active" style="background-color: #ffffff" data-color="#ffffff" title="Weiss"></div>
        <div class="preset-color" style="background-color: #ff0000" data-color="#ff0000" title="Rot"></div>
        <div class="preset-color" style="background-color: #0066ff" data-color="#0066ff" title="Blau"></div>
        <div class="preset-color" style="background-color: #00cc00" data-color="#00cc00" title="Grün"></div>
        <div class="preset-color" style="background-color: #9900cc" data-color="#9900cc" title="Lila"></div>
        <div class="preset-color" style="background-color: #000000" data-color="#000000" title="Schwarz"></div>
      </div>
    </div>
    
    <div class="game-area">
      <div class="coordinates-container">
        <div class="column-labels">
          <div class="corner-cell"></div>
          <div class="label">A</div>
          <div class="label">B</div>
          <div class="label">C</div>
          <div class="label">D</div>
          <div class="label">E</div>
          <div class="label">F</div>
          <div class="label">G</div>
          <div class="label">H</div>
          <div class="label">I</div>
          <div class="label">J</div>
        </div>
        <div class="main-content">
          <div class="row-labels">
            <div class="label">1</div>
            <div class="label">2</div>
            <div class="label">3</div>
            <div class="label">4</div>
            <div class="label">5</div>
            <div class="label">6</div>
            <div class="label">7</div>
            <div class="label">8</div>
            <div class="label">9</div>
            <div class="label">10</div>
          </div>
          <div class="image-container">
            <img src="/wimmelbild_stadt.jpg" alt="Wimmelbild" class="wimmelbild-image" />
            <div class="grid-overlay"></div>
          </div>
        </div>
      </div>
      <div class="image-reference">
        Quelle: <a href="https://pin.it/4a7zOfpkt" target="_blank" rel="noopener noreferrer">https://pin.it/4a7zOfpkt</a>
      </div>
    </div>
  </div>
`

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function changeGridColor(colorHex) {
  const rgb = hexToRgb(colorHex);
  if (rgb) {
    const root = document.documentElement;
    root.style.setProperty('--grid-line-color', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }
}

function initializeColorPicker() {
  const colorPicker = document.getElementById('gridColorPicker');
  const presetColors = document.querySelectorAll('.preset-color');

  colorPicker.addEventListener('change', (e) => {
    changeGridColor(e.target.value);
    presetColors.forEach(preset => preset.classList.remove('active'));
  });

  presetColors.forEach(preset => {
    preset.addEventListener('click', () => {
      const color = preset.dataset.color;
      changeGridColor(color);
      colorPicker.value = color;

      presetColors.forEach(p => p.classList.remove('active'));
      preset.classList.add('active');
    });
  });
}

function initializeSettingsButton() {
  const settingsButton = document.getElementById('settingsButton');
  const colorPickerContainer = document.getElementById('colorPickerContainer');

  settingsButton.addEventListener('click', () => {
    colorPickerContainer.classList.toggle('hidden');
  });
}

function createGrid() {
  const gridOverlay = document.querySelector('.grid-overlay');

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.row = row + 1;
      cell.dataset.col = String.fromCharCode(65 + col); // A-J
      cell.title = `${String.fromCharCode(65 + col)}${row + 1}`;

      cell.addEventListener('click', () => {
        console.log(`Clicked on ${cell.dataset.col}${cell.dataset.row}`);
      });

      gridOverlay.appendChild(cell);
    }
  }
}

createGrid();
initializeColorPicker();
initializeSettingsButton();
