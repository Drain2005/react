import pool from '../db/index.js';

export const getUtilisateurs = async () => {
  const res = await pool.query('SELECT * FROM Utilisateur');
  return res.rows;
};

export const createUtilisateur = async (nom, email, mot_de_passe) => {
  const res = await pool.query(
    'INSERT INTO Utilisateur (Nom, Email, Mot_de_passe) VALUES ($1, $2, $3) RETURNING *',
    [nom, email, mot_de_passe]
  );
  return res.rows[0];
};
