(async function () {
  const data = await d3.csv("/data/superhero_data_analysis.csv");

  const width = 950;
  const height = 600;
  const margin = { top: 40, right: 100, bottom: 60, left: 60 };
  const x = d3.scaleLinear()
  .domain([0, d3.max(data, d => +d.Weight)])
  .range([margin.left, width - margin.right]);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => +d.Height)])
  .range([height - margin.top, margin.bottom]);

  const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  

  const dots = svg.selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", d => x(+d.Weight))
      .attr("cy", d => y(+d.Height))
      .attr("r", 5)
      .attr("fill", d => {
        if (d.Gender === 'Male') {
            return "blue"; // สีน้ำเงินสำหรับเพศชาย
        } else if (d.Gender === 'Female') {
            return "red"; // สีแดงสำหรับเพศหญิง
        } else {
            return "gray"; // สีเทาสำหรับค่าอื่น ๆ
        }
    });

  const xAxis = d3.axisBottom(x).ticks(10);
  const yAxis = d3.axisLeft(y).ticks(10);

  svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

  svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

  const brush = d3.brush()
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
      .on("end", brushed);

  svg.append("g")
      .attr("class", "brush")
      .call(brush);

      //lสร้างชื่อให้กับแกน x และ y
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + margin.left)
      .attr("y", height - 6)
      .text("Weight (kg)");

  svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", 20)
      .attr("x", -height / 2 + margin.top)
      .text("Height (cm)");

      const legendData = [
        { label: 'Male', color: 'blue' },
        { label: 'Female', color: 'red' },
        { label: 'Other', color: 'gray' }
      ];
    
      const legend = svg.selectAll(".legend")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);
    
      legend.append("rect")
        .attr("x", width - margin.right)
        .attr("y", margin.top)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => d.color);
    
      legend.append("text")
        .attr("x", width - margin.right + 24)
        .attr("y", margin.top + 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(d => d.label);

  function brushed({selection}) {
      if (!selection) return;
      const [[x0, y0], [x1, y1]] = selection;

      dots.classed("selected", d =>
          x0 <= x(+d.Weight) && x(+d.Weight) <= x1 &&
          y0 <= y(+d.Height) && y(+d.Height) <= y1
      );
  }
  const heightSlider = d3.select("#heightSlider");
  const heightValueDisplay = d3.select("#heightValue");
  heightValueDisplay.text(`${heightSlider.property("value")} cm`);
  heightSlider.on("input", function () {
    const heightThreshold = +this.value;
    heightValueDisplay.text(`${heightThreshold} cm`);

    // Update the display of dots based on the height threshold
    dots.attr("display", d => (+d.Height >= heightThreshold) ? "block" : "none");
    
});
})();

