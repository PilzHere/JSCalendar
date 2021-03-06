"use_strict";

const appName = "JSCalendar";

const today = new Date(); // Time right now.
let currentDate = today.getDate();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();

const maximumAmountOfButtons = [7 * 6]; // Maximum amount of cells in the month-grid.
let oldMonthAmountOfDays = 0;

var saveNoteColor = "rgb(99, 99, 212)";

// Sunday is twice for getting day-names correctly...
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

// Buttons displaying the current month.
let currentMonthButtons = [maximumAmountOfButtons];


/**
 * Initializes the whole javascript web content.
 */
function initWebsite() {
    // mainWrapper element
    const mainWrapper = document.createElement("div");
    mainWrapper.tagName = "mainWrapper";
    mainWrapper.id = "mainWrapper";
    mainWrapper.innerHTML = "<span id='appName'>" + appName + "<span>";
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
    selectedDateTextArea.rows = 15;
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

    // currentMonthLabelAndButtons element
    const currentMonthLabelAndButtons = document.createElement("div");
    currentMonthLabelAndButtons.tagName = "currentMonthLabelAndButtons";
    currentMonthLabelAndButtons.id = "currentMonthLabelAndButtons";
    document
        .getElementById("monthWrapper")
        .appendChild(currentMonthLabelAndButtons);

    // btnPreviousMonth element
    const btnPreviousMonth = document.createElement("button");
    btnPreviousMonth.tagName = "btnPreviousMonth";
    btnPreviousMonth.id = "btnPreviousMonth";
    btnPreviousMonth.innerHTML = "<"; //Previous Month
    btnPreviousMonth.addEventListener("click", function () {
        previousMonthEvent();
        updateWeekNumbers();
    });
    document
        .getElementById("currentMonthLabelAndButtons")
        .appendChild(btnPreviousMonth);

    // selectedMonthAndYearDiv element
    const selectedMonthAndYearDiv = document.createElement("div");
    selectedMonthAndYearDiv.tagName = "selectedMonthAndYearDiv";
    selectedMonthAndYearDiv.id = "selectedMonthAndYearDiv";
    document
        .getElementById("currentMonthLabelAndButtons")
        .appendChild(selectedMonthAndYearDiv);

    // Month drop down element
    const monthDropDown = document.createElement("select");
    monthDropDown.tagName = "monthDropDown";
    monthDropDown.id = "monthDropDown";
    monthDropDown.addEventListener("change", function () {
        monthDropDownEvent();
    });
    document
        .getElementById("selectedMonthAndYearDiv")
        .appendChild(monthDropDown);
    selected = document.getElementById("monthDropDown");
    for (let i = 0; i < MONTHNAMES.length; i++) {
        var opt = document.createElement("option");
        opt.value = MONTHNAMES[i];
        opt.innerHTML = MONTHNAMES[i];
        monthDropDown.appendChild(opt);
    }
    //fix the initial value of month drop down
    selected.value = MONTHNAMES[new Date().getMonth()];

    // year drop down element
    const yearDropDown = document.createElement("select");
    yearDropDown.tagName = "yearDropDown";
    yearDropDown.id = "yearDropDown";
    yearDropDown.addEventListener("change", function () {
        yearDropDownEvent();
    });
    document
        .getElementById("selectedMonthAndYearDiv")
        .appendChild(yearDropDown);
    (min = 1985),
        (max = 2041),
        (select = document.getElementById("yearDropDown"));
    for (var i = min; i <= max; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = i;
        yearDropDown.appendChild(opt);
    }
    //fix the initial value of year drop down
    select.value = new Date().getFullYear();

    // btnNextMonth element
    const btnNextMonth = document.createElement("button");
    btnNextMonth.tagName = "btnNextMonth";
    btnNextMonth.id = "btnNextMonth";
    btnNextMonth.innerHTML = ">"; // next month
    btnNextMonth.addEventListener("click", function () {
        nextMonthEvent();
        updateWeekNumbers();
    });
    document
        .getElementById("currentMonthLabelAndButtons")
        .appendChild(btnNextMonth);

    // divDaysLabel element
    const divDaysLabel = document.createElement("grid-container");
    divDaysLabel.tagName = "divDaysLabel";
    divDaysLabel.id = "divDaysLabel";
    document.getElementById("monthWrapper").appendChild(divDaysLabel);

    // daysLabel element
    const daysLabel = document.createElement("label");
    daysLabel.tagName = "daysLabel";
    daysLabel.id = "daysLabel";
    daysLabel.innerHTML =
        "<span>#</span> <span>Mon</span> <span>Tue</span> <span>Wed</span> <span>Thu</span> <span>Fri</span> <span>Sat</span> <span>Sun</span>";
    document.getElementById("divDaysLabel").appendChild(daysLabel);

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

    // Temp: To show disabled buttons in init.
    nextMonthEvent();
    previousMonthEvent();
    // Temp end.

    displayWeekNumbers();
    currentDateDisplay();
    displayRedWeekend();
}

