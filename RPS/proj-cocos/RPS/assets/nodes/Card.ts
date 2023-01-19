import { _decorator, Component, Sprite, Color, SpriteFrame, math } from 'cc';
import { Commons } from '../scripts/Defines';
import { CardInfo } from '../scripts/types/CardInfo';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    @property(Sprite)
    spr_Outline: Sprite = null!;

    @property(Sprite)
    spr_RPSIcon: Sprite = null!;

    @property([SpriteFrame])
    Sprites_Icon: SpriteFrame[] = []!;

    private _index: number = -1;
    private _info: CardInfo = null;

    start() {
        // console.log("Card.start()");

        // let kind: Commons.Kind = Commons.Kind.rock;
        // let isUnknown = false;
        // this.Setup(kind, isUnknown);
    }

    public Setup = (__index: number, __info: CardInfo) => {
        // console.log(`Card.Setup(${__index}, ${__info.GetStr_Print()})`);

        this._index = __index;
        this._info = __info;

        let colorKind = __info.kind;
        {
            if (__info.isUnknown) {
                colorKind = Commons.Kind.unknown;
            }
            this.spr_Outline.color = Card.Get_Color(colorKind);
        }

        this.Setup_RPSIcon(__info.kind);
    }

    static Get_Color = (__kind: Commons.Kind): Color => {
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

    private Setup_RPSIcon = (__kind: Commons.Kind) => {
        this.spr_RPSIcon.spriteFrame = this.Sprites_Icon[__kind];
    }

    Get_Info(): CardInfo {
        return this._info;
    }

    Set_Opacity(__alpha: number) {
        let color = Card.Get_Color(this._info.kind);
        color.a = __alpha;
        this.spr_Outline.color = color;

        color = new Color(255, 255, 255, __alpha);
        this.getComponent(Sprite)
            .color = color;
        this.spr_RPSIcon.color = color;
    }

    // update(deltaTime: number) {}
}

