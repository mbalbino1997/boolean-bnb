import { useState } from "react"
import style from '../ReviewForm/ReviewForm.module.css'
import axios from "axios"

const initialFormData = {
    from: '',
    text: '',
    subject: ''
}


export default function EmailForm({ email }) {

    const [formData, setFormData] = useState(initialFormData);
    const [isFormValid, setIsFormValid] = useState(true)
    const [success, setSuccess] = useState(false)

    function handleForm(e) {
        setSuccess(false)
        const { value, name } = e.target

        setFormData(
            {
                ...formData,
                [name]: value
            }
        )
    };

    function sendEmail(e) {
        e.preventDefault();
        setIsFormValid(true)



        const data = {

            from: formData.from.trim(),
            text: formData.text.trim(),
            to: email,
            subject: formData.subject.trim()

        }

        // validazione lato client
        if (!formData.from ||
            !formData.text ||
            !formData.subject
        ) {
            setIsFormValid(false)
            return
        }

        axios.post(`http://localhost:3000/api/boolbnb/email-send`, data)
            .then(res => {
                setFormData(initialFormData)
                setSuccess(true)
            }).catch(err => {
                console.log(err)
                setIsFormValid(false)


            })




    }




    return (
        <section className={style.formContainer}>
            <div className="text-center fw-bold fs-4 mt-5">Contatta il proprietario per richiedere informazioni:</div>
            <form className={`container mt-4 ${style.customForm}`} onSubmit={sendEmail}>

                <p>
                    <label htmlFor="from" className="form-label text-light mt-1">EMAIL *</label>
                    <input required type="email" className="form-control" placeholder="inserisci la tua email" name="from" id="from" value={formData.from} onChange={handleForm} />

                </p>
                <p>
                    <label htmlFor="subject" className="form-label text-light">OGGETTO *</label>
                    <input required type="text" className="form-control" placeholder="inserisci l' oggetto della mail " name="subject" id="subject" value={formData.subject} onChange={handleForm} />

                </p>

                <p>
                    <label htmlFor="text" className="form-label text-light" >TESTO</label>
                    <textarea rows="4" name="text" id="text" placeholder='scrivi qui il contenuto della tua mail' className="form-control" value={formData.text} onChange={handleForm}></textarea>
                </p>




                <div className="text-white fw-bold">
                    {isFormValid === false && <div>i dati non sono validi</div>}
                    {success && <div>email inviata con successo</div>}
                    <button className={`submit-button text-white fw-bold mb-4 mt-4 ${style.customButton}`}>Invia</button>
                </div>

            </form>
        </section>
    )



}