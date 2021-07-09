import React from "react";
import Text from "../Text";
import { COLORS } from "../../theme/mainTheme";

const Button = ({ children, variant, color, size, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="py-1 focus:outline-none w-full"
        style={{ backgroundColor: COLORS[variant], color: COLORS[color] }}
      >
        <Text size={size} weight="700">
          {children}
        </Text>
      </button>
    </div>
  );
};

export default Button;
