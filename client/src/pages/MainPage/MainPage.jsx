import HouseList from "../../components/HouseList/Houselist";
import SearchBar from "../../components/SearchBar/SearchBar";
import HeaderMain from "../../components/HeaderMain/HeaderMain";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./MainPage.module.css";

const popularHouses = [
    { id: 1, image: "/image1.jpg", alt: "Casa moderna con piscina" },
    { id: 2, image: "/image2.jpg", alt: "Villa con vista mare" },
    { id: 3, image: "/image3.jpg", alt: "Appartamento in centro città" },
    { id: 4, image: "/image15.jpg", alt: "Appartamento in centro città" },
    { id: 5, image: "/villacongiardino.jpg", alt: "Appartamento in centro città" }
];

export default function MainPage() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        centerMode: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        vertical: true,
        verticalSwiping: true,
        centerPadding: "0px",
    };

    return (
        <div className={style.mainpage}>
            <HeaderMain />
            <div className={style.hero}>
                <div className={style.heroOverlay}></div>
                <h1 className={style.hero_title_one}>Prenota con noi</h1>
                <h1 className={style.hero_title_two}>La vacanza dei tuoi sogni</h1>
                <Slider {...settings} className={style.carousel}>
                    {popularHouses.map((house) => (
                        <div key={house.id} className={style.slide}>
                            <img src={house.image} alt={house.alt} className={style.houseImage} />
                        </div>
                    ))}
                </Slider>
                <div className={style.under_image}>
                    <div className="d-flex justify-content-center gap-3">
                        <img className={style.icon} src="icon1.png" alt="" />
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <h1 className={style.icon_title}>Conferma immediata</h1>
                            <p className={style.icon_subtitle}>Ricevi subito la conferma della tua prenotazione via email o SMS, in modo semplice e veloce.</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center gap-3">
                        <img className={style.icon} src="icon2.png" alt="" />
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <h1 className={style.icon_title}>Miglior prezzo garantito</h1>
                            <p className={style.icon_subtitle}>Trovi un prezzo più basso altrove? Ti rimborsiamo la differenza!</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center gap-3">
                        <img className={style.icon} src="icon3.png" alt="" />
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <h1 className={style.icon_title}>Le più amate dai clienti</h1>
                            <p className={style.icon_subtitle}>Prenota la tua vacanza tra le 100 strutture preferite dai nostri ospiti.</p>
                        </div>
                    </div>
                </div>
            </div>
            <SearchBar />
            <HouseList />
        </div>
    );
}
