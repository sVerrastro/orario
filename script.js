var orario = [];
var today;
var currentDayIndex = new Date().getDay();

document.addEventListener('DOMContentLoaded', (event) => {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            orario = data;
            getDay();
            drawChart();
        })
        .catch(error => console.error('Error fetching the JSON data:', error));

    document.getElementById('next-day-btn').addEventListener('click', () => {
        switchToNextDay();
    });
});

function getDay() {
    const giorni = ["domenica", "lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato"];
    let dayName = giorni[currentDayIndex];
    today = orario[dayName];
    
    let box = document.getElementById('box');
    box.innerHTML = `<h2 class="day-title" style="color: var(--accent-color);">${dayName.charAt(0).toUpperCase() + dayName.slice(1)}</h2>`;
}

function drawChart() {
    let box = document.getElementById('box');

    if (!today || Object.keys(today).length === 0) {
        box.innerHTML += "<p>Nessuna lezione oggi.</p>";
        return;
    }

    for (let time in today) {
        let riga = document.createElement('div');
        riga.classList.add('row');

        let col1 = document.createElement('div');
        col1.classList.add('col');
        col1.innerText = time;

        let col2 = document.createElement('div');
        col2.classList.add('col');
        col2.innerText = today[time];

        riga.appendChild(col1);
        riga.appendChild(col2);
        box.appendChild(riga);
    }
}

function switchToNextDay() {
    const giorni = ["domenica", "lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato"];
    
    currentDayIndex = (currentDayIndex + 1) % giorni.length;
    
    getDay();
    drawChart();
}
