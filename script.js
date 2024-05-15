
let neurons = {
    r: 0, g: 0, b: 0,
    stop: 0, go: 0
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let connections = Array.from({length: 6}, () => getRandomInt(-10, 10));

for (let i = 0; i < 6; i++) {
    document.getElementById(`conn-${i}-text`).textContent = connections[i].toFixed(1);
}

document.getElementById("red-btn").addEventListener("click", function() {
    document.getElementById("r-input").value = 100;
    document.getElementById("g-input").value = 0;
    document.getElementById("b-input").value = 0;
});


document.getElementById("yellow-btn").addEventListener("click", function() {
    document.getElementById("r-input").value = 100;
    document.getElementById("g-input").value = 100;
    document.getElementById("b-input").value = 0;
});

document.getElementById("green-btn").addEventListener("click", function() {
    document.getElementById("r-input").value = 0;
    document.getElementById("g-input").value = 100;
    document.getElementById("b-input").value = 50;
});


document.getElementById("input-btn").addEventListener("click", function() {
    let r = parseInt(document.getElementById("r-input").value);
    let g = parseInt(document.getElementById("g-input").value);
    let b = parseInt(document.getElementById("b-input").value);

    let colorDisplay = document.getElementById("color-display");
    colorDisplay.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    neurons.r = r;
    neurons.g = g;
    neurons.b = b;

    neurons.stop = neurons.r * connections[0] + neurons.g * connections[2] + neurons.b * connections[4];
    neurons.go = neurons.r * connections[1] + neurons.g * connections[3] + neurons.b * connections[5];

   
    let stopNeuron = document.getElementById("stop");
    let goNeuron = document.getElementById("go");
    if (neurons.stop > 0) {
        stopNeuron.classList.add("active");
    } else {
        stopNeuron.classList.remove("active");
    }
    if (neurons.go > 0) {
        goNeuron.classList.add("active");
    } else {
        goNeuron.classList.remove("active");
    }

    document.getElementById("stop-value").textContent =  neurons.stop;
    document.getElementById("go-value").textContent =  neurons.go;

    let result = document.getElementById("result-text");
    result.textContent = "";
    if (neurons.stop > 0) result.textContent += " とまれ ";
    if (neurons.go > 0) result.textContent += " 進め ";

    let resultText = document.getElementById("result-text");
    document.getElementById("color-display").style.display = "inline-block";

    if (neurons.stop > 0 && neurons.go <= 0) {
        resultText.textContent = "で止まります。";
    } else if (neurons.stop <= 0 && neurons.go > 0) {
        resultText.textContent = "で進みます。";
    } else {
        resultText.textContent = "で沈黙します。選べません。答えは沈黙。";
    }
});

let trainCount=0;
document.getElementById("stop-btn").addEventListener("click", function() {
    ++trainCount;
    document.getElementById("train-count").textContent = trainCount; 
    learn(true, false);
});

document.getElementById("go-btn").addEventListener("click", function() {
    ++trainCount;
    document.getElementById("train-count").textContent = trainCount; 
    learn(false, true);
});

document.addEventListener('DOMContentLoaded', () => {
    const radioButtons = document.querySelectorAll('input[name="learn-color"]');
    const signalImage = document.getElementById('signal-image');
  
    radioButtons.forEach(radio => {
      radio.addEventListener('change', (event) => {
        const selectedColor = event.target.value;
        signalImage.src = `image/${selectedColor}.png`;
      });
    });
  });

function learn(stopIsCorrect, goIsCorrect) {
    let learnRed = document.getElementById("learn-red").checked;
    let learnYellow = document.getElementById("learn-yellow").checked;
    let learnGreen = document.getElementById("learn-green").checked;
  
    if (stopIsCorrect && neurons.stop <= 0) {
      for (let i of [0, 2, 4]) {
        if ((learnRed && i === 0) || (learnYellow && (i === 0 || i === 2)) || (learnGreen && (i === 2 || i === 4))) {
            connections[i] += 1;
        }
      }
    }
    if (goIsCorrect && neurons.go <= 0) {
      for (let i of [1, 3, 5]) {
        if ((learnRed && i === 1) || (learnYellow && (i === 1 || i === 3)) || (learnGreen && (i === 3 || i === 5))) {
            connections[i] += 1;
        }
      }
    }
    if (!stopIsCorrect && neurons.stop > 0) {
      for (let i of [0, 2, 4]) {
        if ((learnRed && i === 0) || (learnYellow && (i === 0 || i === 2)) || (learnGreen && (i === 2 || i === 4))) {
            connections[i] -= 1;
          
        }
      }
    }
    if (!goIsCorrect && neurons.go > 0) {
      for (let i of [1, 3, 5]) {
        if ((learnRed && i === 1) || (learnYellow && (i === 1 || i === 3)) || (learnGreen && (i === 3 || i === 5))) {
            connections[i] -= 1;
        }
      }
    }
  
    for (let i = 0; i < 6; i++) {
      document.getElementById(`conn-${i}-text`).textContent = connections[i].toFixed(1);
    }
}

