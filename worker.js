importScripts('https://cdnjs.cloudflare.com/ajax/libs/mathjs/5.9.0/math.min.js');

const RE_START = -2;
const RE_END = 1;
const IM_START = -1;
const IM_END = 1;

const WIDTH = 600;
const HEIGHT = 400;

const MAX_ITER = 50;

function mandelbrot(c, max_iter) {
    let z = math.complex(0);
    let n = 0;

    while (math.abs(z) <= 2 && n < max_iter) {
        z = math.multiply(z, z).add(c);
        n++;
    }
    return n;
}

onmessage = function(e) {
    let xStart = e.data[0];
    let xEnd = e.data[1];
    let yStart = e.data[2];
    let yEnd = e.data[3];
    let step = e.data[4];

    let pixels = [];

    let result = {
        xStart: xStart,
        yStart : yStart,
        step : step,
        pixels : pixels
    };

    console.log('Message received from main script, x:' + xStart + " until " + xEnd + " y:" + yStart + " until " + yEnd + " step: " + step);

    // zoom : shift x / y and loop over doubles with shorter range
    for (let x = xStart; x < xEnd; x += step) {
        let tmp = [];
        for (let y = yStart; y < yEnd; y += step) {
            let c = math.complex(RE_START + (x / WIDTH) * (RE_END - RE_START), IM_START + (y / HEIGHT) * (IM_END - IM_START));

            let n = mandelbrot(c, MAX_ITER);

            let hue = parseInt(360 * n / MAX_ITER);
            //let saturation = 100;
            //let light = 50;

            //context.fillStyle = "hsl(" + hue + ", " + saturation + "%, " + light + "%)";

            //context.fillRect(x, y, 1, 1);
            tmp.push(hue);
        }
        pixels.push(tmp);
    }

    postMessage(result);
};