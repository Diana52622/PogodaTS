import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import weatherRoutes from './routes/weather.js';
import memeRoutes from './routes/memes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://frontend123456.netlify.app',
  'http://localhost:5000'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, './data/images')));

app.use('/weather', weatherRoutes);
app.use('/memes', memeRoutes);

app.get('/', (req, res) => {
    res.send('POGODA TS API is running');
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;