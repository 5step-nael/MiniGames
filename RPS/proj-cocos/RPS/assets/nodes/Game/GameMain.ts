import { _decorator, Component, math, Prefab, instantiate, Node, tween, Vec3, Color, Label, Button } from 'cc';
import { Commons } from '../../scripts/Defines';
import { CardInfo } from '../../scripts/types/CardInfo';
import { Card } from './Card';
import { ActionButton } from './ActionButton';
import { Util } from '../../scripts/Util';
import { Timer } from './Timer';
const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {
    @property({type: Prefab})
    private prfb_Card: Prefab = null;

    @property([Card])
    private cards: Card[] = []!;

    @property(Node)
    private cardpack_RIP: Node = null;

    @property([ActionButton])
    private actionButtons: ActionButton[] = []!;

    @property(Node)
    private curtain: Node = null;

    @property(Label)
    private lbl_Message: Label = null;

    @property(Node)
    private btn_Retry: Node = null;

    @property(Label)
    private lbl_Score: Label = null;

    _score: number = 0;

    @property(Timer) private timer: Timer = null;

    start() {
        // console.log("GameMain.start()");
        this.curtain.active = true;

        this.timer.Setup_Timer(this.EndTimer);

        this.GameStart();
    }

    private GameStart() {
        this.Set_Score(0);
        this.Make_Game();

        this.TweenMessage_GameStart();
    }

    private TweenMessage_GameStart2() {
        this.lbl_Message.node.setScale(0, 0, 0);
        this.lbl_Message.string = "READY";

        const label = this.lbl_Message;
        let times = 0;

        tween(this.lbl_Message.node)
        // 延迟 1s
        .delay(1)
        .by(1, { scale: new Vec3(1, 1, 1) }, {
            'onStart': () => {
                // 第二遍开始的时候，移动node
                // if (times == 1) label.node.translate(new Vec3(0, 10, 0));
                label.node.setScale(0, 0, 0);
            },
            'onUpdate': () => {
                // that.node.scale = that._scale;
            },
            'onComplete': () => {
                // 第三遍完成的时候, 旋转Node
                // if (times == 2) that.node.rotate(Quat.fromEuler(new Quat(), 0, 45, 0));
                times++;
            }
        })
        .repeat(3)
        .start();

        // tween(this.lbl_Message.node)
        //     .by(1.5, {
        //             scale: new Vec3(1.0, 1.0, 1.0),
        //         }, {
        //             easing: 'backOut',

        //             onStart: (target: Node) => {
        //                 if(1 == times) {
        //                     that.lbl_Message.node.setScale(0, 0, 0);
        //                     that.lbl_Message.string = "GAME";
        //                 }
        //                 else if(2 == times) {
        //                     that.lbl_Message.node.setScale(0, 0, 0);
        //                     that.lbl_Message.string = "START";
        //                 }
        //             },

        //             onComplete: (target: Node) => {
        //                 console.log(times);
        //                 times++;

        //                 if(3 == times) {
        //                     that.lbl_Message.node.active = false;
        //                     that.curtain.active = false;
        //                 }
        //             },
        //         }
        //     )
            
        //     // .delay(1.5)
        //     .repeat(3)
            
        //     .start();

        // let label = this.lbl_Message;
        // let tw = tween(this.lbl_Message.node)
        //     .to(1.5, {
        //             scale: new Vec3(1.0, 1.0, 1.0),
        //         }, {
        //             easing: 'backOut',

        //             // onStart: (target?: Node) => {
        //             //     // target.setScale(0, 0, 0);
        //             //     console.log("onStart");
        //             // }
        //             // onComplete: (taget?: Node) => {
        //             //     this.curtain.active = false;
        //             // }
        //         }
        //     )
            
        //     .delay(1.5)
        //     .to(1.5, {
        //             scale: new Vec3(1.0, 1.0, 1.0),
        //         }, {
        //             easing: 'backOut',

        //             onStart: (target?: Node) => {
        //                 // target.setScale(0, 0, 0);
        //                 // this.lbl_Message.string = "GAME";

        //                 label.node.setScale(0, 0, 0);
        //                 label.string = "GAME";
        //             }
        //         }
        //     )

        //     .delay(1.5)
        //     .to(1.5, {
        //             scale: new Vec3(1.0, 1.0, 1.0),
        //         }, {
        //             easing: 'backOut',

        //             onStart: (target?: Node) => {
        //                 this.lbl_Message.node.setScale(0, 0, 0);
        //                 this.lbl_Message.string = "START";
        //             },

        //             onComplete: (taget?: Node) => {
        //                 this.lbl_Message.node.active = false;
        //                 this.curtain.active = false;
        //             }
        //         }
        //     )

        //     .start();

        // tween(this.lbl_Message.node)
        //     // .to(1.0, {
        //     //     scale: new Vec3(1.0, 1.0, 1.0),
        //     // }, {
        //     //     easing: 'backOut',
                
        //     //     onComplete: (target?: Node) => {
        //     //         this.curtain.active = false;
        //     //     }
        //     // })
        //     // .delay(1.0)
        //     // .start();

        //     .to(0.0, {})
        //     .then(tw)
        //     .delay(1.0)
        //     .
    }
    private TweenMessage_GameStart() {

        this.lbl_Message.node.setScale(0, 0, 0);
        this.lbl_Message.string = "READY";
        this.lbl_Message.color = Color.GREEN;
        // this.lbl_Message.node.active = true;

        let loopCount = 0;
        tween(this.lbl_Message.node)
            .delay(1.0)
            .by(1.0
                , { scale: new Vec3(1, 1, 1), }
                // , new Vec3(1, 1, 1)

                , {
                    easing: 'backOut',

                    onStart: () => {
                        this.lbl_Message.node.setScale(0, 0, 0);

                        if(0 == loopCount) {
                            // this.lbl_Message.string = "READY";
                            this.lbl_Message.node.active = true;
                        }
                        else if(1 == loopCount) { this.lbl_Message.string = "GAME"; }
                        else if(2 == loopCount) { this.lbl_Message.string = "START"; }

                        console.log(`onStart: ${loopCount}`);
                    },

                    onComplete: () => {
                        this.lbl_Message.node.setScale(0, 0, 0);
                        console.log(`onComplete: ${loopCount}`);
                        // this.curtain.active = false;
                        loopCount++;
                    }
                }
            )

            // .delay(1.5)
            .repeat(3)
            .call(() => {
                // console.log("Finish!!");
                this.lbl_Message.node.active = false;
                this.curtain.active = false;

                this.timer.Control_Timer(true);
            })
            .start();
    }

    Make_Game() {
        for(let n=0; n<this.cards.length; n++) {
            this.RandomCard(n);
        }
    }

    private RandomCard = (__index: number, __ratio_Unkown: number = 35) => {
        let info = new CardInfo(Commons.Kind.unknown, false);
        {
            info.kind = math.randomRangeInt(Commons.Kind.rock, Commons.Kind.scissors + 1);

            info.isUnknown = (__ratio_Unkown > math.randomRangeInt(1, 100 + 1));
        }
        this.cards[__index].Setup(__index, info);
    }

    private Check(__kind: Commons.Kind) {
        let cardKind = this.cards[0].Get_Info().kind;
        let userKind = __kind;
        let result: Commons.Result = Commons.Result.tie;

        if(userKind != cardKind) {
            let loseCardKind = Util.Get_WinKind(userKind);
            result = (loseCardKind == cardKind
                ? Commons.Result.win
                : Commons.Result.lose
                );
        }

        if(Commons.Result.lose == result) {
            this.GameOver();
            return;
        }
        else if(Commons.Result.tie == result) {
            this.actionButtons[__kind].Shake();
            return;
        }

        this.timer.Bonus();
        this.Set_Score(this._score + 1);

        let infos: CardInfo[] = [];
        for(let n=0; n<this.cards.length; n++) {
            infos.push(this.cards[n].Get_Info());
        }
        // console.log(infos);

        let lastIndex = this.cards.length - 1;
        for(let n=0; n<lastIndex; n++) {
            this.cards[n].Setup(n, infos[n + 1]);
        }
        this.RandomCard(lastIndex);

        let ripCard = instantiate(this.prfb_Card);
        {
            let cardInfo = infos[0];
            ripCard.parent = this.cardpack_RIP;
            ripCard.setPosition(0, 0);

            let ts_Card = ripCard.getComponent(Card);
            ts_Card?.Setup(-1, cardInfo);

            let Duration = 1.0;
            // { Duration = 3.0; }
            tween(ripCard)
                // .target(hideCard)
                .to(Duration, {
                    position: new Vec3(-720.0, 0, 0),
                    // color: new Color(255, 255, 255, 0),
                }, {
                    easing: 'expoOut',
                    onComplete: (target?: object) => {
                        ripCard.destroy();
                    },
                    onUpdate : (target: object, ratio:number)=>{
                        // console.log(ratio);

                        let revRatio = 1.0 - ratio;
                        // console.log(revRatio);

                        let alpha = 255 * revRatio;;
                        // console.log(alpha);

                        ts_Card.Set_Opacity(alpha);
                    }
                    // progress: (start: number, end: number, current: number, ratio: number): number => {
                    //     let ret = math.lerp(start, end, ratio);
                    //     // console.log(ret);
                    //     console.log(current);
                    //     return ret;
                    // }
                }
                )
                .start();
        }
    }

    private GameOver = () => {
        //game over
        this.timer.Control_Timer(false);

        this.curtain.active = true;

        this.lbl_Message.string = "GAME OVER";
        this.lbl_Message.node.setScale(1, 1, 1);
        this.lbl_Message.color = Color.RED;
        this.lbl_Message.node.active = true;

        this.btn_Retry.active = true;
    }

    private EndTimer = () => {
        this.GameOver();
    }

    private Set_Score = (__score: number) => {
        this._score = __score;

        this.lbl_Score.string = __score.toString();
    }

    OnClick_Action(event: Event, customEventData: string) {
        let kind: Commons.Kind = Number(customEventData);
        // console.log(`OnClick_Action(${customEventData})=> kind: ${kind}`);

        this.Check(kind);
    }

    OnCLick_Retry(event: Event, customEventData: string) {
        // this.lbl_Message.string = "GAME OVER";
        
        this.timer.Reset_Timer();

        this.lbl_Message.node.active = false;
        this.btn_Retry.active = false;
        // this.curtain.active = false;

        this.GameStart();
    }

    // update(deltaTime: number) {}
}

