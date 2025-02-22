import { useMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import HeartButton from "../Heart Button/HeartButton";
import style from './HouseCard.module.css';
import placeHolder from '../../assets/placeholder.png';

export default function HouseCard({ content }) {
    const { id, price_per_day, title, full_address, city, image, vote, avg_vote } = content;
    const isOwnerPage = useMatch("/owners/:id");

    return (
        <div className={`card h-100 ${style.hover}`} >
            {/* immagine */}
            <div className="position-relative">
                <img
                    src={image}
                    onError={(e) => {
                        e.target.onerror = null; // Se l'immagine è inaccessibile
                        e.target.src = placeHolder; // Usa il placeholder
                    }}
                    className={`card-img-top ${style.card_img}`}
                    alt="House"
                />
                {/* Cuoricino */}
                {!isOwnerPage && <HeartButton vote={vote} id={id} />}
            </div>

            {/* contenuto della card */}
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="card-title fw-bold fs-5">{title}</h5>
                        <p className="card-text fs-6 text-muted">{full_address}</p>
                    </div>
                    <div>
                        <h5 className="text-nowrap">
                            <strong>{price_per_day.toString().replace('.', ',')} &#x20AC;</strong>
                            <span className="small text-muted"> /notte</span>
                        </h5>
                        {/* Stella con avg_vote al centro */}
                        <div className={style.star_container}>
                            <FontAwesomeIcon icon={faStar} className={style.star_icon} />
                            <span className={style.star_text}>{parseFloat(avg_vote).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <p className="card-text fs-7"><strong>Città: </strong>{city}</p>
            </div>
        </div>
    );
}
