import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../services/operations/authAPI";
import { setSignupData } from "../../slices/authSlice";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(setSignupData(formData));
    dispatch(sendOtp(formData.email, navigate));
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          Create Your Account
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
          Join us and start Yoga today.
        </p>
        <form onSubmit={handleOnSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              required
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              required
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            required
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
          />
          <div className="flex gap-4">
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                required
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    fontSize={20}
                    className="text-gray-500"
                  />
                ) : (
                  <AiOutlineEye fontSize={20} className="text-gray-500" />
                )}
              </span>
            </div>
            <div className="w-full relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                required
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-4 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible
                    fontSize={20}
                    className="text-gray-500"
                  />
                ) : (
                  <AiOutlineEye fontSize={20} className="text-gray-500" />
                )}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-3 rounded-lg font-medium  transition duration-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
