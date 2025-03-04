require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')

const app = express();
app.use(express.json());


const userSchema = new mongoose.Schema({
    userId: String,
    name: String,
    email: String
})

const userModel = mongoose.model('user', userSchema);


app.post('/add',  async(req,res)=>{
    let userData = await userModel.create(req.body);
    console.log(userData);
    res.json({msg:'user data', userData});
})

app.get('/api/health', (req, res)=>{
    res.send('server is running');
});

app.get('/api/data', async(req,res)=>{
    let userData = await userModel.find();
    res.json({msg:'user data', userData});
})
  



app.get('/', (req, res) => {
    res.send('this is a test route');
})

app.listen(process.env.PORT, async() => {
    await mongoose.connect(process.env.MONGOURL);
    console.log('server started');
})

