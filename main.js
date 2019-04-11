const MAX_ITER = 50;
const WIDTH = 600;
const HEIGHT = 400;

const RE_START = -2;
const RE_END = 1;
const IM_START = -1;
const IM_END = 1;

function mandelbrot(c, max_iter) {
    let z = math.complex(0);
    let n = 0;

    while (math.abs(z) <= 2 && n < max_iter) {
        z = math.multiply(z, z).add(c);
        n++;
    }
    return n;
}

window.onload = function() {
    let canvas = document.getElementById("cnv");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    let context = canvas.getContext("2d");

    // zoom : shift x / y and loop over doubles with shorter range
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            let c = math.complex(RE_START + (x / WIDTH) * (RE_END - RE_START), IM_START + (y / HEIGHT) * (IM_END - IM_START));

            let n = mandelbrot(c, MAX_ITER);

            let hue = parseInt(360 * n / MAX_ITER);
            let saturation = 100;
            let light = 50;

            context.fillStyle = "hsl(" + hue + ", " + saturation + "%, " + light + "%)";

            context.fillRect(x, y, 1, 1);
        }
    }
}