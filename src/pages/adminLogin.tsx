import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with real supabase call
    setTimeout(() => {
      navigate("/admin/dashboard");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ background: "linear-gradient(135deg, #1a6b3c 0%, #2d9e5f 50%, #1f8a4f 100%)" }}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <img src="/brand-logo.png" alt="The Plateau Consensus" className="h-14 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Administrative Dashboard</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="admin@consensus.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 pl-9 pr-12 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <button type="button" className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <LogIn size={17} />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}