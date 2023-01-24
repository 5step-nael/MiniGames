import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Timer')
export class Timer extends Component {
    @property(Sprite)
    spr_Inner: Sprite = null!;

    private _isRunning = false;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.spr_Inner.fillRange = 1.0;
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ENTER:
            case KeyCode.NUM_ENTER:
                // console.log('Press a key');
                this._isRunning = !this._isRunning;
                break;

            case KeyCode.SPACE:
                this.spr_Inner.fillRange = 1.0;
                break;
        }
    }

    update(deltaTime: number) {
        // console.log(deltaTime);

        this.Update_TimeCheck(deltaTime);
    }

    private Update_TimeCheck = (__dt: number) => {
        if(!this._isRunning) {
            return;
        }

        let timeRange: number = this.spr_Inner.fillRange;
        timeRange -= (__dt * 1.0);
        if(0.0 >= timeRange) {
            timeRange = 0.0;
        }
        this.spr_Inner.fillRange = timeRange;
    }
}
