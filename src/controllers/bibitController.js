const mysql = require('mysql');
const config = require('../configs/database');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    getBibit(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM bibit;', function (error, results) {
                if (error) throw error;
                res.render('kelola_bibit', {
                    bibits: results
                });
            });
            connection.release();
        });
    },

    addBibit(req, res) {
        const { nama, jenis, harga } = req.body;
        if (nama && jenis && harga) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    'INSERT INTO bibit (nama, jenis, harga) VALUES (?, ?, ?);',
                    [nama, jenis, harga],
                    function (error, results) {
                        if (error) throw error;
                        res.redirect('/bibit');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },

    editBibit(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM bibit WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.render('editBibit', { bibit: results[0] });
            });
            connection.release();
        });
    },

    updateBibit(req, res) {
        const { id } = req.params;
        const { nama, jenis, harga } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE bibit SET nama = ?, jenis = ?, harga = ? WHERE id = ?',
                [nama, jenis, harga, id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/bibit');
                }
            );
            connection.release();
        });
    },

    deleteBibit(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM bibit WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/bibit');
            });
            connection.release();
        });
    },
};
