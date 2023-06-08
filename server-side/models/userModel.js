import pool from "./db.js";

class UserModel {
    static createUser(username, password) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
                if (err) {
                    return reject(err);
                }
                const userId = results.insertId;
                resolve(userId);
            });
        });
    }

    static getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                const user = results[0];
                resolve(user);
            });
        });
    }

    /* static getUserId(username); */
}

export default UserModel;