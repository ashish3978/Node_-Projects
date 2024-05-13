const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mssql = require('mssql');
const sql = require("msnodesqlv8");

const app = express();
const PORT = process.env.PORT || 9001;
app.use(cors());
app.use(bodyParser.json());

const config = {
    server: 'GT-2\\SQLEXPRESS',
    database: "products",
    driver: 'msnodesqlv8',
    user: "sa",
    password: "123456",
    options: {
        trustServerCertificate: true,
    },
    pool: {
        max: 500,
        min: 0,
        idleTimeoutMillis: 90000
    }
};

mssql.connect(config)
.then(pool => {
    console.log('Connected to SQL Server');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => {
    console.error('Error connecting to SQL Server:', err);
    process.exit(1);
});


console.log("hello");
app.get('/api/data', async (req, res) => {
    try {
        // const pool = await mssql.connect(config);
        const request = pool.request();
        const result = await request.query('select * from orders');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error querying the database', error);
        res.status(500).json({ message: "Error querying the database" });
    }
});

