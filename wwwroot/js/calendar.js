
const weekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthArray = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const current = new Date();
const todaysDate = current.getDate();
const currentYear = current.getFullYear();
const currentMonth = current.getMonth();

function generateCalendarDays(currentDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDaysInMonth = getTotalDaysInAMonth(year, month);
    const firstDayOfWeek = getFirstDayOfWeek(year, month);

    const calendarDays = document.querySelector(".calendar-days");
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < firstDayOfWeek; i++) {
        const li = document.createElement("li");
        fragment.appendChild(li);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
        const li = document.createElement("li");
        li.textContent = day;
        li.classList.add("calendar-day");
        if (todaysDate === day && currentMonth === month && currentYear === year) {
            li.classList.add("calendar-day-active");
        }
        fragment.appendChild(li);
    }

    calendarDays.innerHTML = '';
    calendarDays.appendChild(fragment);

    const monthYear = document.querySelector(".calendar-month-year");
    monthYear.setAttribute("data-month", month);
    monthYear.setAttribute("data-year", year);
    document.querySelector(".calendar-months").value = month;
    document.querySelector(".calendar-years").value = year;
}

function getTotalDaysInAMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
    return new Date(year, month, 1).getDay();
}

const currentDate = new Date();
generateCalendarDays(currentDate);

let calendarWeek = document.querySelector(".calendar-week");
let calendarTodayButton = document.querySelector(".calendar-today-button");
calendarTodayButton.textContent = `Today ${todaysDate}`;

calendarTodayButton.addEventListener("click", () => {
    generateCalendarDays(currentDate);
});

weekArray.forEach((week) => {
    const li = document.createElement("li");
    li.textContent = week;
    li.classList.add("calendar-week-day");
    calendarWeek.appendChild(li);
});

const calendarMonths = document.querySelector(".calendar-months");
const calendarYears = document.querySelector(".calendar-years");
const monthYear = document.querySelector(".calendar-month-year");

const selectedMonth = parseInt(monthYear.getAttribute("data-month") || 0);
const selectedYear = parseInt(monthYear.getAttribute("data-year") || 0);

monthArray.forEach((month, index) => {
    const option = document.createElement("option");
    option.textContent = month;
    option.value = index;
    option.selected = index === selectedMonth;
    calendarMonths.appendChild(option);
});

const startYear = currentYear - 60;
const endYear = currentYear + 60;
const fragment = document.createDocumentFragment();

for (let newYear = startYear; newYear <= endYear; newYear++) {
    const option = document.createElement("option");
    option.textContent = newYear;
    option.value = newYear;
    option.selected = newYear === selectedYear;
    fragment.appendChild(option);
}
calendarYears.appendChild(fragment);

document.querySelector(".calendar-left-arrow").addEventListener("click", () => {
    const month = parseInt(monthYear.getAttribute("data-month") || 0);
    const year = parseInt(monthYear.getAttribute("data-year") || 0);
    const newMonth = month === 0 ? 11 : month - 1;
    const newYear = month === 0 ? year - 1 : year;
    generateCalendarDays(new Date(newYear, newMonth, 1));
});

document.querySelector(".calendar-right-arrow").addEventListener("click", () => {
    const month = parseInt(monthYear.getAttribute("data-month") || 0);
    const year = parseInt(monthYear.getAttribute("data-year") || 0);
    const newMonth = (month + 1) % 12;
    const newYear = newMonth === 0 ? year + 1 : year;
    generateCalendarDays(new Date(newYear, newMonth, 1));
});

calendarMonths.addEventListener("change", function () {
    generateCalendarDays(new Date(calendarYears.value, calendarMonths.value, 1));
});

calendarYears.addEventListener("change", function () {
    generateCalendarDays(new Date(calendarYears.value, calendarMonths.value, 1));
});
