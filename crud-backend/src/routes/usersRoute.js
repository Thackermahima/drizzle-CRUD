const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { db } = require('../db');
const { users } = require('../schema'); 
import { eq } from "drizzle-orm"; 

import "dotenv/config";

const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  email: z.string().email("Invalid email address"),
  age: z.number().int().min(0, "Age must be a positive integer").max(120, "Age must be realistic"),
});

// GET all users
router.get('/users', async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    res.json({ success: true, data: allUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users', error });
  }
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.select().from(users).where(eq(users.id,id));
    if (user.length > 0) {
      res.json({ success: true, data: user[0] });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user', error });
  }
});

// POST to create a new user
router.post('/users', async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    await db.insert(users).values(validatedData);
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Failed to create user', error });
  }
});

router.put(`/users/:id`, async (req, res) => {
    const { id } = req.params;
    try {
      const validatedData = userSchema.partial().parse(req.body);
      const updatedUser = await db
        .update(users)
        .set(validatedData)
        .where(eq(users.id, id))
        .returning(); 
  
      if (!updatedUser) {
        res.status(404).json({ success: false, message: 'User not found' });
      } else {
        res.json({ success: true, message: 'User updated successfully', data: updatedUser });

      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
      }
      console.error('Error updating user:', error);
      res.status(500).json({ success: false, message: 'Failed to update user', error });
    }
  });
  

// DELETE a user by ID
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.delete(users).where(eq(users.id,id));
    if (!deleted) {
        res.status(404).json({ success: false, message: 'User not found' });
    } else {
        res.json({ success: true, message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user', error });
  }
});

module.exports = router;
