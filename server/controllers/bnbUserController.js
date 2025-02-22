const connection = require("../data/db");
const { confirmEmail } = require('./emailController');





function index(req, res) {
    let sql = "SELECT p.*, COALESCE(AVG(re.vote), 0) AS avg_vote  FROM properties AS p  LEFT JOIN rents AS r ON p.id = r.property_id  LEFT JOIN reviews AS re ON re.rent_id = r.id  GROUP BY p.id"
    const params = [];

    console.log(req.query.city, req.query.rooms, req.query.beds, req.query.bathrooms, req.query.size, req.query.price)
    // città
    if (req.query.city) {
        sql += " HAVING city LIKE ?"
        params.push(`%${req.query.city}%`)
    }

    // rooms
    if (req.query.rooms) {

        sql === "SELECT p.*, COALESCE(AVG(re.vote), 0) AS avg_vote  FROM properties AS p  LEFT JOIN rents AS r ON p.id = r.property_id  LEFT JOIN reviews AS re ON re.rent_id = r.id  GROUP BY p.id" ? sql += " HAVING number_of_rooms " : sql += " AND number_of_rooms ";
        if (req.query.rooms === "5+") {
            sql += ">= ?"
            params.push(5)
        } else {
            sql += "= ?"
            params.push(parseInt(req.query.rooms, 10))
        }
    }
    // beds
    if (req.query.beds) {

        sql === "SELECT p.*, COALESCE(AVG(re.vote), 0) AS avg_vote  FROM properties AS p  LEFT JOIN rents AS r ON p.id = r.property_id  LEFT JOIN reviews AS re ON re.rent_id = r.id  GROUP BY p.id" ? sql += " HAVING number_of_beds " : sql += " AND number_of_beds ";
        if (req.query.beds === "4+") {    // bisogna gestire gli intervalli 
            sql += ">= ?"
            params.push(4)
        } else if (req.query.beds === "1") {
            sql += "= 1 "
            //params.push(parseInt(req.query.rooms, 10))          non c'è rischio di sql injecion
        } else if (req.query.beds === "2") {
            sql += "= 2"
        } else if (req.query.beds === "3") {
            sql += "= 3 "
            //params.push(parseInt(req.query.rooms, 10))          non c'è rischio di sql injecion
        } else {
            console.log('gestisci questo 1 ') // qui bisogna gestire chi prova a mettere valori diversi da quelli previsti 
        }
    }

    if (req.query.bathrooms) {

        sql === "SELECT p.*, COALESCE(AVG(re.vote), 0) AS avg_vote  FROM properties AS p  LEFT JOIN rents AS r ON p.id = r.property_id  LEFT JOIN reviews AS re ON re.rent_id = r.id  GROUP BY p.id" ? sql += " HAVING number_of_bathrooms " : sql += " AND number_of_bathrooms ";
        if (req.query.bathrooms === "3+") {
            sql += ">= 3"

        } else if (req.query.bathrooms === '2') {
            sql += "= 2"
        } else if (req.query.bathrooms === '1') {
            sql += "=1"
        } else {
            console.log('gestisci questo 2') // qui bisogna gestire chi prova a mettere valori diversi da quelli previsti 
        }
    }

    if (req.query.size && Array.isArray(req.query.size) && req.query.size.length === 2) {

        sql === "SELECT p.*, COALESCE(AVG(re.vote), 0) AS avg_vote  FROM properties AS p  LEFT JOIN rents AS r ON p.id = r.property_id  LEFT JOIN reviews AS re ON re.rent_id = r.id  GROUP BY p.id" ? sql += " HAVING size " : sql += " AND size ";

        const min = parseInt(req.query.size[0], 10)
        const max = parseInt(req.query.size[1], 10)

        if (!isNaN(min) && !isNaN(max) && min >= 0 && min < max) {

            sql += `BETWEEN ? AND ?`
            params.push(min, max)

        } else {
            console.log('gestisci questo 3 ') // qui bisogna gestire chi prova a mettere valori diversi da quelli previsti 
        }



    }
    if (req.query.price && Array.isArray(req.query.price) && req.query.price.length === 2) {

        sql === "SELECT p.*, COALESCE(AVG(re.vote), 0) AS avg_vote  FROM properties AS p  LEFT JOIN rents AS r ON p.id = r.property_id  LEFT JOIN reviews AS re ON re.rent_id = r.id  GROUP BY p.id" ? sql += " HAVING price_per_day " : sql += " AND price_per_day ";

        const min = parseInt(req.query.price[0], 10)
        const max = parseInt(req.query.price[1], 10)

        if (!isNaN(min) && !isNaN(max) && min >= 0 && min < max) {

            sql += `BETWEEN ? AND ?`
            params.push(min, max)

        } else {
            console.log('gestisci questo 4') // qui bisogna gestire chi prova a mettere valori diversi da quelli previsti 
        }



    }




    sql += " ORDER BY p.vote DESC"

    // Paginazione
    /*const page = parseInt(req.query.page, 10) || 1; // Default page 1
    const limit = parseInt(req.query.limit, 10) || 20; // Default 20 risultati per pagina
    const offset = (page - 1) * limit;

    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);*/

    console.log(sql)
    connection.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });

        results.forEach(result => {

            const formattedImage = result.image?.split(' ').join('_')
            result.image = `http://localhost:3000/images/${formattedImage}`
        })
        /*connection.query("SELECT COUNT(*) AS total FROM properties", (err, countResults) => {
            if (err) return res.status(500).json({ error: "Database count query failed" });

            const totalResults = countResults[0].total;
            const totalPages = Math.ceil(totalResults / limit);

            res.json({ houses: results, totalPages });
        });
    });*/

        //quando implementiamo va tolta res.json
        res.json(results);
    });

}





