import { useContext, useState } from "react";
import signupLottie from "../../assets/animation/loginlottiee.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";
import UseAxiosPublic from "../../hooks/useAxiosPublic";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { createNewUser } = authContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passRegex.test(formData.password)) {
      newErrors.password =
        "Must be 6+ chars with uppercase, lowercase & number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    // Terms validation
    if (!formData.agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorElement = document.querySelector('[data-error="true"]');
      firstErrorElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setIsSubmitting(true);

    createNewUser(formData.email, formData.password)
      .then((result) => {
        console.log("✅ Firebase user created:", result.user);
        const registeredUser = result.user;
        const profile = {
          displayName: formData.name,
        };

        return updateProfile(auth.currentUser!, profile).then(() => {
          console.log("✅ Profile updated");
          // setUser({
          //   ...registeredUser,
          //   displayName: formData.name,
          // });

          // Send email verification with configuration
          console.log("🔄 Sending email verification...");
          return sendEmailVerification(registeredUser);
        });
      })
      .then(() => {
        console.log("✅ Email verification sent successfully");
        const userInfo = {
          name: formData.name,
          email: formData.email,
        };

        return axiosPublic.post("/user", userInfo);
      })
      .then((res) => {
        console.log("Backend response:", res.data);

        if (res.data.success === true && res.data.statusCode === 201) {
          console.log("✅ User saved to backend successfully");
          toast.success(
            "Registration Successful! Check your email for the verification link."
          );

          setTimeout(() => {
            navigate("/signin");
          }, 1000);
        } else {
          console.log("Unexpected response structure:", res.data);
          toast.error("Registration completed but with unexpected response.");
        }
      })
      .catch((error) => {
        console.error("❌ Registration error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);

        // Firebase errors
        if (error.code === "auth/email-already-in-use") {
          toast.error(
            "This email is already registered. Please sign in instead."
          );
        } else if (error.code === "auth/weak-password") {
          toast.error(
            "Password is too weak. Please choose a stronger password."
          );
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(`Registration failed: ${error.message}`);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#181024] flex items-center justify-center px-4 py-8">
      <div className="w-11/12 mx-auto">
        <h1 className="text-center font-bold text-yellow-600 text-3xl md:text-5xl pt-5">
          Join Grouply
        </h1>
        <p className="text-center md:text-xl font-semibold text-gray-300 mt-4 mb-8">
          Create your account and start collaborating with your team
        </p>

        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          {/* Sign Up Form */}
          <div className="md:w-2/5 w-full">
            <div className="bg-[#2d1a4d] rounded-2xl p-8 border border-purple-500/30 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name Field */}
                <div data-error={!!errors.name}>
                  <label className="block text-gray-300 text-lg font-medium mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full bg-[#181024] border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-purple-500/30 focus:border-yellow-500"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      <span>⚠</span> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div data-error={!!errors.email}>
                  <label className="block text-gray-300 text-lg font-medium mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full bg-[#181024] border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-purple-500/30 focus:border-yellow-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      <span>⚠</span> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div data-error={!!errors.password}>
                  <label className="block text-gray-300 text-lg font-medium mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className={`w-full bg-[#181024] border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors pr-12 ${
                        errors.password
                          ? "border-red-500 focus:border-red-500"
                          : "border-purple-500/30 focus:border-yellow-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors text-xl"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      <span>⚠</span> {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div data-error={!!errors.confirmPassword}>
                  <label className="block text-gray-300 text-lg font-medium mb-3">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={`w-full bg-[#181024] border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors pr-12 ${
                        errors.confirmPassword
                          ? "border-red-500 focus:border-red-500"
                          : "border-purple-500/30 focus:border-yellow-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors text-xl"
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      <span>⚠</span> {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div data-error={!!errors.terms}>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleChange}
                      className="w-4 h-4 text-yellow-600 bg-[#181024] border-purple-500/30 rounded focus:ring-yellow-500 mt-1"
                    />
                    <span className="text-gray-300 text-sm">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-yellow-500 hover:text-yellow-400"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-yellow-500 hover:text-yellow-400"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      <span>⚠</span> {errors.terms}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-300">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-yellow-500 hover:text-yellow-400 font-semibold transition-colors underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Lottie Animation */}
          <div className="md:w-2/5 w-full flex justify-center">
            <Lottie animationData={signupLottie} className="w-full max-w-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
