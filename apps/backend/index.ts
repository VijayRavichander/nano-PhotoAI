import express from 'express';
import { TrainModel } from "common/types"


const app = express();



app.get("/health", (req, res) => {

    res.status(200).json({
        message: "All Good"
    })
})


app.post("/ai/training", (req, res) => {

})

app.post("/ai/generate", (req, res) => {
    
})

app.post("/pack/generate", (req, res) => {
    
})

app.post("/pack/bulk", (req, res) => {
    
})

app.post("/image", (req, res) => {
    
})


app.listen(3005, () => {
    console.log("Backend App running on port:3005")
})

