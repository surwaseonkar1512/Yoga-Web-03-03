import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <>
      {" "}
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
            <div className="flex items-center justify-center   px-4">
              <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8 relative">
                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                  Verify Your Email
                </h2>
                <p className="text-center text-gray-600 mt-2">
                  A verification code has been sent to your email. Enter the
                  code below.
                </p>

                {/* OTP Input Form */}
                <form onSubmit={handleVerifyAndSignup} className="w-full mt-6">
                  <div className="w-full flex justify-center">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderInput={(props) => (
                        <input
                          {...props}
                          placeholder="-"
                          style={{
                            boxShadow:
                              "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}
                          className="w-[48px] lg:w-[60px] border-black bg-purple-100 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                        />
                      )}
                      containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300 mt-6"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify Email"}
                  </button>
                </form>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-between">
                  <Link
                    to="/signup"
                    className="text-green-600 hover:underline flex items-center gap-2"
                  >
                    <BiArrowBack /> Back to Signup
                  </Link>
                  <button
                    className="text-green-500 flex items-center gap-2 hover:underline"
                    onClick={() => dispatch(sendOtp(signupData.email))}
                    disabled={loading}
                  >
                    <RxCountdownTimer /> Resend Code
                  </button>
                </div>
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

export default VerifyEmail;
