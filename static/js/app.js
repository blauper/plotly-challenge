function bars(sample) {
    d3.json("samples.json").then((sampdat) => {
 
        var samples = sampdat.samples;
        var array = samples.filter(sampleObj => sampleObj.id == sample);
        var result = array[0];
        var sample_values = result.sample_values;
        var sorted = sample_values.sort((a, b) => b - a);
        var otu_id = result.otu_ids;
        var hovtext = result.otu_labels;     
        var comblabs = otu_id.map(id => `OTU ${id}`);
        var ten = sorted.slice(0,10);

        var trace1 = {
            x: ten.reverse(),
            y: comblabs.reverse(),
            text: hovtext.reverse(),
            type: "bar",
            orientation: "h"
        };
         
        var data1 = [trace1]
        Plotly.newPlot("bar", data1);
      
        var trace2 = {
            x: otu_id,
            y: sample_values,
            mode: 'markers',
            text: hovtext,
            marker: {
              color: otu_id,
              size: sample_values
            }
        };
    });
}

function metdat(sample) {
    d3.json("samples.json").then((sampdat) => {
    var metadata = sampdat.metadata;
    var array = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = array[0];
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
    });
}

function init() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then(function(sampdat) {
        var sampnam = sampdat.names;
        sampnam.forEach((sample) => {
            selector
            .append("option")
            .text(sample)
            .property("value", sample)
        });
        var first = sampnam[0];
        bars(first);
        metdat(first);
    })
}

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(newSample) {
    var dropdownMenu = d3.select("#selDataset");
    var newSample = dropdownMenu.property("value");
    
    bars(newSample);
    metdat(newSample);
}
init();