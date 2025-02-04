const connection = require("../data/db");
const path = require('path');
const fs = require('fs');

function propertiesByOwner(req, res) {

    const ownerId = req.user.id; // Estratto dal token JWT
    console.log(ownerId)
    const sqlOwner = 'SELECT * FROM owners WHERE id = ?';
    const sqlProperties = 'SELECT * FROM properties WHERE owner_id = ?';

    // Recupera i dati dell'owner
    connection.query(sqlOwner, [ownerId], (err, resultsOwner) => {
        if (err) return res.status(500).json({ error: 'Database query failed 1' });

        if (resultsOwner.length === 0) {
            return res.status(404).json({ error: 'Nessun owner trovato con questo ID' });
        }

        const owner = resultsOwner[0];

        // Recupera le proprietà dell'owner
        connection.query(sqlProperties, [ownerId], (err, resultsProperties) => {
            if (err) return res.status(500).json({ error: 'Database query failed 2' });

            // if (resultsProperties.length === 0) {
            //     return res.status(404).json({ error: 'Nessuna proprietà trovata per questo owner' });
            // }

            resultsProperties.forEach(result => {
                const formattedImage = result.image?.split(' ').join('_');
                result.image = `http://localhost:3000/images/${formattedImage}`;
            });

            owner.propertiesOwned = resultsProperties;
            res.json(owner);
        });
    });
}


function create(req, res) {
    console.log('funzione create')

    const owner_id = req.params.id;

    console.log(req.body)


    const { title, number_of_rooms, number_of_beds, number_of_bathrooms, size, full_address, city, house_type, price_per_day } = req.body;

    const vote = 0



    // Controlla che tutti i campi obbligatori siano presenti
    if (!owner_id || !title || !number_of_rooms || !number_of_beds || !number_of_bathrooms || !size || !full_address || !city || !price_per_day) {
        console.log('fallisco qui')
        return res.status(400).json({ error: "All fields are required" });
    }
    // controllo che esiste un file 
    if (req.files === null || Object.keys(req.files).length === 0) {
        res.status(400).json('Nessun file Caricato')
        return
    }

    // prendo il file e seleziono il path in cui salvarlo 'public/images

    const imageFile = req.files.image;

    const formattedImageName = imageFile.name.replace(/ /g, "-")

    const uploadsPath = path.join(__dirname, '..', 'public', 'images');

    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true });
    }

    const imgFinalPath = path.join(uploadsPath, formattedImageName);


    // salvo il file in images

    imageFile.mv(imgFinalPath, (err) => {
        if (err) {

            res.status(500).json({ error: `Errore spostamento immagine ${formattedImageName}` })
            return
        }
    })



    // house_type può essere nullo e nel caso in cui non è nullo i suoi valori possibili sono : appartamento, casa indipendente, villa, villetta a schiera, chalet, baita (NOTA BENE QUALSIASI ALTRO VALORE NON VERRA' ACCETTATO!!!)
    const sql = `
        INSERT INTO properties (owner_id, title, number_of_rooms, number_of_beds, number_of_bathrooms, size, full_address, city, image, price_per_day, vote, house_type) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql, [owner_id, title, number_of_rooms, number_of_beds, number_of_bathrooms, size, full_address, city, formattedImageName, price_per_day, vote, house_type], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });

        res.status(201).json({
            message: "Property added successfully",
            propertyId: results.insertId,
        });
    });
}

function inbox(req, res) {
    console.log("📩 Funzione inbox chiamata con:", req.query);
    const userEmail = req.query.email;
    const ownerId = req.query.id;
    const sql = "select * from messages as m join users as u on m.user_id=u.id where u.email= ? and m.owner_id= ? order by m.created_at asc"

    connection.query(sql, [userEmail, ownerId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })
}

function getUsersByOwner(req, res) {
    const ownerId = req.params.id;
    const sql = "select distinct(email), first_name, last_name from messages as m join users as u on m.user_id=u.id where m.owner_id= ?"

    connection.query(sql, [ownerId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed 1' });
        console.log(results)
        res.json(results)
    })

}

function showOwner(req, res) {
    const id = req.params.id;
    const sql = "select email from owners where id = ?"

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        console.log(results[0].email)
        res.json(results[0].email)
    })
}


module.exports = { propertiesByOwner, create, inbox, getUsersByOwner, showOwner }