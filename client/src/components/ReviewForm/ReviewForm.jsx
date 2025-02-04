import { useState } from "react"
import axios from "axios"
import style from './ReviewForm.module.css'

const initialFormData = {
    vote: '',
    text: '',
    email: ''
}



export default function ReviewForm({ id, onSuccess = () => { } }) {

    const [formData, setFormData] = useState(initialFormData)
    const [isFormValid, setIsFormValid] = useState(true)

    function handleForm(e) {
        const { value, name } = e.target

        setFormData(
            {
                ...formData,
                [name]: value
            }
        )
    };

    function storeReview(e) {
        e.preventDefault()
        setIsFormValid(true)

        const data = {

            email: formData.email.trim(),
            text: formData.text.trim(),
            vote: parseInt(formData.vote)

        }

        // validazione lato client
        if (!formData.email ||
            !formData.text ||
            !formData.vote ||
            formData.vote < 1 ||
            formData.vote > 10
        ) {
            setIsFormValid(false)
            return
        }

        axios.post(`http://localhost:3000/api/boolbnb/${id}/reviews`, data)
            .then(res => {
                setFormData(initialFormData)
                onSuccess()
            }).catch(err => {
                console.log(err)
                setIsFormValid(false)


            })




    }



    return (
        <section className={style.formContainer}>
            <div className="text-center fw-bold fs-4 mt-5">Vogliamo sapere la tua opinione!</div>
            <form className={`container mt-4 ${style.customForm}`} onSubmit={storeReview}>

                <p>
                    <label htmlFor="email" className="form-label text-light mt-1">EMAIL *</label>
                    <input required type="email" className="form-control" placeholder="inserisci l'email" name="email" id="email" value={formData.email} onChange={handleForm} />

                </p>

                <p >
                    <label htmlFor="text" className="form-labe text-light" >Recensione</label>
                    <textarea rows="4" name="text" id="text" placeholder='Scrivi la tua recensione' className="form-control" value={formData.text} onChange={handleForm}></textarea>
                </p>

                <p >
                    <label htmlFor="vote" className="form-label text-light" >Voto *</label>
                    <select required name="vote" id="vote" className="form-control" value={formData.vote} onChange={handleForm}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </p>



                <div className={`text-white fw-bold`}>
                    <button className={`submit-button text-white fw-bold mb-4 mt-4 ${style.customButton}`}>Invia</button>
                </div>

            </form>
        </section>
    )

}