import { DoorState } from "./const";

let doorState = DoorState.Closed;
let batteryPercentage = 100;
let light = 0;

const doorStateLedMapping = {
    [DoorState.Closed]: LED1,
    [DoorState.Open]: LED2,
    [DoorState.Locked]: LED3,
};

const detectDoorState = (m: any) => {
    const v = m.z;

    if (v < -1500 && v > -1730) {
        return DoorState.Closed;
    }
    else if (v <= -1730) {
        return DoorState.Locked;
    }

    return DoorState.Open;
}

setWatch(function () {
    showStatus();
}, BTN, { edge: "rising", debounce: 50, repeat: true });

function updateAdverts() {
    NRF.setAdvertising([
        { 0xABAA: doorState },
        { 0xABAB: light },
        { 0x180F: [batteryPercentage] },
    ], { interval: 300 });
}

function showStatus() {
    digitalPulse(doorStateLedMapping[doorState], true, 500);
}

Puck.on('mag', function (m: any) {
    console.log(m);
    const doorStateDetected = detectDoorState(m);
    const batteryPercentageDetected = Puck.getBatteryPercentage();
    const lightDetected = Math.round(100 * Puck.light());

    if (doorState != doorStateDetected
        || light !== lightDetected
        || batteryPercentage !== batteryPercentageDetected) {
            doorState = doorStateDetected;
        batteryPercentage = batteryPercentageDetected;
        light = lightDetected;
        updateAdverts();
    }
});

updateAdverts();
Puck.magOn();
