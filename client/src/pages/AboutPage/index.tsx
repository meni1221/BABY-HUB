import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// @ts-ignore: no declaration file for 'react-slick'
import Slider from "react-slick";

import miki from "../../assets/miki.png";
import meni from "../../assets/meni.png";
import eliya from "../../assets/eliya.png";
import PageHeader from "../../components/PageHeader";
import "./style.scss";

const developers = [
  {
    name: "Miki",
    image: miki,
    story: "Full Stack Developer with a passion for frontend design and clean code.",
  },
  {
    name: "Meni",
    image: meni,
    story: "Full Stack Developer who loves React, TypeScript, and creative UI ideas.",
  },
  {
    name: "Eliya",
    image: eliya,
    story: "Full Stack Developer focusing on backend architecture and performance.",
  },
];

export default function AboutPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <>
      <PageHeader title="Meet the Developers" subtitle="Pearl Team" />
      <div className="about-container">
        <Slider {...settings} className="developers-carousel">
          {developers.map((dev, index) => (
            <div key={index} className="developer-card">
              <img src={dev.image} alt={dev.name} className="developer-image" />
              <h3>{dev.name}</h3>
              <p>{dev.story}</p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
