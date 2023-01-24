import { Commons } from "./Defines";

export namespace Util {

    export function Get_WinKind(select: Commons.Kind): Commons.Kind {
        let ret = Commons.Kind.unknown;

        if (Commons.Kind.rock == select) {
            ret = Commons.Kind.scissors;
        }
        else if (Commons.Kind.paper == select) {
            ret = Commons.Kind.rock;
        }
        else if (Commons.Kind.scissors == select) {
            ret = Commons.Kind.paper;
        }
        return ret;
    }
}