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

    Get_PickWordAddItem = (__word: string): string => {
        let Ascii_A = 65;
        let Ascii_Z = 90;
        let Ascii_a = 97;
        let Ascii_z = 122;

        let fullWord = __word;
        // fullWord += "afdf";
        // console.log(`${__word} => ${fullWord}`);

        let ret = "";
        let addCount = math.randomRangeInt(1, 3 + 1);

        while(true) {
            let rnd_Ascii = math.randomRangeInt(Ascii_A, Ascii_Z + 1);
            let char_Ascii = String.fromCharCode(rnd_Ascii);

            if(-1 == fullWord.indexOf(char_Ascii)) {
                ret += char_Ascii;
                fullWord += char_Ascii;

                if(addCount <= ret.length) {
                    break;
                }
            }
        }
        return ret;
    }

    Make_Word() {
        this._pangs = [];

        let word: string = "APPLE";
        // { word="ABCDEFGHIJKLMNOPQRSTUV"; }
        {
            let addItem = this.Get_PickWordAddItem(word);
            word += addItem;
            console.log(word);
        }
        // { word = "BANANABANANABANANABANANA"; }//DEV TEST
        for(let item of word) {
            // console.log(item);

            let pang = instantiate(this.prfb_Pang);
            pang.setParent(this.node_Pangs);
                
            let cs_Pang = pang.getComponent(Pang);
            cs_Pang.Setup(item, this.Get_Position());

            this._pangs.push(cs_Pang);
        }

        // console.log(this._pangs.length);
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
