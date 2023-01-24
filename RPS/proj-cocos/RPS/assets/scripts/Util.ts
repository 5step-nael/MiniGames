import { Commons } from "./Defines";

export namespace Util {

    export function Get_WinKind(select: Commons.Kind): Commons.Kind {
        let ret = Commons.Kind.unknown;

        if (Commons.Kind.rock == select) {
            ret = Commons.Kind.paper;
        }
        else if (Commons.Kind.paper == select) {
            ret = Commons.Kind.scissors;
        }
        else if (Commons.Kind.scissors == select) {
            ret = Commons.Kind.rock;
        }
        return ret;
    }
    export function GetString_Kind(select: Commons.Kind): string {
        let ret = "";

        if (Commons.Kind.rock == select) ret = "바위";
        else if (Commons.Kind.paper == select) ret = "보";
        else if (Commons.Kind.scissors == select) ret = "가위";
        return ret;
    }
}