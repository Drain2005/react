import pool from '../db/index.js';

export const getSauvegardes = async () => {
  try {
    const res = await pool.query(`
      SELECT s.Id_sauvegarde, s.Date_sauvegarde, s.Taille, 
             u.Nom as nom_utilisateur, st.Nom as statut
      FROM Sauvegarde s
      JOIN Utilisateur u ON s.Id_utilisateur = u.Id_utilisateur
      JOIN Statut st ON s.Id_statut = st.Id_statut
      ORDER BY s.Date_sauvegarde DESC
    `);
    return res.rows;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des sauvegardes');
  }
};

export const getSauvegardeById = async (id) => {
  try {
    const res = await pool.query(`
      SELECT s.Id_sauvegarde, s.Date_sauvegarde, s.Taille, s.Id_utilisateur, s.Id_statut,
             u.Nom as nom_utilisateur, st.Nom as statut
      FROM Sauvegarde s
      JOIN Utilisateur u ON s.Id_utilisateur = u.Id_utilisateur
      JOIN Statut st ON s.Id_statut = st.Id_statut
      WHERE s.Id_sauvegarde = $1
    `, [id]);
    return res.rows[0];
  } catch (error) {
    throw new Error('Erreur lors de la récupération de la sauvegarde');
  }
};

export const getSauvegardesByUser = async (userId) => {
  try {
    const res = await pool.query(`
      SELECT s.Id_sauvegarde, s.Date_sauvegarde, s.Taille, 
             u.Nom as nom_utilisateur, st.Nom as statut
      FROM Sauvegarde s
      JOIN Utilisateur u ON s.Id_utilisateur = u.Id_utilisateur
      JOIN Statut st ON s.Id_statut = st.Id_statut
      WHERE s.Id_utilisateur = $1
      ORDER BY s.Date_sauvegarde DESC
    `, [userId]);
    return res.rows;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des sauvegardes de l\'utilisateur');
  }
};

export const createSauvegarde = async (taille, id_utilisateur, id_statut = 1) => {
  try {
    const res = await pool.query(
      'INSERT INTO Sauvegarde (Taille, Id_utilisateur, Id_statut) VALUES ($1, $2, $3) RETURNING *',
      [taille, id_utilisateur, id_statut]
    );
    return res.rows[0];
  } catch (error) {
    throw new Error('Erreur lors de la création de la sauvegarde');
  }
};

export const updateSauvegardeStatut = async (id, id_statut) => {
  try {
    const res = await pool.query(
      'UPDATE Sauvegarde SET Id_statut = $1 WHERE Id_sauvegarde = $2 RETURNING *',
      [id_statut, id]
    );
    return res.rows[0];
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour du statut de la sauvegarde');
  }
};

export const deleteSauvegarde = async (id) => {
  try {
    const res = await pool.query('DELETE FROM Sauvegarde WHERE Id_sauvegarde = $1 RETURNING Id_sauvegarde', [id]);
    return res.rows[0];
  } catch (error) {
    throw new Error('Erreur lors de la suppression de la sauvegarde');
  }
};