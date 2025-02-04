import style from './ReviewCard.module.css';
import StarsVote from '../Stars Vote/StarsVote';

export default function ReviewCard({ reviews }) {



    return (
        reviews.length > 0 ?
            <section className="container mt-4 mb-5">
                <div>
                    <h3 className="card-title mb-2  fw-bold fs-4">Recensioni degli affittuari:</h3>
                </div>
                <div className="card border-0" >
                    <div className={`card-body ${style.customCardBody}`} >
                        <div className="row d-flex flex-column gap-3">
                            {reviews.map((review, index) => (
                                <div key={index} className={`col d-flex flex-column gap-2 ${style.customSingleCard}`}>
                                    <div className="d-flex justify-content-between">
                                        <div className="card-text fst-italic">{review.text}</div>
                                        <StarsVote vote={review.vote} />
                                    </div>

                                    <div className="card-text fst-italic" >{review.first_name.toUpperCase()} {review.last_name.toUpperCase()}</div>


                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            :
            <div>
                <h1 className='text-center'>
                    nessuna recensione per questo immobile
                </h1>
            </div>
    );

}