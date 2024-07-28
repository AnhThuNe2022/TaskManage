
function CallAjax(url, type = "POST") {
    $.ajax({
        url: url, 
        type: "POST", // Phương thức HTTP
        contentType: "application/json; charset=utf-8", // Định dạng dữ liệu gửi đi
        dataType: "json", // Định dạng dữ liệu nhận về
        data: JSON.stringify(dataToSend), // Dữ liệu gửi đi, chuyển thành JSON
        success: function (result) {
            // Xử lý kết quả trả về nếu cần
            console.log(result);
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi nếu có
            console.error(xhr.responseText);
        }
    });
}

