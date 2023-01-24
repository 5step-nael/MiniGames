import { Commons } from "../Defines";

export class CardInfo {
    kind: Commons.Kind = Commons.Kind.unknown;
    option: Commons.Option = Commons.Option.def;

    constructor(__kind: Commons.Kind, __option: Commons.Option) {
        this.kind = __kind;
        this.option = __option;
    }

    IsUnknown(): boolean {
        return (Commons.Option.unknown == this.option);
    }
    IsLose(): boolean {
        return (Commons.Option.lose == this.option);
    }

    GetStr_Print(): string {
        let ret = `CardInfo: kind= ${this.kind}, option= ${this.option}`;
        return ret;
    }
    Print() {
        console.log(this.GetStr_Print());
    }
}
