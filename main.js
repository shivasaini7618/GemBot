const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
// const prompt = "what is the value of pi";

const PORT = process.env.PORT  ||4000

app.get('/' , (req , res)=>{
  res.send('Wellcome to google gemini');
});

app.use(bodyParser.json());
app.use(express.json());

const generate = async(prompt)=>{
  try{
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  }catch(err){
    console.log(err);
  }
}

app.get('/api/content' , async(req , res)=>{
  try{
    const data = req.body.question;
    const result = await generate(data);
    res.status(200).json(result);

  }catch(err){
    console.log(err);
  }
});

app.listen(PORT , ()=>{
  console.log(`server started at port ${PORT}`);
});


