'use strict'

const {Router} = require('express')
const handler = require('./handlers/externalAPIHandler.js');
const {Hotel} = require('../models')

const router = Router();

router.get(
  '/fromSource',
  async (req, res, next) => {
    try {
      // 6. Call handler to response with data
      const results = await handler.getListFromAPI();

      res.status(200).send(results)
    } catch (err) {
      req.error = err;
      next();
    }
  }
)

router.get('/hotels', async (req, res, next) => {
  try {
    const results = await Hotel.findAll();

    if(results.length > 0) {
      const modified = results.map((item) => ({
        id: item.id,
        property: {
          name: item.name,
          location: {
            country: item.country
          },
          reviews: {
            summary: {
              score: item.score
            }
          }
        },
      }))
      res.status(200).send({
        message: `Success get ${results.length} data`,
        results: modified
      })
    } else {
      res.status(404).send({
        message: 'The data is empty',
        results
      })
    }
  } catch (err) {
    req.error = err;
    next();
  }
})

router.post('/hotels', async (req, res, next) => {
  if(!req.body.hotels) {
    return res.status(400).send({
      message: 'Please provide the request body'
    })
  }

  if(!Array.isArray(req.body.hotels)) {
    return res.status(400).send({
      message: 'The request body should be an array'
    })
  }

  if(req.body.hotels.length < 1) {
    return res.status(400).send({
      message: 'The request body is empty'
    })
  }
  
  try {
    await Hotel.bulkCreate(req.body.hotels);

    return res.status(201).send({
      message: 'The data have been inserted'
    })
  } catch (err) {
    req.error = err;
    return next();
  }
})

router.delete('/hotels/:id', async (req, res, next) => { 
  try {
    await Hotel.destroy({
      where: {
        id: req.params.id
      }
    })

    return res.status(201).send({
      message: 'The data has been deleted'
    })
  } catch (err) {
    req.error = err;
    return next();
  }
})

router.get('/hotel/:id', async (req, res, next) => {
  try {
    const results = await Hotel.findAll({
      where: {
        id: req.params.id
      }
    });

    if(results.length > 0) {
      const modified = results.map((item) => ({
        id: item.id,
        property: {
          name: item.name,
          location: {
            country: item.country
          },
          reviews: {
            summary: {
              score: item.score
            }
          }
        },
      }))
      res.status(200).send({
        message: `Success get ${results.length} data`,
        results: modified[0]
      })
    } else {
      res.status(404).send({
        message: 'The data is empty',
        results
      })
    }
  } catch (err) {
    req.error = err;
    next();
  }
})

router.put('/hotel/:id', async (req, res, next) => {
  if(!req.body.name) {
    return res.status(400).send({
      message: 'The field name is required'
    })
  }

  if(!req.body.country) {
    return res.status(400).send({
      message: 'The field country is required'
    })
  }

  if(!req.body.score) {
    return res.status(400).send({
      message: 'The field score is required'
    })
  }

  try {
    await Hotel.update(req.body,{
      where: {
        id: req.params.id
      }
    });

    return res.status(200).send({
      message: 'The data has been updated'
    })
  } catch (err) {
    req.error = err;
    next();
  }
})

module.exports = router;