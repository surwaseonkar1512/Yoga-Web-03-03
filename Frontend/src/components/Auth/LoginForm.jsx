import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          Sign In to Your Account
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
          Welcome back! Please enter your details.
        </p>
        <form onSubmit={handleOnSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            required
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring--400"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              required
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring--400 pr-10"
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
          <Link
            to="/forgot-password"
            className="text-sm text-green-500 hover:underline w-full flex justify-end"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-3 rounded-lg font-medium transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
