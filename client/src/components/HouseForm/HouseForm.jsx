import { useState } from "react"
import { useNavigate } from "react-router-dom";

import axios from "axios";

const initialFormData = {
    title: "",
    number_of_rooms: "",
    number_of_beds: "",
    number_of_bathrooms: "",
    size: "",
    full_address: "",
    city: "",
    image: "",
    house_type: "appartamento",
    price_per_day: ''
}

export default function HouseForm({ id, onSuccess = () => { } }) {

    const navigate = useNavigate()


    const [formData, setFormData] = useState(initialFormData)

    const [isFormValid, setIsFormValid] = useState(true)

    function handleForm(e) {
        const { value, name, files } = e.target

        if (name === 'image') {
            setFormData(
                {
                    ...formData,
                    [name]: files[0]
                }
            )


        } else {
            setFormData(
                {
                    ...formData,
                    [name]: value
                }
            )
        }
    };









    function storeNewHouse(e) {
        e.preventDefault()
        setIsFormValid(true)

        if (!formData.title || !formData.full_address ||
            !formData.city || !formData.house_type ||
            isNaN(parseInt(formData.number_of_rooms)) ||
            isNaN(parseInt(formData.number_of_beds)) ||
            isNaN(parseInt(formData.number_of_bathrooms)) ||
            isNaN(parseInt(formData.size)) ||
            isNaN(parseInt(formData.price_per_day)) ||
            !formData.image) {
            setIsFormValid(false)
            return

        }


        const data = new FormData(); // Usa FormData per gestire i file
        data.append("title", formData.title.trim());
        data.append("number_of_rooms", parseInt(formData.number_of_rooms));
        data.append("number_of_beds", parseInt(formData.number_of_beds));
        data.append("number_of_bathrooms", parseInt(formData.number_of_bathrooms));
        data.append("size", parseInt(formData.size));
        data.append("full_address", formData.full_address.trim());
        data.append("city", formData.city.trim());
        data.append("house_type", formData.house_type.trim());
        data.append("price_per_day", parseInt(formData.price_per_day))
        data.append("image", formData.image); // Aggiungi l'immagine al FormData









        axios.post(`http://localhost:3000/api/boolbnb/owner/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }, // Importante per inviare il FormData
        })
            .then(res => {
                console.log(res)
                // se la chiamata va a buon fine dovremmo refetchare il book
                // e resettare il form
                setFormData(initialFormData)
                navigate(`/owners/${id}`);
                onSuccess()
            }).catch(err => {
                console.log(err)

            })

    }





    return (
        <form onSubmit={storeNewHouse} encType="multipart/form-data" className="container"  >
            <div className="row">



                <p className="col-12">
                    <label htmlFor="title" className="form-label">NOME DELLA CASA *</label>
                    <input required type="text" className="form-control" placeholder="inserisci il nome della casa" name="title" id="title" value={formData.title} onChange={handleForm} />

                </p>
                <p className="col-md-6 col-sm-12" >
                    <label htmlFor="number_of_rooms" className="form-label">NUMERO DI STANZE *</label>
                    <input required type="text" className="form-control" placeholder="inserisci il numero di stampe" name="number_of_rooms" id="number_of_rooms" value={formData.number_of_rooms} onChange={handleForm} />

                </p>
                <p className="col-md-6 col-sm-12">
                    <label htmlFor="number_of_beds" className="form-label">NUMERO DI LETTI *</label>
                    <input required type="text" className="form-control" placeholder="inserisci il numero di letti " name="number_of_beds" id="number_of_beds" value={formData.number_of_beds} onChange={handleForm} />

                </p>
                <p className="col-md-6 col-sm-12">
                    <label htmlFor="number_of_bathrooms" className="form-label">NUMERO DI BAGNI *</label>
                    <input required type="text" className="form-control" placeholder="inserisci il numero di bagni" name="number_of_bathrooms" id="number_of_bathrooms" value={formData.number_of_bathrooms} onChange={handleForm} />

                </p>
                <p className="col-md-6 col-sm-12" >
                    <label htmlFor="size" className="form-label">METRI QUADRI *</label>
                    <input required type="text" className="form-control" placeholder="inserisci la metratura della casa" name="size" id="size" value={formData.size} onChange={handleForm} />

                </p>
                <p className="col-md-6 col-sm-12">
                    <label htmlFor="full_address" className="form-label">INDIRIZZO  *</label>
                    <input required type="text" className="form-control" placeholder="inserisci l' indirizzo" name="full_address" id="full_address" value={formData.full_address} onChange={handleForm} />

                </p>
                <p className="col-md-6 col-sm-12">
                    <label htmlFor="city" className="form-label">CITTA' *</label>
                    <input required type="text" className="form-control" placeholder="inserisci la città" name="city" id="city" value={formData.city} onChange={handleForm} />

                </p>
                <p className="col-md-6 col-sm-12">
                    <label htmlFor="price_per_day" className="form-label">PREZZO GIORNALIERO *</label>
                    <input required type="text" className="form-control" placeholder="inserisci il prezzo" name="price_per_day" id="price_per_day" value={formData.price_per_day} onChange={handleForm} />

                </p>


                <p className=' col-md-6 col-sm-12"'>
                    <label htmlFor="house_type" className="form-label" >TIPO DI CASA *</label>
                    <select required name="house_type" id="house_type" className="form-control" value={formData.house_type} onChange={handleForm}>
                        <option value="appartamento">Appartamento</option>
                        <option value="villa">Villa</option>
                        <option value="chalet">Chalet</option>
                        <option value="villetta a schiera">Villetta a schiera</option>
                        <option value="baita">Baita</option>
                        <option value="casa indipendente">Casa indipendente</option>

                    </select>
                </p>
                <p>
                    <label htmlFor="image" className="form-label" >FOTO *</label>
                    <input required type="file" className="form-control" placeholder="inserisci il nome della foto" name="image" id="image" onChange={handleForm} />

                </p>

                <div className="col-12 mt-3 mb-3 d-flex gap-5" >
                    <button className="submit-button form-submit">invia</button>
                    {isFormValid === false && <div>i dati non sono validi</div>}
                </div>



            </div>


        </form>
    )
}