import miki from "../../assets/miki.png";
import meni from "../../assets/meni.png";
import eliya from "../../assets/eliya.png";
import PageHeader from "../../components/PageHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useLanguage } from "../../providers/LanguageProvider";
import "./style.scss";

interface ArrowProps {
  onClick?: () => void;
}

const developers = [
  { name: "Miki", image: miki },
  { name: "Meni", image: meni },
  { name: "Eliya", image: eliya },
];

export const NextArrow = (props: ArrowProps) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow next" onClick={onClick}>
      <TbChevronRight />
    </div>
  );
};

export const PrevArrow = (props: ArrowProps) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev" onClick={onClick}>
      <TbChevronLeft />
    </div>
  );
};

const AboutPage = () => {
  const { t } = useLanguage();
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
      <PageHeader title={t("aboutTitle")} subtitle={t("aboutSubtitle")} />
      <div className="about-container">
        <div className="developers-list">
          {developers.map((dev, index) => (
            <div key={index} className="developer-card">
              <img src={dev.image} alt={dev.name} className="developer-image" />
              <h3>{dev.name}</h3>
              <p>{t("developerRole")}</p>
            </div>
          ))}
        </div>

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
                <p>{t("developerRole")}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
