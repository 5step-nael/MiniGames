import { _decorator, Component, instantiate, math, Node, Prefab, Vec3 } from 'cc';
import { Pang } from './Pang';
const { ccclass, property } = _decorator;

@ccclass('MainStage')
export class MainStage extends Component {
    @property({type: Prefab})
    private prfb_Pang: Prefab = null!;

    @property(Node)
    private node_Pangs = null;

    private _pangs: Pang[] = [];

    start() {
        this.Make_Word();
    }

    Make_Word() {
        this._pangs = [];

        let word: string = "APPLE";
        // { word = "BANANABANANABANANABANANA"; }//DEV TEST
        for(let item of word) {
            // console.log(item);

            let pang = instantiate(this.prfb_Pang);
            pang.setParent(this.node_Pangs);
                
            let cs_Pang = pang.getComponent(Pang);
            cs_Pang.Setup(item, this.Get_Position());

            this._pangs.push(cs_Pang);
        }

        console.log(this._pangs.length);
    }

    private Get_Position = (): Vec3 => {

        // let x = math.randomRange(-460.0, 460.0);
        // let y = math.randomRange(-640.0, 640.0);
        // let ret = new Vec3(x, y, 0.0);

        let ret = new Vec3(0, 0, 0.0);
        while(true)
        {
            let x = math.randomRange(-420.0, 420.0);
            let y = math.randomRange(-520.0, 520.0);

            ret.x = x;
            ret.y = y;

            let isCollision: boolean = false;

            for(let item of this._pangs) {
                if(item.Check_Collision(ret)) {
                    isCollision = true;
                    break;
                }
            }

            if(!isCollision) {
                break;
            }
        }
        return ret;
    }

    // update(deltaTime: number) {}
}
