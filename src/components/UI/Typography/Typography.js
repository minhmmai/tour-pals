import React from "react";

const Typography = props => {
    const { color, children, variant } = props;
    let textColor = "";

    switch (color) {
        case "white":
            textColor = "$white";
            break;
        case "black":
            textColor = "$black";
            break;
        case "primary":
            textColor = "$primary";
            break;
        case "secondary":
            textColor = "$secondary";
            break;
        case "primary-light":
            textColor = "$primary_light";
            break;
        case "secondary-light":
            textColor = "$secondary_light";
            break;
        default:
            textColor = "$paragraph";
    }

    switch (variant) {
        case "intro":
            return <h1 style={{ color: textColor }}>{children}</h1>;
        case "heading":
            return <h2 style={{ color: textColor }}>{children}</h2>;
        case "sub_intro":
            return <h3 style={{ color: textColor }}>{children}</h3>;
        default:
            return <p style={{ color: textColor }}>{children}</p>;
    }
}

export default Typography;