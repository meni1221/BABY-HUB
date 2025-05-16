import IBabysitter from "../interface/BabySitter";
import CardBabysitter from "./CardBabysitter";
interface Props {
  babysitters: IBabysitter[];
}

export default function BabysitterCarousel(props: Props) {
  return (
    <>
      <CardBabysitter users={props.babysitters} />
    </>
  );
}
