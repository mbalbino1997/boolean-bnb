import HouseShowCard from "../../components/House Show Card/HouseShowCard";
import ReviewCard from "../../components/Review Card/ReviewCard";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./ShowPage.module.css";
import Loader from "../../components/Loader/Loader";
import EmailForm from "../../components/emailForm/emailForm";
import HeaderMain from "../../components/HeaderMain/HeaderMain";
import RentForm from "../../components/RentForm/RentForm";

export default function ShowPage() {
    const [house, setHouse] = useState(null);
    const [reviewBoolean, setReviewBoolean] = useState(false);
    const [emailBoolean, setEmailBoolean] = useState(false);
    const [rentBoolean, setRentBoolean] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/boolbnb/${slug}`)
            .then(res => setHouse(res.data))
            .catch(err => console.error(err));
    }, [slug]);

    return (
        <div className={`d-flex flex-column flex-grow-1 mt-5 pt-5 ${style.showPageContainer}`}>
            <HeaderMain />
            {house ? (
                <>
                    <HouseShowCard houseEl={house} />


                    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-5 mt-5">
                        <button
                            className={`${style.btn} ${emailBoolean ? style['btn-active'] : ''}`}
                            onClick={() => {
                                setReviewBoolean(false);
                                setRentBoolean(false);
                                setEmailBoolean(!emailBoolean);
                            }}>
                            Contatta il proprietario
                        </button>

                        <button
                            className={`${style.btn} ${rentBoolean ? style['btn-active'] : ''}`}
                            onClick={() => {
                                setReviewBoolean(false);
                                setEmailBoolean(false);
                                setRentBoolean(!rentBoolean);
                            }}>
                            Prenota adesso
                        </button>

                        <button
                            className={`${style.btn} ${reviewBoolean ? style['btn-active'] : ''}`}
                            onClick={() => {
                                setEmailBoolean(false);
                                setRentBoolean(false);
                                setReviewBoolean(!reviewBoolean);
                            }}>
                            Lascia una recensione
                        </button>
                    </div>


                    {reviewBoolean && <ReviewForm id={house.id} />}
                    {emailBoolean && <EmailForm email={house.ownerEmail} />}
                    {rentBoolean && <RentForm id={house.id} />}

                    <hr />
                    <ReviewCard reviews={house.reviews} />
                </>
            ) : (
                <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    <Loader />
                </div>
            )}
        </div>
    );
}
