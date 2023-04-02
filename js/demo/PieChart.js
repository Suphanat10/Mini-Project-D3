const margin = {top: 50, right: 50, bottom: 50, left: 50};
const width = 470- margin.left - margin.right;
const height = 470 - margin.top - margin.bottom;

// Set up the color scale
const color = d3.scaleOrdinal()
  .domain(['LightSeaGreen', 'PaleGreen', 'SpringGreen'])
  .range(['#20B2AA', '#98FB98', '#00FF7F']);

// Set up the radius of the pie chart
const radius = Math.min(width, height) / 2;

// Set up the SVG element and add it to the chart div
const svg = d3.select("#PieChart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + (margin.left + radius) + "," + (margin.top + radius) + ")");
              const legend = svg.append("g")
              .attr("class", "legend")
              .attr("transform", "translate(" + (radius + 10) + ", 0)");

// Read in the CSV data
d3.csv("/data/superhero_data_analysis.csv").then(data => {
  console.log(data);

  // Count the number of male, female, and other gendered superheroes
  const countByGender = d3.rollups(data, v => v.length, d => d.Gender || "Other");

  console.log(countByGender);

  // Set up the pie chart layout
  const pie = d3.pie()
                .value(d => d[1]);

  // Generate the arc for each slice of the pie chart
  const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

  // Add the slices to the pie chart
  const slices = svg.selectAll("path")
                    .data(pie(countByGender))
                    .enter()
                    .append("path")
                    .attr("d", arc)
                    .attr("fill", d => color(d.data[0]))
                    .attr("stroke", "white")
                    .attr("stroke-width", "2px");

//legend
const legendRectSize = 18;
const legendSpacing = 4;

const legendData = pie(countByGender);

const legendItems = legend.selectAll('.legend-item')
    .data(legendData)
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => {
        const height = legendRectSize + legendSpacing;
        const offset = height * color.domain().length +90;
        const horz = -2 * legendRectSize;
        const vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';

    });

legendItems.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', d => color(d.data[0]))

legendItems.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(d => d.data[0]);

  // Show and hide slices based on user input
  d3.select("#showMale").on("change", function() {
    if (this.checked) {
      slices.filter(d => d.data[0] === "Male")
            .attr("opacity", 1);
    } else {
        slices.filter(d => d.data[0] === "Male")
        .attr("opacity", 0);
    }});

    d3.select("#showFemale").on("change", function() {
      if (this.checked) {
        slices.filter(d => d.data[0] === "Female")
              .attr("opacity", 1);
      } else {
        slices.filter(d => d.data[0] === "Female")
              .attr("opacity", 0);
      }
    });

    d3.select("#showOther").on("change", function() {
      if (this.checked) {
        slices.filter(d => d.data[0] === "Other")
              .attr("opacity", 1);
      } else {
        slices.filter(d => d.data[0] === "Other")
              .attr("opacity", 0);
      }
    });

  });