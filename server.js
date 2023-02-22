
require("dotenv").config({
    path:
        process.env.NODE_ENV === "production"
            ? "/etc/secrets/prod.env"
            : "./dev.env",
});
const express = require('express');
const connectDB = require('./config/db');
const app = express();

const path = require('path');


connectDB();
//Init middleware
app.use(express.json({ extended: false }));
//used for local
//app.get('/', (req, res) => { res.send('API Running ') });

const __dirname1 = path.resolve();



app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
//Used for productioon
app.use(express.static(path.join(__dirname1, "/ui/build")));
app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "ui", "build", "index.html"))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server started on " + PORT);
})