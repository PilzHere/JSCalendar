"use_strict";

const appName = "JSCalendar";

const today = new Date(); // Time right now.
let currentDate = today.getDate();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();

const monthCells = [7 * 5]; // Maximum amount of cells in the month-grid.
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

/**
 * Day contains it's own date and the notes beloning to it.
 * @param {*} dayNumber
 * @param {*} monthNumber
 * @param {*} yearNumber
 * @param {*} notes
 */
function Day(dayNumber, monthNumber, yearNumber, notes) {
	this.dayNumber = dayNumber;
	this.monthNumber = monthNumber;
	this.yearNumber = yearNumber;
	this.notes = notes;

	Day.updateNotes = function (newNotes) {
		this.notes = newNotes;
	};
}

// Buttons displaying the current month.
let currentMonthButtons = [];

// Dates the user have registered.
let registeredDays = [];
let newDay = new Day(20, 11, 2020, "This is a note."); // Test
registeredDays.push(newDay);

registeredDays.forEach((day) => {
	// Test
	console.log(
		"Day: " +
			day.dayNumber +
			"\nMonth: " +
			day.monthNumber +
			"\nYear: " +
			day.yearNumber +
			"\nNotes: " +
			day.notes
	);
});

/**
 * Initializes the whole javascript web content.
 */
function initWebsite() {
	// mainWrapper element
	const mainWrapper = document.createElement("div");
	mainWrapper.tagName = "mainWrapper";
	mainWrapper.id = "mainWrapper";
	mainWrapper.innerHTML = appName;
	document.body.appendChild(mainWrapper);

	// currentDayWrapper element
	const currentDayWrapper = document.createElement("div");
	currentDayWrapper.tagName = "currentDayWrapper";
	currentDayWrapper.id = "currentDayWrapper";
	document.getElementById("mainWrapper").appendChild(currentDayWrapper);

	// selectedLabel element
	const selectedDateLabel = document.createElement("label");
	selectedDateLabel.tagName = "selectedDateLabel";
	selectedDateLabel.id = "selectedDateLabel";
	selectedDateLabel.innerHTML = "Monday 1st";
	document.getElementById("currentDayWrapper").appendChild(selectedDateLabel);

	// selectedDateTextArea element
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

	// monthWrapper element
	const monthWrapper = document.createElement("div");
	monthWrapper.tagName = "monthWrapper";
	monthWrapper.id = "monthWrapper";
	document.getElementById("mainWrapper").appendChild(monthWrapper);

	// selectedMonthLabel element
	const selectedMonthLabel = document.createElement("label");
	selectedMonthLabel.tagName = "selectedMonthLabel";
	selectedMonthLabel.id = "selectedMonthLabel";
	selectedMonthLabel.innerHTML = "June 2021";
	document.getElementById("monthWrapper").appendChild(selectedMonthLabel);

	// daysLabel element
	const daysLabel = document.createElement("label");
	daysLabel.tagName = "daysLabel";
	daysLabel.id = "daysLabel";
	daysLabel.innerHTML = "<br>Mon Tue Wed Thu Fri Sat Sun";
	document.getElementById("monthWrapper").appendChild(daysLabel);

	// weekAndMonthGrid element
	const weekAndMonthGrid = document.createElement("grid-container");
	weekAndMonthGrid.tagName = "weekAndMonthGrid";
	weekAndMonthGrid.id = "weekAndMonthGrid";
	document.getElementById("monthWrapper").appendChild(weekAndMonthGrid);

	// weekGrid element
	const weekGrid = document.createElement("grid-container");
	weekGrid.tagName = "weekGrid";
	weekGrid.id = "weekGrid";
	document.getElementById("weekAndMonthGrid").appendChild(weekGrid);

	// monthGrid element
	const monthGrid = document.createElement("grid-container");
	monthGrid.tagName = "monthGrid";
	monthGrid.id = "monthGrid";
	document.getElementById("weekAndMonthGrid").appendChild(monthGrid);

	updateMonthGrid(getDaysInMonth(today.getMonth(), today.getFullYear()));

	// monthButtonsWrapper element
	const monthButtonsWrapper = document.createElement("div");
	monthButtonsWrapper.tagName = "monthButtonsWrapper";
	monthButtonsWrapper.id = "monthButtonsWrapper";
	document.getElementById("mainWrapper").appendChild(monthButtonsWrapper);

	// btnPreviousMonth element
	const btnPreviousMonth = document.createElement("button");
	btnPreviousMonth.tagName = "btnPreviousMonth";
	btnPreviousMonth.id = "btnPreviousMonth";
	btnPreviousMonth.innerHTML = "<< Previous Month";
	btnPreviousMonth.addEventListener("click", function () {
		previousMonthEvent();
		updateWeekNumbers();
	});
	document
		.getElementById("monthButtonsWrapper")
		.appendChild(btnPreviousMonth);

	// btnNextMonth element
	const btnNextMonth = document.createElement("button");
	btnNextMonth.tagName = "btnNextMonth";
	btnNextMonth.id = "btnNextMonth";
	btnNextMonth.innerHTML = "Next Month >>";
	btnNextMonth.addEventListener("click", function () {
		nextMonthEvent();
		updateWeekNumbers();
	});
	document.getElementById("monthButtonsWrapper").appendChild(btnNextMonth);

	// Update text of selectedMonthLabel.
	selectedMonthLabel.innerHTML =
		MONTHNAMES[today.getMonth()] + " " + today.getFullYear();

	console.log("this month: " + currentMonth); // test

	currentDateDisplay ();
	displayRedWeekend();
	displayWeekNumbers();
}

