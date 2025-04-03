import { Link } from 'react-router-dom'

export default function Footer(){
    return(
        <>
            <footer className={"footer"}>
            <div className={"footerContainer"}>
            <div className={"footerTop"}>
                <div>
                <div className={"footerLogo"}>
                    <span className={"footerLogoText"}>
                    Eazy<span>Train</span>
                    </span>
                </div>
                </div>
                <div className={"newsletter"}>
                <div className={"newsletterText"}>
                    <h3 className={"newsletterTitle"}>Planning your next trip?</h3>
                    <p className={"newsletterDescription"}>
                    Subscribe to our newsletter, get the latest travel trends & deals!
                    </p>
                </div>
                <div className={"newsletterForm"}>
                    <input type="email" placeholder="Enter Email ID" className={"newsletterInput"} />
                    <button className={"newsletterButton"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    </button>
                </div>
                </div>
            </div>
            <div className={"footerBottom"}>
                <div className={"footerLinks"}>
                <Link href="/about" className={"footerLink"}>
                    About us
                </Link>
                <Link href="/mobile" className={"footerLink"}>
                    Mobile
                </Link>
                <Link href="/privacy" className={"footerLink"}>
                    Privacy
                </Link>
                <Link href="/terms" className={"footerLink"}>
                    Terms of use
                </Link>
                <Link href="/career" className={"footerLink"}>
                    Career
                </Link>
                <Link href="/service" className={"footerLink"}>
                    Customer service
                </Link>
                </div>
                <div className={"socialLinks"}>
                <Link href="#" aria-label="Facebook" className={"socialLink"}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                </Link>
                <Link href="#" aria-label="Instagram" className={"socialLink"}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                </Link>
                <Link href="#" aria-label="Twitter" className={"socialLink"}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                </Link>
                </div>
            </div>
            </div>
        </footer>
        </>
    )
}