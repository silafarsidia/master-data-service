import * as satkerRepo from '../repository/satker.repository.js';
// import data_master from '../repository/satker.repository.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import response from '../../../utils/response.js';

// CREATE
const createSatkerHandler = async (request, reply) => {
    const result = await satkerRepo.createSatker(request.body);

    if(!result) {
        throw new InvariantError('Satker gagal ditambahkan');
    }

    return reply.code(201).send(
        response(201, 'Satuan Kerja berhasil ditambahkan', {
        id: result.id,
        })
    );
};

// READ ALL
const getSatkerHandler = async (request, reply) => {
    try {
        // 1. Fetch the actual data from your database via the repository
        const data_master = await satkerRepo.getAllSatker();

        // 2. Return the successful response
        return reply.code(200).send(
            response(200, 'success', { data_master })
        );
        
    } catch (error) {
        // 3. Log the error so you can debug it in your terminal
        request.log.error(error);

        // 4. Return a 500 status code if the database query fails
        throw new InvariantError('Satker gagal diambil');
    }
};


//READ BY ID
const getSatkerByIdHandler = async (request, reply) => {
    try {
        const { id } = request.params;
        
        // 1. Fetch from PostgreSQL instead of filtering a local array
        const satker = await satkerRepo.getSatkerById(id);

        // 2. If result.rows[0] is undefined, the ID doesn't exist
        if (!satker) {
            throw new NotFoundError('Satuan Kerja tidak ditemukan');
        }

        // 3. Return success response
        return reply.code(200).send(
            response(200, 'Detail Satuan Kerja berhasil diambil', { satker })
        );
        
    } catch (error) {
        // 4. If the error is your custom NotFoundError, let it bubble up to Fastify
        if (error.name === 'NotFoundError' || error instanceof NotFoundError) {
            throw error; 
        }

        // 5. Otherwise, it's a real database/server error. Log it and return 500.
        request.log.error(error);
        return reply.code(500).send(
            response(500, 'Internal Server Error', null)
        );
    }
};

// UDPATE (PATCH)
const editSatkerByIdHandler = async (request, reply) => {
    try {
        const { id } = request.params;
        
        // 1. Panggil repository untuk melakukan update di database
        // Kita mengirim request.params.id dan request.body
        const updatedSatker = await satkerRepo.updateSatkerById(id, request.body);

        // 2. Jika hasil query kosong (null/undefined), berarti ID tidak ditemukan
        if (!updatedSatker) {
            throw new NotFoundError('Satuan Kerja tidak ditemukan');
        }

        // 3. Kirim response sukses
        return reply.code(200).send(
            response(200, 'Satuan Kerja berhasil diperbarui', { 
                id: updatedSatker.id 
            })
        );
        
    } catch (error) {
        // Tangani jika error berasal dari NotFoundError
        if (error.name === 'NotFoundError' || error instanceof NotFoundError) {
            throw error;
        }

        // Tangani error database atau server lainnya
        request.log.error(error);
        return reply.code(500).send(
            response(500, 'Internal Server Error', null)
        );
    }
};

//DELETE
const deleteSatkerByIdhandler = async (request, reply) => {
    try {
        const { id } = request.params;
        
        // 1. Eksekusi query delete melalui repository
        const deletedSatker = await satkerRepo.deleteSatkerById(id);

        // 2. Jika deletedSatker bernilai undefined, berarti data tidak ditemukan di database
        if (!deletedSatker) {
            throw new NotFoundError('Satuan Kerja tidak ditemukan');
        }

        // 3. Kirim response sukses
        return reply.code(200).send(
            response(200, 'Satuan Kerja berhasil dihapus') 
        );
        
    } catch (error) {
        // Tangani jika error berasal dari NotFoundError agar Fastify bisa memprosesnya
        if (error.name === 'NotFoundError' || error instanceof NotFoundError) {
            throw error;
        }

        // Tangani error database atau server lainnya
        request.log.error(error);
        return reply.code(500).send(
            response(500, 'Internal Server Error', null)
        );
    }
};

export { 
    createSatkerHandler,
    getSatkerHandler,
    getSatkerByIdHandler,
    editSatkerByIdHandler,
    deleteSatkerByIdhandler
};
