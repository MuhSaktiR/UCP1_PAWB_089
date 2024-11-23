const router = require('express').Router();
const bibitController = require('../controllers/bibitController');

// Rute untuk mengelola bibit
router.get('/', bibitController.getBibit);
router.post('/add', bibitController.addBibit);
router.get('/edit/:id', bibitController.editBibit);
router.post('/update/:id', bibitController.updateBibit);
router.get('/delete/:id', bibitController.deleteBibit);

module.exports = router;
