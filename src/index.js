import { Zazen } from "./components/zazen"
import React from "react"
import { createRoot } from 'react-dom/client'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            zazenLength: null,
            isZazenRunning: false
        }
    }

    setLength = (e) => {
        this.setState({
            zazenLength: e.target.value
        })
    }

    startZazen = (e) => {
        e.preventDefault();
        this.setState({
            isZazenRunning: true
        })
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Shoshin</h1>
                </header>
                <main>
                    <p>How long would you like to sit (in minutes)?</p>
                    <input onChange={this.setLength} type="number" placeholder="40"></input>
                    <button onClick={this.startZazen} type="button">Start</button>
                    <Zazen length={this.state.zazenLength} isRunning={this.state.isZazenRunning}/>
                </main>
            </div>
        )
    }
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)