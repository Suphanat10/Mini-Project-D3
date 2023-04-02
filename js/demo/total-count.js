d3.csv("/data/superhero_data_analysis.csv").then(data => {
    // นับจำนวนแถวของข้อมูล
    const totalCount = data.length;

    // แสดงผลจำนวนแถวของข้อมูลบนหน้า HTML
    d3.select("#total-count").text(totalCount);

    // ... โค้ดอื่น ๆ สำหรับการสร้างและปรับปรุงกราฟ
});

