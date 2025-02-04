import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from './MessagesPage.module.css';
import axios from "axios";
import HeaderOwners from "../../components/headerOwners/HeaderOwners"
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";


export default function MessagesPage() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [messages, setMessages] = useState([]);
    const { id } = useParams();
    const [text, setText] = useState("");
    const { setHeaderTitle } = useContext(GlobalContext);
    function fetchUsers() {
        axios.get(`http://localhost:3000/api/boolbnb/get-users/${id}`)
            .then(res => {
                console.log(res.data, "prima fetch")
                setUsers(res.data)
                setHeaderTitle(false)
            })
            .catch(err => console.error(err))
    }

    function fetchOwner() {
        axios.get(`http://localhost:3000/api/boolbnb/owner/${id}`)
            .then(res => {

                console.log(res.data)
                ownerMessage(res.data, text)
            })
            .catch(err => console.error(err));
    }

    function fetchMessages(email) {
        axios.get('http://localhost:3000/api/boolbnb/inbox', {
            params: {
                email,
                id
            }
        })
            .then(res => {
                console.log(res.data, "seconda fetch");
                setMessages(res.data);
            })
            .catch(err => console.error(err));
    }

    function ownerMessage(from, text) {
        //     const data = {
        //         from: ,
        //         to: ,
        //         text: ,
        //         subject:
        //     }
        axios.post('http://localhost:3000/api/boolbnb/email-owner-response', {
            from,
            to: userEmail,
            subject: "risposta del proprietario",
            text,
        })
            .then(res => {
                console.log(res.data)
                fetchMessages(userEmail)
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchUsers();


    }, [id]);

    return (
        <div className="container p-4 mt-4">
            <HeaderOwners />
            {/* Header */}
            {/* <header className={`d-flex justify-content-between align-items-center ${style.bgBlue} p-3 shadow rounded`}>
                <div className="fs-4 fw-bold text-white">📩 Inbox</div>

                    <form className="d-flex w-50">
                        <input
                            type="search"
                            placeholder="Cerca messaggi..."
                            className="form-control me-2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-primary text-white">Cerca</button>
                    </form>


                <div className="fs-4 fw-bold text-white">🏡</div>
            </header> */}



            {/* Main Content */}
            <div className="row mt-4">
                {/* lista utenti */}
                <div className="col-md-4">
                    <div className="card shadow-sm rounded">
                        <div className={`card-header fw-bold ${style.bgSoftBlue} text-white`}>Utenti interessati</div>
                        <ul className="list-group list-group-flush">
                            {users.length > 0 && users.map((user) => (
                                <li key={user.email} onClick={() => {
                                    fetchMessages(user.email)
                                    setUserEmail(user.email)
                                }} className={`list-group-item py-3 ${style.user}`} role="button">
                                    {user.first_name} {user.last_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Messagi */}
                <div className="col-md-8">
                    <div className="card shadow-sm rounded">
                        <div className={`card-header fw-bold ${style.bgSoftBlue} text-white`}>Chat</div>
                        <div className="card-body d-flex flex-column" style={{ height: "400px", overflowY: "auto" }}>
                            {messages.length > 0 ? (messages.map((message, i) => (

                                <div key={i} className="my-2"><h1 className={`fs-6 fw-lighter ${message.send_by_user ? "" : "text-end"}`}><span className="fs-6 fw-bold">{message.send_by_user ? (`${message.first_name} ${message.last_name}:`) : "Tu:"}</span> {message.text}</h1></div>))) : (

                                <div className="text-muted text-center">Seleziona un utente per visualizzare la conversazione... </div>
                            )

                            }

                        </div>
                        <div className="card-footer">
                            <form className="d-flex">
                                <input value={text} onChange={(e) => {
                                    setText(e.target.value)
                                }} name="text" type="text" placeholder="Scrivi un messaggio..." className="form-control me-2" />
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    fetchOwner();
                                    setText("")


                                }} className="btn btn-primary">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
