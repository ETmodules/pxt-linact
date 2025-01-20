//% color="#EEAA00" icon="\uf362"
//% block="ET: Linact"
//% block.loc.nl="ET: Linact"
namespace EtLinact {
    let MODULE = "EtLinact"

    export enum Motor {
        //% block="motor 1"
        //% block.loc.nl="motor 1"
        M1,
        //% block="motor 2"
        //% block.loc.nl="motor 2"
        M2
    }

    let EventBeginStopM1: EtCommon.eventHandler
    let EventEndStopM1: EtCommon.eventHandler
    let EventBeginStopM2: EtCommon.eventHandler
    let EventEndStopM2: EtCommon.eventHandler

    export function onEventBeginStopM1(id: string) {
        if (EventBeginStopM1) {
            EventBeginStopM1(id)
        }
    }

    export function onEventEndStopM1(id: string) {
        if (EventEndStopM1) {
            EventEndStopM1(id)
        }
    }

    export function onEventBeginStopM2(id: string) {
        if (EventBeginStopM2) {
            EventBeginStopM2(id)
        }
    }

    export function onEventEndStopM2(id: string) {
        if (EventEndStopM2) {
            EventEndStopM2(id)
        }
    }

    //% block="when %motor stops at the beginning"
    //% block.loc.nl="wanneer %motor bij het begin is"
    export function onBeginStop(motor: Motor, programmableCode: () => void): void {
        if (motor == Motor.M1) {
            EventBeginStopM1 = programmableCode
            EtCommon.events.register(MODULE, "beginM1", onEventBeginStopM1)
        }
        else {
            EventBeginStopM2 = programmableCode
            EtCommon.events.register(MODULE, "beginM2", onEventBeginStopM2)
        }
    }

    //% block="when %motor stops at the end"
    //% block.loc.nl="wanneer %motor aan het einde is"
    export function onEndStop(motor: Motor, programmableCode: () => void): void {
        if (motor == Motor.M1) {
            EventEndStopM1 = programmableCode
            EtCommon.events.register(MODULE, "endM1", onEventEndStopM1)
        }
        else {
            EventEndStopM2 = programmableCode
            EtCommon.events.register(MODULE, "endM2", onEventEndStopM2)
        }
    }

    //% block="stop %motor"
    //% block.loc.nl="stop %motor"
    export function stop(motor: Motor) {
        if (motor == Motor.M1)
            EtCommon.sendSignal(MODULE, "stopM1", "")
        else
            EtCommon.sendSignal(MODULE, "stopM2", "")
    }

    //% block="set the speed of %motor to %speed \\%"
    //% block.loc.nl="stel het snelheid van %motor in op %speed \\%"
    //% speed.min=0 speed.max=100 speed.defl=100
    export function speed(motor: Motor, speed: number) {
        let signal = "speedM" + (motor == Motor.M1 ? "1" : "2")
        EtCommon.sendSignal(MODULE, signal, speed.toString())
    }

    //% block="move %motor to the end"
    //% block.loc.nl="beweeg %motor naar het einde"
    export function moveOut(motor: Motor) {
        let signal = "moveM" + (motor == Motor.M1 ? "1" : "2")
        EtCommon.sendSignal(MODULE, signal, "out")
    }

    //% block="move %motor to the beginning"
    //% block.loc.nl="beweeg %motor naar het begin"
    export function moveIn(motor: Motor) {
        let signal = "moveM" + (motor == Motor.M1 ? "1" : "2")
        EtCommon.sendSignal(MODULE, signal, "in")
    }

}
