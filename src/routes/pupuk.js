const router = require('express').Router();
const pupukController = require('../controllers/pupukController');

// Rute untuk mengelola pupuk
router.get('/', pupukController.getPupuk);
router.post('/add', pupukController.addPupuk);
router.get('/edit/:id', pupukController.editPupuk);
router.post('/update/:id', pupukController.updatePupuk);
router.get('/delete/:id', pupukController.deletePupuk);

module.exports = router;
