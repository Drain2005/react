import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', routes);


app.get('/', (req, res) => {
  res.json({ message: 'API Sauvegarde - Serveur fonctionnel' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur interne' });
});


app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});