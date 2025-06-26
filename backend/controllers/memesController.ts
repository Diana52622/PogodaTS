import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const memesPath = path.resolve(__dirname, '../data/memes.json');

interface Meme {
    image: string;
    text: string;
}

interface MemesData {
    [key: string]: Meme[];
}

const validCategories = ['hot', 'warm', 'cold', 'normal', 'rain', 'snow', 'thunderstorm'];

export const addMeme = async (req: Request, res: Response): Promise<Response> => {
    const { category, image, text } = req.body;

    if (!category || !image || !text) {
        return res.status(400).json({ error: 'Category, image and text are required' });
    }

    if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'Invalid category' });
    }

    try {
        const data = await fs.readFile(memesPath, 'utf8');
        const memes: MemesData = JSON.parse(data);
        
        if (!memes[category]) {
            memes[category] = [];
        }

        const newMeme: Meme = { image, text };
        memes[category].push(newMeme);
        
        await fs.writeFile(memesPath, JSON.stringify(memes, null, 2));
        
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
        const data = await fs.readFile(memesPath, 'utf8');
        const memes: MemesData = JSON.parse(data);
        return res.json(memes);
    } catch (error) {
        console.error('Error fetching memes:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};