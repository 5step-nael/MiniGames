import { _decorator, Component, Sprite, Color, SpriteFrame, math, Label } from 'cc';
import { Commons } from '../../scripts/Defines';
import { CardInfo } from '../../scripts/types/CardInfo';
import { Util } from '../../scripts/Util';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    @property(Sprite)
    spr_Outline: Sprite = null!;

    @property(Sprite)
    spr_RPSIcon: Sprite = null!;

    @property([SpriteFrame])
    Sprites_Icon: SpriteFrame[] = []!;

    @property([Label])
    lbl_Lose: Label = null;

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

        this.spr_Outline.color = Card.Get_Color(__info);

        this.Setup_RPSIcon(__info);

        this.Setup_LoseLabel(__info);
    }

    static Get_Color = (__info: CardInfo): Color => {
        let ret: Color = new Color(64, 64, 64);//Commons.Kind.unknown

        if(!__info.IsUnknown()) {
            if(Commons.Kind.rock == __info.kind) {
                ret = new Color(104, 150, 255);
            }
            else if(Commons.Kind.paper == __info.kind) {
                ret = new Color(255, 212, 114);
            }
            else if(Commons.Kind.scissors == __info.kind) {
                ret = new Color(255, 107, 88);
            }
        }
        return ret;
    }

    private Setup_RPSIcon = (__info: CardInfo) => {
        this.spr_RPSIcon.spriteFrame = this.Sprites_Icon[__info.kind];

        let color = Color.WHITE;

        if(__info.IsUnknown()) {
            color = new Color(48, 48, 48, 255);
        }
        this.spr_RPSIcon.color = color;
    }

    private Setup_LoseLabel = (__info: CardInfo) => {
        this.lbl_Lose.node.active = __info.IsLose();
        if(__info.IsLose()) {
            this.lbl_Lose.color = Card.Get_Color(__info);
        }
    }

    Get_Info(): CardInfo {
        return this._info;
    }

    Fight = (__select: Commons.Kind): Commons.Result => {
        let ret = Commons.Result.tie;
        if(this._info.kind != __select) {
            if (this._info.IsLose()) {
                let winKind = Util.Get_WinKind(__select);
                ret = (winKind == this._info.kind
                    ? Commons.Result.win
                    : Commons.Result.lose
                );
            }
            else {
                
                let winKind = Util.Get_WinKind(this._info.kind);
                ret = (winKind == __select
                    ? Commons.Result.win
                    : Commons.Result.lose
                );
            }
        }
        return ret;
    }

    Set_Opacity(__alpha: number) {
        let color = Card.Get_Color(this._info);
        color.a = __alpha;
        this.spr_Outline.color = color;

        color = new Color(255, 255, 255, __alpha);
        this.getComponent(Sprite)
            .color = color;
        this.spr_RPSIcon.color = color;
    }

    // update(deltaTime: number) {}
}

