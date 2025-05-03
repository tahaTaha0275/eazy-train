import { useState } from "react"
import { Eye, EyeOff, User } from "lucide-react"
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle login logic here
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URI}/login`, {
        username: email,
        password: password
      });

      const token = response.data.token
      console.log('Token:', token)

      // You can store the token in localStorage or state
      if (rememberMe) {
        localStorage.setItem('token', token)
      } else {
        sessionStorage.setItem('token', token)
        console.log("in session storage")
      }
      navigate(`/home`)
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      console.log(error.message)
      alert("Login failed. Please check your credentials.");
    }
  }

  const handleSignUpRedirect = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-container">
          <h1 className="login-title">Sign in</h1>
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
            </div>

            <button type="submit" className="sign-in-button">
              Sign in
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button type="button" className="signup-button" onClick={handleSignUpRedirect}>
              <User size={20} />
              Sign up
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
                <strong>Seamless Journeys</strong>
                <br />
                Start Here - Register,
                <br />
                Ride, Relax.
              </p>
              {/* <img src="src/assets/train.png" alt="High-speed train" className="train-image" /> */}
            </div>
            {/* <button className="learn-more-button">Learn more</button> */}
            <img src="src/assets/train.png" alt="High-speed train" className="train-image" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
