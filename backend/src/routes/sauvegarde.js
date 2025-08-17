import express from 'express';
import {
  getSauvegardes,
  getSauvegardeById,
  getSauvegardesByUser,
  createSauvegarde,
  updateSauvegardeStatut,
  deleteSauvegarde
} from '../models/sauvegarde.js';

const router = express.Router();

// GET /api/sauvegardes - Récupérer toutes les sauvegardes
router.get('/', async (req, res) => {
  try {
    const sauvegardes = await getSauvegardes();
    res.json(sauvegardes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/sauvegardes/:id - Récupérer une sauvegarde par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sauvegarde = await getSauvegardeById(id);
    
    if (!sauvegarde) {
      return res.status(404).json({ message: 'Sauvegarde non trouvée' });
    }
    
    res.json(sauvegarde);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/sauvegardes/user/:userId - Récupérer les sauvegardes d'un utilisateur
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const sauvegardes = await getSauvegardesByUser(userId);
    res.json(sauvegardes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/sauvegardes - Créer une nouvelle sauvegarde
router.post('/', async (req, res) => {
  try {
    const { taille, id_utilisateur, id_statut } = req.body;
    
    if (!taille || !id_utilisateur) {
      return res.status(400).json({ message: 'Taille et ID utilisateur requis' });
    }
    
    const nouvelleSauvegarde = await createSauvegarde(taille, id_utilisateur, id_statut);
    res.status(201).json(nouvelleSauvegarde);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/sauvegardes/:id/statut - Mettre à jour le statut d'une sauvegarde
router.put('/:id/statut', async (req, res) => {
  try {
    const { id } = req.params;
    const { id_statut } = req.body;
    
    if (!id_statut) {
      return res.status(400).json({ message: 'ID statut requis' });
    }
    
    const sauvegardeMiseAJour = await updateSauvegardeStatut(id, id_statut);
    
    if (!sauvegardeMiseAJour) {
      return res.status(404).json({ message: 'Sauvegarde non trouvée' });
    }
    
    res.json(sauvegardeMiseAJour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/sauvegardes/:id - Supprimer une sauvegarde
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sauvegardeSupprimee = await deleteSauvegarde(id);
    
    if (!sauvegardeSupprimee) {
      return res.status(404).json({ message: 'Sauvegarde non trouvée' });
    }
    
    res.json({ message: 'Sauvegarde supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;