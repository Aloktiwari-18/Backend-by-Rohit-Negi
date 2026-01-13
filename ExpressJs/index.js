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
    }
]

app.get("/book",(req,res)=>{
    res.send(BookStore)
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



























// app.use("/about/:id",(req,res)=>{
//     res.send({"name":"ALok Tiwari",
//         "Age":21,
//         "Prefession":"Backend developer",
//         "Salary":12346454,
//         "Location":"Benguluru"
//     })

// })
// app.use("/contact",(req,res)=>{
//     res.send("I am your Contact Page")

// })
// app.use("/detail",(req,res)=>{
//     res.send("I am your Detail Page")

// })
// app.use("/user",(req,res)=>{
//     res.send("I am your user Page")

// })



// app.use("/",(req,res)=>{
//     res.send("I am your Home Page")

// })



// Parsing karni hoti hai  postman ka body dekhne k liye
// app.use(express.json());

// app.get("/user",(req,res)=>{
//     res.send({"name":"Alok Tiwari"

//     })
// })

// app.post("/user",(req,res)=>{
//     console.log(typeof req.body.age);
//     res.send("Your request has been accepted")
// })


app.listen(3000,()=>{
    console.log("Listen at port 4000")
})


//   /abou*t  => /aboufswdfsdfsdfsft bhi kaam karega * k baad kaad kuch bhi likh do koe dikkat dikkat nahi hai tab bhi access kar jayega 
//    /abou+t   => /abouuuuuuuuuuuuuuuuut
//   /abou?t     => /abot isme "u" optional hai 


