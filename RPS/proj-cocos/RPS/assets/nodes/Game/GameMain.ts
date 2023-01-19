import { _decorator, Component, Node, math } from 'cc';
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

    RandomCard = (__card: Card, __ratio_Unkown: number = 20) => {
        let kind: Commons.Kind = Commons.Kind.rock;
        let isUnknown = false;
        {
            kind = math.randomRangeInt(Commons.Kind.rock, Commons.Kind.scissors + 1);

            isUnknown = (__ratio_Unkown > math.randomRangeInt(1, 100 + 1));
        }
        __card.Setup(kind, isUnknown);
    }

    // update(deltaTime: number) {}
}

