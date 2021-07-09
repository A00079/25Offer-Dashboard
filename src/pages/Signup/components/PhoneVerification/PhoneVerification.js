import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAvmhcu-Dv-uWJBgsbq1I6MTgMG9iS0s5U",
  authDomain: "fcmtest-4e427.firebaseapp.com",
  databaseURL: "https://fcmtest-4e427.firebaseio.com",
  projectId: "fcmtest-4e427",
  storageBucket: "fcmtest-4e427.appspot.com",
  messagingSenderId: "690677624901",
  appId: "1:690677624901:web:d30a3ba1ba72394a79732c",
  measurementId: "G-LZNPDYBYR4",
};

firebase.initializeApp(config);

const PhoneVerification = ({ setPhoneNumber }) => {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: "image",
          size: "invisible",
          badge: "bottomright",
        },
        defaultCountry: "+91",
        whitelistedCountries: ["IN", "+91"],
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        var user = authResult.user;
        const data = { phone: user.phoneNumber };
        // object with the key as phone
        setPhoneNumber(data);
      },
    },
  };

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default PhoneVerification;
