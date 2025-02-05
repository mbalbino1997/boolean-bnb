import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./HeartButton.module.css";

export default function HeartButton({ vote, id }) {
    const [count, setCount] = useState(vote || 0);
    const [tempLiked, setTempLiked] = useState(false);

    useEffect(() => {
        setCount(vote);
    }, [vote]);

    const handleLikeToggle = async (event) => {
        event.stopPropagation();
        event.preventDefault();

        const newVote = count + 1;
        setCount(newVote);
        setTempLiked(true);

        try {
            await axios.patch(`http://localhost:3000/api/boolbnb/${id}`, {
                vote: newVote,
            });
        } catch (error) {
            console.error("Errore nell'aggiornamento del voto:", error);
            setCount((prevCount) => prevCount - 1);
        } finally {
            setTimeout(() => {
                setTempLiked(false);
            }, 2000);
        }
    };

    return (
        <div className="position-relative">
            <button
                onClick={handleLikeToggle}
                className={`btn btn-light position-absolute end-0  m-2 p-2 rounded-circle ${style.customButton}`}
            >
                {tempLiked ? (
                    <SolidHeartIcon className="text-danger" style={{ height: "1.4rem" }} />
                ) : (
                    <OutlineHeartIcon className="text-dark" style={{ height: "1.4rem" }} />
                )}
            </button>

            <span
                className={`${style.tooltip}`}
                data-visible={false}
            >
                {`Like: ${count}`}
            </span>
        </div>
    );
}

