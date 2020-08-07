// Building the subject ID number list
// And displaying demographic info for the first subject
function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    var firstSubject = sampleNames[0];
    buildMetadata(firstSubject);
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  })
}


// Initiating the data
init();


// Updating the data when another subject is selected
function optionChanged(newSample) {
  buildMetadata(newSample);
  // buildCharts(newSample);
}


// Building the demographic info
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = Object.entries(resultArray[0]);
    var resultList = []
    result.forEach(([key, value]) => {
      let resultValue = key + ": " + value;
      resultList.push(resultValue);
    });
    
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    resultList.forEach((result) => {
      PANEL.append("h6").text(result);
    });
  });
}
