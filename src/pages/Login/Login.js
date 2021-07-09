import React, { useState } from "react";
import { TextBox, Button, DropDown } from "../../components";

const Login = () => {
  const [input, setInput] = useState({});
  const [dropDownOption, setDropDownOption] = useState("Admin");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="space-y-4">
        <div>
          <DropDown
            // label="select the account type"
            def="Admin"
            setDropDownOption={(option) => setDropDownOption(option)}
            options={["Admin", "Manager", "Affiliate"]}
          />
        </div>
        <div>
          <TextBox
            svgCode="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            type="text"
            placeHolder="Email"
            isLabel="true"
            label="Email"
            name="email"
            orientation="vertical"
            value={input.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextBox
            svgCode="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            type="password"
            placeHolder="Password"
            isLabel="true"
            label="Password"
            orientation="vertical"
            name="password"
            value={input.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Button
            variant="primary200"
            color="primary"
            size="md"
            onClick={() => console.log("test")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
