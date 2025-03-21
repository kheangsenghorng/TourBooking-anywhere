"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/facebook`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await login(email, password);
      if (!user) throw new Error("Invalid password or email. Please try again.");

      setShowSuccessModal(true);
      setTimeout(() => {
        const { role, id } = user;
        if (!role) throw new Error("User role is not defined");

<<<<<<< Updated upstream
        if (!role) {
          throw new Error("User role is not defined");
        }

        // Redirect based on user role
        if (role === "admin") {
          if (!id) {
            throw new Error("User ID is required for subadmin redirection");
          }
          router.push(`/${id}/dashboard`);
        } else {
          router.push(`/profile/${id}/myprofile`);
        }
      }, 2000); // Redirect after 2 seconds
=======
        router.push(role === "admin" ? `/${id}/dashboard` : `/profile/${id}/topcard`);
      }, 2000);
>>>>>>> Stashed changes
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-bold mb-4">Login Successful!</h2>
            <p className="text-gray-600">You are being redirected...</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">Welcome Back!</h1>
        <p className="text-sm text-center mb-6 text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500 mr-2" />
              Remember me
            </label>
            <a href="/forgot-password" className="text-blue-500 underline">
              Forgot password?
            </a>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-4 text-gray-500">or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Login - Responsive */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <Button
            className="flex-1 bg-gray-200 shadow-sm text-black flex items-center justify-center space-x-1 hover:bg-gray-300"
            onClick={handleGoogleLogin}
          >
            <img src="/google.png" alt="Google" className="w-5 h-5" />
            <span>Google</span>
          </Button>
          <Button
            className="flex-1 bg-gray-200 shadow-sm text-black flex items-center justify-center space-x-1 hover:bg-gray-300"
            onClick={handleFacebookLogin}
          >
            <img src="/facebook.png" alt="Facebook" className="w-8 h-8" />
            <span>Facebook</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
