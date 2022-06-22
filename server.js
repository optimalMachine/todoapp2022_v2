const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

app.listen(3000, ()=>{
    console.log('listening on ' + 3000);
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get("/write",(req,res)=>{
    res.sendFile(__dirname+"/write.html");
})

app.post("/add",(req,res)=>{
    console.log(req.body.title);
    console.log(req.body.date);
    res.send("전송완료");

})