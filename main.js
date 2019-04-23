const MAX_ITER = 50;

let minXVal = -3.5;
let maxXVal = 3.5;
let minYVal = -2.5;
let maxYVal = 2.5;
let numWorkers = 10;
let workers = [];
let scale = 1.0;
let xPos = 0;
let yPos = 0;

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

        for (let i = 0; i < numWorkers; i++) {
            if (workers[i] !== undefined) {
                workers[i].terminate();
            }

            workers[i] = new Worker("worker.js");

            workers[i].onmessage = function(e) {
                console.log(i);

                for (let x = 0; x < WIDTH; x++) {
                    for (let y = 0; y < step; y++) {
                        context.fillStyle = "hsl(" + e.data.pixels[x][y] + ", " + 100 + "%, " + 50 + "%)";
                        //context.fillStyle = "rgb(" + e.data.pixels[i][j] + ", " +  e.data.pixels[i][j] + ", " +  e.data.pixels[i][j] + ")";
                        context.fillRect(x, e.data.yStart + y, 1, 1);
                    }
                }
            }
        }

        context.clearRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < numWorkers; i++) {
            //workers[i].terminate();
        }

        for (let y = 0; y < HEIGHT; y += step) {
            let yStart = y;
            let yEnd = y + step;

            workers[y % step].postMessage([yStart, yEnd, minXVal * scale + xPos, maxXVal * scale + xPos, minYVal * scale + yPos, maxYVal * scale + yPos, WIDTH, HEIGHT, MAX_ITER]);
        }
    }

    document.onkeypress = function(e) {

        const newScale = 0.5 * scale;

        switch(e.code) {
            case "KeyA":
                xPos -= newScale;
                break;

            case "KeyD":
                xPos += newScale;
                break;

            case "KeyW":
                yPos -= newScale;
                break;

            case "KeyS":
                yPos += newScale;
                break;

            case "KeyZ":
                scale -= newScale;
                break;

            case "KeyX":
                scale += newScale;
                break;
        }

        redraw();
    };

    redraw();
};