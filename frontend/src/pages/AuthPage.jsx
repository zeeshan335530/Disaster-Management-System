import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import leftImg from "../assets/auth-left.png";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const toggleMode = (m) => {
    reset();
    setMode(m);
  };

  const friendlyError = (code, message) => {
    if (!code) return message || "Something went wrong";
    switch (code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Try again.";
      case "auth/email-already-in-use":
        return "This email is already in use. Try logging in.";
      case "auth/weak-password":
        return "Password is too weak (min 6 characters).";
      default:
        return message || code;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please enter your name.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      const u = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (u.user) await updateProfile(u.user, { displayName: name.trim() });
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  // ---------- OAuth handlers ----------
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setError("");
    setLoading(true);
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-11/12 max-w-6xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT IMAGE */}
        <div
          className="relative hidden md:block"
          style={{
            backgroundImage: `url(${leftImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/40 to-black/60"></div>
          <div className="absolute inset-0 p-10 flex flex-col justify-between text-white">
            <div>
              <div className="inline-block px-3 py-1 rounded-md bg-white/10 border border-white/10">
                <span className="text-sm font-semibold">DMS</span>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-3xl font-semibold">Stay Active,</h3>
              <h4 className="text-3xl font-semibold">Stay Safe</h4>
              <div className="mt-6 flex gap-2">
                <span className="w-8 h-1 rounded-full bg-white/60"></span>
                <span className="w-4 h-1 rounded-full bg-white/40"></span>
                <span className="w-2 h-1 rounded-full bg-white/20"></span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-[#2b2430] p-8 md:p-12 text-white">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                {mode === "signup" ? "Create an account" : "Welcome back"}
              </h2>
              <div className="text-sm">
                <button
                  onClick={() => toggleMode(mode === "signup" ? "login" : "signup")}
                  className="text-sm text-purple-300 underline"
                >
                  {mode === "signup" ? "Log in" : "Sign up"}
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-6">
              {mode === "signup"
                ? "Create a free account to get started. Already have an account?"
                : "Sign in to continue to your dashboard."}
            </p>

            <form onSubmit={mode === "signup" ? handleSignup : handleLogin} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-sm text-gray-200 mb-2">First name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-md bg-black/20 border border-black/30 placeholder-gray-400 outline-none"
                    placeholder="Your name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-200 mb-2">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-md bg-black/20 border border-black/30 placeholder-gray-400 outline-none"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-200 mb-2">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPwd ? "text" : "password"}
                  className="w-full p-3 rounded-md bg-black/20 border border-black/30 placeholder-gray-400 outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-9 text-gray-300"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>

              {error && <div className="text-sm text-red-400">{error}</div>}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                  <span>
                    Agree to the{" "}
                    <a href="#" className="underline text-purple-300">
                      Terms & Conditions
                    </a>
                  </span>
                </label>
                <a href="#" className="text-sm text-purple-300 underline">
                  Need help?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:opacity-95 transition"
              >
                {loading ? "Processing..." : mode === "signup" ? "Create account" : "Log in"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px bg-white/20 flex-1"></div>
              <div className="text-sm text-gray-300">Or register with</div>
              <div className="h-px bg-white/20 flex-1"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Google Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="py-2 rounded-md bg-white text-black font-medium flex items-center justify-center gap-2 border border-white/20 hover:scale-105 transition-all duration-200"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="g"
                  className="w-5 h-5"
                />
                Google
              </button>

              {/* GitHub Button */}
              <button
                onClick={handleGithubSignIn}
                disabled={loading}
                className="py-2 rounded-md bg-[#171515] text-white font-medium flex items-center justify-center gap-2 border border-white/20 hover:scale-105 transition-all duration-200"
              >
                <img
                  src="https://www.svgrepo.com/show/475654/github-color.svg"
                  alt="gh"
                  className="w-5 h-5 invert"
                />
                GitHub
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-6">
              By continuing you agree to our{" "}
              <a className="underline text-purple-300" href="#">
                Terms
              </a>{" "}
              and{" "}
              <a className="underline text-purple-300" href="#">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
