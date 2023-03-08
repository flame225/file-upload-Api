const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const path = require('path');
const connectDB = require('./connectDb/db');
const fileUpload = require('express-fileupload');
dotenv.config();
''


const app = express();



const filesPayloadExist = require('./middleware/filesPayloadExist');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fleSizeLimiter = require('./middleware/fleSizeLimiter');

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
})


app.post('/upload',
    fileUpload({ createParentPath: true }),
    filesPayloadExist,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fleSizeLimiter,
    (req, res) => {
        const files = req.files
        console.log(files)

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files', files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })

        return res.json({ status: 'success', message: Object.keys(files).toString() })
    }
)







const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`server on ${PORT}`);
    connectDB( );
})  