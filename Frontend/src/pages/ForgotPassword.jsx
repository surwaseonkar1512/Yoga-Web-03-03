import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black px-4 ">
        <div
          className="absolute inset-0 bg-gradient-to-r  from-purple-700 to-pink-500  "
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 10%, 0 100%)",
          }}
        ></div>
        <div className="w-full max-w-4xl flex flex-col md:flex-row  rounded-lg overflow-hidden bg-white mt-[100px] z-10">
          {/* Left Side - Form */}
          <div className="flex items-center justify-center ">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              {/* Header */}
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                {emailSent ? "Check Your Email" : "Reset Your Password"}
              </h2>
              <p className="text-sm text-gray-600 text-center mt-2">
                {emailSent
                  ? `We have sent a reset link to ${email}. Please check your inbox.`
                  : "Enter your registered email address, and we will send a password reset link."}
              </p>

              {/* Form */}
              <form onSubmit={handleOnSubmit} className="mt-6">
                {!emailSent && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300"
                >
                  {emailSent ? "Resend Email" : "Submit"}
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="flex items-center justify-center text-green-600 font-medium hover:underline"
                >
                  <BiArrowBack className="mr-2" /> Back to Login
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Image Section */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="https://gayu.wpengine.com/wp-content/uploads/2024/10/Home-1-Filler-img-02.jpg"
              alt="Fitness"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
