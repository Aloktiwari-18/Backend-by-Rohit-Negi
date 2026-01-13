const express= require("express")

const app= express();

app.use(express.json());

const BookStore=[
    {
        id:1,name:"Harry Potter",author:"DevFlux"
    },
    {
        id:2,name:"Friends",author:"Vikas",
    },
    {
        id:3,name:"MindEase",author:"Alok Tiwari",
    },
    {
        id:4,name:"Peace",author:"Raman",
    },
    {
        id:5,name:" Backend Instructor",author:"Rohit Negi",
    },
     {
        id:6,name:"Egoistic",author:"Alok Tiwari",
    }
]

app.get("/book",(req,res)=>{
    console.log(req.query)
    const book=BookStore.filter(info=> info.author===req.query.author);

    res.send(book)
})


app.get("/book/:id",(req,res)=>{
      const id= parseInt(req.params.id);
      const book=BookStore.find(info=> info.id==id);
    res.send(book);
    
})

app.post("/book",(req,res)=>{
         BookStore.push(req.body);
         res.send("Data send successfully")
})

app.patch("/book",(req,res)=>{
    console.log(req.body)
    const book=BookStore.find(info=>info.id=== req.body.id)
    if(req.body.author)
    book.author=req.body.author
    if(req.body.name)
        book.name=req.body.name
    res.send("patch")
})

app.put("/book",(req,res)=>{
    const book=BookStore.find(info=> info.id===req.body.id);
    book.name= req.body.name;
    book.author=req.body.author;
    res.send("Changes request succeesfully")

})


app.delete("/book/:id",(req,res)=>{
    const id= parseInt(req.params.id)
    const index=BookStore.find(info=> info.id=== id);
    BookStore.splice(index,1);
    res.send("Successfully Deleted")
    
})
app.listen(3000,(req,res)=>{
   console.log("Listen at port 3000");
})