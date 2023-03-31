
const margin = { top: 20, right: 20, bottom: 70, left: 70 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

 // สร้าง SVG element
 const svg = d3.select("#chart")
             .append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 // อ่านข้อมูลจากไฟล์ CSV
 d3.csv("/data/superhero_data_analysis.csv").then(function(data) {
  console.log(data);

     // กำหนด Scale สำหรับแกน x
     const xScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d => +d.Height)]) // ใช้ความสูงสูงสุดเป็น domain
                     .range([0, width]);

     // กำหนด Scale สำหรับแกน y
     const yScale = d3.scaleBand()
                     .domain(data.map(d => d["Eye color"])) // ใช้ Eye color เป็น domain
                     .range([0, height ])
                     .padding(0.1);

     // สร้างแท่งสำหรับแต่ละข้อมูล
    
     const colors = [ "	#778899", "#B0C4DE" , "#FF6347"];
     const bars = svg.selectAll("rect")
                     .data(data)
                     .enter()
                     .append("rect")
                     .attr("x", 0)
                     .attr("y", d => yScale(d["Eye color"]))
                     .attr("width", d => xScale(+d.Height))
                     .attr("height", yScale.bandwidth())
                     .attr("fill", (d, i) => colors[i % colors.length]);
 
     // เพิ่มแกน x
     const xAxis = d3.axisBottom(xScale);
     svg.append("g")
         .attr("transform", "translate(0, " + (height-0 ) + ")")
         .call(xAxis);

     // เพิ่มแกน y
     const yAxis = d3.axisLeft(yScale);
     svg.append("g")
         .attr("transform", "translate")
         .call(yAxis);


         const legend = svg.append("g")
                  .attr("class", "legend")
                  .attr("transform", "translate(" + (width + margin.right - 100) + "," + margin.top + ")")
                  .selectAll("g")
                  .data(colors)
                  .enter().append("g");

legend.append("rect")
      .attr("y", function(d, i) { return i * 20; })
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", function(d) { return d; });

legend.append("text")
      .attr("x", 24)
      .attr("y", function(d, i) { return i * 20 +9; })
      .attr("dy", ".1.5em")
      .text(function(d, i) {
          switch (i) {
              case 0: return "Height < 200";
              case 1: return "200<= Height < 300";
              case 2: return "Height >= 300";
          }
      });
 });

