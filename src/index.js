// const mqtt = require("mqtt")
const express = require("express")
const path = require("path")
var cors = require("cors")
// const axios = require("axios")
const mongoose = require("mongoose")
const ucllclRouter = require("./routes/ucllclRoutes.js")

const port = 3000
const app = express()

const staticPath = path.join(__dirname, "../public")

app.use(express.json())
app.use(
  cors({
    origin: "*",
  })
)

let payload = {
  type: "pData",
  data: {
    mstatus: "running",
  },
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

mongoose.connect(
  "mongodb+srv://badhon:asdfgh11@cluster0.srzqh.mongodb.net/UCLLCL?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err
    console.log("Connected to MongoDB!!!")
  }
)

app.use(ucllclRouter)

app.use(express.static(staticPath))
app.get("/level", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/templates/level.html"))
})

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`)
})

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
})

let topics = [
  "869247043362691",
  "869247043362692",
  "869247043362693",
  "869247043362694",
]

io.on("connection", (client) => {
  console.log("Connected", client)

  // client.on("B_Topic", (arg) => {
  // const mqtt_client = mqtt.connect(`mqtt://iot.msfmqttbroker.com:1883`, {
  // const mqtt_client = mqtt.connect(`tcp://localhost:1883`, {
  //   clean: true,
  //   connectTimeout: 3000,
  //   // username: "ecu",
  //   // password: "1234",
  //   reconnectPeriod: 1000,
  // })

  // for (var i = 0; i < topics.length; i++) {
  //   try {
  //     mqtt_client.unsubscribe("smartweld/test/dtb/" + `${topics[i]}`)
  //   } catch (err) {
  //     console.log("Error: ", err)
  //   }
  // }

  // for (var i = 0; i < topics.length; i++) {
  //   try {
  //     mqtt_client.subscribe("smartweld/test/dtb/" + `${topics[i]}`)
  //   } catch (err) {
  //     console.log("Error: ", err)
  //   }
  // }

  // mqtt_client.on("error", function (error) {
  //   console.log("ERROR: ", error)
  // })

  // mqtt_client.on("offline", function () {
  //   console.log("offline")
  // })

  // mqtt_client.on("reconnect", function () {
  //   console.log("reconnect")
  // })

  setInterval(() => {
    for (var i = 0; i < topics.length; i++) {
      payload.data.cur = getRandomArbitrary(50, 100).toFixed(2)
      payload.data.volt = getRandomArbitrary(20, 23).toFixed(2)
      // payload.data.rpm = getRandomArbitrary(2, 12).toFixed(2)
      payload.data.gasFR = getRandomArbitrary(9, 22).toFixed(2)
      try {
        // let stream = JSON.parse(payload)
        client.emit(`${topics[i]}`, payload.data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }, 1000)

  // mqtt_client.on("message", (topic, payload) => {
  //   for (var i = 0; i < topics.length; i++) {
  //     try {
  //       if (topic === "smartweld/test/dtb/" + `${topics[i]}`) {
  //         let stream = JSON.parse(payload)
  //         console.log("Received Message:", topic, stream)
  //         client.emit(`${topics[i]}`, stream.data)
  //       }
  //     } catch (err) {
  //       console.log("Error: ", err)
  //     }
  //   }
  // })

  client.on("disconnect", () => {
    // for (var i = 0; i < topics.length; i++) {
    //   try {
    //     mqtt_client.unsubscribe("smartweld/test/dtb/" + `${topics[i]}`)
    //   } catch (err) {
    //     console.log("Error: ", err)
    //   }
    // }
    console.log("Client disconnected")
  })
})
