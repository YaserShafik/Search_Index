// routes/search.js
const express = require('express');
const Product = require('../models/product');
const client = require('../config/elasticsearch');
const router = express.Router();

// Indexar productos en Elasticsearch
router.post('/index', async (req, res) => {
  const products = await Product.find();
  products.forEach(async (product) => {
    await client.index({
      index: 'products',
      id: product._id.toString(),
      document: product,
    });
  });
  res.send('Productos indexados');
}); 
// Búsqueda de productos
router.get('/', async (req, res) => {
  const { q } = req.query;
  try {
    const { hits } = await client.search({
      index: 'products',
      body: {
        query: {
          multi_match: {
            query: q,
            fields: ['name', 'description'],
          },
        },
        sort: [
          { priority: { order: 'desc' } },
          '_score',
        ],
      },
    });
    res.json(hits.hits);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/api/search/index', async(req, res) =>{
  try{
    const query = await Product.findById(req._id);
    res.json(query);
  }
  catch{
    res.status(500).send(error.message);
  }
})

module.exports = router;
