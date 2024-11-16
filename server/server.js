import express from 'express';
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import noteRoute from "./route/noteRoute.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://mern-app-x6m7.onrender.com'
        : 'http://localhost:5173'
}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}
//for deploying be + fe separately

// app.use("/api/notes", noteRoute);
//
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });



app.use("/api/notes", noteRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
