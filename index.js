const {Client} = require('tplink-smarthome-api');

const client = new Client();
const DELAY = 2000;
const RESET = true;

//Get bulb
let bulb = client.getBulb({host: 'BULB IP HERE'});
let auto = {
    on_off: true,
    mode: 'circadian',
    hue: 0,
    saturation: 0
};

//Start using bulb
setTimeout(function () {
    // bulb.getSysInfo().then(console.log);

    console.log('Turning bulb on');
    bulb.setPowerState(true).then(() => {
        setTimeout(function () {
            console.log('Adjusting...');
            bulb.lighting.setLightState({hue: 360, saturation: 100, brightness: 50, color_temp: 0}).then(() => {
                setTimeout(function () {
                    console.log('Adjusting...');
                    bulb.lighting.setLightState({hue: 50}).then(() => {
                        setTimeout(function () {
                            if (RESET) {
                                console.log('Setting bulb to auto');
                                bulb.lighting.setLightState(auto);
                            } else {
                                console.log('Turning bulb off');
                                bulb.setPowerState(false);
                            }
                        }, DELAY);
                    });
                }, DELAY);
            });
        }, DELAY);
    })
}, DELAY);
