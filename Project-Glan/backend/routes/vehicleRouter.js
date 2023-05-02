const express = require('express');
const { get } = require('mongoose');
const router = express.Router();
const {getVehicle, setVehicle, updateVehicle, deleteVehicle} = require('../controllers/VehicleController');

router.route('/').post(setVehicle).get(getVehicle);
router.route('/:id').put(updateVehicle).delete(deleteVehicle);

module.exports = router;