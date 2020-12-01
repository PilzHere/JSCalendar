"use_strict";

const appName = "JSCalendar";

const today = new Date(); // Time right now.
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();

const monthCells = [7 * 5];
let oldMonthAmountOfDays = 0;

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHNAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function initWebsite() {
	const mainWrapper = document.createElement("div");
	mainWrapper.tagName = "mainWrapper";
	mainWrapper.id = "mainWrapper";
	mainWrapper.innerHTML = appName;
	document.body.appendChild(mainWrapper);

	const currentDayWrapper = document.createElement("div");
	currentDayWrapper.tagName = "currentDayWrapper";
	currentDayWrapper.id = "currentDayWrapper";
	document.getElementById("mainWrapper").appendChild(currentDayWrapper);

	const selectedDateLabel = document.createElement("label");
	selectedDateLabel.tagName = "selectedDateLabel";
	selectedDateLabel.id = "selectedDateLabel";
	selectedDateLabel.innerHTML = "Monday 1st";
	document.getElementById("currentDayWrapper").appendChild(selectedDateLabel);

	const selectedDateTextArea = document.createElement("textarea");
	selectedDateTextArea.tagName = "selectedDateTextArea";
	selectedDateTextArea.id = "selectedDateTextArea";
	selectedDateTextArea.rows = 7;
	selectedDateTextArea.cols = 50;
	selectedDateTextArea.placeholder =
		"Display notes for the selected date here...";
	document
		.getElementById("currentDayWrapper")
		.appendChild(selectedDateTextArea);

	const monthWrapper = document.createElement("div");
	monthWrapper.tagName = "monthWrapper";
	monthWrapper.id = "monthWrapper";
	document.getElementById("mainWrapper").appendChild(monthWrapper);

	const selectedMonthLabel = document.createElement("label");
	selectedMonthLabel.tagName = "selectedMonthLabel";
	selectedMonthLabel.id = "selectedMonthLabel";
	selectedMonthLabel.innerHTML = "June 2021";
	document.getElementById("monthWrapper").appendChild(selectedMonthLabel);

	const daysLabel = document.createElement("label");
	daysLabel.tagName = "daysLabel";
	daysLabel.id = "daysLabel";
	daysLabel.innerHTML = "<br>Mon Tue Wed Thu Fri Sat Sun";
	document.getElementById("monthWrapper").appendChild(daysLabel);

	const monthGrid = document.createElement("grid-container");
	monthGrid.tagName = "monthGrid";
	monthGrid.id = "monthGrid";
	document.getElementById("monthWrapper").appendChild(monthGrid);

	updateMonthGrid(getDaysInMonth(today.getMonth(), today.getFullYear()));

	const monthButtonsWrapper = document.createElement("div");
	monthButtonsWrapper.tagName = "monthButtonsWrapper";
	monthButtonsWrapper.id = "monthButtonsWrapper";
	document.getElementById("mainWrapper").appendChild(monthButtonsWrapper);

	const btnPreviousMonth = document.createElement("button");
	btnPreviousMonth.tagName = "btnPreviousMonth";
	btnPreviousMonth.id = "btnPreviousMonth";
	btnPreviousMonth.innerHTML = "<< Previous Month";
	btnPreviousMonth.addEventListener("click", function () {
		previousMonthEvent();
	});
	document
		.getElementById("monthButtonsWrapper")
		.appendChild(btnPreviousMonth);

	const btnNextMonth = document.createElement("button");
	btnNextMonth.tagName = "btnNextMonth";
	btnNextMonth.id = "btnNextMonth";
	btnNextMonth.innerHTML = "Next Month >>";
	btnNextMonth.addEventListener("click", function () {
		nextMonthEvent();
	});
	document.getElementById("monthButtonsWrapper").appendChild(btnNextMonth);

	selectedMonthLabel.innerHTML =
		MONTHNAMES[today.getMonth()] + " " + today.getFullYear();

	console.log("this month: " + currentMonth);
}

let getDaysInMonth = function (month, year) {
	return new Date(year, month, 0).getDate();
};

//console.log(getDaysInMonth(today.getMonth(), today.getFullYear()));

function previousMonthEvent() {
	currentMonth--;

	if (currentMonth == 0) {
		currentYear--;
		currentMonth = 12;
	}

	today.setMonth(currentMonth);
	today.setFullYear(currentYear);

	updateMonthGrid(getDaysInMonth(currentMonth, currentYear));
	selectedMonthLabel.innerHTML =
		MONTHNAMES[currentMonth - 1] + " " + currentYear;

	console.log("this month: " + currentMonth);
}

function nextMonthEvent() {
	currentMonth++;

	if (currentMonth == 13) {
		currentYear++;
		currentMonth = 1;
	}

	today.setMonth(currentMonth);
	today.setFullYear(currentYear);

	updateMonthGrid(getDaysInMonth(currentMonth, currentYear));
	selectedMonthLabel.innerHTML =
		MONTHNAMES[currentMonth - 1] + " " + currentYear;

	console.log("this month: " + currentMonth);
}

function updateMonthGrid(amountOfDaysInMonth) {
	if (document.getElementById("monthGrid").hasChildNodes) {
		for (
			let currentDay = 1;
			currentDay < oldMonthAmountOfDays + 1;
			currentDay++
		) {
			if (document.getElementById("btnDay" + currentDay) != null) {
				document.getElementById("btnDay" + currentDay).remove();
			}
		}
	}

	if (
		amountOfDaysInMonth < 28
			? (amountOfDaysInMonth = 28)
			: amountOfDaysInMonth
	);
	if (
		amountOfDaysInMonth > 31
			? (amountOfDaysInMonth = 31)
			: amountOfDaysInMonth
	);

	for (
		let currentDay = 1;
		currentDay < amountOfDaysInMonth + 1;
		currentDay++
	) {
		const btnDay = document.createElement("button");
		btnDay.tagName = "btnDay" + currentDay;
		btnDay.id = "btnDay" + currentDay;
		btnDay.innerHTML = currentDay;
		document.getElementById("monthGrid").appendChild(btnDay);
		//monthCells[currentDay - 1] = btnDay;
	}

	oldMonthAmountOfDays = amountOfDaysInMonth;
}

initWebsite();

/*
function getCurrentTime() {
	const fullDate = today.toISOString().slice(0, 10);

	document.getElementById("selectedMonth").innerHTML =
		monthNames[today.getMonth()] + " " + today.getFullYear();
}
*/

//getCurrentTime();
