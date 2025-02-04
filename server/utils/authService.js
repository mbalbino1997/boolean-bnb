require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(user) {
    // Payload con i dati dell'utente
    return jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
        expiresIn: '1h', // Il token scade dopo 1 ora
    });
}

module.exports = { generateToken };