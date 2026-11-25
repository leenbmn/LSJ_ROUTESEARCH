function greedy(graph, coords, start, goal) {
  const frontier = [{ city: start, path: [start], cost: 0, h: heuristic(start, goal, coords) }];
  const explored = [];
  let steps = 0;

  while (frontier.length > 0) {
    frontier.sort((a, b) => a.h - b.h || a.city.localeCompare(b.city));
    const node = frontier.shift();
    if (explored.includes(node.city)) continue;
    explored.push(node.city);
    steps++;

    if (node.city === goal) {
      return { path: node.path, cost: node.cost, steps: steps };
    }

    for (const n of graph[node.city]) {
      if (!explored.includes(n.city)) {
        frontier.push({
          city: n.city,
          path: [...node.path, n.city],
          cost: node.cost + n.km,
          h: heuristic(n.city, goal, coords)
        });
      }
    }
  }
  return { path: [], cost: null, steps: steps };
}

function astar(graph, coords, start, goal) {
  const frontier = [{ city: start, path: [start], cost: 0, f: heuristic(start, goal, coords) }];
  const explored = [];
  let steps = 0;

  while (frontier.length > 0) {
    frontier.sort((a, b) => a.f - b.f || a.city.localeCompare(b.city));
    const node = frontier.shift();
    if (explored.includes(node.city)) continue;
    explored.push(node.city);
    steps++;

    if (node.city === goal) {
      return { path: node.path, cost: node.cost, steps: steps };
    }

    for (const n of graph[node.city]) {
      if (!explored.includes(n.city)) {
        const g = node.cost + n.km;
        const h = heuristic(n.city, goal, coords);
        frontier.push({ city: n.city, path: [...node.path, n.city], cost: g, f: g + h });
      }
    }
  }
  return { path: [], cost: null, steps: steps };
}