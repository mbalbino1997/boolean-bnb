//per eseguire lo script dovete trovarvi all'interno della cartella che lo contiene (in questo caso utils) ed eseguire il comando node registerOwner.js 
//la password che sceglierete verrà criptata con un salt di valore 10, più è alto più è sicuro ma al tempo stesso ci impiegherà più tempo per il confronto degli hash durante il login

// Importiamo il modulo bcrypt per l'hashing della password
const bcrypt = require('bcrypt');

// Importiamo la connessione al database dalla nostra configurazione (presumiamo che si trovi nel file '../data/db')
const connection = require('../data/db');

// Dati dell'utente da registrare (in un'applicazione reale, questi verrebbero ricevuti tramite una richiesta HTTP)
const firstName = "Davide";  // Nome dell'utente
const lastName = "Costa";  // Cognome dell'utente
const email = 'davide.costa@example.com';  // Email dell'utente
const plainPassword = 'Davide123';  // La password in chiaro (prima di essere criptata)

// Il numero di iterazioni (rounds) per l'algoritmo di hashing
const saltRounds = 10;  // Un valore di 10 è generalmente considerato un buon compromesso tra prestazioni e sicurezza

// Funzione asincrona per registrare un nuovo utente nel database
const registerUser = async () => {
    try {
        // Usiamo bcrypt per eseguire l'hashing della password in chiaro
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        // Eseguiamo l'inserimento nel database (stiamo usando il metodo 'execute' di mysql2)
        connection.execute(
            // La query SQL per inserire un nuovo utente nella tabella 'owners'
            'INSERT INTO owners (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)',

            // I valori da inserire nella query, inclusa la password criptata
            [email, hashedPassword, firstName, lastName],

            // Funzione callback che viene chiamata dopo l'esecuzione della query
            (err, results) => {
                if (err) {
                    // Se c'è un errore durante l'inserimento, lo stampiamo nella console
                    console.error("Errore durante l'inserimento dell'utente:", err);
                } else {
                    // Se l'inserimento è riuscito, stampiamo un messaggio di successo
                    console.log('Utente registrato con successo!');
                }
            }
        );
    } catch (error) {
        // Gestiamo eventuali errori che potrebbero verificarsi durante l'hashing della password
        console.error("Errore durante la registrazione dell'utente:", error);
    }
};

// Chiamata alla funzione per eseguire la registrazione dell'utente
registerUser();
