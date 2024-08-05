const express = require("express")
const { 
    insertDrop,
    getDropsByZone,
    createDrop,
    getDrops,
    editDrop,
    deleteDrop,
    getDropsByHour,
    editDropHour
} = require("../controllers/drops")
const router = express.Router()
const checkAuth = require("../middleware/auth")

/**
 * Lista los Usuarios
 */
router.post("/insertdrophour",checkAuth, insertDrop)
router.get("/:id",checkAuth, getDropsByZone)
router.post("/createdrop",checkAuth, createDrop)
router.get("/",checkAuth, getDrops)
router.put("/editdrop/:id",checkAuth, editDrop)
router.put("/editdrophour",checkAuth, editDropHour)
router.delete("/deletedrop/:id",checkAuth, deleteDrop)
router.get("/getdropshour/:id",checkAuth, getDropsByHour)

module.exports = router;