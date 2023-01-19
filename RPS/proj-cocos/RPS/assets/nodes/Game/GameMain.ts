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
        let isCollect = (this.cards[0].Get_Info().kind == __kind);
        // console.log(`Check(${__kind}) => isCollect= ${isCollect}`);

        if(!isCollect) {
            console.log("GameOver!!");
            return;
        }

        console.log("collect~~");

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

    OnClick_Action(event: Event, customEventData: string) {
        let kind: Commons.Kind = Number(customEventData);
        // console.log(`OnClick_Action(${customEventData})=> kind: ${kind}`);

        this.Check(kind);
    }

    // update(deltaTime: number) {}
}

