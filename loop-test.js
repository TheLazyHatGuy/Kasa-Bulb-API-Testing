const DELAY = 1000;

for (let i = 10; i <= 360; i = i + 10) {
    setTimeout(function () {
        console.log('Setting hue to ' + i);
    }, (i / 100) * DELAY);
}
