// const margin = { top: 50, right: 50, bottom: 50, left: 50 };
// const width = 600 - margin.left - margin.right;
// const height = 400 - margin.top - margin.bottom;

// const svg = d3.select("#chart")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//   const x = d3.scaleBand().range([0, width]).padding(0.1);
// const y = d3.scaleLinear().range([height, 0]);

// // สร้าง x และ y axes
// const xAxis = d3.axisBottom(x);
// const yAxis = d3.axisLeft(y);

// // โหลดข้อมูลจากไฟล์ json
// d3.json("/data/superhero_data_analysis.json").then(function(data) {
//   // กำหนด domain ของ x และ y scales
//   x.domain(data.map(function(d) { return d.Gender; }));
//   y.domain([0, d3.max(data, function(d) { return d.Height; })]);

//   // เพิ่ม x axis และ y axis ลงใน svg element
//   svg.append("g")
//     .attr("class", "x-axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);

//   svg.append("g")
//     .attr("class", "y-axis")
//     .call(yAxis);

//   // เพิ่ม bars ลงใน svg element
//   svg.selectAll(".bar")
//     .data(data)
//     .enter().append("rect")
//     .attr("class", "bar")
//     .attr("x", function(d) { return x(d.Gender); })
//     .attr("y", function(d) { return y(d.Height); })
//     .attr("width", x.bandwidth())
//     .attr("height", function(d) { return height - y(d.Height); });

// กำหนดขนาดของกราฟและ margin
// const margin = { top: 20, right: 20, bottom: 80, left: 80 };
// const width = 600 - margin.left - margin.right;
// const height = 400 - margin.top - margin.bottom;

// // สร้าง svg element และกำหนดขนาด
// const svg = d3
//   .select("#chart")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // อ่านข้อมูลจากไฟล์ JSON
// d3.json("/data/superhero_data_analysis.json").then(function (data) {
//   // สร้าง scale สำหรับแกน x และ y
//   const xScale = d3
//     .scaleBand()
//     .range([0, width])
//     .domain(data.map((d) => d.Gender))
//     .padding(0.2);
//   const yScale = d3
//     .scaleLinear()
//     .range([height, 0])
//     .domain([0, d3.max(data, (d) => d.Weight)]);

//   // สร้างแกน x และ y โดยใช้ axis function ของ D3.js
//   const xAxis = d3.axisBottom(xScale);
//   const yAxis = d3.axisLeft(yScale);

//   svg
//     .append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(xAxis)
//     .selectAll("text")
//     .attr("transform", "rotate(-45)")
//     .attr("text-anchor", "end")
//     .attr("dx", "-0.8em")
//     .attr("dy", "0.15em");

//   svg.append("g").call(yAxis);

//   // สร้างกราฟแท่งโดยใช้ rectangle element
//   const bars = svg.selectAll("rect").data(data);
//   bars
//     .enter()
//     .append("rect")
//     .attr("x", (d) => xScale(d.Gender))
//     .attr("y", (d) => yScale(d.Weight))
//     .attr("width", xScale.bandwidth())
//     .attr("height", (d) => height - yScale(d.Weight))
//     .attr("fill", "steelblue");
// //UI
  
// });
// กำหนดขนาดของ SVG














  
                                        


































                              
