import express from 'express';
import {
  getUtilisateurs,
  getUtilisateurById,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur
} from '../models/user.js';

const router = express.Router();

// GET /api/utilisateurs - Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const utilisateurs = await getUtilisateurs();
    res.json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/utilisateurs/:id - Récupérer un utilisateur par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await getUtilisateurById(id);
    
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json(utilisateur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/utilisateurs - Créer un nouvel utilisateur
router.post('/', async (req, res) => {
  try {
    const { nom, email, mot_de_passe } = req.body;
    
    if (!nom || !email || !mot_de_passe) {
      return res.status(400).json({ message: 'Nom, email et mot de passe requis' });
    }
    
    const nouvelUtilisateur = await createUtilisateur(nom, email, mot_de_passe);
    res.status(201).json(nouvelUtilisateur);
  } catch (error) {
    if (error.message === 'Cet email est déjà utilisé') {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// PUT /api/utilisateurs/:id - Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email } = req.body;
    
    if (!nom || !email) {
      return res.status(400).json({ message: 'Nom et email requis' });
    }
    
    const utilisateurMisAJour = await updateUtilisateur(id, nom, email);
    
    if (!utilisateurMisAJour) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json(utilisateurMisAJour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/utilisateurs/:id - Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateurSupprime = await deleteUtilisateur(id);
    
    if (!utilisateurSupprime) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;