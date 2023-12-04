const canvas = document.getElementById("pieChart");
const ctx = canvas.getContext("2d");

// Datos para el gráfico de pastel
const data = [0.1, 0.2, 0.3, 0.4];
const colors = ["orange", "skyblue", "pink", "yellow"];
const labels = ["10%", "20%", "30%", "40%"];

// Calculo del ángulo para cada porción del pastel
const total = data.reduce((acc, value) => acc + value, 0);
const angles = data.map(value => (Math.PI * 2 * value) / total);

// Configuración del centro del pastel
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = Math.min(canvas.width, canvas.height) / 2;

let rotationAngle = 0; // Ángulo de rotación inicial
const rotationSpeed = 0.01; // Velocidad de rotación

// Genera la leyenda horizontal
const legendContainer = document.getElementById("legend-container");
for (let i = 0; i < data.length; i++) {
    const legendItem = document.createElement("div");
    legendItem.className = "legend-item";
    legendItem.innerHTML = `<div class="legend-color" style="background-color: ${colors[i]}"></div>${labels[i]}`;
    legendContainer.appendChild(legendItem);
}

function animate() {
    // Limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el gráfico de pastel con rotación
    let startAngle = rotationAngle;
    for (let i = 0; i < data.length; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const endAngle = startAngle + angles[i];
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        startAngle = endAngle;

        // Dibujar las etiquetas
        const labelX = centerX + Math.cos(startAngle - angles[i] / 2) * (radius / 2);
        const labelY = centerY + Math.sin(startAngle - angles[i] / 2) * (radius / 2);
        ctx.font = "bold 15px Garamod";
        ctx.fillStyle = "black";
        ctx.fillText(labels[i], labelX, labelY);
    }

    // Actualiza el ángulo de rotación para la próxima animación
    rotationAngle += rotationSpeed;

    // Solicita el próximo cuadro de animación
    requestAnimationFrame(animate);
}

// Inicia la animación
animate();
