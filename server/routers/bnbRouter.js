const express = require('express');
const router = express.Router();
//separazione dei controller per dividere le logiche tra: 
//User (può visualizzare tutte le proprietà, aggiungere voti ad una proprietà,aggiungere review ad una proprietà solo se ha già preso in affitto quella specifica proprietà) 
//Owner (può visualizzare solo le proprietà già aggiunte sulla piattaforma, può aggiungere altre proprietà)
const bnbUserController = require('../controllers/bnbUserController.js');
const bnbOwnerController = require('../controllers/bnbOwnerController.js');
const emailController = require('../controllers/emailController.js');
const authenticateToken = require('../middlewares/authenticateToken.js');
const { generateToken } = require('../utils/authService.js');




// rotte => OWNER

// propertiesByOwner: questa rotta simula un autenticazione tramite sola email e nel caso in cui ci sia corrispondenza con quella di un proprietario restituisce tutte le proprietà appartenenti a quel proprietario
router.get('/owner', authenticateToken, bnbOwnerController.propertiesByOwner);

// permette agli owner di creare una nuova proprietà
router.post('/owner/:id([0-9]+)', bnbOwnerController.create);


router.get('/owner/:id([0-9]+)', bnbOwnerController.showOwner);

// chiamata per ottenere tutti gli user che hanno una conversazione con uno specifico owner
router.get('/get-users/:id([0-9]+)', bnbOwnerController.getUsersByOwner);
// index messagi tra user e proprietario
router.get('/inbox', bnbOwnerController.inbox);

// rotte => USER

// index: mostra tutte le properties
router.get('/', bnbUserController.index);

// show: mostra la singola property
router.get('/:id([0-9]+)', bnbUserController.show);
router.get('/:slug', bnbUserController.showSlug);

//update: aggiorna parzialmente properties (utilizzata per aggiornare il campo vote)
router.patch('/:id([0-9]+)', bnbUserController.update);


//postRent: permette di inserire una rent solo se l'utente ha è prensente nel db (controllo fatto tramite email dell'user)
router.post('/:id([0-9]+)/rents', bnbUserController.postRent);

//postReview: permette di inserire una review solo se l'utente ha una prenotazione e se non ha già lasciato una review (controllo fatto tramite email dell'user)
router.post('/:id([0-9]+)/reviews', bnbUserController.postReview);



router.post('/', authenticateToken, bnbOwnerController.create);




// endpoint che gestisce l'invio di una email da parte dell'utente
router.post('/email-send', emailController.emailSend);
// endpoint che gestisce l'invio di una email da parte dell'owner
router.post('/email-owner-response', emailController.responseOwner);


module.exports = router