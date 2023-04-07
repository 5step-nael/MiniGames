import { _decorator, Component, Label, Node, Sprite, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pang')
export class Pang extends Component {
    @property(Sprite)
    private spr_Circle: Sprite = null!;

    @property([Label])
    private label: Label = null;

    @property([Label])
    private DEV_lbl_Index: Label = null;

    public Index: number = -1;
    public CHAR: string = "";

    start() {
    }

    public Setup(__index: number, __char: string, __pos: Vec3) {
        this.Index = __index;
        this.CHAR = __char;
        this.node.name = `PANG [${__index}] - ${__char}`;
        // {//DEV TEST
        //     this.DEV_lbl_Index.node.active = true;
        //     this.DEV_lbl_Index.string = __index.toString();
        // }
        
        this.label.string = __char;

        this.node.position = __pos;
    }

    public Check_Collision = (__checkPosition: Vec3): boolean => {
        let RoundSize = 130;
        let Half_RoundSize = RoundSize * 0.5;
        if(this.node.position.x - RoundSize < __checkPosition.x &&
            this.node.position.x + RoundSize > __checkPosition.x &&
            this.node.position.y - RoundSize < __checkPosition.y &&
            this.node.position.y + RoundSize > __checkPosition.y
            ) {//RoundSize로 계산하는건 해당 위치에 배치했을 때의 Pang 사이즈 감안해 [절반-절반] 감안
            return true;
        }
        return false;
    }

    public Tapped = (): void => {
        // this.destroy();
        this.node.destroy();
    }

    // update(deltaTime: number) {}
}
