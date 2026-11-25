
const ALGORITHMS = ["BFS", "DFS", "UCS", "Greedy", "A*"];
let lastResults = [];

function runAlgorithm(name, start, goal) {
  const graph = buildGraph(currentMap);
  const coords = getCoordinates(currentMap);
  let result;

  if (name === "BFS") result = bfs(graph, start, goal);
  else if (name === "DFS") result = dfs(graph, start, goal);
  else if (name === "UCS") result = ucs(graph, start, goal);
  else if (name === "Greedy") result = greedy(graph, coords, start, goal);
  else result = astar(graph, coords, start, goal);

  result.algorithm = name;
  return result;
}

function findRoute() {
  const start = document.getElementById("start").value;
  const goal = document.getElementById("goal").value;
  const algorithm = document.getElementById("algorithm").value;
  const r = runAlgorithm(algorithm, start, goal);
  const box = document.getElementById("result");

  if (r.path.length === 0) {
    box.innerHTML = "<p class='error'>" + r.algorithm + ": no route found.</p>";
    drawMap([]);
    return;
  }

  box.innerHTML =
    "<p><b>Algorithm:</b> " + r.algorithm + "</p>" +
    "<p><b>Path:</b> " + r.path.join(" → ") + "</p>" +
    "<p><b>Total cost:</b> " + r.cost + " km</p>" +
    "<p><b>Steps:</b> " + r.steps + "</p>";
  drawMap(r.path);
}

function compareAll() {
  const start = document.getElementById("start").value;
  const goal = document.getElementById("goal").value;

  lastResults = ALGORITHMS.map(name => runAlgorithm(name, start, goal));

  const costs = lastResults.filter(r => r.cost !== null).map(r => r.cost);
  const best = Math.min(...costs);

  let html = "<table>";
  html += "<tr><th>Algorithm</th><th>Path</th><th>Cost (km)</th><th>Steps</th><th>Optimal?</th></tr>";

  for (let i = 0; i < lastResults.length; i++) {
    const r = lastResults[i];
    r.optimal = r.cost !== null && r.cost === best;

    html += "<tr class='" + (r.optimal ? "optimal" : "") + "' onclick='drawMap(lastResults[" + i + "].path)'>";
    html += "<td>" + r.algorithm + "</td>";
    html += "<td>" + (r.path.length > 0 ? r.path.join(" → ") : "no route") + "</td>";
    html += "<td>" + (r.cost === null ? "-" : r.cost) + "</td>";
    html += "<td>" + r.steps + "</td>";
    html += "<td>" + (r.optimal ? "✔" : "") + "</td>";
    html += "</tr>";
  }

  html += "</table><p>Click a row to draw its path.</p>";
  document.getElementById("compare").innerHTML = html;

  const optimal = lastResults.find(r => r.optimal);
  drawMap(optimal ? optimal.path : []);
}