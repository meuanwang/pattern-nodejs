"use strict";

const { Router } = require("express");
const router = Router();
const controller = require('../controller/registration.controller')

router
    .get("/", async (req,res) => res.status(200).json(await controller.findAll(req)))
    .get("/carpark", async (req,res) => res.status(200).json(await controller.carPark(req)))
    .get("/carparkByCarSize", async (req,res) => res.status(200).json(await controller.carParkByCarSize(req)))
    .get("/numberSlotByCarSize", async (req,res) => res.status(200).json(await controller.numberSlotByCarSize(req)))
    .post("/", async (req,res)=> await controller.create(req,res))
    .patch("/unregistration/:number_slot", async (req,res)=> await controller.unRegistration(req,res))
module.exports = router;