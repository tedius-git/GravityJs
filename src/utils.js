export let colors = {
    "yellow": "#e8dc3d",
    "red": "#f38ba8",
    "purple": "#cba6f7",
    "blue": "#89dceb",
    "green": "#a6e3a1",
};

export function adjustCanvasResolution(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr - 50;
    canvas.height = canvas.clientHeight * dpr - 50;
    ctx.scale(dpr, dpr);
}

export function createPlanet(x, y, m) {
    let planet = {
        pos: {
            x: x,
            y: y
        },
        m: m,
        v: {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
        },
        a: {
            x: 0,
            y: 0
        },
    }
    if (m < 1000) {
        planet.color = colors.red
    } else if (m < 2000) {
        planet.color = colors.green
    } else if (m < 3000) {
        planet.color = colors.blue
    } else {
        planet.color = colors.yellow
    }
    return planet
};

export function drawPlanets(planets, ctx) {
    for (let i in planets) {
        const planet = planets[i]
        drawPlanet(planet.pos.x, planet.pos.y, planet.m/200, ctx, planet.color)
    }
}

export function updatePositions(planets, dt) {
    for (let i in planets) {
        let planet = planets[i]
        planet.pos.x += planet.v.x * dt
        planet.pos.y += planet.v.y * dt
    }
}

export function updateVelocities(planets, dt) {
    for (let i in planets) {
        let planet = planets[i]
        planet.v.x += planet.a.x * dt
        planet.v.y += planet.a.y * dt
    }
}

export function updateAccelerations(planets, dt) {
    const G = 6.674 * Math.pow(10, 0);

    for (let i = 0; i < planets.length; i++) {
        let planetA = planets[i];
        planetA.a.x = 0; // Reiniciar la aceleración
        planetA.a.y = 0;

        for (let j = 0; j < planets.length; j++) {
            if (i === j) continue; // No calcular la atracción consigo mismo

            let planetB = planets[j];

            // Calcular la distancia entre los planetas
            let dx = planetB.pos.x - planetA.pos.x;
            let dy = planetB.pos.y - planetA.pos.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Evitar división por cero (si los planetas están en la misma posición)
            if (distance < (planetA.m + planetB.m)/200) continue;

            // Calcular la fuerza gravitacional
            let force = (G * planetA.m * planetB.m) / (distance * distance);

            // Calcular las componentes de la aceleración
            let angle = Math.atan2(dy, dx); // Ángulo entre los planetas
            let ax = (force / planetA.m) * Math.cos(angle);
            let ay = (force / planetA.m) * Math.sin(angle);

            // Sumar la aceleración al planeta
            planetA.a.x += ax * dt;
            planetA.a.y += ay * dt;
        }
    }
}

export function deleteFarPlanets(planets, canvas) {
    for (let i in planets) {
        let planet = planets[i]
        if (planet.pos.x > canvas.width || planet.pos.x < 0) {
            planets.splice(i, 1);
        }
        if (planet.pos.y > canvas.height || planet.pos.y < 0) {
            planets.splice(i, 1);
        }
    }
}

export function drawPlanet(x, y, radius, ctx, fillColor) {
    ctx.save();

    ctx.fillStyle = fillColor;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true)
    ctx.fill();

    ctx.restore();
};
