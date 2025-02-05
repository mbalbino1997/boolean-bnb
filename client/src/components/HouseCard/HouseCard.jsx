import { useMatch } from "react-router-dom";
import HeartButton from "../Heart Button/HeartButton";
import style from './HouseCard.module.css'
import placeHolder from '../../assets/placeholder.png'



export default function HouseCard({ content }) {

    const { id, price_per_day, title, full_address, city, image, vote } = content

    const isOwnerPage = useMatch("/owners/:id");



    return (

        <div className={`card h-100 ${style.hover}`} >
            {/* immagine */}
            <div className="position-relative">
                <img
                    src={image}
                    onError={(e) => {
                        e.target.onerror = null; // se la immagine e innacesibile 
                        e.target.src = placeHolder; // metti il placeholder
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
                            <span class="small text-muted"> /notte</span>
                        </h5>
                    </div>

                </div>
                <p className="card-text fs-7"><strong>Città: </strong>{city}</p>
            </div>
        </div>

    )
}