import { useSelector } from "react-redux";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black ">
        <div
          className="absolute inset-0 bg-gradient-to-r  from-purple-700 to-pink-500  "
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 10%, 0 100%)",
          }}
        ></div>
        <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg overflow-hidden bg-white mt-[100px] z-10">
          {/* Left Side - Form */}
          <div className="flex items-center justify-center ">
            <div className="flex items-center justify-center   px-4">
              {formType === "signup" ? <SignupForm /> : <LoginForm />}
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

export default Template;
