import "./hero.css";
import hand_icon from "../../assets/hand_icon.png";
import arrow_icon from "../../assets/arrow.png";
import hero_image from "../../assets/hero_image.png";
export default function Hero() {
  return (
    <div className="hero">
      <div className="hero_left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero_hand_icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <a href={"/#latest"}>
          <div className="hero_latest_btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
          </div>
        </a>
      </div>
      <div className="hero_right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
}
