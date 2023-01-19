import { _decorator, Component, math, } from 'cc';
import { Commons } from '../../scripts/Defines';
import { CardInfo } from '../../scripts/types/CardInfo';
import { Card } from '../Card';
const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {
    @property([Card])
    cards: Card[] = []!;

    start() {
        console.log("GameMain.start()");

        for(let n=0; n<this.cards.length; n++) {
            this.RandomCard(n);
        }
    }

    private RandomCard = (__index: number, __ratio_Unkown: number = 20) => {
        let info = new CardInfo(Commons.Kind.unknown, false);
        {
            info.kind = math.randomRangeInt(Commons.Kind.rock, Commons.Kind.scissors + 1);

            info.isUnknown = (__ratio_Unkown > math.randomRangeInt(1, 100 + 1));
        }
        this.cards[__index].Setup(__index, info);
    }

    private Check(__kind: Commons.Kind) {
        // let isCollect = (this.cards[0].Get_Info().kind == __kind);
        // // console.log(`Check(${__kind}) => isCollect= ${isCollect}`);

        // if(!isCollect) {
        //     console.log("GameOver!!");
        //     return;
        // }

        let cardKind = this.cards[0].Get_Info().kind;
        let userKind = __kind;
        let result: Commons.Result = Commons.Result.tie;
        // if(Commons.Kind.rock == userKind) {
        //     if(Commons.Kind.scissors == cardKind) {
        //         result = Commons.Result.win;
        //     }
        //     else if(Commons.Kind.paper == cardKind) {
        //         result = Commons.Result.lose;
        //     }
        // }
        // else if(Commons.Kind.paper == userKind) {
        //     if(Commons.Kind.rock == cardKind) {
        //         result = Commons.Result.win;
        //     }
        //     else if(Commons.Kind.scissors == cardKind) {
        //         result = Commons.Result.lose;
        //     }
        // }
        // else if(Commons.Kind.scissors == userKind) {
        //     if(Commons.Kind.paper == cardKind) {
        //         result = Commons.Result.win;
        //     }
        //     else if(Commons.Kind.rock == cardKind) {
        //         result = Commons.Result.lose;
        //     }
        // }
        if(userKind != cardKind) {
            let loseCardKind = this.Get_WinKind(userKind);
            result = (loseCardKind == cardKind
                ? Commons.Result.win
                : Commons.Result.lose
                );
        }

        {//DEV
            let strResult = "";
            if(Commons.Result.lose == result) {
                strResult = "졌다";
            }
            // else if(Commons.Result.win == result) {
            //     strResult = "이겼다";
            // }
            else if(Commons.Result.tie == result) {
                strResult = "비겼다";
            }

            if (Commons.Result.win != result) {
                console.log(`Check: ${strResult}`);
                return;
            }
        }

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
    }

    private Get_WinKind(__userKind: Commons.Kind): Commons.Kind {//인자로 받은 Kind가 이기는 상대방의 Kind
        let ret = Commons.Kind.unknown;
        if(Commons.Kind.rock == __userKind) {
            ret = Commons.Kind.scissors;
        }
        else if(Commons.Kind.paper == __userKind) {
            ret = Commons.Kind.rock;
        }
        else if(Commons.Kind.scissors == __userKind) {
            ret = Commons.Kind.paper;
        }
        return ret;
    }

    OnClick_Action(event: Event, customEventData: string) {
        let kind: Commons.Kind = Number(customEventData);
        // console.log(`OnClick_Action(${customEventData})=> kind: ${kind}`);

        this.Check(kind);
    }

    // update(deltaTime: number) {}
}

