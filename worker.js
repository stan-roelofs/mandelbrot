function mandelbrot(a, b, max_iter) {
    let ca = a;
    let cb = b;

    let n = 0;
    while (Math.abs(a + b) <= 16 && n < max_iter) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        n++;
    }
    return n;
}

onmessage = function(e) {
    let yStart = e.data[0];
    let yEnd = e.data[1];
    let minXVal = e.data[2];
    let maxXVal = e.data[3];
    let minYVal = e.data[4];
    let maxYVal = e.data[5];
    let width = e.data[6];
    let height = e.data[7];
    let maxIter = e.data[8];

    let pixels = [];

    let result = {
        yStart : yStart,
        pixels : pixels
    };

    console.log(yStart + " " + yEnd + " " + minXVal + " " + maxXVal + " " + minYVal + " " + maxYVal + " " + width + " " + height + " " + maxIter);

    // zoom : shift x / y and loop over doubles with shorter range
    for (let x = 0; x < width; x += 1) {
        let tmp = [];
        for (let y = yStart; y < yEnd; y += 1) {
            let a = minXVal + (x / width) * (maxXVal - minXVal);
            let b = minYVal + (y / height) * (maxYVal - minYVal);

            let n = mandelbrot(a, b, maxIter);

            let hue = parseInt(360 * n / maxIter);
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