const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello HFC Cambodia V2.0");
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});