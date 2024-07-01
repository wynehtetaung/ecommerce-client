import "./subscribe.css";

export default function Subscribe() {
  return (
    <div className="subscribe">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our new letter and stay updated</p>
      <div className="input_box">
        <input type="email" placeholder="Enter Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}
