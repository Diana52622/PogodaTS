import { Request, Response } from 'express';
import { Meme } from '../types/types.js';
import { validCategories } from '../constants/meme.constants.js';
import { readMemesFile, writeMemesFile } from '../utils/meme.utils.js';

export const addMeme = async (req: Request, res: Response): Promise<Response> => {
    const { category, image, text } = req.body;

    if (!category || !image || !text) {
        return res.status(400).json({ error: 'Category, image and text are required' });
    }

    if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'Invalid category' });
    }

    try {
        const memes = await readMemesFile();
        const newMeme: Meme = { image, text };
        
        memes[category] = memes[category] || [];
        memes[category].push(newMeme);
        
        await writeMemesFile(memes);
        
        return res.status(201).json({ 
            message: 'Meme added successfully',
            meme: newMeme
        });
    } catch (error) {
        console.error('Error adding meme:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllMemes = async (req: Request, res: Response): Promise<Response> => {
    try {
        const memes = await readMemesFile();
        return res.json(memes);
    } catch (error) {
        console.error('Error fetching memes:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};