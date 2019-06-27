const util = require('util');

const {Client} = require('tplink-smarthome-api');
const client = new Client();

let logEvent = function (eventName, device, state) {
    const stateString = (state != null ? util.inspect(state) : '');
    console.log(`${(new Date()).toISOString()} ${eventName} ${device.model} ${device.host}:${device.port} ${stateString}`);
};

// Client events `device-*` also have `bulb-*` and `plug-*` counterparts.
// Use those if you want only events for those types and not all devices.
client.getDevice({host: 'BULB IP HERE'}).then((device) => {
    logEvent('device-new', device);
    device.startPolling(5000);

    // Device (Common) Events
    device.on('emeter-realtime-update', (emeterRealtime) => {
        logEvent('emeter-realtime-update', device, emeterRealtime);
    });

    // Bulb Events
    device.on('lightstate-on', (lightstate) => {
        logEvent('lightstate-on', device, lightstate);
    });
    device.on('lightstate-off', (lightstate) => {
        logEvent('lightstate-off', device, lightstate);
    });
    device.on('lightstate-change', (lightstate) => {
        logEvent('lightstate-change', device, lightstate);
    });
    device.on('lightstate-update', (lightstate) => {
        logEvent('lightstate-update', device, lightstate);
    });
});
