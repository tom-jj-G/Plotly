// Building the subject ID number list
// And displaying demographic info for the first subject
function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    var firstSubject = sampleNames[0];
    buildMetadata(firstSubject);
    buildCharts(firstSubject);
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
  buildCharts(newSample);
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


// Building the charts
function buildCharts(sample) {
  console.log("buildCharts");
  d3.json("samples.json").then((data) => {
    console.log(`sample: ${sample}`);
    // Filter the samples data to match the targetted sample
    var sampleData = data.samples.filter(samples => samples.id == sample);
    // Retrieve the top 10 otu_ids 
    var top10Otu_idsArray = sampleData.map(data => data.otu_ids.slice(0, 10))[0];
    // Retrieve the top 10 sample_values
    var top10OSample_valuesArray = sampleData.map(data => data.sample_values.slice(0,10))[0];
    // Retrieve the top 10 otu_labels
    var top10Otu_labelsArray = sampleData.map(data => data.otu_labels.slice(0,10))[0];
    //Create bar chart
    createBarChart(top10Otu_idsArray,top10OSample_valuesArray,top10Otu_labelsArray);
  });
}

function createBarChart(data1 ,data2, data3) {
  // Formatting the otu_ids data
  let top10Otu_idsArrayCoded = []
  data1.reverse().forEach(data => {
    let otu = 'OTU ' + data;
    top10Otu_idsArrayCoded.push(otu);
  });
  // Building the plot
  var trace = {
    y: top10Otu_idsArrayCoded,
    x: data2.reverse(),
    text: data3.reverse(),
    type: "bar",
    orientation: 'h'
  };
  Plotly.newPlot("bar", [trace]);
}


