import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, User } from "lucide-react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt with:", { email, password, rememberMe })
    // Navigate to home page after successful login
    // navigate('/');
  }

  const handleGoogleLogin = () => {
    // Handle Google login logic
    console.log("Google login clicked")
  }

  const handleGuestLogin = () => {
    // Handle guest login logic
    console.log("Guest login clicked")
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-container">
          <h1 className="login-title">Sign in</h1>
          <p className="login-subtitle">
            Don't have an account?{" "}
            <Link to="/register" className="create-account-link">
              Create now
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                class="email"
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-footer">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="sign-in-button">
              Sign in
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button type="button" className="google-button" onClick={handleGoogleLogin}>
              <img src="src/assets/google-icon.svg" alt="Google" className="google-icon" />
              Continue with Google
            </button>

            <button type="button" className="guest-button" onClick={handleGuestLogin}>
              <User size={20} />
              Continue as a guest
            </button>
          </form>
        </div>
      </div>

      <div className="login-right">
        <div className="brand-container">
          <h1 className="brand-name">
            <span className="brand-eazy">Eazy</span>
            <span className="brand-train">Train</span>
          </h1>

          <div className="promo-card">
            <div className="promo-content">
              <p className="promo-text">
                Seamless Journeys
                <br />
                Start Here - Register,
                <br />
                Ride, Relax.
              </p>
              <img src="src/assets/train.png" alt="High-speed train" className="train-image" />
            </div>
            <button className="learn-more-button">Learn more</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
