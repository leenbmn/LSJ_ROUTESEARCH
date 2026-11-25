function drawMap(path) {
  const svg = document.getElementById("map");
  svg.innerHTML = "";
  const size = 600;
  const margin = 50;

  const xs = currentMap.cities.map(c => c.x);
  const ys = currentMap.cities.map(c => c.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const range = Math.max(Math.max(...xs) - minX, Math.max(...ys) - minY, 1);
  const scale = (size - 2 * margin) / range;

  const pos = {};
  for (const c of currentMap.cities) {
    pos[c.name] = {
      x: margin + (c.x - minX) * scale,
      y: size - margin - (c.y - minY) * scale
    };
  }

  for (const road of currentMap.roads) {
    const p1 = pos[road.from];
    const p2 = pos[road.to];
    const onPath = isOnPath(path, road.from, road.to);

    addSvg(svg, "line", {
      x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
      stroke: onPath ? "red" : "#999",
      "stroke-width": onPath ? 5 : 2
    });
    addSvg(svg, "text", {
      x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2, "font-size": 11, fill: "#555"
    }, road.km);
  }

  for (const name in pos) {
    addSvg(svg, "circle", {
      cx: pos[name].x, cy: pos[name].y, r: 7,
      fill: path.includes(name) ? "red" : "steelblue"
    });
    addSvg(svg, "text", {
      x: pos[name].x + 9, y: pos[name].y - 9, "font-size": 13, "font-weight": "bold"
    }, name);
  }
}

function isOnPath(path, a, b) {
  for (let i = 0; i < path.length - 1; i++) {
    if ((path[i] === a && path[i + 1] === b) || (path[i] === b && path[i + 1] === a)) {
      return true;
    }
  }
  return false;
}

function addSvg(svg, tag, attributes, text) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }
  if (text !== undefined) el.textContent = text;
  svg.appendChild(el);
}
