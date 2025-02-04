import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import axios from 'axios';
import style from './OwnersPage.module.css';

const initialFormData = {
    email: '',
    password: ''
};

export default function OwnersPage() {
    const [formData, setFormData] = useState(initialFormData);
    const [isLogged, setIsLogged] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { setSidebarUserOrOwner } = useContext(GlobalContext);
    const { owner, setOwner, setHeaderTitle } = useContext(GlobalContext);
    const navigate = useNavigate();

    function handleForm(e) {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function logIn(e) {
        e.preventDefault();

        const data = {
            email: formData.email.trim(),
            password: formData.password.trim()
        };

        if (!data.email || !data.password) {
            setErrorMessage('Per favore, inserisci email e password.');
            return;
        }

        axios.post(`http://localhost:3000/auth/Owners/login`, data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                setOwner(res.data.owner);
                setFormData(initialFormData);
                setIsLogged(true);
                navigate(`/owners/${res.data.owner.id}`);
                setSidebarUserOrOwner(false);
                setHeaderTitle(true);
            })
            .catch(err => {
                setErrorMessage('Email o password non validi.');
            });
    }

    useEffect(() => {
        if (owner && owner.id) {
            navigate(`/owners/${owner.id}`);
        }
    }, [navigate, owner]);

    return (
        <div className="d-flex flex-grow-1" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#10242D', // Sfondo scuro
            height: '100vh',
            width: '100%',
            color: 'white',
            padding: '0',
            margin: '0',
        }}>
            <div className={`card p-4 ${style.customCard}`} style={{
                maxWidth: '400px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.95)', // Bianco con trasparenza
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                borderRadius: '15px',
            }}>
                <h3 className="text-center mb-3" style={{ color: '#10242D' }}>
                    Benvenuto su BooleanBnb
                </h3>
                <h4 className="text-center ">Area proprietari</h4>
                <p className="text-center text-muted mb-4">
                    Gestisci facilmente i tuoi immobili in affitto.
                </p>

                <form onSubmit={logIn}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold" style={{ color: '#10242D' }}>
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            className="form-control"
                            placeholder="Inserisci la tua email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleForm}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold" style={{ color: '#10242D' }}>
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            className="form-control"
                            placeholder="Inserisci la tua password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleForm}
                        />
                    </div>

                    {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                    <button type="submit" className="btn w-100" style={{
                        backgroundColor: '#10242D',
                        color: 'white',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '5px',
                    }}>
                        Accedi
                    </button>
                </form>

                <div className="text-center mt-3">
                    <small className="text-muted">
                        Non hai un account? <a href="/register" className="text-primary" style={{ color: '#10242D' }}>Registrati ora</a>
                    </small>
                </div>
            </div>
        </div>
    );
}