/**
 * Returns the amount of days in the year and month.
 * @param {*} month
 * @param {*} year
 */
let getDaysInMonth = function (month, year) {
	return new Date(year, month, 0).getDate();
};

//console.log(getDaysInMonth(today.getMonth(), today.getFullYear())); // test

/**
 * Switches the current month to the previous.
 */
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

/**
 * Switches the current month to the next.
 */
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

	//console.log("this month: " + currentMonth); // test
}

/**
 * Updates the grid displaying the days of the month.
 * @param {*} amountOfDaysInMonth
 */
function updateMonthGrid(amountOfDaysInMonth) {
	if (document.getElementById("monthGrid").hasChildNodes) {
		for (
			let currentDay = 1;
			currentDay < oldMonthAmountOfDays + 1;
			currentDay++
		) {
			if (document.getElementById("btnDay" + currentDay) != null) {
				document.getElementById("btnDay" + currentDay).remove();

				//console.log("previous buttons: " + currentMonthButtons.length); // test
				currentMonthButtons.length = 0; // Clear the array.
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

		currentMonthButtons.push(btnDay); // Add to array of buttons.

		document.getElementById("monthGrid").appendChild(btnDay);
		//monthCells[currentDay - 1] = btnDay;
	}

	oldMonthAmountOfDays = amountOfDaysInMonth;
}

/**
 * Returns the button if containing date.
 * @param {} dayNumber
 */
function getButtonOfMonth(dayNumber) {
	for (let index = 0; index < currentMonthButtons.length; index++) {
		const btn = currentMonthButtons[index];

		if ((btn.id = "btnDay" + dayNumber)) {
			return btn;
		}
	}

	console.log("No button found in array containing date.");
}

function displayRedWeekend() {
	for (day = 0; day < 32; day++) {
		var d = new Date(2020, 11, day);
		if (d.getDay() == 1 || d.getDay() == 0) {
			try {
				var buttonId = "btnDay" + day;
				document.getElementById(buttonId).style.background = "red";
			} catch (err) {}
		}
	}

	if (document.getElementById("btnNextMonth").click) {
		setInterval(displayRedWeekend);
	}
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

// Returning week number of the date you send to the function
function getWeekNumber(d) {
	const dayInMilliseconds = 86400000; // 60 sec * 60 min * 24 hours * 1000 to get a day in ms.
	let currentDate = new Date(d);
	currentDate.setHours(0, 0, 0, 0);
	// Thursday in current week decides the year.
	currentDate.setDate(
		currentDate.getDate() + 3 - ((currentDate.getDay() + 6) % 7)
	);
	// January 4th is always in week 1.
	let week1 = new Date(currentDate.getFullYear(), 0, 4);
	// Adjust to Thursday in week 1 and count number of weeks from date to week1.,
	return (
		1 +
		Math.round(
			((currentDate.getTime() - week1.getTime()) / dayInMilliseconds -
				3 +
				((week1.getDay() + 6) % 7)) /
				7
		)
	);
}

function displayWeekNumbers() {
	var weekNumbers = [];
	var week = 1;
	for (i = 1; i < 32; i += 7) {
		weekNumbers[i] = document.createElement("h4");
		weekNumbers[i].className = "weekNumbers";
		weekNumbers[i].id = "week" + week++;
		weekNumbers[i].textContent = getWeekNumber(
			new Date(currentYear, currentMonth - 1, i)
		);
		document.getElementById("weekGrid").appendChild(weekNumbers[i]);
	}
}

function updateWeekNumbers() {
	let date = 1;
	let oneWeek = 7;
	for (i = 1; i <= 5; i++) {
		document.getElementById("week" + i).textContent = getWeekNumber(
			new Date(currentYear, currentMonth - 1, date)
		);
		date += oneWeek;
	}
}

function getDayOfTheWeek(date) {
    return new Date(date).toLocaleString("en-US", {
        weekday: "long",
    });
}

function displaySelectedDatePlan(pickedDate) { // (year, month, date)
    let date = pickedDate.getDate();
    let day = getDayOfTheWeek(pickedDate);
    let monthName = MONTHNAMES[pickedDate.getMonth()];
    let monthNumber = pickedDate.getMonth();
    let year = pickedDate.getFullYear();

    document.getElementById("selectedDateLabel").textContent =
        day + " " + date + " " + monthName;
    getAndDisplayNotes();

    function getAndDisplayNotes() {
        for (let i = 0; i < registeredDays.length; i++) {
            if (
                registeredDays[i].dayNumber === date &&
                registeredDays[i].monthNumber === monthNumber &&
                registeredDays[i].yearNumber === year
            ) {
                if (registeredDays[i].notes != null)
                    document.getElementById(
                        "selectedDateTextArea"
                    ).textContent = registeredDays[i].notes;
                break;
            }
        }
    }
}

displaySelectedDatePlan(new Date(2020, 11, 20)); // TEST TO SEE IF DAY, DATE and MONTH is changed for the selected day, And that notes shows up

function currentDateDisplay (){
	var buttonId = "btnDay" + currentDate;
    document.getElementById(buttonId).style.background = "yellow";          
}
