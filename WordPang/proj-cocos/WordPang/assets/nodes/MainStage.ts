import { _decorator, Component, instantiate, Label, math, Node, Prefab, Vec3, Button } from 'cc';
import { Pang } from './Pang';
const { ccclass, property } = _decorator;

class Word {
    public kr: string = "";
    public en: string = "";

    public constructor(__kr: string, __en: string) {
        this.kr = __kr;
        this.en = __en;
    }
}

@ccclass('MainStage')
export class MainStage extends Component {
    @property({type: Prefab})
    private prfb_Pang: Prefab = null!;

    @property(Node)
    private node_Pangs = null;

    @property(Label)
    private lbl_KR = null;
    @property(Label)
    private lbl_EN = null;

    private _pangs: Pang[] = [];

    readonly WordList: Word[] = [
        new Word("사과", "APPLE"),
        new Word("벌", "BEE"),
        new Word("자동차", "CAR"),
        new Word("개", "DOG"),
        new Word("코끼리", "ELEPHANT"),
        new Word("물고기", "FISH"),
        new Word("기린", "GIRAFFE"),
        new Word("말", "HORSE"),
        new Word("이글루", "IGLOO"),
        new Word("주스", "JUICE"),
        new Word("열쇠", "KEY"),
        new Word("레몬", "LEMON"),
        new Word("생쥐", "MOUSE"),
        new Word("간호사", "NURSE"),
        new Word("문어", "OCTOPUS"),
        new Word("펭귄", "PENGUIN"),
        new Word("여왕", "QUEEN"),
        new Word("토끼", "RABBIT"),
        new Word("모래", "SAND"),
        new Word("나무", "TREE"),
        new Word("우산", "UMBRELLA"),
        new Word("바이올린", "VIOLIN"),
        new Word("고래", "WHALE"),
        new Word("실로폰", "XYLOPHONE"),
        new Word("요트", "YACHT"),
        new Word("얼룩말", "ZEBRA"),
    ];

    private _now_Word: string = "";
    private _ready_WordIndex = -1;

    start() {
        this.Reset();

        this.Make_Word();
    }

    Reset = (): void => {
        this._pangs = [];

        this.lbl_KR.string = "";
        this.lbl_EN.string = "";

        this._now_Word = "";
        this._ready_WordIndex = -1;
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
        this.Reset();

        let index_Words = math.randomRangeInt(0, this.WordList.length);
        {//DEV TEST
            // index_Words = 15;//DEV TEST (PENGUIN)
            // index_Words = 16;//DEV TEST (QUEEN)
            // index_Words = 14;//DEV TEST (OCTOPUS)
        }
        let word: string = this.WordList[index_Words].en;
        // { word="ABCDEFGHIJKLMNOPQRSTUV"; }
        {
            let addItem = this.Get_PickWordAddItem(word);
            console.log(`${word} +${addItem}`);
            word += addItem;
        }
        // { word = "BANANABANANABANANABANANA"; }//DEV TEST
        //for(let item of word) {
        for(let index=0; index<word.length; index++) {
            // console.log(item);

            let pang = instantiate(this.prfb_Pang);
            pang.setParent(this.node_Pangs);

            let char = word[index];
                
            let cs_Pang = pang.getComponent(Pang);
            cs_Pang.Setup(index, char, this.Get_Position());

            let button_Pang = pang.getComponent(Button);
            button_Pang.node.on(Button.EventType.CLICK, this.Tapped_Pang, this);

            this._pangs.push(cs_Pang);
        }

        // console.log(this._pangs.length);

        this.lbl_KR.string = this.WordList[index_Words].kr;
        this._now_Word = this.WordList[index_Words].en;
        this._ready_WordIndex = 0;
    }

    Tapped_Pang = (__button: Button): void => {
        let pang = __button.getComponent(Pang);
        let keyChar = this._now_Word[this._ready_WordIndex];
        console.log(`Tapped_Pang(${pang.Index}, ${pang.CHAR}): ${keyChar}`);
        
        //if(this._ready_WordIndex != pang.Index) {
        if(keyChar != pang.CHAR) {//char 비교.. 중복되는 알파벳 고려
            // console.log("틀림!!");
            pang.Wrong();
            return;
        }

        this.lbl_EN.string = this._now_Word.substring(0, this._ready_WordIndex + 1);
        // console.log(`collect=> Now: ${this._now_Word}`);
        this._ready_WordIndex += 1;
        if(this._now_Word.length <= this._ready_WordIndex) {
            console.log("클리어~~");

            for(let index=this._ready_WordIndex; index<this._pangs.length; index++) {
                this._pangs[index].Hide_Pang(true);
            }
        }
        pang.Correct();
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
