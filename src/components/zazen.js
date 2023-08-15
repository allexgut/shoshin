import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const States = {
    WARMUP: 0,
    ZAZEN: 1,
    KINHIN: 2,
    CHANTING: 3
};

export function Zazen({isRunning, length}) {
    const [currentState, setCurrentState] = useState(null);
    const [didKinhin, setDidKinhin] = useState(false);

    useEffect(() => {
        if (isRunning) {
            setCurrentState(States.WARMUP);
        }
    }, [isRunning])

    const second = 1000;
    const minute = 60 * second;

    const warmupLength = 5 * second;
    const zazenLength = 10 * second;
    const kinhinLength = 5 * second;
    const reminderBellInterval = 1 * second;


    const handleStartWarmup = () => {
        console.log('MOPPAN');
    }

    const handleWarmupComplete = () => {
        setCurrentState(States.ZAZEN);
    }

    const handleStartZazen = () => {
        console.log('START BELL');
    }

    const handleZazenTick = (e) => {
        if (e.total % reminderBellInterval === 0) {
            console.log('REMINDER BELL');
        }
    }

    const handleZazenComplete = () => {
        if (didKinhin) {
            setCurrentState(States.CHANTING);
        } else {
            setCurrentState(States.KINHIN);
        }
        console.log('END ZAZEN BELL');
    }

    const handleKinhinStart = () => {
        console.log('KINHIN BELL');
    }

    const handleKinhinComplete = () => {
        setCurrentState(States.ZAZEN);
        setDidKinhin(true);
        console.log('KINHIN END BELL');
    }

    return (
        <div>
            {!isRunning && <p>This session will last {length} minutes</p>}
            {(isRunning && currentState === States.WARMUP) &&
                <div id="warmup">
                    WARMUP
                    <Countdown onStart={handleStartWarmup} onComplete={handleWarmupComplete} date={Date.now() + warmupLength} />
                </div>
            }
            {(isRunning && currentState === States.ZAZEN) &&
                <div id="zazen">
                    ZAZEN
                    <Countdown onStart={handleStartZazen} onTick={handleZazenTick} onComplete={handleZazenComplete} date={Date.now() + zazenLength} />
                </div>
            }
            {
                (isRunning && currentState === States.KINHIN) &&
                <div id="kinhin">
                    KINHIN
                    <Countdown onStart={handleKinhinStart} onComplete={handleKinhinComplete} date={Date.now() + kinhinLength} />
                </div>
            }
            {
                (isRunning && currentState === States.CHANTING) &&
                <p>CHANTING</p>
            }
        </div>
    )
}
