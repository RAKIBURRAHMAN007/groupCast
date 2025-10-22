/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import loginLottie from "../../assets/animation/loginlottiee.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { setUser, logOut, userLogin, loading, setLoading, user } = authContext;
  if (user) {
    navigate("/main");
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    userLogin(email, password)
      .then((result: any) => {
        const user = result.user;
        if (user.emailVerified) {
          setUser(user);
          toast.success("Login Successful!");
          navigate("/main");
        } else {
          toast.warning("Please verify your email before logging in.", {
            autoClose: 5000,
            position: "top-center",
          });
          logOut();
        }
      })
      .catch((error: any) => {
        toast.error(`Login Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }

    toast.promise(sendPasswordResetEmail(auth, email), {
      pending: "Sending password reset email...",
      success: {
        render() {
          return "Password reset email sent! Check your inbox.";
        },
        autoClose: 5000,
      },
      error: {
        render({ data }: any) {
          return `Error: ${data.message}`;
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#181024] flex items-center justify-center px-4 py-8">
      <div className="w-11/12 mx-auto">
        <h1 className="text-center font-bold text-yellow-600 text-3xl md:text-5xl pt-5">
          Sign In to Your GroupCast <br />
          Account
        </h1>
        <p className="text-center md:text-xl font-semibold text-gray-300 mt-4 mb-8">
          Welcome back! Log in to manage your tasks and collaborate with your
          team.
        </p>

        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          {/* Lottie Animation */}
          <div className="md:w-2/5 w-full flex justify-center">
            <Lottie animationData={loginLottie} className="w-full max-w-md" />
          </div>

          {/* Login Form */}
          <div className="md:w-2/5 w-full">
            <div className="bg-[#2d1a4d] rounded-2xl p-8 border border-purple-500/30 shadow-2xl">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-gray-300 text-lg font-medium mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#181024] border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-lg font-medium mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-[#181024] border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors pr-12"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors text-xl"
                      disabled={loading}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-yellow-500 hover:text-yellow-400 text-sm transition-colors disabled:opacity-50"
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-300">
                  New to GroupCast?{" "}
                  <Link
                    to="/signup"
                    className="text-yellow-500 hover:text-yellow-400 font-semibold transition-colors underline"
                  >
                    SignUp Now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
