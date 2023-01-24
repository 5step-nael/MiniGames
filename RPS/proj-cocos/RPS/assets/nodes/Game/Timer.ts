import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Timer')
export class Timer extends Component {
    @property(Sprite)
    spr_Inner: Sprite = null!;

    private _isRunning = false;

    private _cb_EndTime: () => void;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.Reset_Timer();

        { this.Setup_Timer(this.Callback) }//DEV
    }

    private Reset_Timer = () => {
        this._isRunning = false;

        this.spr_Inner.fillRange = 1.0;
    }

    Setup_Timer = (__callback_EndTime: () => void) => {
        this._cb_EndTime = __callback_EndTime;
        this.Reset_Timer();
    }

    Control_Timer = (__running: boolean) => {
        this._isRunning = __running;
    }

    //begin of DEV DEV
    private Callback = () => {
        console.log("Callback");
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ENTER:
            case KeyCode.NUM_ENTER:
                // console.log('Press a key');
                // this._isRunning = !this._isRunning;
                this.Control_Timer(!this._isRunning);
                break;

            case KeyCode.SPACE:
                this.spr_Inner.fillRange = 1.0;
                break;
        }
    }
    //end of DEV DEV

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

        let isEnded = false;
        if(0.0 >= timeRange) {
            timeRange = 0.0;
            this._isRunning = false;
            
            isEnded = true;
        }
        this.spr_Inner.fillRange = timeRange;

        if(isEnded && null !=  this._cb_EndTime) {
            this._cb_EndTime();
        }
    }
}
