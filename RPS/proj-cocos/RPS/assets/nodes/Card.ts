import { _decorator, Component, Sprite, Color, SpriteFrame, math } from 'cc';
import { Commons } from '../scripts/Defines';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    @property(Sprite)
    spr_Outline: Sprite = null!;

    @property(Sprite)
    spr_RPSIcon: Sprite = null!;

    @property([SpriteFrame])
    Sprites_Icon: SpriteFrame[] = []!;

    _kind: Commons.Kind = Commons.Kind.unknown;

    start() {
        let kind: Commons.Kind = Commons.Kind.rock;
        let isUnknown = true;
        {
            kind = math.randomRangeInt(Commons.Kind.rock, Commons.Kind.scissors + 1);
            isUnknown = (30 > math.randomRangeInt(1, 100 + 1));
        }
        this.Setup(kind, isUnknown);
    }

    public Setup = (__kind: Commons.Kind, __isUnknown: boolean = false) => {
        this._kind = __kind;

        let colorKind = __kind;
        {
            if (__isUnknown) {
                colorKind = Commons.Kind.unknown;
            }
            this.spr_Outline.color = this.Get_Color(colorKind);
        }

        this.Setup_RPSIcon(__kind);
    }

    Get_Color = (__kind: Commons.Kind): Color => {
        let ret: Color = new Color(64, 64, 64);//Commons.Kind.unknown
        if(Commons.Kind.rock == __kind) {
            ret = new Color(104, 150, 255);
        }
        else if(Commons.Kind.paper == __kind) {
            ret = new Color(255, 212, 114);
        }
        else if(Commons.Kind.scissors == __kind) {
            ret = new Color(255, 107, 88);
        }
        return ret;
    }

    Setup_RPSIcon = (__kind: Commons.Kind) => {
        this.spr_RPSIcon.spriteFrame = this.Sprites_Icon[__kind];
    }

    // update(deltaTime: number) {}
}

