const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apartman',
    charset: 'utf8mb4'
};

// --- BEJELENTKEZÉS ---
app.post('/api/bejelentkezes', async (req, res) => {
    const { email, jelszo } = req.body;
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);

        const selectQuery = `
        SELECT * FROM felhasznalok WHERE email = ? AND jelszo = ?
        `;

        const [selectResult] = await connection.execute(selectQuery, [email, jelszo]);

        if (selectResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: "A megadott email cím-jelszó párossal felhasználó nem található!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sikeres bejelentkezés."
        });
    }
    catch (error) {
        console.error("Adatbázis hiba:", error);
        return res.status(500).json({
            success: false,
            message: "Szerverhiba történt."
        });
    }
    finally {
        if (connection) {
            await connection.end();
        }
    }
});

// --- REGISZTRÁCIÓ ---
app.post('/api/regisztracio', async (req, res) => {
    const { email, jelszo } = req.body;
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);

        const selectQuery = `
        SELECT * FROM felhasznalok WHERE email = ?
        `;

        const [selectResult] = await connection.execute(selectQuery, [email]);

        if (selectResult.length > 0) {
            return res.status(400).json({
                success: false,
                message: "A megadott email címmel már korábban regisztráltak!"
            });
        }

        const insertQuery = `
        INSERT INTO \`felhasznalok\` (\`email\`, \`jelszo\`)
        VALUES (?, ?)
        `;

        await connection.execute(insertQuery, [email, jelszo]);

        return res.status(201).json({
            success: true,
            message: "Sikeres regisztráció",
            data: {
                email: email,
                jelszo: jelszo
            }
        });
    }
    catch (error) {
        console.error("Adatbázis hiba:", error);
        return res.status(500).json({
            success: false,
            message: "Szerverhiba"
        }); 
    }
    finally {
        if (connection) {
            await connection.end();
        }
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`A node.js api szerver fut a http://localhost:${PORT} címen`);
});
