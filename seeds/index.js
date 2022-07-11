const mongoose = require("mongoose")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground")

// db connection
mongoose.connect("mongodb://localhost:27017/meetup-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/8491797",
      description:
        "Blurred soft of Audience or seminar meeting, conferences, institution, convention center, education, financial economic forum, or organization event.",
      price,
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})

// People Communicating during Meetup Coffee Break. Men and Women Chatting, Communicate, Discussing Working Issues, Share Ideas. Cartoon People Vector Illustration
