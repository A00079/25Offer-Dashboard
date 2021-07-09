import React from "react";
import { Text } from "../../../../components";

const Features = () => {
  return (
    <div>
      {[...new Array(3)].map((el, index) => (
        <div className="p-5">
          <div className="feature-point">
            <Text variant="white">{index + 1}</Text>
          </div>
          <div>
            <Text variant="white">
              Lorem ipsun text is real this shit is damn real and we are epic
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
