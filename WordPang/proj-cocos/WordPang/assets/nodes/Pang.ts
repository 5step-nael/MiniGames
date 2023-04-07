import { _decorator, Component, Label, Node, Sprite, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pang')
export class Pang extends Component {
    @property(Sprite)
    private spr_Circle: Sprite = null!;

    @property([Label])
    private label: Label = null;

    start() {
    }

    public Setup(__char: string, __pos: Vec3) {
        this.label.string = __char;

        this.node.position = __pos;
    }

    // update(deltaTime: number) {}
}
