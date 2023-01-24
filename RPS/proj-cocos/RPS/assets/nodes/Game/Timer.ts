import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Timer')
export class Timer extends Component {
    @property(Sprite)
    spr_Inner: Sprite = null!;

    private _isRunning = false;
    private _runningTime = 0.0;
    private readonly FullTime = 3.0;
    private readonly RunningVelocity = 1.0;
    private readonly TimeBonus = 1.0;

    private _cb_EndTime: () => void = null;

    start() {
        // { input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this); }//DEV

        this.Reset_Timer();

        // { this.Setup_Timer(this.Callback) }//DEV
    }

    Reset_Timer = () => {
        this._isRunning = false;
        this._runningTime = this.FullTime;

        this.spr_Inner.fillRange = this.Calc_TimeFillRange();
    }

    Setup_Timer = (__callback_EndTime: () => void = null) => {
        this._cb_EndTime = __callback_EndTime;
        this.Reset_Timer();
    }

    Control_Timer = (__running: boolean) => {
        this._isRunning = __running;
    }

    Bonus = () => {
        // let beforeTime = this._runningTime;
        if(!this._isRunning) {
            return;
        }

        let rt = this._runningTime;
        rt += this.TimeBonus;
        if(this.FullTime <= rt) {
            rt = this.FullTime;
        }
        this._runningTime = rt;

        // console.log(`Bonus(): ${beforeTime} => ${this._runningTime}`);
    }

    // //begin of DEV DEV
    // private Callback = () => {
    //     console.log("Callback");
    // }

    // onKeyDown (event: EventKeyboard) {
    //     switch(event.keyCode) {
    //         case KeyCode.ENTER:
    //         case KeyCode.NUM_ENTER:
    //             this.Control_Timer(!this._isRunning);
    //             break;

    //         case KeyCode.SPACE:
    //             this.Reset_Timer();
    //             break;

    //         case KeyCode.BACKSPACE:
    //             this.Bonus();
    //             break;
    //     }
    // }
    // //end of DEV DEV

    update(deltaTime: number) {
        // console.log(deltaTime);

        this.Update_TimeCheck(deltaTime);
    }

    private Calc_TimeFillRange = (): number => {
        let ret = 0.0;
        if(0.0 >= this._runningTime) {
            this._runningTime = 0.0;
        }
        ret = this._runningTime / this.FullTime;
        return ret;
    }

    private Update_TimeCheck = (__dt: number) => {
        if(!this._isRunning) {
            return;
        }

        this._runningTime -= (__dt * this.RunningVelocity);
        let fillRange = this.Calc_TimeFillRange();
        // console.log(fillRange);

        let isEnded = false;
        if(0.0 >= fillRange) {
            fillRange = 0.0;
            this._isRunning = false;
            
            isEnded = true;
        }
        this.spr_Inner.fillRange = fillRange;

        if(isEnded && null !=  this._cb_EndTime) {
            this._cb_EndTime();
        }
    }
}
