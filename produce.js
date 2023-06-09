const mqtt = require("mqtt")
const client = mqtt.connect(`tcp://localhost:1883`, {
  clean: true,
  connectTimeout: 3000,
  // username: 'ecu',
  // password: '1234',
  reconnectPeriod: 1000,
})

let payload = {
  type: "pData",
  data: {
    mstatus: "running",
  },
}

let topics = [
  "869247043362691",
  "869247043362692",
  "869247043362693",
  "869247043362694",
]

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

client.on("connect", () => {
  console.log("Connected")

  for (var i = 0; i < topics.length; i++) {
    try {
      client.subscribe("smartweld/test/dtb/" + `${topics[i]}`, () => {
        console.log("Subscribed to topic")
      })
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  // client.subscribe([topic], () => {
  //   console.log(`Subscribe to topic '${topic}'`)
  // })
})

client.on("error", function (error) {
  console.log("ERROR: ", error)
})

client.on("offline", function () {
  console.log("offline")
})

client.on("reconnect", function () {
  console.log("reconnect")
})

setInterval(() => {
  for (var i = 0; i < topics.length; i++) {
    payload.data.cur = getRandomArbitrary(50, 100).toFixed(2)
    payload.data.volt = getRandomArbitrary(20, 23).toFixed(2)
    // payload.data.rpm = getRandomArbitrary(2, 12).toFixed(2)
    payload.data.gasFR = getRandomArbitrary(9, 22).toFixed(2)
    client.publish(
      "smartweld/test/dtb/" + `${topics[i]}`,
      JSON.stringify(payload),
      { qos: 0, retain: false },
      (error) => {
        if (error) {
          console.error(error)
        }
      }
    )
  }
}, 1000)
