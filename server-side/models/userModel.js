import pool from "./db.js";
import bcrypt from 'bcrypt';
import uuid4 from "uuid4";

class UserModel {
    static createUser(email, pwd) {
        return new Promise(async (resolve, reject) => {
            const rows = pool.query('SELECT COUNT(*) AS count FROM UserAuth');
            const uid = uuid4();

            pwd = bcrypt.hash(pwd, 6);

            pool.query('INSERT INTO UserAuth (uid, email, pwd) VALUES (?, ?)', [uid, email, pwd], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    }

    static getUserByemail(email) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM UserAuth WHERE email = ?', [email], (err, results) => {
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

    static getuid(uid) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users WHERE uid = ?', [useId], (err, results) => {
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

}

export default UserModel;