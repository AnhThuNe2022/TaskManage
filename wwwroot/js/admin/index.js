CallAjax("/Admin/GetTotalOneYear", { year: 2024 }, function (result) {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let data = [];
    for (let i = 1; i <= currentMonth; i++) {
        let check = false;
        for (let j = 0; j < result.length; j++) {
            if (result[j].month == i) {
                data.push(result[j].total);
                check = true;
            }

        }
        if (check == false) {
            data.push(0);
        }
    }
    getChartArea(data);

}, "GET");
getTotalAmountPerEmployeer($(".inputDateBar.inputFrom").val(), $(".inputDateBar.inputTo").val());
//let fromDate = new Date(2024, 1, 1).toISOString();
//let toDate = new Date(2024, 12, 1).toISOString();



$(".inputDateBar").change(function () {
    getTotalAmountPerEmployeer($(".inputDateBar.inputFrom").val(), $(".inputDateBar.inputTo").val());

});

function getTotalAmountPerEmployeer(fromDate, toDate) {
    CallAjax("/Admin/GetTotalAmountPerEmployeer", { fromDateStr: fromDate, toDateStr: toDate }, function (result) {

        let data = [];
        let label = [];
        let check = false;
        for (let j = 0; j < result.length; j++) {
            label.push(result[j].name);
            data.push(result[j].total);
        }
        getChartBar(data, label);
        getChartPie(calculatePercentage(data), label);

    }, "GET");
}
function calculatePercentage(values) {
    const total = values.reduce((acc, val) => acc + val, 0);
    const percentages = values.map(val => (val / total) * 100);
    return percentages;
}
