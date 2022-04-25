const express=require("express");
const cors=require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port=process.env.PORT || 5000;
const app=express();


// midleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ic55p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       await client.connect();
       const productCollection=client.db('emaJhon').collection('product');
       
       app.get('/product',async(req,res)=>{
           console.log('query',req.query);
           const query={};
           const page=parseInt(req.query.page);
           const size=parseInt(req.query.size)
           const cursor=productCollection.find(query);
           let products;
           if(page || size){
            products=await cursor.skip(page*size).limit(size).toArray();
            
           }else{
            products=await cursor.toArray();

           }
           res.send(products);
       });
       app.get('/productCount',async(req,res)=>{
           const query={};
           const cursor =productCollection.find(query);
           const count =await productCollection.estimatedDocumentCount();
           res.send({count});
       })
    }
    finally{

    }
}
run().catch(console.div)


app.get('/',(req,res)=>{
    res.send('amm is waiting for jhon');
});

app.listen(port,()=>{
    console.log('jhon is rruning in port',port);
});
