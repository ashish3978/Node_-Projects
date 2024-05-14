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
    server: 'GT-2\\',
    database: "products",
    driver: 'msnodesqlv8',
    user: "sa",
    password: "123456",
    options: {
        trustServerCertificate: true,
        instancename: 'SQLEXPRESS' 
    },
    pool: {
        max: 500,
        min: 0, 
        idleTimeoutMillis: 90000
    }
};



// Data put from server
async function executeStoredProcedure(){
    try{
        const pool = await mssql.connect(config);
        const result = await mssql.query`EXEC GetOrdersByCity @City = 'México D.F.'`;
        console.log(result.recordset);
        await mssql.close();

    }catch(err){
        console.error("Error executing",err);
    }
}
executeStoredProcedure();
// data send to postman
// app.get('/GetOrdersByCity', async (req, res) => {
//     try {
//         await mssql.connect(config);

//         const result = await mssql.query`EXEC GetOrdersByCity @City = 'México D.F.'`;

//         res.json(result.recordset);
//     } catch (err) {
//         console.error('Error executing:', err);
//         res.status(500).json({ error: 'An error occurred while executing the stored procedure' });
//     } finally {
//         await mssql.close(); 
//     }
// });

app.post('/InsertOrUpdate', async (req, res) =>{
    try{
        const {CustomerID, CustomerName, ContactName, Address, City, Country} = req.body;
        const pool = await mssql.connect(config);
        await pool.request()    
        .query`UPDATE orders
                set CustomerName = ${CustomerName},
                ContactName = ${ContactName},
                Address = ${Address},
                City = ${City},
                Country = ${Country}
            WHERE CustomerID = ${CustomerID}`;


            await pool.request()
            .input('CustomerID', mssql.Int, CustomerID)
            .input('CustomerName', mssql.NVarChar(255), CustomerName)
            .input('ContactName', mssql.NVarChar(255), ContactName)
            .input('Address', mssql.NVarChar(255), Address)
            .input('City', mssql.NVarChar(255), City)
            .input('Country', mssql.NVarChar(255), Country)
            .execute('InsertOrUpdate');

        await mssql.close();
        res.json({message: 'operation successful'});
    }catch(error){
        console.error('Error', error);
        res.status(500).json({ error: 'An error occurred' }); 
    }
});

app.delete('/DeleteOrder', async(req, res) => {
    try{
        const {CustomerID} = req.body;
        if(!CustomerID){
            return res.status(400).json({ error: 'CustomerID is required' });
        }
        await mssql.connect(config);
        await mssql.query`EXEC DeleteOrder @CustomerID = ${CustomerID}`;
        await mssql.close();
        res.json({ message: 'Order deleted successfully' });

    }catch(error){
        console.error('Error', error);     
        res.status(500).json({ error: 'An error occurred' });
    }
});


// sql server connection to node
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

// data put from sql server to postman
console.log("hello");
app.get('/api/data', async (req, res) => {
    try {
        const pool = await mssql.connect(config);
        const request = pool.request();
        const result = await request.query('select * from orders');
        await mssql.close();
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error querying the database', error);
        res.status(500).json({ message: "Error querying the database" });
    }
});