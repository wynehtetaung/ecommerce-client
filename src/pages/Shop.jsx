import Hero from "../components/hero/Hero";
import NewCollection from "../components/new_collection/NewCollection";
import Offers from "../components/offers/Offers";
import Popular from "../components/popular/Popular";
import Subscribe from "../components/subscribe/Subscribe";

export default function Shop() {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollection />
      <Subscribe />
    </div>
  );
}
