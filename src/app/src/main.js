import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="wimmelbild-container">
    <h1>Wimmelbild</h1>
    
    <div class="color-picker-container">
      <label class="color-picker-label" for="gridColorPicker">Gitterlinienfarbe:</label>
      <input type="color" id="gridColorPicker" class="color-picker" value="#ff0000" />
      
      <div class="preset-colors">
        <div class="preset-color active" style="background-color: #ff0000" data-color="#ff0000" title="Rot"></div>
        <div class="preset-color" style="background-color: #0066ff" data-color="#0066ff" title="Blau"></div>
        <div class="preset-color" style="background-color: #00cc00" data-color="#00cc00" title="Grün"></div>
        <div class="preset-color" style="background-color: #ff6600" data-color="#ff6600" title="Orange"></div>
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
    </div>
  </div>
`

// Konvertiere Hex-Farbe zu RGB-Werten
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Ändere die Gitterlinienfarbe
function changeGridColor(colorHex) {
  const rgb = hexToRgb(colorHex);
  if (rgb) {
    const root = document.documentElement;
    root.style.setProperty('--grid-line-color', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }
}

// Initialisiere den Colorpicker
function initializeColorPicker() {
  const colorPicker = document.getElementById('gridColorPicker');
  const presetColors = document.querySelectorAll('.preset-color');

  // Event-Listener für den Colorpicker
  colorPicker.addEventListener('change', (e) => {
    changeGridColor(e.target.value);
    // Entferne active-Klasse von allen Preset-Farben
    presetColors.forEach(preset => preset.classList.remove('active'));
  });

  // Event-Listener für Preset-Farben
  presetColors.forEach(preset => {
    preset.addEventListener('click', () => {
      const color = preset.dataset.color;
      changeGridColor(color);
      colorPicker.value = color;

      // Aktualisiere active-Klasse
      presetColors.forEach(p => p.classList.remove('active'));
      preset.classList.add('active');
    });
  });
}

// Erstelle das Koordinatengitter
function createGrid() {
  const gridOverlay = document.querySelector('.grid-overlay');

  // Erstelle 10x10 Gitterzellen
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.row = row + 1;
      cell.dataset.col = String.fromCharCode(65 + col); // A-J
      cell.title = `${String.fromCharCode(65 + col)}${row + 1}`;

      // Optional: Füge Click-Handler hinzu
      cell.addEventListener('click', () => {
        console.log(`Clicked on ${cell.dataset.col}${cell.dataset.row}`);
      });

      gridOverlay.appendChild(cell);
    }
  }
}

// Initialisiere alles nach dem Laden der Seite
createGrid();
initializeColorPicker();
