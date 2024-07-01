import "./footer.css";
import footer_image from "../../assets/logo.png";
import instagram_icon from "../../assets/instagram_icon.png";
import pinterest_icon from "../../assets/pintester_icon.png";
import whatsapp_icon from "../../assets/whatsapp_icon.png";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer_logo">
        {/* <img src={footer_image} alt="" /> */}
        <p>Standard X</p>
      </div>
      <ul className="footer_links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer_social_icons">
        <div className="footer_social_container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer_social_container">
          <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer_social_container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer_copyright">
        <div
          className="back_to_top"
          onClick={() => window.scrollTo(0, 0)}
          title="back to top"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
        </div>
        <hr />

        <p>Copyright @ 2024 - All Right Reserved.</p>
      </div>
    </div>
  );
}
