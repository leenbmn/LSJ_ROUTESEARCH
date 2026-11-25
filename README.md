# Route Search Web App — Assignment 1 (Search Strategies)

Fundamentals of Artificial Intelligence (10672224) — Fall 2026

## Group members
| Name | Student ID | Part |
|------|-----------|------|
| L    | ...       | Map, graph, heuristic h(n), BFS, DFS, UCS (map.js, uninformed.js) |
| J    | ...       | Greedy, A*, Find route + Compare all (informed.js, main.js) |
| S    | ...       | Page, style, map drawing, upload (index.html, style.css, draw.js, upload.js) |

## How to run
No installation needed. Just open **index.html** in a browser (Chrome, Edge or Firefox).

## How to use
- Choose the start city, the goal city and the algorithm, then press *Find route*.
  The path is drawn in red, with the total cost (km) and the number of steps.
- Press *Compare all* to run all 5 algorithms. Optimal (lowest-cost) rows are green.
  Click any row to draw its path.
- To use another map, choose a .json file in the same format (see maps/westbank_map.json)
  and press *Upload map*.

## Rules followed (from the assignment)
- h(n) = straight-line distance to the goal from the x/y coordinates, rounded down.
- Ties are broken alphabetically.
- The goal test is done when a city is removed from the frontier.
- Graph search: a city is never expanded twice.
- Steps = number of cities removed from the frontier and expanded (the goal counts).
- All algorithms are our own code. No libraries are used.

## Files
index.html        the page
style.css         page style
map.js            default map, buildGraph, heuristic h(n), checkMap
uninformed.js     BFS, DFS, UCS
informed.js       Greedy Best-First, A*
main.js           Find route + Compare all buttons, results table
draw.js           draws the map and highlights the path
upload.js         fills the city lists and uploads a new JSON map
maps/westbank_map.json   the default map as a file (for testing the upload)