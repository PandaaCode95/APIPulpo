const {Router} = require ("express")
const router = Router();
const vehiclesCtrl = require("../controller/vehicles.Controller")
const loginController = require("../controller/login.Controller");


router.get("/vehicles",vehiclesCtrl.getVehicle)
router.post("/filter",vehiclesCtrl.getVehiclesFilter)

router.post("/vehicles",vehiclesCtrl.postVehicle)

router.put("/vehicles",vehiclesCtrl.putVehicle)

router.delete("/vehicles",vehiclesCtrl.deleteVehicle)

router.post("/login", loginController.getLogin)

module.exports = router;