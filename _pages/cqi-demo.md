---
title: CQI Demo"
layout: noheader
excerpt: "CQI Demo"
sitemap: false
permalink: cqi-demo.html
---
<style>
    html, body {
     
      margin: 0;               /* Remove default margin */
      display: flex;
      align-items: center;     /* Center vertically */
      justify-content: center; /* Center horizontally */
    }

    .responsive-div {
      max-width: 650px;       /* Limit the div to 650px width */
      width: 100%;            /* Full width on smaller screens */
      margin: 0 auto;         /* Ensure it's centered on smaller screens */
      padding: 20px;          /* Optional: Add padding inside the div */
      box-sizing: border-box; /* Include padding in width calculation */
      background-color: #fff; /* Background color of the div */
      border-radius: 8px;     /* Optional: Rounded corners */
    }
  </style>
</head>
<body>

  <div id="responsive-div"><div id="observablehq-viewof-m1-ede234bb"></div>
  <div id="observablehq-viewof-m2-ede234bb"></div>
  <div id="observablehq-viewof-m3-ede234bb"></div>
  <div id="observablehq-viewof-m4-ede234bb"></div>
  <div id="observablehq-viewof-m5-ede234bb"></div>
  <div id="observablehq-viewof-m6-ede234bb"></div>
  <div id="observablehq-viewof-m7-ede234bb"></div>
  <div id="observablehq-viewof-m8-ede234bb"></div>
  <div id="observablehq-viewof-m9-ede234bb"></div>
  <div id="observablehq-viewof-data-ede234bb"></div>
  <div id="observablehq-viewof-excel_input-ede234bb"></div>
  <div id="observablehq-chart1-ede234bb"></div>
  <div id="observablehq-summary-ede234bb"></div>
  </div>
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
  <script type="module">
  import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
  import define from "https://api.observablehq.com/d/1d7a5c177318dc8a@1296.js?v=4";
  new Runtime().module(define, name => {
    if (name === "viewof m1") return new Inspector(document.querySelector("#observablehq-viewof-m1-ede234bb"));
    if (name === "viewof m2") return new Inspector(document.querySelector("#observablehq-viewof-m2-ede234bb"));
    if (name === "viewof m3") return new Inspector(document.querySelector("#observablehq-viewof-m3-ede234bb"));
    if (name === "viewof m4") return new Inspector(document.querySelector("#observablehq-viewof-m4-ede234bb"));
    if (name === "viewof m5") return new Inspector(document.querySelector("#observablehq-viewof-m5-ede234bb"));
    if (name === "viewof m6") return new Inspector(document.querySelector("#observablehq-viewof-m6-ede234bb"));
    if (name === "viewof m7") return new Inspector(document.querySelector("#observablehq-viewof-m7-ede234bb"));
    if (name === "viewof m8") return new Inspector(document.querySelector("#observablehq-viewof-m8-ede234bb"));
    if (name === "viewof m9") return new Inspector(document.querySelector("#observablehq-viewof-m9-ede234bb"));
    if (name === "viewof data") return new Inspector(document.querySelector("#observablehq-viewof-data-ede234bb"));
    if (name === "viewof excel_input") return new Inspector(document.querySelector("#observablehq-viewof-excel_input-ede234bb"));
    if (name === "chart1") return new Inspector(document.querySelector("#observablehq-chart1-ede234bb"));
    if (name === "summary") return new Inspector(document.querySelector("#observablehq-summary-ede234bb"));
    return ["input_data","chart2","output_data","radius","xAxis","legend","angle","highlight","arc","arc_need"].includes(name);
  });
  </script>