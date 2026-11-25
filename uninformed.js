function bfs(graph, start, goal) {
  const frontier = [{ city: start, path: [start], cost: 0 }];
  const explored = [];
  let steps = 0;

  while (frontier.length > 0) {
    const node = frontier.shift();
    if (explored.includes(node.city)) continue;
    explored.push(node.city);
    steps++;

    if (node.city === goal) {
      return { path: node.path, cost: node.cost, steps: steps };
    }

    for (const n of graph[node.city]) {
      if (!explored.includes(n.city)) {
        frontier.push({ city: n.city, path: [...node.path, n.city], cost: node.cost + n.km });
      }
    }
  }
  return { path: [], cost: null, steps: steps };
}

function dfs(graph, start, goal) {
  const frontier = [{ city: start, path: [start], cost: 0 }];
  const explored = [];
  let steps = 0;

  while (frontier.length > 0) {
    const node = frontier.pop();
    if (explored.includes(node.city)) continue;
    explored.push(node.city);
    steps++;

    if (node.city === goal) {
      return { path: node.path, cost: node.cost, steps: steps };
    }

    const neighbours = [...graph[node.city]].reverse();
    for (const n of neighbours) {
      if (!explored.includes(n.city)) {
        frontier.push({ city: n.city, path: [...node.path, n.city], cost: node.cost + n.km });
      }
    }
  }
  return { path: [], cost: null, steps: steps };
}

function ucs(graph, start, goal) {
  const frontier = [{ city: start, path: [start], cost: 0 }];
  const explored = [];
  let steps = 0;

  while (frontier.length > 0) {
    frontier.sort((a, b) => a.cost - b.cost || a.city.localeCompare(b.city));
    const node = frontier.shift();
    if (explored.includes(node.city)) continue;
    explored.push(node.city);
    steps++;

    if (node.city === goal) {
      return { path: node.path, cost: node.cost, steps: steps };
    }

    for (const n of graph[node.city]) {
      if (!explored.includes(n.city)) {
        frontier.push({ city: n.city, path: [...node.path, n.city], cost: node.cost + n.km });
      }
    }
  }
  return { path: [], cost: null, steps: steps };
}