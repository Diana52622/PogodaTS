import express from 'express';
import { addMeme, getAllMemes } from '../controllers/memesController.js';

const router = express.Router();

router.route('/')
    .post(addMeme)
    .get(getAllMemes);

export default router