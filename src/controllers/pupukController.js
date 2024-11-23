const mysql = require('mysql');
const config = require('../configs/database');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    getPupuk(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM pupuk;', function (error, results) {
                if (error) throw error;
                res.render('pupuk', {
                    pupuk: results
                });
            });
            connection.release();
        });
    },

    addPupuk(req, res) {
        const { nama, jenis, harga } = req.body;
        if (nama && jenis && harga) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    'INSERT INTO pupuk (nama, jenis, harga) VALUES (?, ?, ?);',
                    [nama, jenis, harga],
                    function (error, results) {
                        if (error) throw error;
                        res.redirect('/pupuk');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },

    editPupuk(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM pupuk WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.render('editPupuk', { pupuk: results[0] });
            });
            connection.release();
        });
    },

    updatePupuk(req, res) {
        const { id } = req.params;
        const { nama, jenis, harga } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE pupuk SET nama = ?, jenis = ?, harga = ? WHERE id = ?',
                [nama, jenis, harga, id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/pupuk');
                }
            );
            connection.release();
        });
    },

    deletePupuk(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM pupuk WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/pupuk');
            });
            connection.release();
        });
    },
};
