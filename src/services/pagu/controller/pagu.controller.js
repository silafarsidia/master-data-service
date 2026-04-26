//READ ALL
//READ BY NAMA_AKUN

import * as paguRepo from '../repository/pagu.repository.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import response from '../../../utils/response.js';

// READ ALL
const getPaguHandler = async (request, reply) => {
    try {
        // 1. Tangkap query parameter dari URL
        const { nama_akun } = request.query;

        // 2. Ambil data dari database (kirimkan nama_akun jika ada)
        const data_master = await paguRepo.getAllPagu(nama_akun);

        // 3. Opsional: Jika difilter tapi datanya kosong, lempar NotFoundError
        if (nama_akun && data_master.length === 0) {
            throw new NotFoundError(`Pagu dengan nama akun "${nama_akun}" tidak ditemukan`);
        }

        // 4. Return response sukses
        return reply.code(200).send(
            response(200, 'success', { data_master })
        );
        
    } catch (error) {
        // Biarkan NotFoundError ditangkap oleh error handler bawaan Anda
        if (error.name === 'NotFoundError' || error instanceof NotFoundError) {
            throw error;
        }

        // Log error untuk proses debugging
        request.log.error(error);

        // Return error 500 jika koneksi DB bermasalah
        throw new InvariantError('Pagu gagal diambil');
    }
};

export {
    getPaguHandler
}