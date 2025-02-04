import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";
import styles from "./StarsVote.module.css";

export default function StarsVote({ vote }) {

    //media
    const stars = Math.round(vote / 2);

    return (
        <div className={`d-flex align-items-center ${styles.voteContainer}`}>
            <strong className={`me-2 text-white fw-bold ${styles.d_none}`}>Valutazione</strong>
            <div className={`d-flex ${styles.stars}`}>
                {/* Stelle colorate */}
                {Array.from({ length: stars }).map((_, index) => (
                    <StarIcon key={`solid-${index}`} className={`me-1 ${styles.star}`} />
                ))}

                {/* Stelle vuote */}
                {Array.from({ length: 5 - stars }).map((_, index) => (
                    <OutlineStar key={`outline-${index}`} className={`me-1 ${styles.star}`} />
                ))}
            </div>
        </div>
    );
}