/**
 * Returns the amount of days in the year and month.
 * @param {*} month
 * @param {*} year
 */
let getDaysInMonth = function (month, year) {
	return new Date(year, month, 0).getDate();
};

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

	removeDisabledButtons();
	featureCalendarDisplay();

	updateMonthGrid(getDaysInMonth(currentMonth, currentYear));
	selected.value = MONTHNAMES[currentMonth - 1];

	select.value = currentYear;
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

	removeDisabledButtons();
	featureCalendarDisplay();

	updateMonthGrid(getDaysInMonth(currentMonth, currentYear));
	selected.value = MONTHNAMES[currentMonth - 1];

	select.value = currentYear;
}

/**
 * Adds disabled buttons.
 */
function addDisabledButtonToMonthGrid() {
	const btnDay = document.createElement("button");
	btnDay.tagName = "btnDayNone";
	btnDay.id = "btnDayNone";
	btnDay.className = "btnDayNone";
	btnDay.innerHTML = "";
	btnDay.disabled = true;

	currentMonthButtons.unshift(btnDay);

	document.getElementById("monthGrid").appendChild(btnDay);
}

/**
 * Removes disabled buttons.
 */
function removeDisabledButtons() {
	for (let i = 0; i < 7; i++) {
		if (document.getElementById("btnDayNone") != null) {
			document.getElementById("btnDayNone").remove();
		}
	}
}

/**
 * Displays the buttons like a real calendar.
 */
function featureCalendarDisplay() {
	let firstDay = new Date(currentYear, currentMonth - 1, 1);
	let firstDayName = WEEKDAYS[firstDay.getDay()];

	switch (firstDayName) {
		case "Sun":
			for (i = WEEKDAYS.indexOf("Sat"); i > 0; i--) {
				addDisabledButtonToMonthGrid();
			}
			break;
		case "Sat":
			for (i = WEEKDAYS.indexOf("Fri"); i > 0; i--) {
				addDisabledButtonToMonthGrid();
			}
			break;
		case "Fri":
			for (i = WEEKDAYS.indexOf("Thu"); i > 0; i--) {
				addDisabledButtonToMonthGrid();
			}
			break;
		case "Thu":
			for (i = WEEKDAYS.indexOf("Wed"); i > 0; i--) {
				addDisabledButtonToMonthGrid();
			}
			break;
		case "Wed":
			for (i = WEEKDAYS.indexOf("Tue"); i > 0; i--) {
				addDisabledButtonToMonthGrid();
			}
			break;
		case "Tue":
			for (i = WEEKDAYS.indexOf("Mon"); i > 0; i--) {
				addDisabledButtonToMonthGrid();
			}
			break;
	}
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

				currentMonthButtons.length = 0; // Clear the array.
				currentMonthButtons.length = maximumAmountOfButtons;
			}
		}
	}

	// Making sure days stay in normal range.
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
		btnDay.className = "btnDay";
		btnDay.innerHTML = currentDay;

		currentMonthButtons.push(btnDay); // Add to array of buttons.

		document.getElementById("monthGrid").appendChild(btnDay);
		//monthCells[currentDay - 1] = btnDay;
	}

	oldMonthAmountOfDays = amountOfDaysInMonth;
	currentDateDisplay();
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
}

