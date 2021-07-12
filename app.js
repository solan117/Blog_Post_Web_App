const   express = require("express"),
        app = express(),
        bodyparser = require("body-parser"),
        mongoose = require("mongoose"),
        Campground = require("./models/campground");

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//schema setup



Campground.create({
    name:"battle",
    image:"https://news.wttw.com/sites/default/files/styles/full/public/field/image/CampingKelleCruzFlickrCrop.jpg?itok=MViTDefw",
    description: "Therefore, a campground consists typically of open pieces of ground where a camper can pitch a tent or park a camper. More specifically a campsite is a dedicated area set aside for camping and for which often a user fee is charged. Campsites typically feature a few (but sometimes no) improvements."
},function(err, campground){
    if(err){
        console.log(err);
    }
    else{
        console.log("campground created");
        console.log(campground);
    }
}) 


var campgrounds = [
    { name: "Battle", image: "https://news.wttw.com/sites/default/files/styles/full/public/field/image/CampingKelleCruzFlickrCrop.jpg?itok=MViTDefw" },
    { name: "Battle", image: "https://news.wttw.com/sites/default/files/styles/full/public/field/image/CampingKelleCruzFlickrCrop.jpg?itok=MViTDefw" },
    { name: "Battle", image: "https://news.wttw.com/sites/default/files/styles/full/public/field/image/CampingKelleCruzFlickrCrop.jpg?itok=MViTDefw" },
    { name: "Battle", image: "https://news.wttw.com/sites/default/files/styles/full/public/field/image/CampingKelleCruzFlickrCrop.jpg?itok=MViTDefw" },
    { name: "Battle", image: "https://news.wttw.com/sites/default/files/styles/full/public/field/image/CampingKelleCruzFlickrCrop.jpg?itok=MViTDefw" },
    { name: "Battle", image: "https://news.wttw.com/sites/default/files/styles/full/public/field/image/CampingKelleCruzFlickrCrop.jpg?itok=MViTDefw" },
    { name: "Battle", image: "https://news.wttw.com/sites/default/files/styles/full/public/field/image/CampingKelleCruzFlickrCrop.jpg?itok=MViTDefw" },
    { name: "Battle", image: "https://news.wttw.com/sites/default/files/styles/full/public/field/image/CampingKelleCruzFlickrCrop.jpg?itok=MViTDefw" }
]


app.get("/", function (req, res) {
    res.render("landing");
})



app.get("/campgrounds", function (req, res) {
  //  res.render("campgrounds", { campgrounds: campgrounds });
  //get all campgrounds

  Campground.find({},function(err,allcampgrounds){
      if(err){
          console.log(err);
      }
      else{
          res.render("campgrounds",{campgrounds:allcampgrounds});
      }
  }
)
});

app.post("/campgrounds", function (req, res) {

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description : desc };
    
    //create a new campgrounds
    Campground.create(newCampground,function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
            //console.log(name);
            //console.log(image);
        }
    })

    

    //get data from form and add to campgrounds array

    //redirect back to campgrounds page
})

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
})


//Show more info about campground
app.get("/campgrounds/:id",function(req,res){

    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{campground:foundCampground});
        }
    })
})

app.listen(3000, function () {
    console.log("Connected");
});
