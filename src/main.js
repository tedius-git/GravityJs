import "./index.css";
import { adjustCanvasResolution, colors, createPlanet, deleteFarPlanets, drawPlanets, updateAccelerations, updatePositions, updateVelocities } from "./utils.js";

let lastTime = performance.now();
let paused = false

let planets = [];


// Main function to draw on the canvas
function draw(currentTime) {
    if (paused) {
        // If it is in pause do nothing and just request the next frame 
        const dt = (currentTime - lastTime) / 100
        lastTime = currentTime
        window.requestAnimationFrame(draw);
        return;
    }
    const canvas = document.getElementById("app");
    const ctx = canvas.getContext("2d");
    // Adjust canvas resolution when the page loads
    adjustCanvasResolution("app");

    // Get dt for animations
    const dt = (currentTime - lastTime) / 100
    lastTime = currentTime

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the planets
    updatePositions(planets, dt)
    updateVelocities(planets, dt)
    updateAccelerations(planets, dt)
    drawPlanets(planets, ctx)
    deleteFarPlanets(planets, canvas)

    // Request the next animation frame
    window.requestAnimationFrame(draw);
}

// Pause button
const pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", () => {
    paused = !paused; // Alternar entre pausado y no pausado
    // Change img if paused or not
    document.getElementById("pauseImage").src = paused ? "/player-play.svg" : "/player-pause.svg"
    // Change bg color if paused or not
    pauseButton.style.background = paused ? colors.green : colors.red
});

// Create planet button
const plusPlanetButton = document.getElementById("plusPlanetButton");
plusPlanetButton.addEventListener("click", () => {
    const canvas = document.getElementById("app");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlanets(planets, ctx)
    const x = Math.floor(Math.random() * canvas.width - 50) + 50
    const y = Math.floor(Math.random() * canvas.height - 50) + 50
    const m = Math.floor(Math.random() * 4000)
    planets.push(createPlanet(x, y, m))
});

// Show mouse coordinates on canvas
const canvas = document.getElementById('app');
canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    document.getElementById("coords").textContent = `${x}, ${y}`;
});

draw();
