import React from "react";

function SecondaryPublicLayout(props) {
  return (
    <div>
      <div className="p-0">{props.children}</div>
    </div>
  );
}

export default SecondaryPublicLayout;
