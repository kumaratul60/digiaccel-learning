const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

const questionModel = require("./models/questionModel")

const dbUrl = "mongodb://localhost:27017/question"


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())



const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(dbUrl, connectionParams).then(() => {
    console.log("connected to db");
}).catch((er) => {
    console.log(er)
})

app.get("/", (req, res) => res.send("hello world how are you"))


app.post("/questions", async (req, res) => {
    const {
        question,
        OptionA,
        OptionB,
        OptionC,
        OptionD,
        correctAnswerOption,
        attachmentImage,
        attachmentVideo
    } = req.body

    const data = new questionModel({
        "question": question,
        "OptionA": OptionA,
        "OptionB": OptionB,
        "OptionC": OptionC,
        "OptionD": OptionD,
        "correctAnswerOption": correctAnswerOption,
        "attachmentImage": attachmentImage,
        "attachmentVideo": attachmentVideo
    })

    await data.save()
    res.end("success")


})


app.get("/questions", async (req, res) => {

    const dataRes = await questionModel.aggregate([{ $sample: { size: 1 } }])
    return res.json(dataRes)
})

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`server is running on: ${PORT}`);
})