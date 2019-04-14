const MAX_ITER = 50;

let minXVal = -3.5;
let maxXVal = 3.5;
let minYVal = -2.5;
let maxYVal = 2.5;
let numWorkers = 10;

window.onload = function() {
    const WIDTH = 400;//window.innerWidth;
    const HEIGHT = 400;//window.innerHeight;
    const canvas = document.getElementById("cnv");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const context = canvas.getContext("2d");

    let step = Math.floor(HEIGHT / numWorkers);
    // TODO: remaining pixels

    function redraw() {
        context.clearRect(0, 0, WIDTH, HEIGHT);

        for (let y = 0; y < HEIGHT; y += step) {
            const worker = new Worker("worker.js");
            let yStart = y;
            let yEnd = y + step;

            worker.postMessage([yStart, yEnd, minXVal, maxXVal, minYVal, maxYVal, WIDTH, HEIGHT, MAX_ITER]);

            worker.onmessage = function(e) {
                for (let i = 0; i < WIDTH; i++) {
                    for (let j = 0; j < step; j++) {
                        context.fillStyle = "hsl(" + e.data.pixels[i][j] + ", " + 100 + "%, " + 50 + "%)";
                        //context.fillStyle = "rgb(" + e.data.pixels[i][j] + ", " +  e.data.pixels[i][j] + ", " +  e.data.pixels[i][j] + ")";
                        context.fillRect(i, e.data.yStart + j, 1, 1);
                    }
                }
                worker.terminate();
            }
        }
    }

    const slider1 = document.getElementById("minXVal");
    slider1.addEventListener("mouseup", function() {
        minXVal = parseFloat(slider1.value);
        redraw();
    });
    const slider2 = document.getElementById("maxXVal");
    slider2.addEventListener("mouseup", function() {
        maxXVal = parseFloat(slider2.value);
        redraw();
    });
    const slider3 = document.getElementById("minYVal");
    slider3.addEventListener("mouseup", function() {
        minYVal = parseFloat(slider3.value);
        redraw();
    });
    const slider4 = document.getElementById("maxYVal");
    slider4.addEventListener("mouseup", function() {
        maxYVal = parseFloat(slider4.value);
        redraw();
    });

    redraw();
};