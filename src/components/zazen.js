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

    const warmupLength = 5 * minute;
    const zazenLength = 30 * minute;
    const kinhinLength = 5 * minute;
    const reminderBellInterval = 5 * minute;


    const handleStartWarmup = () => {
        // TODO: Play Moppan(Han) sound here.
    }

    const handleWarmupComplete = () => {
        setCurrentState(States.ZAZEN);
    }

    const handleStartZazen = () => {
        // TODO: Play Gyoban sound here.
        // TODO Find out how the Gyoban is played or find a recording of the entire thing.
        // TODO: Find out what else is played here (it's not only the gyoban).
    }

    const handleZazenTick = (e) => {
        if (e.total % reminderBellInterval === 0) {
            // TODO: Play Keisu sound here.
        }
    }

    const handleZazenComplete = () => {
        // TODO: Same as for handleStartZazen.
        if (didKinhin) {
            setCurrentState(States.CHANTING);
        } else {
            setCurrentState(States.KINHIN);
        }
    }

    const handleKinhinStart = () => {
        // TODO: Play bell to start kinhin here.
        // TODO: Find the name of the bell.
    }

    const handleKinhinComplete = () => {
        setCurrentState(States.ZAZEN);
        setDidKinhin(true);
        // TODO: Play bell to end kinhin here.
        // TODO: Find the name of the bell.
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
