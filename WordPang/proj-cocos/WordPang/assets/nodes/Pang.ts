import { _decorator, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pang')
export class Pang extends Component {
    @property(Sprite)
    spr_Circle: Sprite = null!;

    @property([Label])
    label: Label = null;

    start() {
    }

    // update(deltaTime: number) {}
}

