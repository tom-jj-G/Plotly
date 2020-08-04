// Plotly.newPlot("plotArea", [{x: [1, 2, 3], y: [10, 20, 30]}]);

// var trace = {
//     x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
//     y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//     type: "bar"
//    };
// var data = [trace];
// var layout = {
// title: "'Bar' Chart",
// xaxis: { title: "Drinks"},
// yaxis: { title: "% of Drinks Ordered"}
// };
// Plotly.newPlot("plotArea", data, layout);

// var trace = {
//     labels: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita",
//     "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
//     values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//     type: 'pie'
//    };
// var data = [trace];
// var layout = {
// title: "'Bar' Chart",
// };
// Plotly.newPlot("plotArea", data, layout);

var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse(); 
var topFiveCities = sortedCities.slice(0,5);
var topFiveCityNames = topFiveCities.map(city => city.City);
var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));
var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
  };
var data = [trace];
var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: { title: "City" },
    yaxis: { title: "Population Growth, 2016-2017"}
};
Plotly.newPlot("bar-plot", data, layout);