import "./App.css";
import { useState, useEffect } from "react";
import logo from "./images/logo.svg";
import SomeFunction from "./components/aa";
function App() {
    const moves = [{ name: "rock" }, { name: "paper" }, { name: "scissors" }];
    const [show, setShow] = useState(true);
    const [home, setHome] = useState("");
    const [score, setScore] = useState(0);
    useEffect(() => {
        let value = localStorage.getItem("score");
        if (value != null) setScore(Number(value));
    }, []);
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
                    <section className="rock-paper-scissors">aaaa</section>
                ) : (
                    <section class="result"></section>
                )}
            </main>
        </div>
    );
}

export default App;
