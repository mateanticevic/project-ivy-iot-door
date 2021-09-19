declare var BTN: Pin;
declare var LED1: Pin;
declare var LED2: Pin;
declare var LED3: Pin;

declare namespace NRF {
    function setAdvertising(data: any[], options: any): void;
}

declare namespace Puck {
    function on(event: string, callback: any): void;
    function magOn(): void;
}