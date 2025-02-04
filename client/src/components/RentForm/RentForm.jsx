import { useState } from "react"
import axios from "axios"
import style from './RentForm.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialFormData = {
    email: '',
    start: '',
    end: ''
}



export default function RentForm({ id, onSuccess = () => { } }) {

    const [formData, setFormData] = useState(initialFormData)
    const [isFormValid, setIsFormValid] = useState(true)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState("");

    function handleForm(e) {
        const { value, name } = e.target

        setFormData(
            {
                ...formData,
                [name]: value
            }
        )
    };


    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate && date >= endDate) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (date) => {
        if (startDate && date < startDate) {
            setError("La data di fine non può essere prima della data di inizio.");
        } else {
            setError("");
            setEndDate(date);
        }
    };







    function storeRent(e) {
        e.preventDefault()
        setIsFormValid(true)

        if (!startDate || !endDate) {
            setError("Seleziona entrambe le date.");
            setIsFormValid(false)
            return;
        }


        // validazione lato client
        if (!formData.email) {
            setIsFormValid(false)
            return
        }

        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        const data = {

            email: formData.email.trim(),
            start: formattedStartDate,
            end: formattedEndDate,


        }


        axios.post(`http://localhost:3000/api/boolbnb/${id}/rents`, data)

            .then(res => {

                setFormData(initialFormData)
                setStartDate(null)
                setEndDate(null)
                onSuccess()
            }).catch(err => {
                console.log(err)
                setIsFormValid(false)


            })

    }





    return (
        <section className={style.formContainer}>
            <div className="text-center fw-bold fs-4 mt-5">Prenota questo immobile:</div>
            <form className={`container mt-4 ${style.customForm}`} onSubmit={storeRent}>

                <p>
                    <label htmlFor="email" className="form-label text-light">EMAIL *</label>
                    <input required type="email" className="form-control" placeholder="inserisci l'email" name="email" id="email" value={formData.email} onChange={handleForm} />

                </p>
                <div className="d-flex justify-content-between align-items-center flex-wrap ">


                    <div className="col-md-6 col-sm-12 d-flex flex-column"   >
                        <label className="form-label text-light" >Data di inizio:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Seleziona la data di inizio"
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-6 col-sm-12 d-flex flex-column" >
                        <label className="form-label text-light" >Data di Fine:</label>
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate || new Date()}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Seleziona la data di fine"
                            className="form-control"
                        />
                    </div>



                    {/* <div>

                        <label className="form-lable text-light ">Data di fine:</label>
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate || new Date()}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Seleziona la data di fine"
                            className="form-control"
                        />
                    </div> */}


                </div>


                <div className="text-white fw-bold">
                    {isFormValid === false && <div>i dati non sono validi</div>}
                    <button className={`submit-button text-white fw-bold mb-4 mt-4 ${style.customButton}`}>Invia</button>
                </div>

            </form>
        </section>
    )
}