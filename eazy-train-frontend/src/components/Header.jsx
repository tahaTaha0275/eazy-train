import { Link } from 'react-router-dom'

export default function Header() {
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
                <Link href="/login" className={"blue-button"}>
                    Sign in
                </Link>
                <span className={"authSeparator"}>/</span>
                <Link href="/signup" className={"red-button"}>
                    Log out
                </Link>
                </div>
            </header>
        
    )
}
    



