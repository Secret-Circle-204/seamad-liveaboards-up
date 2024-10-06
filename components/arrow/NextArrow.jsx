import React from "react";

export default function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "blue" ,  background: "gray", borderRadius: "100%",   zIndex: 10, position: "absolute", right: "5%", top: "45%", margin: "5px", cursor: "pointer" }}
        onClick={onClick}
      />
    );
  }
  