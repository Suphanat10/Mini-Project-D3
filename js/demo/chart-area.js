const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Set up the scales and axes
const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
const y = d3.scaleLinear()
    .range([height, 0]);

const xAxis = d3.axisBottom(x);

const yAxis = d3.axisLeft(y)
    .ticks(10);

svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

// Load the data from the CSV file
d3.csv("/data/").then(data => {
    // Filter the data based on the default values of the UI controls
    let filteredData = filterData(data);

    // Set up the publisher and alignment UI controls
    const publishers = [...new Set(data.map(d => d.Publisher))];
    const publisherSelect = d3.select("#publisher-select")
        .selectAll("option")
        .data(publishers)
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d);
    publisherSelect.on("change", () => {
        filteredData = filterData(data);
        updateChart(filteredData);
    });

    const alignments = [...new Set(data.map(d => d.Alignment))];
    const alignmentSelect = d3.select("#alignment-select")
    .selectAll("option")
    .data(alignments)
    .enter()
    .append("option")
    .attr("value", d => d)
    .text(d => d);
alignmentSelect.on("change", () => {
    filteredData = filterData(data);
    updateChart(filteredData);
});

// Set up the interval function to update the chart every second
d3.interval(() => {
    filteredData = filterData(data);
    updateChart(filteredData);
}, 1000);

// Define a function to filter the data based on the values of the UI controls
function filterData(data) {
    const selectedPublisher = publisherSelect.property("value");
    const selectedAlignment = alignmentSelect.property("value");
    let filteredData = data.filter(d => {
        return (!selectedPublisher || d.Publisher === selectedPublisher)
            && (!selectedAlignment || d.Alignment === selectedAlignment);
    });
    return filteredData;
}

// Define a function to update the chart with the filtered data
function updateChart(data) {
    // Calculate the height totals for each publisher and alignment
    const heightTotals = d3.rollup(data, v => d3.sum(v, d => +d.Height), d => d.Publisher, d => d.Alignment);

    // Convert the height totals into an array of objects for d3 to use
    const heightData = Array.from(heightTotals, ([publisher, alignmentMap]) => {
        const alignmentHeights = Array.from(alignmentMap, ([alignment, height]) => ({ alignment, height }));
        return { publisher, alignmentHeights };
    });

    // Set the domains of the scales
    x.domain(publishers);
    y.domain([0, d3.max(heightData, d => d3.max(d.alignmentHeights, d => d.height))]);

    // Update the x-axis
    svg.select(".x-axis")
        .call(xAxis);

    // Update the y-axis
    svg.select(".y-axis")
        .call(yAxis);

    // Update the bars
    const bars = svg.selectAll(".bar")
        .data(heightData, d => d.publisher);

    bars.exit()
        .remove();

    bars.enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(${x(d.publisher)},0)`)
        .merge(bars)
        .selectAll("rect")
        .data(d => d.alignmentHeights, d => d.alignment);

    bars.selectAll("rect")
        .transition()
        .duration(500)
        .attr("y", d => y(d.height))
        .attr("height", d => height - y(d.height));

    bars.enter()
        .append("rect")
        .attr("x", d => x.bandwidth() / 4)
        .attr("width", x.bandwidth() / 2)
        .attr("y", d => y(d.height))
        .attr("height", d => height - y(d.height));

}
});













  
                                        


































                              
