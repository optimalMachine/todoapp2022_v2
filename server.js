const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

//매우 중요 
//db.collection('post').insertOne() 
var db;
MongoClient.connect('mongodb+srv://admin:qwerty1234@cluster0.twazp.mongodb.net/todoapp?retryWrites=true&w=majority',{ useUnifiedTopology: true },function(err, client){
    if (err) return console.log(err);
    db = client.db('todoapp');

    app.listen(3000, ()=>{
        console.log('listening on ' + 3000);
    })
  })
app.use(express.urlencoded({extended: true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get("/write",(req,res)=>{
    res.sendFile(__dirname+"/write.html");
})

app.get("/lists",(req,res)=>{
    db.collection('post').find().toArray((err,result)=>{
        res.render("lists.ejs", {posts:result});
    })
})

app.post("/newpost",(req,res)=>{
    db.collection('counter').findOne({name:"number of posts"}, (err,result)=>{
        var totalNumber = result.totalPost;
        db.collection('post').insertOne({_id:totalNumber+1,title:req.body.title,date:req.body.date},(req,res)=>{
            console.log("update is completed");
            db.collection('counter').updateOne({name:"number of posts"},{ $inc :{totalPost:1} },(err,result)=>{
                if(err) {return console.log(err)};
            })
        });
    });

    res.sendFile(__dirname+"/write.html");
    // db.collection('post').find().toArray((err,result)=>{
    //     res.render("lists.ejs", {posts:result});
    // });
})

app.delete("/delete",(req,res)=>{
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body,(err,result)=>{
        console.log('delete complete');
        res.status(200).send({message:'delete success'});
    });
    
})
