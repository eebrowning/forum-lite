const express = require('express');
const app = express();
const port = 3000; // You can use any desired port number

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, this is your Express backend!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
