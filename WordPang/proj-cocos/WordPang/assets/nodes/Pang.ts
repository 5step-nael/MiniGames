import { _decorator, Component, Label, Node, Sprite, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pang')
export class Pang extends Component {
    @property(Sprite)
    private spr_Circle: Sprite = null!;

    @property([Label])
    private label: Label = null;

    public CHAR: string = "";

    start() {
    }

    public Setup(__char: string, __pos: Vec3) {
        this.CHAR = __char;
        
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

    // update(deltaTime: number) {}
}