function show(req, res) {
    const id = req.params.id;
    const sqlHouse = "SELECT * FROM properties WHERE id = ?";
    const sqlReviews = "SELECT * FROM reviews AS rev JOIN rents AS r ON rev.rent_id=r.id JOIN users AS u ON r.user_id=u.id WHERE r.property_id= ?";
    const sqlOwnerEmail = `SELECT o.email FROM properties as p JOIN owners as o ON p.owner_id = o.id WHERE p.id = ?`
    connection.query(sqlHouse, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ errore: "House not found" });
        const house = results[0];
        connection.query(sqlReviews, [id], (err, results) => {
            if (err) return res.status(500).json({ error: "Database query failed" });
            house.reviews = results;

            const formattedImage = house.image?.split(' ').join('_')
            house.image = `http://localhost:3000/images/${formattedImage}`
            connection.query(sqlOwnerEmail, [id], (err, resultsEmail) => {
                if (err) return res.status(500).json({ error: "Database query failed" });
                if (resultsEmail.length > 0) house.ownerEmail = resultsEmail[0].email
                res.json(house)


            })
        })
    })
}


// funzione show che cerca con lo slug invece che l'id ( lo slug è il titolo della casa )
function showSlug(req, res) {
    const slug = req.params.slug;
    // formattare di nuovo il titolo
    const formattedSlug = slug.replace(/-/g, " ");

    const sqlHouse = "SELECT * FROM properties WHERE title = ?";
    const sqlReviews = "SELECT * FROM reviews AS rev JOIN rents AS r ON rev.rent_id=r.id JOIN users AS u ON r.user_id=u.id WHERE r.property_id= ?";
    const sqlOwnerEmail = `SELECT o.email FROM properties as p JOIN owners as o ON p.owner_id = o.id WHERE p.id = ?`
    connection.query(sqlHouse, [formattedSlug], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ errore: "House not found" });
        const house = results[0]
        const id = house.id;
        connection.query(sqlReviews, [id], (err, results) => {
            if (err) return res.status(500).json({ error: "Database query failed" });
            house.reviews = results;

            const formattedImage = house.image?.split(' ').join('_')
            house.image = `http://localhost:3000/images/${formattedImage}`
            connection.query(sqlOwnerEmail, [id], (err, resultsEmail) => {
                if (err) return res.status(500).json({ error: "Database query failed" });
                if (resultsEmail.length > 0) house.ownerEmail = resultsEmail[0].email
                res.json(house)


            })
        })
    })
}




function update(req, res) {
    const propertyId = req.params.id;
    const updates = req.body;

    if (!Object.keys(updates).length) {
        return res.status(400).json({ error: 'No updates provided' });
    }

    const sql = "UPDATE properties SET ? WHERE id = ?";
    connection.query(sql, [updates, propertyId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.status(200).json({ message: 'Property updated successfully' });
    });
}

function postReview(req, res) {
    const id = req.params.id;
    const { text, email, vote } = req.body

    const sqlFirstControlUserEmail = "SELECT r.id FROM users AS u INNER JOIN rents AS r ON u.id=r.user_id WHERE u.email= ? AND r.property_id= ?"

    connection.query(sqlFirstControlUserEmail, [email, id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database query failed 0" });
        }
        if (results.length === 0) {
            return res.status(422).json({
                "error": "The provided email does not match any user with reservations."
            })
        }
        const rentId = results[0].id;
        const sqlSecondControlReview = "SELECT * FROM reviews WHERE rent_id= ?"

        connection.query(sqlSecondControlReview, [rentId], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database query failed 1" });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    "error": "You have already submitted a review for this property."
                })
            }

            const sqlInsertReview = "INSERT INTO reviews (vote, text, rent_id) VALUES (?, ?, ?)"

            connection.query(sqlInsertReview, [vote, text, rentId], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Database query failed 2" });

                }
                res.status(201).json({
                    message: "Review added successfully",
                    reviewId: results.insertId
                })
            })
        })
    })

}

function postRent(req, res) {
    const id = req.params.id;
    const { email, start, end } = req.body

    const sqlFirstControlUserEmail = "SELECT id FROM users WHERE email= ?"

    connection.query(sqlFirstControlUserEmail, [email], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database query failed 0" });
        }
        if (results.length === 0) {
            return res.status(422).json({
                "error": "The provided email does not match any user."
            })
        }
        const userId = results[0].id;
        const sqlSecondControlRent = "SELECT * FROM rents WHERE user_id= ? AND property_id= ?"

        connection.query(sqlSecondControlRent, [userId, id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database query failed 1" });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    "error": "You have already submitted a reservation for this property."
                })
            }



            const sqlInsertRent = "INSERT INTO rents (rent_start, rent_end, user_id, property_id) VALUES (?, ?, ?, ?)"

            connection.query(sqlInsertRent, [start, end, userId, id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Database query failed 2" });

                }
                confirmEmail(email, "prenotazione confermata", "la tua prenotazione è stata confermata con successo ", (err, info) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: "errore nell' invio della mail" });
                    }
                })
                res.status(201).json({
                    message: "Reservation added successfully",
                    rentId: results.insertId
                })
            })
        })
    })
}





module.exports = { index, show, update, postReview, showSlug, postRent };



