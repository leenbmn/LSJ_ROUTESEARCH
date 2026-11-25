function showMap() {
  document.getElementById("map-name").textContent = currentMap.name || "Uploaded map";

  const names = currentMap.cities.map(c => c.name).sort();
  fillSelect("start", names);
  fillSelect("goal", names);
  document.getElementById("goal").selectedIndex = names.length - 1;

  document.getElementById("result").innerHTML = "";
  document.getElementById("compare").innerHTML = "";
  drawMap([]);
}

function fillSelect(id, names) {
  const select = document.getElementById(id);
  select.innerHTML = "";
  for (const name of names) {
    const option = document.createElement("option");
    option.textContent = name;
    select.appendChild(option);
  }
}

function uploadMap() {
  const file = document.getElementById("map-file").files[0];
  const message = document.getElementById("upload-message");

  if (!file) {
    message.textContent = "Please choose a JSON file first.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    let newMap;
    try {
      newMap = JSON.parse(reader.result);
    } catch (e) {
      message.textContent = "This file is not valid JSON.";
      return;
    }

    const error = checkMap(newMap);
    if (error) {
      message.textContent = error;
      return;
    }

    currentMap = newMap;
    showMap();
    message.textContent = "Map uploaded successfully!";
  };
  reader.readAsText(file);
}