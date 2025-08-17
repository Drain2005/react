import pool from '../db/index.js';

export const getStatuts = async () => {
  try {
    const res = await pool.query('SELECT * FROM Statut ORDER BY Id_statut');
    return res.rows;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des statuts');
  }
};

export const getStatutById = async (id) => {
  try {
    const res = await pool.query('SELECT * FROM Statut WHERE Id_statut = $1', [id]);
    return res.rows[0];
  } catch (error) {
    throw new Error('Erreur lors de la récupération du statut');
  }
};

export const createStatut = async (nom) => {
  try {
    const res = await pool.query(
      'INSERT INTO Statut (Nom) VALUES ($1) RETURNING *',
      [nom]
    );
    return res.rows[0];
  } catch (error) {
    throw new Error('Erreur lors de la création du statut');
  }
};

export const updateStatut = async (id, nom) => {
  try {
    const res = await pool.query(
      'UPDATE Statut SET Nom = $1 WHERE Id_statut = $2 RETURNING *',
      [nom, id]
    );
    return res.rows[0];
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour du statut');
  }
};

export const deleteStatut = async (id) => {
  try {
    const res = await pool.query('DELETE FROM Statut WHERE Id_statut = $1 RETURNING Id_statut', [id]);
    return res.rows[0];
  } catch (error) {
    throw new Error('Erreur lors de la suppression du statut');
  }
};