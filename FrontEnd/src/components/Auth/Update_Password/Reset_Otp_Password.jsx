import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResetPasswordForm from "./ResetPasswordForm";
import OTPVerificationForm from "./OTP";
import UpdatePasswordForm from "./UpdatePassword";
import PageNotFound from "../../../utils/PageNotFound";
import { BASE_URL } from "../../../utils/BASE_URL";

const Reset_Otp_Password = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setstep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleChangeOTP = (e) => {
    const otp = e.target.value;
    setOtp(otp);
  };

  const handleChangeNewPassword = (e) => {
    const newPassword = e.target.value;
    setnewPassword(newPassword);
  };

  const handleChangeConfirePassword = (e) => {
    const confirmNewPassword = e.target.value;
    setconfirmNewPassword(confirmNewPassword);
  };

  // reset password
  const ResetSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the backend to initiate the password reset
      const response = await axios.post(
        `${BASE_URL}/api/v1/resetpassword`,
        { email }
      );
      setMessage(response.data.message);
      if (response.data.status === "success") {
        setstep(2);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(response.data.message);
    }
  };

  // reseve OTP

  const OTPSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the backend to initiate the password reset
      const response = await axios.post(
        `${BASE_URL}/api/v1/resetpassword`,
        { email, otp }
      );
      setMessage(response.data.message);
      if (response.data.status === "success") {
        setstep(3);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(response.data.message);
    }
  };

  // update password
  const UpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the backend to initiate the password reset
      const response = await axios.post(
        `${BASE_URL}/api/v1/updatepassword`,
        { otp, email, newPassword }
      );
      setMessage(response.data.message);
      if (response.data.status === "success") {
        setstep(4);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(response.data.message);
    }
  };

  return (
    <div>
      {step === 1 ? (
        <ResetPasswordForm
          handleSubmit={ResetSubmit}
          handleChange={handleChangeEmail}
          error={error}
          value={email}
        />
      ) : step === 2 ? (
        <OTPVerificationForm
          handleSubmit={OTPSubmit}
          handleChange={handleChangeOTP}
          error={error}
          value={otp}
        />
      ) : step === 3 ? (
        <UpdatePasswordForm
          handleSubmit={UpdateSubmit}
          handleChange={handleChangeNewPassword}
          value={newPassword}
          error={error}
        />
      ) : (
        navigator("/auth/login")
      )}
    </div>
  );
};

export default Reset_Otp_Password;
