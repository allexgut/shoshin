import Countdown from "react-countdown";

export function Zazen(props) {
    const second = 1000;
    const minute = 60 * second;

    const length = props.length * minute;

    const warmup = 30 * second;
    const startDelay = 5 * minute;
    const reminderBellInterval = 3 * minute;

    const handleTick = (e) => {
        if (e.total === length - warmup) {
            console.log('MOPPAN')
        }

        if (e.total === length - startDelay) {
            console.log('START BELL');
        }

        if (e.total < length - startDelay && e.total % reminderBellInterval === 0) {
            console.log('REMINDER BELL');
        }
    }

    const handleComplete = () => {
        console.log('END BELL');
    } 

    return (
        <div>
            {!props.isRunning && <p>This session will last {props.length} minutes</p>}
            {props.isRunning &&
                <Countdown onTick={handleTick} onComplete={handleComplete} date={Date.now() + props.length * 60000} 
            />}
        </div>
    )
}
