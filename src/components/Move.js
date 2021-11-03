import React from "react";
function Move({ name, image, handleClick=()=>{},winner=false, ...props }) {
    return (
        <section
            className={`outer-circle ${name} ${winner?"winner":""}`}
            onClick={handleClick.bind({name})}
        >
            <section className="inner-circle">
                <img src={image} alt="symbol" />
            </section>
        </section>
    );
}
export default Move;
