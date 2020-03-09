"use strict";

const { Router } = require("express");
const router = Router();

router.get("/", function(request, response) {
    response.json({
        info : "Hi there!"
    })
});

module.exports = router;