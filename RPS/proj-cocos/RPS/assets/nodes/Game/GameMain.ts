import { _decorator, Component, math, } from 'cc';
import { Commons } from '../../scripts/Defines';
import { Card } from '../Card';
const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {
    @property([Card])
    cards: Card[] = []!;

    start() {
        console.log("GameMain.start()");

        for(const card of this.cards) {
            this.RandomCard(card);
        }
    }

    private RandomCard = (__card: Card, __ratio_Unkown: number = 20) => {
        let kind: Commons.Kind = Commons.Kind.rock;
        let isUnknown = false;
        {
            kind = math.randomRangeInt(Commons.Kind.rock, Commons.Kind.scissors + 1);

            isUnknown = (__ratio_Unkown > math.randomRangeInt(1, 100 + 1));
        }
        __card.Setup(kind, isUnknown);
    }

    private Check(__kind: Commons.Kind) {        
        let isCollect = (this.cards[0].Get_Kind() == __kind);
        console.log(`Check(${__kind}) => isCollect= ${isCollect}`);
    }

    OnClick_Action(event: Event, customEventData: string) {
        let kind: Commons.Kind = Number(customEventData);
        console.log(`OnClick_Action(${customEventData})=> kind: ${kind}`);

        this.Check(kind);
    }

    // update(deltaTime: number) {}
}