function displayRedWeekend() {
	// Gets the month and year from ID="monthDropDown"
	let selectedMonth = document.getElementById("monthDropDown").value;
	let selectedYear = currentYear;

	document
		.getElementById("btnNextMonth")
		.addEventListener("click", displayRedWeekend);
	document
		.getElementById("btnPreviousMonth")
		.addEventListener("click", displayRedWeekend);

	let monthNum = 0;
	switch (selectedMonth) {
		case MONTHNAMES[0]:
			monthNum = 0; // January
			break;
		case MONTHNAMES[1]:
			monthNum = 1; // February
			break;
		case MONTHNAMES[2]:
			monthNum = 2; // Mars etc....
			break;
		case MONTHNAMES[3]:
			monthNum = 3;
			break;
		case MONTHNAMES[4]:
			monthNum = 4;
			break;
		case MONTHNAMES[5]:
			monthNum = 5;
			break;
		case MONTHNAMES[6]:
			monthNum = 6;
			break;
		case MONTHNAMES[7]:
			monthNum = 7;
			break;
		case MONTHNAMES[8]:
			monthNum = 8;
			break;
		case MONTHNAMES[9]:
			monthNum = 9;
			break;
		case MONTHNAMES[10]:
			monthNum = 10;
			break;
		case MONTHNAMES[11]:
			monthNum = 11;
			break;
	}
	for (day = 0; day < 32; day++) {
		var d = new Date(selectedYear, monthNum, day);
		if (d.getDay() == 6 || d.getDay() == 0) {
			try {
				var buttonId = "btnDay" + day;
				document.getElementById(buttonId).style.color = "#f05454";
			} catch (err) {}
		}
	}
	currentDateDisplay();
}

/**
 * Returning week number of the date you send to the function
 * Receives Date object as parameter
 */
