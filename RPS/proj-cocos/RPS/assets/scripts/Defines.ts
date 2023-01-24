export namespace Commons {
    export enum Kind { unknown = -1,
        rock = 0, paper, scissors,
    }

    export enum Option { NONE = -1,
        def = 0, unknown, lose,
    }

    export enum Result { NONE = -1,
        lose = 0, win, tie,
    }
}