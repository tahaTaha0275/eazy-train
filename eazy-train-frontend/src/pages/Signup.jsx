import { useState } from "react"
import { Eye, EyeOff, User } from "lucide-react"
import axios from "axios"
import { useNavigate} from 'react-router-dom';
import "./Signup.css"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/signup', {
        username: email,
        password: password
      });

      const token = response.data.token
      console.log('Token:', token)
      sessionStorage.setItem('token', token)
      navigate(`/home`)
    } catch (error) {
      console.error('Sign Up failed:', error.response?.data?.message || error.message);
      console.log(error.message)
      alert("Sign Up failed. Please check your credentials.");
    }
  }

  const handleGuestLogin = () => {
    // Handle guest login logic
    console.log("Guest login clicked")
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-container">
          <h1 className="login-title">Sign up</h1>
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
            
            <button type="submit" className="sign-in-button">
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
              <button className="promo-button">Learn more</button>
            </div>
            {/* <button className="learn-more-button">Learn more</button> */}
            <img src="src/assets/train.png" alt="High-speed train" className="train-image" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
