import { _decorator, Component, Label, Node, Sprite, Vec3, tween, Button, math } from 'cc';
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

    private _posInit: Vec3 = null;

    start() {
    }

    public Setup(__index: number, __char: string, __pos: Vec3) {
        this.Index = __index;
        this.CHAR = __char;
        this._posInit = __pos;

        this.node.name = `PANG [${__index}] - ${__char}`;
        // {//DEV TEST
        //     this.DEV_lbl_Index.node.active = true;
        //     this.DEV_lbl_Index.string = __index.toString();
        // }
        
        this.label.string = __char;

        this.node.position = __pos;

        this.Show_Pang();
    }

    Show_Pang = (): void => {
        this.node.setScale(0, 0, 0);

        tween(this.node)
            .to(0.15, { scale: new Vec3(1, 1, 1) }, {
                'onStart': () => {},
                // 'onUpdate': () => {},
                'onComplete': () => {
                    this.node.setScale(1, 1, 1);
                    this.getComponent(Button)
                        .interactable = true;

                    // console.log(`Show_Pang(): ${this.node.name}`);
                },
            })
            .start();
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

    public Wrong = (): void => {
        this.Shake_Pang();
    }

    Shake_Pang = (): void => {
        this.node.setPosition(this._posInit);

        tween(this.node)
            .to(0.2, {}, {
                onUpdate: (target: object, ratio: number) => {
                    // console.log(ratio);

                    // let revRatio = 1.0 - ratio;
                    // console.log(revRatio);

                    // console.log(this._initPosition);
                    // console.log(this.node.getPosition());

                    let pos = new Vec3(this._posInit);
                    pos.x += math.randomRange(-5.0, 5.0);
                    pos.y += math.randomRange(-5.0, 5.0);                    
                    this.node.setPosition(pos);
                },
                onComplete: (target: object) => {
                    this.node.setPosition(this._posInit);
                    // console.log("Shake-onComplete");
                }
            })
            .start();
    }

    public Correct = (): void => {
        // this.destroy();
        // this.node.destroy();

        this.Hide_Pang(true);
    }
    public Hide_Pang = (__destory: boolean): void => {
        tween(this.node)
            .to(0.1, { scale: new Vec3(0, 0, 0) }, {
                'onStart': () => {},
                // 'onUpdate': () => {},
                'onComplete': () => {
                    if(__destory) {
                        this.node.destroy();
                    }
                },
            })
            .start();
    }

    // update(deltaTime: number) {}
}
