import React, { useState } from "react";
import { TextBox, Text, Button } from "../../../../components";
import { COLORS } from "../../../../theme/mainTheme";
import PhoneVerification from "../PhoneVerification";

const Form = () => {
  const [input, setInput] = useState({});
  const [phoneNumber, setPhoneNumber] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  console.log(phoneNumber);

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 ">
        <div className="w-full">
          <TextBox
            type="text"
            svgCode="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            required={true}
            orientation="vertical"
            name="name"
            placeHolder="name"
            isLabel={true}
            label="name"
            value={input.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
          <TextBox
            type="text"
            svgCode="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            required={true}
            orientation="vertical"
            name="companyName"
            placeHolder="xyz ads"
            isLabel={true}
            label="company name"
            value={input.companyName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <div className="w-full">
          <TextBox
            type="email"
            svgCode="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            required={true}
            orientation="vertical"
            name="email"
            placeHolder="xyz@gmail.com"
            isLabel={true}
            label="Email Address"
            value={input.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex  space-x-4 ">
        <div className="w-full">
          <TextBox
            type="password"
            svgCode="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            required={true}
            orientation="vertical"
            name="password"
            placeHolder="password"
            isLabel={true}
            label="Password"
            value={input.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
          <TextBox
            type="password"
            svgCode="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            required={true}
            orientation="vertical"
            name="confirmPassword"
            placeHolder="confirm Password"
            isLabel={true}
            label="confirm password"
            value={input.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        {phoneNumber === null ? (
          <PhoneVerification setPhoneNumber={(num) => setPhoneNumber(num)} />
        ) : (
          <div className="bg-gray-100 flex justify-center py-10 space-x-4 items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <Text variant="info" size="lg">
                Mobile Number Verified
              </Text>
            </div>
          </div>
        )}
      </div>
      <div>
        <Button
          variant="primary200"
          color="primary"
          size="lg"
          onClick={() => console.log("test")}
        >
          Register
        </Button>
        <div
          className="text-right cursor-pointer"
          style={{ color: COLORS.primary }}
        >
          <Text>Alreay have an account ? Login.</Text>
        </div>
      </div>
    </div>
  );
};

export default Form;
