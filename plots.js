// Building the subject ID number list
// And displaying demographic info for the first subject
function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
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
  d3.json("samples.json").then((data) => {
    // Getting the weekly washing frequency of the individual
    var SubjectWF = data.metadata.filter(person => person.id == sample).map(person => person.wfreq)[0];

    // Filter the samples data of the individual
    var sampleData = data.samples.filter(samples => samples.id == sample);

    // Retrieve the top 10 otu_ids 
    var top10Otu_idsArray = sampleData.map(data => data.otu_ids.slice(0, 10))[0];
    // Retrieve all otu_ids 
    var allOtu_idsArray = sampleData.map(data => data.otu_ids)[0];

    // Retrieve the top 10 sample_values
    var top10OSample_valuesArray = sampleData.map(data => data.sample_values.slice(0,10))[0];
    // Retrieve all sample_values
    var allSample_valuesArray = sampleData.map(data => data.sample_values)[0];

    // Retrieve the top 10 otu_labels
    var top10Otu_labelsArray = sampleData.map(data => data.otu_labels.slice(0,10))[0];
    // Retrieve all otu_labels
    var allOtu_labelsArray = sampleData.map(data => data.otu_labels)[0];

    //Create the bar chart
    createBarChart(top10Otu_idsArray,top10OSample_valuesArray,top10Otu_labelsArray);
    //Create the bubble chart
    createBubbleChart(allOtu_idsArray,allSample_valuesArray,allOtu_labelsArray);
    //Create the gauge chart
    createGaugeChart(SubjectWF);
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

  var layout = {
    title: "Top ten bacterial species in a volunteer’s navel",
    showlegend: false,
    xaxis: {
      title: {
        text: "Occurence"
      }
    }
  };

  Plotly.newPlot("bar", [trace], layout);
}


function createBubbleChart(data1 ,data2, data3) {
  var trace = {
    x: data1,
    y: data2,
    mode: 'markers',
    marker: {
      size: data2,
      color: data1 
    },
    text: data3
  };

  var layout = {
    title: "Relative frequency of all the bacterial species found in the volunteer’s navel",
    showlegend: false,
    yaxis: {
      title: {
        text: "Occurence"
      }
    },
    xaxis: {
      title: {
        text: "OTU ID"
      }
    }
  };
  
  Plotly.newPlot('bubble', [trace], layout);
}


function createGaugeChart(weeklyWashingFrequency) {
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: weeklyWashingFrequency,
      title: { text: "Belly Button Washing Ferquency" + "<br>" + "(Scrubs per Week)"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { 
          tickmode: "array",
          tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          ticktext: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6','6-7','7-8','8-9'],
          tickwidth: 2,
          range:[0,9]
        },
        bar: { color: "red" },
        steps: [
          { range: [0, 1], color: "GhostWhite"},
          { range: [1, 2], color: "Ivory" },
          { range: [2, 3], color: "Khaki" },
          { range: [3, 4], color: "Wheat" },
          { range: [4, 5], color: "PaleGreen" },
          { range: [5, 6], color: "LimeGreen" },
          { range: [6, 7], color: "MediumSeaGreen" },
          { range: [7, 8], color: "SeaGreen" },
          { range: [8, 9], color: "Green" }
        ]
      }
    }
  ];
  
  Plotly.newPlot('gauge', data);
}
