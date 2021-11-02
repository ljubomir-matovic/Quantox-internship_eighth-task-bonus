import React from "react";
function SomeFunction({ score, setScore }) {
    function handler() {
        setScore(score + 1);
    }
    return <p onClick={handler}>aaa</p>;
}
export default SomeFunction;
