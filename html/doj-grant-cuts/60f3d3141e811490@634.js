function _1(md){return(
md`# April 22, 2025 DOJ Grant Cuts Subawards`
)}

function _2(md){return(
md`This document shows organizations impacted by the April 22, 2025 DOJ. It shows **both** prime and subaward grantees. Click on a state to see a list of organizations impacted and the value of each prime or subaward.

The data for this visualization comes from the Council on Criminal Justice's June 2025 report, "[DOJ Funding Cuts: More Than 550 Organizations Impacted, New Analysis Finds](https://counciloncj.org/doj-funding-cuts-more-than-550-organizations-impacted-new-analysis-finds/)" and a widely circulated list of [365 impacted grants that was published by Reuters](https://www.reuters.com/data/us-department-justice-grants-targeted-termination-2025-04-24/).`
)}

function _3(md){return(
md`## Forty-nine states and territories feel the impact from DOJ's April grant terminations. `
)}

function _chart(d3,stateData,namemap,topojson,us,selectedState,$0)
{
  const color = d3.scaleLinear([0, 1], d3.schemeOrRd[9]);
  const path = d3.geoPath();
  const format = (d) => `${d}%`;
  const valuemap = new Map(stateData.map((d) => [namemap.get(d.name), d.n]));

  const counties = topojson.feature(us, us.objects.counties);
  const states = topojson.feature(us, us.objects.states);
  const statemap = new Map(states.features.map((d) => [d.id, d]));
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  const detailMap = new Map(stateData.map((d) => [d.name, d]));

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("padding", "8px")
    .style("background", "rgba(255,255,255,0.95)")
    .style("border", "1px solid #ccc")
    .style("border-radius", "4px")
    .style("pointer-events", "none")
    .style("font", "12px sans-serif")
    .style("visibility", "hidden");

  const svg = d3
    .create("svg")
    .attr("width", 975)
    .attr("height", 610)
    .attr("viewBox", [0, 0, 975, 610])
    .attr("style", "max-width: 100%; height: auto;");

  const statePaths = svg
    .append("g")
    .selectAll("path")
    .data(states.features)
    .join("path")
    .attr("fill", (d) => {
      const value = valuemap.get(d.id);
      return value == null ? "#ffffff" : color(value);
    })
    .attr("stroke", (d) => {
      const name = d.properties.name || d.properties.NAME;
      return selectedState === name ? "blue" : "#ccc";
    })
    .attr("stroke-width", (d) => {
      const name = d.properties.name || d.properties.NAME;
      return selectedState === name ? 1.5 : 1;
    })
    .attr("d", path)
    .on("click", (event, d) => {
      const name = d.properties.name || d.properties.NAME;
      if (selectedState === name) {
        $0.value = null;
      } else {
        $0.value = name;
      }
      tooltip.style("visibility", "hidden");
    })
    .on("mouseover", (event, d) => {
      const name = d.properties.name || d.properties.NAME;
      const detail = detailMap.get(name);
      tooltip
        .style("visibility", "visible")
        .html(
          detail
            ? `<strong>${name}</strong><br>${detail.n} organizations impacted`
            : `<strong>${name}</strong><br>No data`
        );
    })
    .on("mousemove", (event) => {
      tooltip
        .style("top", `${event.pageY + 10}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });

  svg
    .append("path")
    .datum(statemesh)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

  return svg.node();
}


function _5(md){return(
md`## Click on a state to see a table of results`
)}

function _selectDC(Inputs){return(
Inputs.button("Select DC")
)}

function _selectPR(Inputs){return(
Inputs.button("Select PR")
)}

function _table(Inputs,subawards,selectedState){return(
Inputs.table(
  subawards.filter((d) => selectedState == d.name),
  {
    width: {
      Organization: 500
    },
    columns: ["Organization", "City", "State", "Amount", "Status"],
    rows: 40
  }
)
)}

function _pj(table,md){return(
table[0]?.Descr
  ? md`### Click One Entry to See a Description:

<br>
### ${table[0].Organization} 
#### ${table[0].City}, ${table[0].State}
${table[0].Descr}`
  : md`Click a state, then on an entry to see the Project Description`
)}

function _download_button(DOM,button,subawards,selectedState)
{
  const div = DOM.element("div");
  const csvBtn = button(
    subawards.filter((d) => d.name == selectedState),
    "data.csv"
  );
  div.appendChild(csvBtn);
  return div;
}


function _11(md){return(
md`### Logic and dependencies`
)}

function _12(stateData,namemap){return(
stateData.map((d) => [namemap.get(d.name), d.n])
)}

function _stateData(FileAttachment){return(
FileAttachment("number of organizations cut by state@2.csv").csv({typed: true})
)}

function _selectedState(){return(
null
)}

function _15(selectPR,$0)
{
  if (selectPR > 0) {
    $0.value = "Puerto Rico";
  } else {
    $0.value = null;
  }
}


function _16(selectDC,$0)
{
  if (selectDC > 0) {
    $0.value = "District of Columbia";
  } else {
    $0.value = null;
  }
}


function _button(d3,DOM){return(
(data, filename = "data.csv") => {
  if (!data) throw new Error("Array of data required as first argument");

  let downloadData;
  if (filename.includes(".csv")) {
    downloadData = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  } else {
    downloadData = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
  }

  const size = (downloadData.size / 1024).toFixed(0);
  const button = DOM.download(
    downloadData,
    filename,
    `Download ${filename} (~${size.toLocaleString("en-US")} KB)`
  );
  return button;
}
)}

function _namemap(us){return(
new Map(
  us.objects.states.geometries.map((d) => [d.properties.name, d.id])
)
)}

function _us(FileAttachment){return(
FileAttachment("counties-albers-10m.json").json()
)}

function _subawards(FileAttachment){return(
FileAttachment("list of orgs impacted by grant cuts.csv").csv({
  typed: true
})
)}

function _21(selectedState){return(
selectedState
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["counties-albers-10m.json", {url: new URL("./files/1ec3edc43ba66c0db419744c479d1b5118bb405587189f3ad739a10853f6f933d86824e809f4b4ad18053ab33fb5dc7c5f3d6bc601654c8ea976afd5b321f517.json", import.meta.url), mimeType: "application/json", toString}],
    ["list of orgs impacted by grant cuts.csv", {url: new URL("./files/2c83d3edcad4cbad7582ea115a97cbaf391b8629bbcf035d121d4eb5435ca0229b772fea3c8d440ffc3c63e230b7b1f105ebbe42be24660b922bfc7dccdcf195.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["number of organizations cut by state@2.csv", {url: new URL("./files/e42e350b4db43ae8e2e513d78df84cd40cff5d9a5849b2b4d4fbb0b77dc00237128525e31df06c8ead641b87603d3912c1b6ad6cd7379b9212ff18d121fc78ef.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("chart")).define("chart", ["d3","stateData","namemap","topojson","us","selectedState","mutable selectedState"], _chart);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof selectDC")).define("viewof selectDC", ["Inputs"], _selectDC);
  main.variable(observer("selectDC")).define("selectDC", ["Generators", "viewof selectDC"], (G, _) => G.input(_));
  main.variable(observer("viewof selectPR")).define("viewof selectPR", ["Inputs"], _selectPR);
  main.variable(observer("selectPR")).define("selectPR", ["Generators", "viewof selectPR"], (G, _) => G.input(_));
  main.variable(observer("viewof table")).define("viewof table", ["Inputs","subawards","selectedState"], _table);
  main.variable(observer("table")).define("table", ["Generators", "viewof table"], (G, _) => G.input(_));
  main.variable(observer("pj")).define("pj", ["table","md"], _pj);
  main.variable(observer("download_button")).define("download_button", ["DOM","button","subawards","selectedState"], _download_button);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["stateData","namemap"], _12);
  main.variable(observer("stateData")).define("stateData", ["FileAttachment"], _stateData);
  main.define("initial selectedState", _selectedState);
  main.variable(observer("mutable selectedState")).define("mutable selectedState", ["Mutable", "initial selectedState"], (M, _) => new M(_));
  main.variable(observer("selectedState")).define("selectedState", ["mutable selectedState"], _ => _.generator);
  main.variable(observer()).define(["selectPR","mutable selectedState"], _15);
  main.variable(observer()).define(["selectDC","mutable selectedState"], _16);
  main.variable(observer("button")).define("button", ["d3","DOM"], _button);
  main.variable(observer("namemap")).define("namemap", ["us"], _namemap);
  main.variable(observer("us")).define("us", ["FileAttachment"], _us);
  main.variable(observer("subawards")).define("subawards", ["FileAttachment"], _subawards);
  main.variable(observer()).define(["selectedState"], _21);
  return main;
}
