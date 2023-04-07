import { _decorator, Component, Node, Prefab } from 'cc';
import { Pang } from './Pang';
const { ccclass, property } = _decorator;

@ccclass('MainStage')
export class MainStage extends Component {
    @property({type: Prefab})
    private prfb_Pang: Pang = null!;

    start() {
    }

    // update(deltaTime: number) {}
}

