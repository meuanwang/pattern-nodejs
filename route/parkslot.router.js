"use strict";

const { Router } = require("express");
const router = Router();
const controller = require('../controller/parkslot.controller')

router
    .get("/", async (req,res) => res.status(200).json(await controller.findAll(req)))
    .get("/checkStatus/:number_slot", async (req,res) => res.status(200).json(await controller.getParklotStatus(req)))
    .post("/", async (req,res)=> await controller.create(req,res))
module.exports = router;