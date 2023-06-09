$(document).ready(function () {
  let base_url = "http://132.145.168.100:3000"
  var high_weld_cur_threshold,
    set_weld_cur_threshold,
    low_weld_cur_threshold,
    high_weld_volt_threshold,
    set_weld_volt_threshold,
    low_weld_volt_threshold,
    high_weld_gas_threshold,
    set_weld_gas_threshold,
    low_weld_gas_threshold
  $.ajax({
    url: `${base_url}/ucllcls`,
    type: "GET",
    dataType: "json", // added data type
    async: false,
    success: function (res) {
      high_weld_cur_threshold = res[0].high_weld_cur_threshold
      set_weld_cur_threshold = res[0].set_weld_cur_threshold
      low_weld_cur_threshold = res[0].low_weld_cur_threshold
      high_weld_volt_threshold = res[0].high_weld_volt_threshold
      set_weld_volt_threshold = res[0].set_weld_volt_threshold
      low_weld_volt_threshold = res[0].low_weld_volt_threshold
      high_weld_gas_threshold = res[0].high_weld_gas_threshold
      set_weld_gas_threshold = res[0].set_weld_gas_threshold
      low_weld_gas_threshold = res[0].low_weld_gas_threshold
      // console.log(res)
    },
  })
  $("#update_threshold").submit(() => {
    let obj = {
      high_weld_cur_threshold: $("#validationCustom01").val(),
      set_weld_cur_threshold: $("#validationCustom02").val(),
      low_weld_cur_threshold: $("#validationCustom03").val(),
      high_weld_volt_threshold: $("#validationCustom04").val(),
      set_weld_volt_threshold: $("#validationCustom05").val(),
      low_weld_volt_threshold: $("#validationCustom06").val(),
      high_weld_gas_threshold: $("#validationCustom07").val(),
      set_weld_gas_threshold: $("#validationCustom08").val(),
      low_weld_gas_threshold: $("#validationCustom09").val(),
    }
    fetch(`${base_url}/ucllcl/61dde423cbab18057d64399d`, {
      method: "PATCH",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Request-Method": "*",
      },
      body: JSON.stringify(obj),
    })
  })
  $("#validationCustom01").val(high_weld_cur_threshold)
  $("#validationCustom02").val(set_weld_cur_threshold)
  $("#validationCustom03").val(low_weld_cur_threshold)
  $("#validationCustom04").val(high_weld_volt_threshold)
  $("#validationCustom05").val(set_weld_volt_threshold)
  $("#validationCustom06").val(low_weld_volt_threshold)
  $("#validationCustom07").val(high_weld_gas_threshold)
  $("#validationCustom08").val(set_weld_gas_threshold)
  $("#validationCustom09").val(low_weld_gas_threshold)
  var current = {
    series: [
      {
        name: "Current",
        data: [[Date.now(), Math.floor(0.0)]],
      },
    ],
    annotations: {
      yaxis: [
        {
          y: high_weld_cur_threshold,
          borderColor: "#ff0e0e",
          label: {
            borderColor: "#ff0e0e",
            style: {
              color: "#fff",
              background: "#ff0e0e",
            },
            text: "UCL @ " + high_weld_cur_threshold,
          },
        },
        {
          y: set_weld_cur_threshold,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              color: "#fff",
              background: "#00E396",
            },
            text: "SET @ " + set_weld_cur_threshold,
          },
        },
        {
          y: low_weld_cur_threshold,
          borderColor: "#00008b",
          label: {
            borderColor: "#00008b",
            style: {
              color: "#fff",
              background: "#00008b",
            },
            text: "LCL @ " + low_weld_cur_threshold,
          },
        },
      ],
    },
    chart: {
      id: "realtime",
      height: 250,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    // title: {
    //   text: "Machine ID: 869247043362690",
    //   align: "right",
    // },
    markers: {
      size: 0,
    },

    xaxis: {
      type: "datetime",
      range: 120000,
    },
    yaxis: {
      floating: false,
      decimalsInFloat: false,
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: false,
      },
      position: "top",
      offsetY: -28,
      offsetX: 60,
    },
  }

  var voltage = {
    series: [
      {
        name: "Voltage",
        data: [[Date.now(), Math.floor(0.0)]],
      },
      // {
      //   name: "PRE_LEACH_TANK_09",
      //   data: [[Date.now(), Math.floor(0.0)]],
      // },
    ],
    annotations: {
      yaxis: [
        {
          y: high_weld_volt_threshold,
          borderColor: "#ff0e0e",
          label: {
            borderColor: "#ff0e0e",
            style: {
              color: "#fff",
              background: "#ff0e0e",
            },
            text: "UCL @ " + high_weld_volt_threshold,
          },
        },
        {
          y: set_weld_volt_threshold,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              color: "#fff",
              background: "#00E396",
            },
            text: "SET @ " + set_weld_volt_threshold,
          },
        },
        {
          y: low_weld_volt_threshold,
          borderColor: "#00008b",
          label: {
            borderColor: "#00008b",
            style: {
              color: "#fff",
              background: "#00008b",
            },
            text: "LCL @ " + low_weld_volt_threshold,
          },
        },
      ],
    },
    chart: {
      id: "realtime",
      height: 250,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    // title: {
    //   text: "Machine ID: 869247043362690",
    //   align: "right",
    // },
    markers: {
      size: 0,
    },

    xaxis: {
      type: "datetime",
      range: 120000,
    },
    yaxis: {
      floating: false,
      decimalsInFloat: false,
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: false,
      },
      position: "top",
      offsetY: -28,
      offsetX: 60,
    },
  }

  var gas = {
    series: [
      {
        name: "rpm",
        data: [[Date.now(), Math.floor(0.0)]],
      },
    ],
    annotations: {
      yaxis: [
        {
          y: high_weld_gas_threshold,
          borderColor: "#ff0e0e",
          label: {
            borderColor: "#ff0e0e",
            style: {
              color: "#fff",
              background: "#ff0e0e",
            },
            text: "UCL @ " + high_weld_gas_threshold,
          },
        },
        {
          y: set_weld_gas_threshold,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              color: "#fff",
              background: "#00E396",
            },
            text: "SET @ " + set_weld_gas_threshold,
          },
        },
        {
          y: low_weld_gas_threshold,
          borderColor: "#00008b",
          label: {
            borderColor: "#00008b",
            style: {
              color: "#fff",
              background: "#00008b",
            },
            text: "LCL @ " + low_weld_gas_threshold,
          },
        },
      ],
    },
    chart: {
      id: "realtime",
      height: 250,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    // title: {
    //   text: "Machine ID: 869247043362690",
    //   align: "right",
    // },
    markers: {
      size: 0,
    },

    xaxis: {
      type: "datetime",
      range: 120000,
    },
    yaxis: {
      floating: false,
      decimalsInFloat: false,
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: false,
      },
      position: "top",
      offsetY: -28,
      offsetX: 60,
    },
  }

  var currentChart = new ApexCharts(
    document.querySelector("#currentID"),
    current
  )
  currentChart.render()

  var currentChart1 = new ApexCharts(
    document.querySelector("#current1ID"),
    current
  )
  currentChart1.render()

  var currentChart2 = new ApexCharts(
    document.querySelector("#current2ID"),
    current
  )
  currentChart2.render()

  var currentChart3 = new ApexCharts(
    document.querySelector("#current3ID"),
    current
  )
  currentChart3.render()

  var voltageChart = new ApexCharts(
    document.querySelector("#voltageID"),
    voltage
  )
  voltageChart.render()

  var voltageChart1 = new ApexCharts(
    document.querySelector("#voltage1ID"),
    voltage
  )
  voltageChart1.render()

  var voltageChart2 = new ApexCharts(
    document.querySelector("#voltage2ID"),
    voltage
  )
  voltageChart2.render()

  var voltageChart3 = new ApexCharts(
    document.querySelector("#voltage3ID"),
    voltage
  )
  voltageChart3.render()

  var gasChart = new ApexCharts(document.querySelector("#gasID"), gas)
  gasChart.render()

  var gasChart1 = new ApexCharts(document.querySelector("#gas1ID"), gas)
  gasChart1.render()

  var gasChart2 = new ApexCharts(document.querySelector("#gas2ID"), gas)
  gasChart2.render()

  var gasChart3 = new ApexCharts(document.querySelector("#gas3ID"), gas)
  gasChart3.render()

  function webSocketInvoke() {
    var socket = io(`${base_url}`)
    // var socket = io("http://localhost:3000")
    // $("#selectBroker").change(function () {
    //   socket.emit("B_Topic", $(this).val())
    // })
    socket.on("869247043362691", (value) => {
      currentChart.updateSeries([
        {
          data: [
            ...currentChart.w.config.series[0].data,
            [currentChart.w.globals.maxX + 1000, value.cur],
          ],
        },
      ])
      voltageChart.updateSeries([
        {
          data: [
            ...voltageChart.w.config.series[0].data,
            [voltageChart.w.globals.maxX + 1000, value.volt],
          ],
        },
      ])
      gasChart.updateSeries([
        {
          data: [
            ...gasChart.w.config.series[0].data,
            [gasChart.w.globals.maxX + 1000, value.gasFR],
          ],
        },
      ])
      document.getElementById("currID").innerHTML =
        "Current: " + value.cur + "A"
      // $("#rotationCSS")
      //   .css("width", value.cur + "%")
      //   .attr("aria-valuenow", value.cur)
      document.getElementById("volttID").innerHTML =
        "Voltage: " + value.volt + "V"
      // $("#pressureCSS")
      //   .css("width", value.volt + "%")
      //   .attr("aria-valuenow", value.volt)
      document.getElementById("gassID").innerHTML =
        "Gas: " + value.gasFR + "Imp"
      // $("#vibrationCSS")
      //   .css("width", value.rpm + "%")
      //   .attr("aria-valuenow", value.rpm)
      // document.getElementById("voltage").innerHTML = value.gasFR
      // $("#voltageCSS")
      //   .css("width", value.gasFR + "%")
      //   .attr("aria-valuenow", value.gasFR)
    })
    socket.on("869247043362692", (value) => {
      currentChart1.updateSeries([
        {
          data: [
            ...currentChart1.w.config.series[0].data,
            [currentChart1.w.globals.maxX + 1000, value.cur],
          ],
        },
      ])
      voltageChart1.updateSeries([
        {
          data: [
            ...voltageChart1.w.config.series[0].data,
            [voltageChart1.w.globals.maxX + 1000, value.volt],
          ],
        },
      ])
      gasChart1.updateSeries([
        {
          data: [
            ...gasChart1.w.config.series[0].data,
            [gasChart1.w.globals.maxX + 1000, value.gasFR],
          ],
        },
      ])
      document.getElementById("curr1ID").innerHTML =
        "Current: " + value.cur + "A"
      document.getElementById("voltt1ID").innerHTML =
        "Voltage: " + value.cur + "V"
      document.getElementById("gass1ID").innerHTML = "Gas: " + value.cur + "Imp"
    })
    socket.on("869247043362693", (value) => {
      currentChart2.updateSeries([
        {
          data: [
            ...currentChart2.w.config.series[0].data,
            [currentChart2.w.globals.maxX + 1000, value.cur],
          ],
        },
      ])
      voltageChart2.updateSeries([
        {
          data: [
            ...voltageChart2.w.config.series[0].data,
            [voltageChart2.w.globals.maxX + 1000, value.volt],
          ],
        },
      ])
      gasChart2.updateSeries([
        {
          data: [
            ...gasChart2.w.config.series[0].data,
            [gasChart2.w.globals.maxX + 1000, value.gasFR],
          ],
        },
      ])
      document.getElementById("curr2ID").innerHTML =
        "Current: " + value.cur + "A"
      document.getElementById("voltt2ID").innerHTML =
        "Voltage: " + value.volt + "V"
      document.getElementById("gass2ID").innerHTML =
        "Gas: " + value.gasFR + "Imp"
    })
    socket.on("869247043362694", (value) => {
      currentChart3.updateSeries([
        {
          data: [
            ...currentChart3.w.config.series[0].data,
            [currentChart3.w.globals.maxX + 1000, value.cur],
          ],
        },
      ])
      voltageChart3.updateSeries([
        {
          data: [
            ...voltageChart3.w.config.series[0].data,
            [voltageChart3.w.globals.maxX + 1000, value.volt],
          ],
        },
      ])
      gasChart3.updateSeries([
        {
          data: [
            ...gasChart3.w.config.series[0].data,
            [gasChart3.w.globals.maxX + 1000, value.gasFR],
          ],
        },
      ])
      document.getElementById("curr3ID").innerHTML =
        "Current: " + value.cur + "A"
      document.getElementById("voltt3ID").innerHTML =
        "Voltage: " + value.volt + "V"
      document.getElementById("gass3ID").innerHTML =
        "Gas: " + value.gasFR + "Imp"
    })
  }
  webSocketInvoke()

  $(".chartGroup").hide()
  $("#currentID").show()
  $("#voltageID").show()
  $("#gasID").show()
  $("#currID").show()
  $("#volttID").show()
  $("#gassID").show()

  $("#selectMe").change(function () {
    $(".chartGroup").hide()
    $("#current" + $(this).val()).show()
    $("#curr" + $(this).val()).show()
    $("#voltage" + $(this).val()).show()
    $("#voltt" + $(this).val()).show()
    $("#gas" + $(this).val()).show()
    $("#gass" + $(this).val()).show()
  })
})
