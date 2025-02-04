import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

function SlideFilter({ onChange }) {
    const [range, setRange] = useState([20, 150]);

    const handleChange = (value) => {
        setRange(value);
        onChange(value);
    };

    return (
        <div className="p-4 bg-gray-700 rounded-lg w-100">
            <p className="text-white">Range: {range[0]} - {range[1]}</p>
            <Slider
                range
                min={0}
                max={200}
                value={range}
                onChange={handleChange}
                styles={{
                    track: { backgroundColor: "#0aca34", height: "6px" }, // ✅ Barra attiva verde
                    handle: { borderColor: "#0aca34", backgroundColor: "#0aca34" }, // ✅ Pallini verdi
                    rail: { backgroundColor: "#ccc", height: "6px" } // Barra inattiva grigia
                }}
            />
        </div>
    );
}

export default SlideFilter;
