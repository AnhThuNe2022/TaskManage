const dragItems = document.querySelectorAll(".task-detail");
const dropZones = document.querySelectorAll(".task-list");

let isDragging = false;
let offsetX, offsetY;
let currentDragItem;

// Thêm sự kiện cho từng dragItem
dragItems.forEach(dragItem => {
    dragItem.addEventListener("mousedown", (e) => {
        dragItem.style.width = dragItem.clientWidth + "px";
        isDragging = true;
        currentDragItem = dragItem; // Lưu phần tử hiện tại đang kéo
        const rect = currentDragItem.getBoundingClientRect();
        // Tính toán vị trí chuột so với phần tử
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        // Đặt vị trí tuyệt đối cho phần tử kéo
        dragItem.style.position = 'absolute';
        dragItem.style.zIndex = 100;
    });
});

// Khi di chuyển chuột
document.addEventListener("mousemove", (e) => {
    if (isDragging && currentDragItem) {
        // Di chuyển phần tử theo vị trí chuột
        currentDragItem.style.left = (e.clientX - offsetX -296) + "px";
        currentDragItem.style.top = (e.clientY - offsetY ) + "px";
        //currentDragItem.style.left = e.clientX + "px";
        //currentDragItem.style.top = e.clientY + "px";
    }
});

// Khi kết thúc kéo
document.addEventListener("mouseup", () => {
    isDragging = false;
    if ( currentDragItem) {
       
        currentDrag = currentDragItem.getBoundingClientRect();
        let elementTemp = copyElementRect(currentDragItem); 
        dropZones.forEach(dropZone => {
            if (isElementInContainer(elementTemp, dropZone)) {
                dropZone.appendChild(currentDragItem);
                console.log('Phần tử draggable nằm trong phần tử container.');
                
            } 
        });
        currentDragItem.style.position = '';
        currentDragItem.style.zIndex = 100;
    }
});


function isElementInContainer(elemRect, container) {
    var containerRect = container.getBoundingClientRect();

    return (
        elemRect.top >= containerRect.top &&
        (elemRect.left + 10) >= containerRect.left &&
        elemRect.bottom <= containerRect.bottom &&
        (elemRect.right - 10) <= containerRect.right
    );
}


function copyElementRect(elem) {
    var rect = elem.getBoundingClientRect();
    return {
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right
    };
}




function addTask(type) {
    $("#addModal").modal('show');

    $('#addModal').on('hidden.bs.modal', function (e) {
    });
    $('#confirmYesButtonAddModal').off('click').on('click', function (event) {
        event.preventDefault();
        $('#addModal').modal('hide');
    });
}

function addCategory() {
    $("#ModalCategoryAdd").modal('show');

    $('#ModalCategoryAdd').on('hidden.bs.modal', function (e) {
    });
    $('#confirmYesButtonAddModals').off('click').on('click', function (event) {
        event.preventDefault();
        $('#addModal').modal('hide');
    });
}