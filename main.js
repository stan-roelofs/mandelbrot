const WIDTH = 600;
const HEIGHT = 400;

window.onload = function() {
    let canvas = document.getElementById("cnv");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    let context = canvas.getContext("2d");

    let step = 200;
    let factor = 1;
    // zoom : shift x / y and loop over doubles with shorter range
    for (let x = 0; x < WIDTH; x+=step) {
        for (let y = 0; y < HEIGHT; y+=step) {
            let worker = new Worker("worker.js");
            worker.postMessage([x * factor, (x + step) * factor, y * factor, (y + step) * factor, factor]);
            worker.onmessage = function(e) {
                console.log(e.data.pixels);

                for (let i = 0; i < step; i++) {
                    for (let j = 0; j < step; j++) {
                        context.fillStyle = "hsl(" + e.data.pixels[i][j] + ", " + 100 + "%, " + 50 + "%)";
                        context.fillRect((e.data.xStart / factor) + i, (e.data.yStart / factor) + j, 1, 1);
                    }
                }
                worker.terminate();
            }
        }
    }
};