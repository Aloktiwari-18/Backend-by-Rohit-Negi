const express= require("express")

const app= express();
const {Auth}=require("./middleware/auth.js")

// CRUD : Create Read update Delete

// DataBase :Array

app.use(express.json())

const FoodMenu=[
    {id:1,food:"Chowmin",category:"veg",price:500},
    {id:2,food:"Butter Naan",category:"veg",price:400},
    {id:3,food:"Chhole Bhature",category:"veg",price:300},
    {id:4,food:"Dal Makhnai",category:"veg",price:200},
    {id:5,food:"Mutton",category:"Non-veg",price:1500},
    {id:6,food:"Egg Curry",category:"veg",price:200},
    {id:7,food:"Arahar Dal",category:"veg",price:100},
    {id:8,food:"Idly",category:"veg",price:400},
    {id:9,food:"Garlic Naan",category:"veg",price:100},
    {id:10,food:"Butter Chicken",category:"Non-veg",price:800},
    {id:11,food:"Panner",category:"veg",price:700},
    {id:12,food:"Maggie",category:"veg",price:100},
    {id:13,food:"Chicken",category:"Non-veg",price:600},
    {id:14,food:"Chicken Lollipop",category:"Non-veg",price:700},
]

const AddToCart=[];

app.get("/food",(req,res)=>{
    res.status(200).send(FoodMenu);
})

// Authenticate admin here

app.use("/admin",Auth)

app.post("/admin",(req,res)=>{
    
    
        FoodMenu.push(req.body);
        res.status(201).send("item Added Successfully")


    
})

app.delete("/admin/:id",(req,res)=>{
     

    
        const id=parseInt(req.params.id)
        const index= FoodMenu.findIndex(item=>item.id===id);
        if(index===-1){
            res.send("item doesn't exist")
        }else{
            FoodMenu.splice(index,1);
            res.send("Successfully Deleted")
        }
    
})

app.patch("/admin/:id",(req,res)=>{
        const id= req.body.id;
        const foodData= FoodMenu.find(item=> item.id===id);

        if(foodData){
            if(req.body.food)
                foodData.food=req.body.food
            if(req.body.category)
                foodData.category=req.body.category
            if(req.body.price)
                foodData.price=req.body.price
            res.send("Successfully updated")

    }
})

app.post("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const foodItem = FoodMenu.find(item => item.id === id);

    if (!foodItem) {
        return res.status(404).send("Item out of stock");
    }

    
    const alreadyAdded = AddToCart.find(item => item.id === id);

    if (alreadyAdded) {
        return res.status(409).send("Item already added to cart");
    }

   
    AddToCart.push(foodItem);
    res.status(200).send("Item added to your Cart Successfully");
});

app.delete("/user/:id",(req,res)=>{
    try{

    
    const id=parseInt(req.params.id);
    const index=AddToCart.findIndex(item=>item.id===id);

    if(index!=-1){
        AddToCart.splice(index, 1);
        res.end("Item removed successfully");
    }
    else{
        res.send("Item is not present in cart")
    }
  } 
  catch(err){
    res.send("Some error occured"+err);
  }

})

app.get("/user",(req,res)=>{
    if(AddToCart.length==0){
        res.send("Cart is Empty");

    }
        
    else{
        res.send(AddToCart)  ;
    }
    
})


// Error Handling from try catch block
app.get("/dummy",(req,res)=>{
    try{
        JSON.parse({"name":"Alok"})
        res.send("Hello Coder")
    }catch(err){
        res.send("Some error occured"+err);
    }
})




app.listen(3000,(req,res)=>{
   console.log("Listen at port 3000");
})
