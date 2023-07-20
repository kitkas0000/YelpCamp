const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "64b0c16345e9004472d9b420",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex labore quaerat nihil corporis adipisci odio repellat dolore deleniti alias laudantium eaque possimus voluptas officia, cupiditate, tenetur facilis quod non cumque?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dhfbpluqt/image/upload/v1689421206/YelpCamp/msbprxfhgcosaiseoydg.jpg",
          filename: "YelpCamp/msbprxfhgcosaiseoydg",
        },
        {
          url: "https://res.cloudinary.com/dhfbpluqt/image/upload/v1689421214/YelpCamp/algzqqtgzuzxpcvqrcdr.jpg",
          filename: "YelpCamp/algzqqtgzuzxpcvqrcdr",
        },
        {
          url: "https://res.cloudinary.com/dhfbpluqt/image/upload/v1689421225/YelpCamp/b04fl58x2qnyxgw9ln8z.jpg",
          filename: "YelpCamp/b04fl58x2qnyxgw9ln8z",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
