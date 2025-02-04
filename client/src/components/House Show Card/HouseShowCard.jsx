import style from './HouseShowCard.module.css';
import placeHolder from '../../assets/placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt, faDoorOpen, faBed, faBath, faRulerCombined, faCity, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function HouseShowCard({ houseEl }) {
    const { title, vote, number_of_rooms, number_of_beds, number_of_bathrooms, size, city, full_address, image } = houseEl;

    return (
        houseEl ?
            <>
                <section className="container mt-4">
                    <div className={`card ${style.customCard}`}>
                        <div className="card-body">
                            <div className={`row ${style.dir_col}`}>
                                <div className={`col  ${style.col}`}>
                                    <img src={image}
                                        onError={(e) => {
                                            e.target.onerror = null; // se la immagine e innacesibile 
                                            e.target.src = placeHolder; // metti il placeholder
                                        }} alt={title} className={style.sizeImg}
                                    />
                                </div>
                                <div className="col fs-4">
                                    <div>
                                        <h2 className="card-title mb-4 fst-italic fs-1">{title}</h2>
                                        <h5 className="card-text fw-light fs-4">Dettagli dell'immobile:</h5>
                                        <ul>
                                            <li className="card-text">
                                                <FontAwesomeIcon icon={faHeart} /> Valutazione:
                                                <span className='fst-italic fw-light'>  {vote}</span>
                                            </li>
                                            <li className="card-text">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} /> Indirizzo:
                                                <span className='fst-italic fw-light'>  {full_address}</span>
                                            </li>
                                            <li className="card-text">
                                                <FontAwesomeIcon icon={faDoorOpen} /> Stanze:
                                                <span className='fst-italic fw-light'>  {number_of_rooms}</span>
                                            </li>
                                            <li className="card-text">
                                                <FontAwesomeIcon icon={faBed} /> Posti letto:
                                                <span className='fst-italic fw-light'>  {number_of_beds}</span>
                                            </li>
                                            <li className="card-text">
                                                <FontAwesomeIcon icon={faBath} /> Bagni:
                                                <span className='fst-italic fw-light'>  {number_of_bathrooms}</span>
                                            </li>
                                            <li className="card-text">
                                                <FontAwesomeIcon icon={faRulerCombined} /> Dimensione:
                                                <span className='fst-italic fw-light'>  {size} mq</span>
                                            </li>
                                            <li className="card-text">
                                                <FontAwesomeIcon icon={faCity} /> Città:
                                                <span className='fst-italic fw-light'>  {city}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </> :
            <div>Nessun resultato</div>
    );
}