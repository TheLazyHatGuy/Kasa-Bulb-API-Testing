const {Client} = require('tplink-smarthome-api');

const client = new Client();
const DELAY = 500;
const RESET = true;

//Get bulb
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
}

let colourLoop = function () {
    bulb.lighting.setLightState(start).then(() => {
        console.log('Start for loop');
        for (let i = 10; i <= 360; i + 10) {
            setTimeout(function () {
                console.log('Setting hue to ' + i);
                bulb.lighting.setLightState({hue: i});
            }, DELAY);
        }

        if (RESET) {
            console.log('Setting bulb to auto');
            bulb.lighting.setLightState(auto);
        } else {
            console.log('Turning bulb off');
            bulb.setPowerState(false);
        }
    })
};

//Start using bulb
setTimeout(function () {
    console.log('Turning bulb on');
    bulb.setPowerState(true).then(colourLoop)
}, DELAY);
