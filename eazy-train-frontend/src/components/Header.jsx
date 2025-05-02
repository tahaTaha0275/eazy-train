import { Link ,useNavigate } from 'react-router-dom'

function getTokenSource() {
    if (localStorage.getItem('token')) {
      return localStorage;
    } else if (sessionStorage.getItem('token')) {
      return sessionStorage;
    } else {
      return null;
    }
  }
  

export default function Header() {
    const navigate = useNavigate()

    const handleLogIn = (e) => {
        
    }

    const handleLogOut = (e) => {
        const storage = getTokenSource()
        storage.removeItem("token")
        navigate("/")
    }
    return (
            <header className={"header"}>
                <Link href="/" className={"logo"}>
                <span className={"logoBlue"}>Eazy</span>
                <span className={"logoBlack"}>Train</span>
                </Link>
                <div className={"headerLinks"}>
                <Link href="/booking" className={"bookingLink"}>
                    My Booking
                </Link>
                <div className={"divider"}></div>
                <Link onClick={handleLogIn} className={"blue-button"}>
                    Sign in
                </Link>
                <span className={"authSeparator"}>/</span>
                <button onClick={handleLogOut} className={"red-button"}>
                    Log out
                </button>
                </div>
            </header>
        
    )
}
    



