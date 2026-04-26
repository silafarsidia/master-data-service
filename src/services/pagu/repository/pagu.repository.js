import pool from '../../../utils/db.js';

// GET ALL
export const getAllPagu = async (nama_akun) => {
    let query = 'SELECT * FROM pagu';
    let values = [];

    // Jika ada query parameter nama_akun, modifikasi query SQL-nya
    if (nama_akun) {
        query += ' WHERE nama_akun ILIKE $1';
        
        // Kita hapus tanda kutip ganda/tunggal jika terkirim dari URL
        const cleanNamaAkun = nama_akun.replace(/['"]/g, ''); 
        
        // Tambahkan % di awal dan akhir agar pencarian lebih fleksibel 
        // (berguna untuk mengatasi spasi berlebih di database Anda)
        values.push(`%${cleanNamaAkun}%`); 
    }

    const result = await pool.query(query, values);
    return result.rows;
};