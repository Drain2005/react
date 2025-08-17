import express from 'express';
import {
  getStatuts,
  getStatutById,
  createStatut,
  updateStatut,
  deleteStatut
} from '../models/statut.js';

const router = express.Router();

// GET /api/statuts - Récupérer tous les statuts
router.get('/', async (req, res) => {
  try {
    const statuts = await getStatuts();
    res.json(statuts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/statuts/:id - Récupérer un statut par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const statut = await getStatutById(id);
    
    if (!statut) {
      return res.status(404).json({ message: 'Statut non trouvé' });
    }
    
    res.json(statut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/statuts - Créer un nouveau statut
router.post('/', async (req, res) => {
  try {
    const { nom } = req.body;
    
    if (!nom) {
      return res.status(400).json({ message: 'Nom du statut requis' });
    }
    
    const nouveauStatut = await createStatut(nom);
    res.status(201).json(nouveauStatut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/statuts/:id - Mettre à jour un statut
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom } = req.body;
    
    if (!nom) {
      return res.status(400).json({ message: 'Nom du statut requis' });
    }
    
    const statutMisAJour = await updateStatut(id, nom);
    
    if (!statutMisAJour) {
      return res.status(404).json({ message: 'Statut non trouvé' });
    }
    
    res.json(statutMisAJour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/statuts/:id - Supprimer un statut
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const statutSupprime = await deleteStatut(id);
    
    if (!statutSupprime) {
      return res.status(404).json({ message: 'Statut non trouvé' });
    }
    
    res.json({ message: 'Statut supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;