import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="wimmelbild-container">
    <h1>Wimmelbild</h1>
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

// Initialisiere das Gitter nach dem Laden der Seite
createGrid();
