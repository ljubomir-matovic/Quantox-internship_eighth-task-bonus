import "./App.css";
import { useState, useEffect } from "react";
import logo from "./images/logo.svg";
import rock from "./images/icon-rock.svg";
import paper from "./images/icon-paper.svg";
import scissors from "./images/icon-scissors.svg";
import Move from "./components/Move";
function App() {
    const images={rock,paper,scissors};
    const moves = ["rock", "paper", "scissors"];
    const [show, setShow] = useState(true);
    const [game, setGame] = useState({});
    const [score, setScore] = useState(0);
    async function handleClick(e) {
        let name = this.name;
        setShow(false);
        let index = Math.floor(Math.random() * 10) % 3;
        setGame({home:moves[index],name});
    }
    /*componentDidMount*/
    useEffect(() => {
        let value = localStorage.getItem("score");
        if (value != null) setScore(Number(value));
    }, []);
    /*game updated*/
    useEffect(() => {
        let {home,name}=game;
        console.log(game);
        if (
            (home == "paper" && name == "rock") ||
            (home == "rock" && name == "scissors") ||
            (home == "scissors" && name == "paper")
        ) {
            console.log("home wins");
            setScore(score-1);
        } else if (
            (name == "paper" && home == "rock") ||
            (name == "rock" && home == "scissors") ||
            (name == "scissors" && home == "paper")
        ) {
            console.log("player wins");
            setScore(score+1);
        } else {
            console.log("draw");
        }
    }, [game]);
    /*score updated*/
    useEffect(() => {
        localStorage.setItem("score", score);
    }, [score]);
    return (
        <div className="container">
            <header>
                <section className="logo-container">
                    <img src={logo} alt="logo" />
                </section>
                <section className="score-container">
                    <h4>Score</h4>
                    <h1>{score}</h1>
                </section>
            </header>
            <main>
                {show ? (
                    <section className="rock-paper-scissors">
                        <Move
                            name="paper"
                            image={paper}
                            handleClick={handleClick}
                        />
                        <Move
                            name="scissors"
                            image={scissors}
                            handleClick={handleClick}
                        />
                        <Move
                            name="rock"
                            image={rock}
                            handleClick={handleClick}
                        />
                    </section>
                ) : (
                    <section className="result">
                    <Move name={game.name} image={images[game.name]}/>
                    <Move name={game.home} image={images[game.home]}/>
                    <button onClick={()=>setShow(true)}>Play again</button>
                    </section>
                )}
            </main>
            <button className="rules">Rules</button>
        </div>
    );
}

export default App;
