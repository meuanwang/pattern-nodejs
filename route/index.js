"use strict";

const express = require("express");
const router = express.Router();
const registrationRouter = require('./registration.router')
const parkslotRouter = require('./parkslot.router')

router.use('/registration',registrationRouter)
router.use('/parkslot',parkslotRouter)


module.exports = router;
