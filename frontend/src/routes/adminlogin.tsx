import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import logo from "/public/favicon.ico";
import loginBg from "@/assets/Picture3.png";
import { adminLogin } from "@/lib/api"; // real login: calls Django, stores the token

export const Route = createFileRoute("/adminlogin")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      await adminLogin(cleanEmail, password);

      // Login successful → token is stored → go to the dashboard route (/admin)
      navigate({ to: "/admin" as any });
    } catch (err) {
      console.error("Admin login failed:", err);

      if (err instanceof Error) {
        if (err.message === "Invalid credentials") {
          setError("Wrong email or password.");
        } else {
          setError(err.message || "Could not sign in. Try again.");
        }
      } else {
        setError("Could not sign in. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "h-12 w-full rounded-[10px] border border-neutral-200 bg-neutral-50 px-4 text-neutral-900 outline-none transition focus:border-[#f2a516] focus:ring-4 focus:ring-[#f2a516]/20";

  return (
    <div className="fixed inset-0 z-[9999] grid overflow-auto bg-white lg:grid-cols-[1.05fr_1fr]">

      {/* LEFT SIDE */}
      <div
        className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat p-8 text-neutral-900 lg:p-12"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#fff8e8]/80 via-[#fff4d5]/60 to-transparent" />

        <div className="relative z-10">
          <div className="text-2xl font-bold tracking-wide">Admin Portal</div>
        </div>

        <div className="relative z-10 mt-12 lg:mt-0">
          <h1 className="max-w-[600px] text-5xl font-extrabold leading-[1] tracking-tight lg:text-6xl">
            Run your{" "}
            <span className="text-[#d88900]">orders,</span>
            <br />
            driven not poured
          </h1>

          <p className="mt-6 max-w-[500px] text-lg leading-7 text-neutral-700">
            Track screw pile orders, enquiries and blogs from one secure
            workspace.
          </p>
        </div>

        <div className="relative z-10 mt-12">
          <p className="text-sm font-medium text-neutral-700">
            Secure&nbsp;&nbsp;·&nbsp;&nbsp;Private&nbsp;&nbsp;·&nbsp;&nbsp;Admin only
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-16">
        <form onSubmit={onSubmit} className="w-full max-w-[520px]" noValidate>

          <div className="mb-10 flex justify-center">
            <img
              src={logo}
              alt="BigScrew Solutions"
              className="h-auto w-[250px] object-contain"
            />
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-900">
            Welcome back
          </h2>

          <p className="mt-2 mb-8 text-neutral-500">
            Sign in to your admin portal to continue
          </p>

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-neutral-800">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              className={inputClass}
              autoComplete="username"
              autoFocus
              placeholder="Enter your admin email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              disabled={loading}
            />
          </div>

          {/* PASSWORD */}
          <div className="mt-5">
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-neutral-800">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={`${inputClass} pr-12`}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 4.2A10.7 10.7 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-3.1 4.4" />
                    <path d="M6.6 6.6C3.6 8.6 2 12 2 12s3 8 10 8a10.5 10.5 0 0 0 3.5-.6" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* ERROR */}
          <div
            role="alert"
            className={`mt-3 min-h-[20px] text-sm ${error ? "text-red-600" : "text-transparent"}`}
          >
            {error || " "}
          </div>

          {/* SIGN IN */}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 h-[52px] w-full rounded-[10px] bg-[#f2a516] text-base font-bold text-[#141414] shadow-sm transition-all hover:bg-[#df9408] hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-800 border-t-transparent" />
                Signing in...
              </span>
            ) : (
              "Sign In →"
            )}
          </button>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Admin access only&nbsp;&nbsp;·&nbsp;&nbsp;Contact support if you
            need help
          </p>
        </form>
      </div>
    </div>
  );
}