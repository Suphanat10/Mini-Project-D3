d3.csv("/data/superhero_data_analysis.csv").then(function(data) {
    console.log(data);
    // สร้าง rows ของตาราง
    var rows = d3.select("#superhero-table tbody")
      .selectAll("tr")
      .data(data)
      .enter()
      .append("tr");
  
    // เพิ่มข้อมูลในแต่ละ cell ของ rows
    rows.append("td").text(function(d) { return d.Gender; });
    rows.append("td").text(function(d) { return d["Eye color"]; });
    rows.append("td").text(function(d) { return d.Race; });
    rows.append("td").text(function(d) { return d["Hair color"]; });
    rows.append("td").text(function(d) { return d.Height; });
    rows.append("td").text(function(d) { return d.Publisher; });
    rows.append("td").text(function(d) { return d["Skin color"]; });
    rows.append("td").text(function(d) { return d.Alignment; });
    rows.append("td").text(function(d) { return d.Weight; });
  });
  
  // เลือกเอเลิมเมนต์ select ที่เปลี่ยนจำนวนแถวที่แสดง
const select = d3.select('select[name="dataTable_length"]');

// เมื่อเลือกเปลี่ยนค่าใน select
select.on("change", function() {
  // ดึงค่าจำนวนแถวที่ต้องการแสดงจาก select
  const length = this.value;

  // เปลี่ยนจำนวนแถวที่แสดงในตาราง DataTables
  table.page.len(length).draw();
});
