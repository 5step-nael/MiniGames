import { _decorator, Component, Node, Vec3, tween, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ActionButton')
export class ActionButton extends Component {
    private _initPosition: Vec3 = null;
    start() {
        this._initPosition = new Vec3(this.node.getPosition());
    }

    // update(deltaTime: number) {}
    Shake() {
        this.node.setPosition(this._initPosition);

        tween(this.node)
            .to(0.3, {}, {
                onUpdate: (target: object, ratio: number) => {
                    // console.log(ratio);

                    // let revRatio = 1.0 - ratio;
                    // console.log(revRatio);

                    // console.log(this._initPosition);
                    // console.log(this.node.getPosition());

                    let pos = new Vec3(this._initPosition);
                    pos.x -= math.randomRange(5.0, 15.0);
                    pos.y -= math.randomRange(5.0, 15.0);                    
                    this.node.setPosition(pos);
                },
                onComplete: (target: object) => {
                    this.node.setPosition(this._initPosition);
                    // console.log("Shake-onComplete");
                }
            })
            .start();
    }
}

