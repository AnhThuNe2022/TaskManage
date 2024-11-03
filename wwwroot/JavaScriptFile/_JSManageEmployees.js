﻿var data;
$("#save").click(function () {
    var employee = {
        "address": $("#address").val(),
        "name": $("#name").val()
    }
    CallAjax("/Admin/SaveEmployee", { employee: employee }, function (result) {
        location.reload();
    });
});
function saveEmployee() {
    ShowModalLocal("modalEmployee", "yesEmployeeButton", function () {
        var employee = {
            "address": $("#address").val(),
            "name": $("#name").val()
        }
        CallAjax("/Admin/SaveEmployee", { employee: employee }, function (result) {
            location.reload();
        });
    });
}
function deleteEmployee(id) {
    if (id != "") {
        ShowModalConfirm("Bạn có chắc muốn xóa nó không?", function () {
            CallAjax("/Admin/DeleteEmployee", { id: id }, function (result) {
                location.reload();
            });
        })

    }
}
function editEmployee(id) {
    if (id != "") {
        id = id - 1;
        $("#name").val(data[id].name);
        $("#address").val(data[id].address);
        ShowModalLocal("modalEmployee", "yesEmployeeButton", function () {
            var employee = {
                "id": data[id].id,
                "address": $("#address").val(),
                "name": $("#name").val()
            }
            CallAjax("/Admin/SaveEmployee", { employee: employee }, function (result) {
                location.reload();
            });
        });
    }
}