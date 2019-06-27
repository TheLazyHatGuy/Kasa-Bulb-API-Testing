const {Client} = require('tplink-smarthome-api');

const client = new Client();
const DELAY = 2000;
const DELAY_ADJUST = 1; //Increasing this makes it faster
const RESET = false;
const LOOP_LIMIT = 10;
const INCREMENT = 1; //The amount to increment the hue by

let will_loop = true;

let bulb = client.getBulb({host: 'BULB IP HERE'});
let auto = {
    on_off: true,
    mode: 'circadian',
    hue: 0,
    saturation: 0
};
let start = {
    hue: 360,
    saturation: 100,
    brightness: 50,
    color_temp: 0
};
let loopCount = 1;

let reset = function () {
    if (RESET) {
        console.log('Setting bulb to auto');
        bulb.lighting.setLightState(auto);
    } else {
        console.log('Turning bulb off');
        bulb.setPowerState(false);
    }
};

let loop = function () {
    if (will_loop) {
        if (loopCount >= LOOP_LIMIT) {
            will_loop = false;
            reset();
        } else {
            loopCount++;
            console.warn("\nLoop count: " + loopCount + "\n");
            colourLoop();
        }
    } else {
        reset();
    }
};

let colourLoop = function () {
    bulb.lighting.setLightState(start).then(() => {
        console.log('Start for will_loop');
        for (let i = INCREMENT; i <= 360; i = i + INCREMENT) {
            setTimeout(function () {
                console.log('Setting hue to ' + i);
                bulb.lighting.setLightState({hue: i});

                if (i === 360) {
                    loop();
                }
            }, (i / DELAY_ADJUST) * DELAY);
        }
    });
};

//Start using bulb
console.log('Turning bulb on');
bulb.setPowerState(true).then(colourLoop);
