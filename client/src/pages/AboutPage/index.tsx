import miki from "../../assets/miki.png";
import meni from "../../assets/meni.png";
import eliya from "../../assets/eliya.png";
import PageHeader from "../../components/PageHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import "./style.scss";

const developers = [
  { name: "Miki", image: miki, story: "Full Stack Developer" },
  { name: "Meni", image: meni, story: "Full Stack Developer" },
  { name: "Eliya", image: eliya, story: "Full Stack Developer" },
];

export function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div className="custom-arrow next" onClick={onClick}>
      <FaCircleChevronRight />
    </div>
  );
}

export function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev" onClick={onClick}>
      <FaCircleChevronLeft />
    </div>
  );
}

export default function AboutPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <PageHeader title="Meet the Developers" subtitle="Pearl Team" />
      <div className="about-container">
        <div className="developers-list">
          {developers.map((dev, index) => (
            <div key={index} className="developer-card">
              <img src={dev.image} alt={dev.name} className="developer-image" />
              <h3>{dev.name}</h3>
              <p>{dev.story}</p>
            </div>
          ))}
        </div>

        {/* גרסת מובייל – קרוסלה */}
        <div className="developers-carousel">
          <Slider {...settings}>
            {developers.map((dev, index) => (
              <div key={index} className="developer-card">
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="developer-image"
                />
                <h3>{dev.name}</h3>
                <p>{dev.story}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
