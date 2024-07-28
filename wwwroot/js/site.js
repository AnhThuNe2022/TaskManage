$(document).ready(function () {
    $('.moneyInput').on('input', function () {
        let inputVal = $(this).val();
        let formattedMoney = formatMoneyVND(inputVal);
        $(this).val(formattedMoney);
    });
    $('.moneyFormat').each(function () {
        var formattedText = formatMoneyVND($(this).text());
        $(this).text(formattedText);
    });

    //const ctx = document.getElementById('chartDoughnut');
    //new Chart(ctx, {
    //    type: 'doughnut',
    //    data: {
    //        labels: [
    //            'Red',
    //            'Blue',
    //            'Yellow'
    //        ],
    //        datasets: [{
    //            label: 'My First Dataset',
    //            data: [300, 50, 100],
    //            backgroundColor: [
    //                'rgb(255, 99, 132)',
    //                'rgb(54, 162, 235)',
    //                'rgb(255, 205, 86)'
    //            ],
    //            hoverOffset: 4
    //        }]
    //    },
    //    options: {
    //        scales: {
    //            y: {
    //                beginAtZero: true
    //            }
    //        }
    //    }
    //});

});

//==========CallAjax===========
function CallAjax(url, data,funcSuccess, type = "POST") {
    $.ajax({
        url: url, 
        data: data,
        type: type, 
        success: function (data) {
            funcSuccess(data)
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.responseJSON ? xhr.responseJSON.message : 'Lỗi không xác định';
            ShowModalAlert(errorMessage);
        }
    });
}
//==========Modal===========
function ShowModalConfirm(msg,actionYesFunc) {
    $("#confirmModal div.modal-body").text(msg);
    $("#confirmModal").modal('show');

    $('#confirmModal').on('hidden.bs.modal', function (e) {
    });
    $('#confirmYesButton').off('click').on('click', function (event) {
         event.preventDefault();
         actionYesFunc();
        $('#confirmModal').modal('hide');
    });
}
function ShowModalAlert(msg) {
    $("#alertModal div.modal-body").text(msg);
    $("#alertModal").modal('show');
}
function ShowModalLocal(modalId, buttonYesId ,actionYesFunc) {
    let modal = document.getElementById(modalId);
    let buttonYes = document.getElementById(buttonYesId);
    $(modal).modal('show');
    $(buttonYes).off('click').on('click', function (event) {
        event.preventDefault();
        actionYesFunc();
        $(modal).modal('hide');
    });
}
//==========Modal===========

function formatMoneyVND(amount) {
    if (typeof amount !== 'string') {
        amount = amount.toString();
    }
    amount = amount.replace(/\D/g, '');
    let number = parseInt(amount);
    if (isNaN(number)) {
        return null;
    }
    let formattedAmount = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedAmount;
}