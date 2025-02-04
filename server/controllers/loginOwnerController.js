const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/authService');
const connection = require('../data/db');

function loginOwnerController(req, res) {
    const { email, password } = req.body;

    // Verifica se i campi email e password sono stati inviati
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e password sono obbligatori!' });
    }

    // Controlla se l'email esiste nel database
    connection.query('SELECT * FROM owners WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Errore durante la query:', err);
            return res.status(500).json({ message: 'Errore del server. Riprova più tardi!' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Utente non trovato!' });
        }

        const owner = results[0];

        // Verifica la password con bcrypt
        bcrypt.compare(password, owner.password_hash, (bcryptErr, validPassword) => {
            if (bcryptErr) {
                console.error('Errore durante il confronto delle password:', bcryptErr);
                return res.status(500).json({ message: 'Errore del server. Riprova più tardi!' });
            }

            if (!validPassword) {
                return res.status(401).json({ message: 'Password non valida!' });
            }

            // Genera il token JWT con l'ID del proprietario
            const token = generateToken({ id: owner.id, email: owner.email });

            // Risponde con il token e i dati necessari del proprietario
            res.status(200).json({
                message: 'Login effettuato con successo!',
                token,
                owner: {
                    id: owner.id,
                    email: owner.email,
                    name: owner.name, // Aggiungi altri dati se necessario
                }
            });
        });
    });
}

module.exports = { loginOwnerController };
