// const data_master = [];
// export default data_master;

import pool from '../../../utils/db.js';
import { nanoid } from 'nanoid';

// CREATE
export const createSatker = async (payload) => {
    const id = nanoid(5);
    const created_at = new Date().toISOString();
    const updated_at = created_at;
    const {
        kode_satker,
        nama_satker,
        unit_organisasi,
        kantor,
        lokasi,
        tempat,
        alamat,
        kewenangan,
        tahun,
    } = payload;

    const query = `
        INSERT INTO satker (
        id, kode_satker, nama_satker, unit_organisasi,
        kantor, lokasi, tempat, alamat, kewenangan, tahun, created_at, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        RETURNING id
    `;

    const values = [
        id,
        kode_satker,
        nama_satker,
        unit_organisasi,
        kantor,
        lokasi,
        tempat,
        alamat,
        kewenangan,
        tahun,
        created_at,
        updated_at,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// GET ALL
export const getAllSatker = async () => {
  const result = await pool.query('SELECT * FROM satker');
  return result.rows;
};

// GET BY ID
export const getSatkerById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM satker WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// UPDATE (PATCH)
// UPDATE BY ID
export const updateSatkerById = async (id, data) => {
  const { 
    kode_satker, nama_satker, unit_organisasi, kantor, 
    lokasi, tempat, alamat, kewenangan, tahun 
  } = data;

  const query = `
    UPDATE satker 
    SET 
      kode_satker = COALESCE($1, kode_satker),
      nama_satker = COALESCE($2, nama_satker),
      unit_organisasi = COALESCE($3, unit_organisasi),
      kantor = COALESCE($4, kantor),
      lokasi = COALESCE($5, lokasi),
      tempat = COALESCE($6, tempat),
      alamat = COALESCE($7, alamat),
      kewenangan = COALESCE($8, kewenangan),
      tahun = COALESCE($9, tahun),
      updated_at = NOW()
    WHERE id = $10
    RETURNING *;
  `;

  const values = [
    kode_satker || null, 
    nama_satker || null, 
    unit_organisasi || null, 
    kantor || null, 
    lokasi || null, 
    tempat || null, 
    alamat || null, 
    kewenangan || null, 
    tahun || null, 
    id
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// DELETE BY ID
export const deleteSatkerById = async (id) => {
  const query = 'DELETE FROM satker WHERE id = $1 RETURNING id';
  const result = await pool.query(query, [id]);
  
  // Akan mengembalikan object { id: "..." } jika berhasil, atau undefined jika ID tidak ada
  return result.rows[0]; 
};
