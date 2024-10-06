import React from "react";

export default function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "gray", borderRadius: "100%", zIndex: 10, position: "absolute", left: "5%", top: "45%", margin: "5px", cursor: "pointer" }}
            onClick={onClick}
        />
    );
}