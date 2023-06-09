const mongoose = require("mongoose")

const UclLclSchema = new mongoose.Schema({
  high_weld_cur_threshold: {
    type: Number,
    required: true,
  },
  set_weld_cur_threshold: {
    type: Number,
    required: true,
  },
  low_weld_cur_threshold: {
    type: Number,
    required: true,
  },
  high_weld_volt_threshold: {
    type: Number,
    required: true,
  },
  set_weld_volt_threshold: {
    type: Number,
    required: true,
  },
  low_weld_volt_threshold: {
    type: Number,
    required: true,
  },
  high_weld_gas_threshold: {
    type: Number,
    required: true,
  },
  set_weld_gas_threshold: {
    type: Number,
    required: true,
  },
  low_weld_gas_threshold: {
    type: Number,
    required: true,
  },
})

const UclLcl = mongoose.model("Ucllcl", UclLclSchema)

module.exports = UclLcl
