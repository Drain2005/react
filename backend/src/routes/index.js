import express from 'express';
import utilisateurRoutes from './utilisateur.js';

const router = express.Router();
router.use('/utilisateurs', utilisateurRoutes);

export default router;
