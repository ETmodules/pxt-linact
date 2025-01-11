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

    let EVENT_BEGINSTOP = "beginstop"
    let EVENT_ENDSTOP = "endstop"
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

    //% block="when motor %motor stops at the beginning"
    //% block.loc.nl="wanneer motor %motor bij het begin is"
    export function onBeginStop(motor: Motor, programmableCode: () => void): void {
        if (motor == Motor.M1) {
            EventBeginStopM1 = programmableCode
            EtCommon.events.register(MODULE, EVENT_BEGINSTOP, "m1", onEventBeginStopM1)
        }
        else {
            EventBeginStopM1 = programmableCode
            EtCommon.events.register(MODULE, EVENT_BEGINSTOP, "m2", onEventBeginStopM1)
        }
    }

    //% block="when motor %motor stops at the end"
    //% block.loc.nl="wanneer motor %motor aan het einde is"
    export function onEndStop(motor: Motor, programmableCode: () => void): void {
        if (motor == Motor.M1) {
            EventEndStopM1 = programmableCode
            EtCommon.events.register(MODULE, EVENT_ENDSTOP, "m1", onEventEndStopM1)
        }
        else {
            EventEndStopM1 = programmableCode
            EtCommon.events.register(MODULE, EVENT_ENDSTOP, "m2", onEventEndStopM1)
        }
    }

    //% block="stop motor %motor"
    //% block.loc.nl="stop motor %motor"
    export function stop(motor: Motor) {
        if (motor == Motor.M1)
            EtCommon.setValue(MODULE, "stop1", "")
        else
            EtCommon.setValue(MODULE, "stop2", "")
    }

    //% block="move %motor outward"
    //% block.loc.nl="beweeg %motor naar buiten"
    export function moveOut(motor: Motor) {
        let signal = "move" + (motor == Motor.M1 ? "1" : "2")
        EtCommon.setValue(MODULE, signal, "out")
    }

    //% block="move %motor inward"
    //% block.loc.nl="beweeg %motor naar binnen"
    export function moveIn(motor: Motor) {
        let signal = "move" + (motor == Motor.M1 ? "1" : "2")
        EtCommon.setValue(MODULE, signal, "in")
    }

}