function getWeekNumber(d) {
	const dayInMilliseconds = 86400000; // 60 sec * 60 min * 24 hours * 1000 to get a day in ms.
	//Creates a new date object, to not disturb the original object.
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

/**
 * Function displays week numbers for the month on calendar.
 */
function displayWeekNumbers() {
	let weekNumbers = [];
	let week = 1;
	let dateBoxes = 42;
	for (i = 1; i < dateBoxes; i += 7) {
		weekNumbers[i] = document.createElement("h4");
		weekNumbers[i].className = "weekNumbers";
		weekNumbers[i].id = "week" + week++;
		weekNumbers[i].textContent = getWeekNumber(
			new Date(currentYear, currentMonth - 1, i)
		);
		document.getElementById("weekGrid").appendChild(weekNumbers[i]);
	}
}

/**
 * Function updates the week numbers.
 */
function updateWeekNumbers() {
	let date = 1;
	let oneWeek = 7;
	for (i = 1; i <= 6; i++) {
		document.getElementById("week" + i).textContent = getWeekNumber(
			new Date(currentYear, currentMonth - 1, date)
		);
		date += oneWeek;
	}
}

/**
 * Function get the day of the week for a specific date.
 * Takes an Date object as parameter
 */
function getDayOfTheWeek(date) {
	return new Date(date).toLocaleString("en-US", {
		weekday: "long",
	});
}

/**
 * Function takes an Date object as parameter and then shows it on the webpage.
 */
function displaySelectedDatePlan(pickedDate) {
	let date = pickedDate.getDate();
	let day = getDayOfTheWeek(pickedDate);
	let monthName = MONTHNAMES[pickedDate.getMonth()];

	document.getElementById("selectedDateLabel").textContent =
		day + " " + date + " " + monthName;
}

/**
 * Function highlights todays date with green color
 */
function currentDateDisplay() {
	let todaysDate = new Date();
	if (
		currentMonth - 1 == todaysDate.getMonth() &&
		currentYear == todaysDate.getFullYear()
	) {
		var buttonId = "btnDay" + currentDate;
		document.getElementById(buttonId).style.color = "rgb(0, 173, 0)";
	}
}

initWebsite();
displaySelectedDatePlan(new Date()); // Starts with showing todays date
// monthArray saves the daybuttons to each month
const monthArray = {
	January: {},
	February: {},
	March: {},
	April: {},
	May: {},
	June: {},
	July: {},
	August: {},
	September: {},
	October: {},
	November: {},
	December: {},
};
const years = {};
const dayArray = {};

function returnMonth(monthString) {
	switch (monthString) {
		case "January":
			return 0; // January
		case "February":
			return 1; // February
		case "March":
			return 2; // Mars etc....
		case "April":
			return 3;
		case "May":
			return 4;
		case "June":
			return 5;
		case "July":
			return 6;
		case "August":
			return 7;
		case "September":
			return 8;
		case "October":
			return 9;
		case "November":
			return 10;
		case "December":
			return 11;
	}
}

var storeDateNotes = {};
function saveNote() {
    let noteText = document.getElementById("selectedDateTextArea");

    // Splits year and month so you can use the separately
    let selectedYear = document.getElementById("yearDropDown").value;
    let selectedMonth = document.getElementById("monthDropDown").value;
    for (let dayNum = 1; dayNum < 32; dayNum++) {
        let currentYMD =
            selectedYear + ":" + returnMonth(selectedMonth) + ":" + dayNum;
        if (storeDateNotes[currentYMD]) {
            let dayButton = document.getElementById("btnDay" + dayNum);
            dayButton.style.color = saveNoteColor;
        }
    }

    try {
        for (let button = 1; button < 32; button++) {
            dayArray["btnDay" + button];
            // ID of buttons
            let dayButton = document.getElementById("btnDay" + button);
            if (selectedMonth != monthArray[selectedMonth]) {
                monthArray[selectedMonth] = dayArray;
            }

            if (years[selectedYear]) {
                if (monthArray[selectedMonth]) {
                    if (dayArray[dayButton.id] != "Add a note:") {
                        dayButton.style.color = saveNoteColor;
                    }
                }
            }

            // Text of textfield
            noteText.value = "";
            // This removes a note that has been made if button is double clicked
            dayButton.addEventListener("dblclick", function () {
                if (dayButton.style.color == saveNoteColor) {
                    getNum = dayButton.id.replace(/^\D+/g, "");
                    let currentYMD =
                        selectedYear +
                        ":" +
                        returnMonth(selectedMonth) +
                        ":" +
                        getNum;
                    storeDateNotes[currentYMD] = "";
                    noteText.value = "";
                    noteText.placeholder =
                        "Display notes for the selected date here...";
                    dayButton.style.color = "black";
                }
            });
            // If btnDay1-btnDay31 is clicked this activates
            dayButton.addEventListener("click", function () {
                // Show the selected date at the top after clicking button
                // Extract the date number from dayButton id
                let date = dayButton.id.match(/\d+/)[0];
                displaySelectedDatePlan(
                    new Date(selectedYear, returnMonth(selectedMonth), date)
                );
                // If a note has been saved this displays it
                if (dayButton.style.color == saveNoteColor) {
                    noteText.placeholder = dayArray[dayButton.id];
                }
                // dayButton.id = btnDay
                // dayArray[dayButton.id] = texten "Add a note:"

                // Clicking button after writing something saves it
                if (
                    noteText.value.length != 0 &&
                    dayButton.style.color != saveNoteColor
                ) {
                    // Saves note to array. Write saved then resets after 1 second
                    dayArray[dayButton.id] = noteText.value;
                    // Change color of button that has saved note
                    dayButton.style.color = saveNoteColor;
                    noteText.placeholder = "Note saved";
                    setTimeout(function () {
                        noteText.value = "";
                    }, 1000);

                    getNum = dayButton.id.replace(/^\D+/g, "");
                    let date = new Date(
                        selectedYear,
                        returnMonth(selectedMonth),
                        getNum
                    );
                    let numDate =
                        date.getFullYear() +
                        ":" +
                        date.getMonth() +
                        ":" +
                        getNum;
                    storeDateNotes[numDate] = dayArray[dayButton.id];
                }

                // If a button has no note the default placeholder is shown
                if (dayButton.style.color != saveNoteColor) {
                    noteText.placeholder =
                        "Display notes for the selected date here...";
                }
            });
        }
    } catch (err) {}

    // Updates the month and year everytime month changes
    document.getElementById("btnNextMonth").addEventListener("click", saveNote);
    document
        .getElementById("btnPreviousMonth")
        .addEventListener("click", saveNote);
}

saveNote();

// year Drop down selection function
function yearDropDownEvent() {
	var x = document.getElementById("yearDropDown").value;
	currentYear = x;
	today.setMonth(currentMonth);
	today.setFullYear(currentYear);

	removeDisabledButtons();
	featureCalendarDisplay();

	updateMonthGrid(getDaysInMonth(currentMonth, currentYear));

	displayRedWeekend();

	updateWeekNumbers();
	saveNote();
}
// month drop down selection function
function monthDropDownEvent() {
	var dropDownMonth = document.getElementById("monthDropDown").value;
	currentMonth = MONTHNAMES.indexOf(dropDownMonth) + 1;
	today.setMonth(currentMonth);
	today.setFullYear(currentYear);

	removeDisabledButtons();
	featureCalendarDisplay();

	updateMonthGrid(getDaysInMonth(currentMonth, currentYear));

	displayRedWeekend();

	updateWeekNumbers();
	saveNote();
}
