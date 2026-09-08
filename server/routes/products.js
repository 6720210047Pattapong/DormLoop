const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = 'supersecret_dormmart_key'; 

// Middleware to authenticate
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

// GET all products (with search and filter)
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    
    let whereClause = {};
    
    if (search) {
      whereClause.title = { contains: search, mode: 'insensitive' };
    }
    
    if (category && category !== 'All') {
      whereClause.category = category;
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: { seller: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { seller: { select: { name: true } } }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create product
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, price, category, condition, image, meetingLocation } = req.body;
    
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        condition,
        image,
        meetingLocation,
        sellerId: req.user.userId
      }
    });
    
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update product
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    const existing = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Product not found' });

    const isOwner = existing.sellerId === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Unauthorized' });

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE product
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    const existing = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Product not found' });

    const isOwner = existing.sellerId === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Unauthorized' });

    await prisma.product.delete({ where: { id: parseInt(id) } });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
