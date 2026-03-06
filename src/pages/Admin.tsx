import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Welcome back!" });
      navigate("/admin");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #0b7f4b 0%, #0f8f5a 50%, #0a6b3f 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
       <Card className="w-[520px] min-h-[540px] p-14 rounded-xl">
  {/* Logo */}
  <div className="text-center">
    <img
      src="/brand-logo.png"
      alt="Plateau Consensus"
      className="mx-auto h-16 mb-4"
    />

    <h2 className="text-xl font-semibold text-green-800">
  Administrative Dashboard
</h2>
  </div>

  {/* Form */}
  <form onSubmit={handleLogin} className="mt-12 space-y-7">

    {/* Email */}
    <div className="space-y-2">
      <Label>Email Address</Label>

      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@consensus.org"
          className="pl-10 h-12"
        />
      </div>
    </div>

    {/* Password */}
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>Password</Label>

        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-green-700 hover:text-green-800"
        >
          Forgot password?
        </button>
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          className="pl-10 pr-10 h-12"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>

    {/* Remember */}
    <div className="flex items-center gap-2 text-sm">
      <input type="checkbox" className="rounded border-gray-300" />
      <span>Remember me</span>
    </div>

    {/* Submit */}
    <Button
      type="submit"
      className="w-full h-12 bg-green-600 hover:bg-green-700"
      disabled={loading}
    >
      {loading ? "Signing in..." : "Sign In"}
    </Button>
  </form>
</Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;