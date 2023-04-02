
d3.csv('/data/superhero_data_analysis.csv').then(data => {
    const hairColors = Array.from(new Set(data.map(d => d["Hair color"])));

    // Add hair color options to the UI control
    hairColors.forEach(color => {
        d3.select("#hairColor").append("option").attr("value", color).text(color);
    });

    createChart(data);
});

function createChart(data) {
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = 1300- margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#Grouped-Bar-Chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
    const x1 = d3.scaleBand().padding(0.05);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const xAxis = d3.axisBottom(x0);
    const yAxis = d3.axisLeft(y);

    x0.domain(data.map(d => d["Hair color"]));
    x1.domain(["Height", "Weight"]).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, d => Math.max(d.Height, d.Weight))]).nice();

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    const barGroups = svg.selectAll(".bar-group")
        .data(data)
        .enter().append("g")
        .attr("class", "bar-group")
        .attr("transform", d => `translate(${x0(d["Hair color"])}, 0)`);

    const bars = barGroups.selectAll(".bar")
        .data(d => ["Height", "Weight"].map(key => ({ key, value: d[key] })))
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x1(d.key))
        .attr("y", d => y(d.value))
        .attr("width", x1.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", (d, i) => i === 0 ? "#69b3a2" : "#404080");

        const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 100}, ${height - 20})`);

    //สร้าง ชื่อเเกน x
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Hair Color");

    //สร้าง ชื่อเเกน y
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Height & Weight");

    legend.selectAll("rect")
        .data(["Height", "Weight"])
        .enter().append("rect")
        .attr("x", (d, i) => i * 60+22)
        .attr("y", -480)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", (d, i) => i === 0 ? "#69b3a2" : "#404080");

    legend.selectAll("text")
        .data(["Height", "Weight"])
        .enter().append("text")
        .attr("x", (d, i) => i * 60 + 22)
        .attr("y", -500)
        .attr("dy", ".50em")
        .text(d => d);

         // Add interactivity with UI control
         d3.select("#hairColor").on("change", function () {
            const selectedHairColor = this.value;
            const filteredData = selectedHairColor === "all" ? data : data.filter(d => d["Hair color"] === selectedHairColor);

            // Update the x-axis
            x0.domain(filteredData.map(d => d["Hair color"]));
            svg.select(".x.axis").call(xAxis);

            // Update the bar groups
            const updatedBarGroups = svg.selectAll(".bar-group").data(filteredData, d => d["Hair color"]);

            updatedBarGroups.enter()
                .append("g")
                .attr("class", "bar-group")
                .attr("transform", d => `translate(${x0(d["Hair color"])}, 0)`)
                .merge(updatedBarGroups)
                .transition().duration(500)
                .attr("transform", d => `translate(${x0(d["Hair color"])}, 0)`);

            updatedBarGroups.exit()
                .transition().duration(500)
                .attr("transform", "translate(-100, 0)")
                .remove();

            // Update the bars
            const updatedBars = updatedBarGroups.selectAll(".bar")
                .data(d => ["Height", "Weight"].map(key => ({ key, value: d[key] })));

            updatedBars.enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", d => x1(d.key))
                .attr("y", height)
                .attr("width", x1.bandwidth())
                .attr("height", 0)
                .attr("fill", (d, i) => i === 0 ? "#69b3a2" : "#404080")
                .merge(updatedBars)
                .transition().duration(500)
                .attr("x", d => x1(d.key))
                .attr("y", d => y(d.value))
                .attr("width", x1.bandwidth())
                .attr("height", d => height - y(d.value));

            updatedBars.exit()
                .transition().duration(500)
                .attr("y", height)
                .attr("height", 0)
                .remove();
        });
    }


    