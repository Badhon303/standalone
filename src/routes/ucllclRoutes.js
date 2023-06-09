const express = require("express")
const ucllclModel = require("../models/ucllcl")
const app = express()

app.get("/ucllcls", async (request, response) => {
  const foods = await ucllclModel.find({})

  try {
    response.send(foods)
  } catch (error) {
    response.status(500).send(error)
  }
})

app.post("/ucllcl", async (request, response) => {
  const food = new ucllclModel(request.body)

  try {
    await food.save()
    response.send(food)
  } catch (error) {
    response.status(500).send(error)
  }
})

app.patch("/ucllcl/:id", async (request, response) => {
  try {
    await ucllclModel.findByIdAndUpdate(request.params.id, request.body)
    await ucllclModel.save()
    response.send(food)
  } catch (error) {
    response.status(500).send(error)
  }
})

module.exports = app
