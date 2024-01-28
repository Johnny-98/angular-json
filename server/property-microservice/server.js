const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 4000;

app.use(cors());

// Read data.json
let propertyData;
const path = require('path');
const dataPath = path.join(__dirname, '../data.json');

fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    propertyData = JSON.parse(data);
});

app.get('/property-details', (req, res) => {
    const query = req.query.query.toLowerCase();
    console.log("Query received:", query);
    if (!query) {
        res.json({ error: "Query parameter is required" });
        return;
    }

    try {
        const filteredData = propertyData.suggestions.filter(item =>
            item.address.toLowerCase().includes(query)
        );

        const response = {
            response_id: "response_" + new Date().getTime(),
            details: filteredData
        };

        res.json(response);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send("Internal Server Error");
    }

    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Microservice running on http://localhost:${PORT}`);
});
