import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { Meme, MemesData } from '../types/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const memesPath = path.resolve(__dirname, '../data/memes.json');

export const readMemesFile = async (): Promise<MemesData> => {
  const data = await fs.readFile(memesPath, 'utf8');
  return JSON.parse(data);
};

export const writeMemesFile = async (memes: MemesData): Promise<void> => {
  await fs.writeFile(memesPath, JSON.stringify(memes, null, 2));
};
 
export const getRandomMeme = (memes: MemesData, category: string): Meme | null => {
  const categoryMemes = memes[category];
  return categoryMemes?.length 
    ? categoryMemes[Math.floor(Math.random() * categoryMemes.length)]
    : null;
};