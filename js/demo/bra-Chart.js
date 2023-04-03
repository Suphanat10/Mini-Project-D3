const margin = {top: 20, right: 20, bottom: 30, left: 40};
const width = 1050- margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;


const svg = d3.select("#chart-1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
const y = d3.scaleLinear().rangeRound([height, 0]);

d3.csv("/data/superhero_data_analysis.csv").then(data => {
    data = data.filter(d => d["Eye color"] !== "-");

    updateChart(data);
    d3.select("#gender-select").on("change", () => {
        const selectedGender = d3.select("#gender-select").node().value;
        let filteredData = data;
        if (selectedGender !== "All") {
            filteredData = data.filter(d => d["Gender"] === selectedGender);
        }
        updateChart(filteredData);
    });
});






function updateChart(data) {
    const eyeColorCounts = d3.rollup(data, v => v.length, d => d["Eye color"]);
    const eyeColorData = Array.from(eyeColorCounts, ([key, value]) => ({key, value}));
    // const color = d3.scaleOrdinal(d3.schemeCategory10);

    x.domain(eyeColorData.map(d => d.key));
   
    y.domain([0, d3.max(eyeColorData, d => d.value)]);

    svg.selectAll("g").remove();
    
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(10);
    
    const bars = svg.append("g")
    .selectAll("rect")
    .data(eyeColorData)
    .join("rect")
    .attr("x", d => x(d.key))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", "#9370DB");
    
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
    
    svg.append("g")
    .call(yAxis)
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 10)
    .attr("dy", "0.81em")
    .attr("text-anchor", "end")
    .text("Number of Superheroes");
    

    bars.on("mouseover", (event, d) => {
    d3.select(event.currentTarget)
    .attr("fill", "#FFA500");
    })
    .on("mouseout", (event, d) => {
    d3.select(event.currentTarget)
    .attr("fill", "#9370DB");
    });


    }




