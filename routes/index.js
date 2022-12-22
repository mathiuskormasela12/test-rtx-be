'use strict'

const {Router} = require('express')

// 4. Import routes
const externalAPI = require('./externalAPI.js');

const router = Router({
  caseSensitive: true
})

const handleError = (req, res) => {
  res.status(500).send({
    message: req.error && req.error.message ? req.error.message : req.error
  })
}

// 5. Use imported routes in router
router.use(externalAPI, handleError);

module.exports = router;