import { Commons } from "../Defines";

export class CardInfo {
    kind: Commons.Kind = Commons.Kind.unknown;
    isUnknown: boolean = false;

    constructor(__kind: Commons.Kind, __isUnknown: boolean) {
        this.kind = __kind;
        this.isUnknown = __isUnknown;
    }

    GetStr_Print(): string {
        let ret = `CardInfo: kind= ${this.kind}, isUnknown= ${this.isUnknown}`;
        return ret;
    }
    Print() {
        console.log(this.GetStr_Print());
    }
}
