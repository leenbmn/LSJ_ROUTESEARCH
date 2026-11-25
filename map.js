const DEFAULT_MAP = {
  name: "West Bank (simplified road map)",
  cities: [
    { name: "Jenin", x: 28.38, y: 106.671 },
    { name: "Tubas", x: 34.907, y: 91.131 },
    { name: "Tulkarm", x: 2.649, y: 89.91 },
    { name: "Qalqilya", x: -2.838, y: 76.59 },
    { name: "Nablus", x: 24.785, y: 80.142 },
    { name: "Salfit", x: 17.123, y: 64.935 },
    { name: "Ramallah", x: 19.298, y: 44.733 },
    { name: "Jericho", x: 42.002, y: 39.627 },
    { name: "Jerusalem", x: 22.231, y: 30.858 },
    { name: "Bethlehem", x: 19.109, y: 22.755 },
    { name: "Hebron", x: 8.987, y: 3.552 }
  ],
  roads: [
    { from: "Jenin", to: "Tubas", km: 22 },
    { from: "Jenin", to: "Tulkarm", km: 38 },
    { from: "Jenin", to: "Nablus", km: 42 },
    { from: "Tubas", to: "Nablus", km: 22 },
    { from: "Tubas", to: "Jericho", km: 75 },
    { from: "Tulkarm", to: "Nablus", km: 27 },
    { from: "Tulkarm", to: "Qalqilya", km: 16 },
    { from: "Qalqilya", to: "Nablus", km: 34 },
    { from: "Qalqilya", to: "Salfit", km: 30 },
    { from: "Nablus", to: "Salfit", km: 26 },
    { from: "Nablus", to: "Ramallah", km: 48 },
    { from: "Nablus", to: "Jericho", km: 70 },
    { from: "Salfit", to: "Ramallah", km: 30 },
    { from: "Ramallah", to: "Jericho", km: 40 },
    { from: "Ramallah", to: "Jerusalem", km: 16 },
    { from: "Jerusalem", to: "Jericho", km: 38 },
    { from: "Jerusalem", to: "Bethlehem", km: 10 },
    { from: "Bethlehem", to: "Hebron", km: 28 },
    { from: "Jericho", to: "Bethlehem", km: 45 }
  ]
};
let currentMap = DEFAULT_MAP;

function buildGraph(map) {
  const graph = {};
  for (const city of map.cities) {
    graph[city.name] = [];
  }
  for (const road of map.roads) {
    graph[road.from].push({ city: road.to, km: road.km });
    graph[road.to].push({ city: road.from, km: road.km });
  }
  for (const name in graph) {
    graph[name].sort((a, b) => a.city.localeCompare(b.city));
  }
  return graph;
}

function getCoordinates(map) {
  const coords = {};
  for (const city of map.cities) {
    coords[city.name] = { x: city.x, y: city.y };
  }
  return coords;
}

function heuristic(city, goal, coords) {
  const dx = coords[city].x - coords[goal].x;
  const dy = coords[city].y - coords[goal].y;
  return Math.floor(Math.sqrt(dx * dx + dy * dy));
}

function checkMap(map) {
  if (!Array.isArray(map.cities) || !Array.isArray(map.roads)) {
    return "The map must have cities and roads.";
  }
  const names = map.cities.map(c => c.name);
  for (const city of map.cities) {
    if (!city.name || typeof city.x !== "number" || typeof city.y !== "number") {
      return "Every city needs a name, x and y.";
    }
  }
  for (const road of map.roads) {
    if (!names.includes(road.from) || !names.includes(road.to) || typeof road.km !== "number") {
      return "Invalid road: " + road.from + " - " + road.to;
    }
  }
  return null;
}