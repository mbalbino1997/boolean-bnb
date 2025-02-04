
const nodemailer = require('nodemailer');
const connection = require("../data/db");
const { text } = require('express');
//  configurazione
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io', // Host SMTP di Mailtrap
    port: 2525,              // Porta SMTP di Mailtrap
    auth: {
        user: process.env.MT_USER, // qui va inserito il nome utente di mail trap
        pass: process.env.MT_PASSWORD, // qui va inserita la password che viene fornita da mail trap
    },
});

function emailSend(req, res) {
    const { from, to, subject, text, html } = req.body;

    if (!from || !to || !subject || !text) {
        return res.status(400).json({
            message: 'Devi fornire almeno mittente, destinatario, oggetto e testo dell\'email',
        });
    }

    const mailOptions = {
        from,    // email del mittente
        to,      //  email del destinatario destinatario
        subject,           // Oggetto
        text,        // Corpo dell'email in formato testo
        //html,       // Corpo dell'email in formato HTML nel caso in cui c'è bisogno di inviare email particolari che non comprendono solo il testo 
    };

    const autoMailOptions = {
        from: "BooleanBnBServizioclienti@gmail.com",    // email del sito 
        to: mailOptions.from,      //  email del mittenente al quale inviare la conferma
        subject: 'Email Ricevuta ',           // Oggetto
        text: 'Il propietario del sito ha ricevuto la tua email e ti risponderà al più presto',

    }



    transporter
        .sendMail(mailOptions)
        .then((info) => {

            transporter.sendMail(autoMailOptions).then((info) => {
                //recupero user_id
                const sqlUserId = "select id from users where email = ?"
                //recupero owner_id
                const sqlOwnerId = "select id from owners where email = ?"
                //inserisco il messaggio con user ed owner id corrispondenti
                const sqlInsertMessage = "INSERT INTO messages (user_id, owner_id, text) VALUES (?, ?, ?)"

                connection.query(sqlUserId, [from], (err, resultsUserId) => {
                    if (err) return res.status(500).json({ error: 'Database query failed' });

                    if (resultsUserId.length === 0) {
                        return res.status(404).json({ error: 'Nessun utente trovato con questa email' });
                    }
                    const userId = resultsUserId[0].id;
                    console.log(userId, "user id");

                    connection.query(sqlOwnerId, [to], (err, resultsOwnerId) => {
                        if (err) return res.status(500).json({ error: 'Database query failed' });

                        if (resultsUserId.length === 0) {
                            return res.status(404).json({ error: 'Nessun proprietario trovato con questa email' });
                        }
                        const ownerId = resultsOwnerId[0].id;
                        console.log(ownerId, "owner id");

                        connection.query(sqlInsertMessage, [userId, ownerId, text], (err, resultInsert) => {
                            if (err) return res.status(500).json({ error: 'Database insert query failed' });
                        })
                    })
                })
                res.status(201).json({
                    message: 'Email inserita correttamente nel database ed inviata con successo!!',
                    info,
                });
            }).catch((error) => {
                console.error('Errore durante l\'invio dell\'email:', error);
                res.status(500).json({
                    message: 'Errore durante l\'invio dell\'email',
                    error,
                });
            });


        })
        .catch((error) => {
            console.error('Errore durante l\'invio dell\'email:', error);
            res.status(500).json({
                message: 'Errore durante l\'invio dell\'email',
                error,
            });
        });
};


function confirmEmail(to, subject, text) {

    const mailOptions = {
        from: "BooleanBnBServizioclienti@gmail.com",    // email del sito 
        to,      //  email del mittenente al quale inviare la conferma
        subject,           // Oggetto
        text,
    }

    transporter
        .sendMail(mailOptions)
        .then((info) => {
            console.log('Email di conferma inviata con successo');
        }).catch((error) => {
            console.error('Errore durante l\'invio dell\'email:', error);
            res.status(500).json({
                message: 'Errore durante l\'invio dell\'email',
                error,
            });
        });
}


function responseOwner(req, res) {
    const { from, to, subject, text, html } = req.body;

    if (!from || !to || !subject || !text) {
        return res.status(400).json({
            message: 'Devi fornire almeno mittente, destinatario, oggetto e testo dell\'email',
        });
    }

    const mailOptions = {
        from,    // email del mittente
        to,      //  email del destinatario destinatario
        subject,           // Oggetto
        text,        // Corpo dell'email in formato testo
        //html,       // Corpo dell'email in formato HTML nel caso in cui c'è bisogno di inviare email particolari che non comprendono solo il testo 
    };


    transporter.sendMail(mailOptions).then((info) => {
        //recupero user_id
        const sqlUserId = "select id from users where email = ?"
        //recupero owner_id
        const sqlOwnerId = "select id from owners where email = ?"
        //inserisco il messaggio con user ed owner id corrispondenti
        const sqlInsertMessage = "INSERT INTO messages (user_id, owner_id, text, send_by_user) VALUES (?, ?, ?, ?)"

        connection.query(sqlUserId, [to], (err, resultsUserId) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            if (resultsUserId.length === 0) {
                return res.status(404).json({ error: 'Nessun utente trovato con questa email' });
            }
            const userId = resultsUserId[0].id;
            console.log(userId, "user id");

            connection.query(sqlOwnerId, [from], (err, resultsOwnerId) => {
                if (err) return res.status(500).json({ error: 'Database query failed' });

                if (resultsUserId.length === 0) {
                    return res.status(404).json({ error: 'Nessun proprietario trovato con questa email' });
                }
                const ownerId = resultsOwnerId[0].id;
                console.log(ownerId, "owner id");

                connection.query(sqlInsertMessage, [userId, ownerId, text, false], (err, resultInsert) => {
                    if (err) return res.status(500).json({ error: 'Database insert query failed' });
                })
            })
        })
        res.status(201).json({
            message: 'Email inserita correttamente nel database ed inviata con successo!!',
            info,
        });
    }).catch((error) => {
        console.error('Errore durante l\'invio dell\'email:', error);
        res.status(500).json({
            message: 'Errore durante l\'invio dell\'email',
            error,
        });
    });


}





module.exports = { emailSend, confirmEmail, responseOwner }