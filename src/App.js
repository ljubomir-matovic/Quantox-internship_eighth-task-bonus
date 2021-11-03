import "./App.css";
import { useState, useEffect, Fragment } from "react";
import logo from "./images/logo.svg";
import rock from "./images/icon-rock.svg";
import paper from "./images/icon-paper.svg";
import scissors from "./images/icon-scissors.svg";
import Move from "./components/Move";
import Modal from "./components/Modal";
function App() {
    const images = { rock, paper, scissors };
    const moves = ["rock", "paper", "scissors"];
    const [show, setShow] = useState(true);
    const [game, setGame] = useState({});
    const [score, setScore] = useState(0);
    const [winner, setWinner] = useState(0);
    const [showModal, setShowModal] = useState(false);
    function onClose() {
        setShowModal(false);
    }
    function handleClick(e) {
        let name = this.name;
        setShow(false);
        let index = Math.floor(Math.random() * 10) % 3;
        setGame({ home: moves[index], name });
    }
    /*componentDidMount*/
    useEffect(() => {
        let value = localStorage.getItem("score");
        if (value != null) setScore(Number(value));
    }, []);
    /*game updated*/
    useEffect(() => {
        let { home, name } = game;
        if (
            (home == "paper" && name == "rock") ||
            (home == "rock" && name == "scissors") ||
            (home == "scissors" && name == "paper")
        ) {
            setWinner(-1);
            setScore(score - 1);
        } else if (
            (name == "paper" && home == "rock") ||
            (name == "rock" && home == "scissors") ||
            (name == "scissors" && home == "paper")
        ) {
            setWinner(1);
            setScore(score + 1);
        } else {
            setWinner(0);
        }
    }, [game]);
    /*score updated*/
    useEffect(() => {
        localStorage.setItem("score", score);
    }, [score]);
    return (
        <Fragment>
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
                            <section className="picked">
                                <h3>You picked</h3>
                                <Move
                                    name={game.name}
                                    image={images[game.name]}
                                    winner={winner == 1}
                                />
                            </section>
                            <section className="result-info">
                                <h2>
                                    {winner == 1 && "You win"}
                                    {winner == -1 && "You lose"}
                                    {winner == 0 && "Draw"}
                                </h2>
                                <button onClick={() => setShow(true)}>
                                    <h3>Play again</h3>
                                </button>
                            </section>
                            <section className="picked">
                                <h3>Home picked</h3>
                                <Move
                                    name={game.home}
                                    image={images[game.home]}
                                    winner={winner == -1}
                                />
                            </section>
                        </section>
                    )}
                </main>
                <section
                    className={`rules ${
                        show ? "rules-position" : "rules-column"
                    }`}
                    onClick={() => setShowModal(true)}
                >
                    <h3>Rules</h3>
                </section>
            </div>
            <Modal show={showModal} onClose={onClose} />
        </Fragment>
    );
}

export default App;
