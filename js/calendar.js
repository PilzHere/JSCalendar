"use_strict";

const appName = "JSCalendar";

const today = new Date(); // Time right now.
let currentDate = today.getDate();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();

const maximumAmountOfButtons = [7 * 6]; // Maximum amount of cells in the month-grid.
let oldMonthAmountOfDays = 0;

var globalBtnDay;

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
let currentMonthButtons = [maximumAmountOfButtons];

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

	// selectedMonthLabel element
	const selectedMonthLabel = document.createElement("label");
	selectedMonthLabel.tagName = "selectedMonthLabel";
	selectedMonthLabel.id = "selectedMonthLabel";
	selectedMonthLabel.innerHTML = "June 2021";
	document
		.getElementById("currentMonthLabelAndButtons")
		.appendChild(selectedMonthLabel);

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
		"<span>#</span> <span>Mon</span> <span>Tue</span> <span>Wed</span <span>Thu</span> <span>Fri</span> <span>Sat</span> <span>Sun</span>";
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

	// Update text of selectedMonthLabel.
	selectedMonthLabel.innerHTML =
		MONTHNAMES[today.getMonth()] + " " + today.getFullYear();

	console.log("this month: " + currentMonth); // test

	// Temp: To show disabled buttons in init.
	nextMonthEvent();
	previousMonthEvent();
	// Temp end.

	currentDateDisplay();
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

	removeDisabledButtons();
	featureCalendarDisplay();

	updateMonthGrid(getDaysInMonth(currentMonth, currentYear));
	selectedMonthLabel.innerHTML =
		MONTHNAMES[currentMonth - 1] + " " + currentYear;

	//console.log("this month: " + currentMonth);

	debugLogCurrentViewedMonthInfo();
}

/**
 * Prints month and year in view.
 */
function debugLogCurrentViewedMonthInfo() {
	console.log("Current view month: ", currentMonth, " year: ", currentYear);
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
	selectedMonthLabel.innerHTML =
		MONTHNAMES[currentMonth - 1] + " " + currentYear;

	//console.log("this month: " + currentMonth); // test

	debugLogCurrentViewedMonthInfo();
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
	//console.log("First day of month: ", firstDayName);

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

let selectedDay;

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
				currentMonthButtons.length = maximumAmountOfButtons;
			}
		}
	}

	// Maybe no needed...
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
	// Maybe end.

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

		// New
		btnDay.addEventListener("click", function () {
			if (currentMonth == 12) {
				console.log("month is zero!");
				const tempCurrentMonth = 12;
				const tempCurrentYear = currentYear - 1;

				selectedDay = new Date();
				selectedDay.setFullYear(tempCurrentYear);
				selectedDay.setMonth(tempCurrentMonth);
				selectedDay.setDate(currentDay);
				// This fixes the year on december to correct.
				// Month is still zero at December tho...
			} else {
				selectedDay = new Date();
				selectedDay.setFullYear(currentYear);
				selectedDay.setMonth(currentMonth);
				selectedDay.setDate(currentDay);
			}

			console.log(
				"You picked day: ",
				selectedDay.getDate(),
				"/",
				selectedDay.getMonth(),
				"/",
				selectedDay.getFullYear()
			);
		});
		// new end
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

	console.log("No button found in array containing date.");
}

function displayRedWeekend() {
	// Gets the month and year from ID="selectedMonthLabel"
	let selectedMonthAndYear = document.getElementById("selectedMonthLabel");
	let monthYearSplit = selectedMonthAndYear.textContent.split(" ");
	let selectedYear = monthYearSplit[1];
	let selectedMonth = monthYearSplit[0];

	// Updates the month and year everytime month changes
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
 * Check if there is notes for that date, shows them if not null.
 */
function displaySelectedDatePlan(pickedDate) {
	let date = pickedDate.getDate();
	let day = getDayOfTheWeek(pickedDate);
	let monthName = MONTHNAMES[pickedDate.getMonth()];
	let monthNumber = pickedDate.getMonth();
	let year = pickedDate.getFullYear();

	document.getElementById("selectedDateLabel").textContent =
		day + " " + date + " " + monthName;
	getAndDisplayNotes(date, monthNumber, year);

	/**
	 * Function search for correct object in an array that contain the selected dates year/month/date,
	 * check if there is any notes saved in the object and if so then shows them to the display.
	 * Takes an Date, monthnumber and year as parameter
	 */
	function getAndDisplayNotes(date, monthNumber, year) {
		for (let i = 0; i < registeredDays.length; i++) {
			//If the object contains the selected year/month/date
			if (
				registeredDays[i].dayNumber === date &&
				registeredDays[i].monthNumber === monthNumber &&
				registeredDays[i].yearNumber === year
			) {
				//Check if object has notes and then shows them
				if (registeredDays[i].notes != null)
					document.getElementById(
						"selectedDateTextArea"
					).textContent = registeredDays[i].notes;
				break;
			}
		}
	}
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
displaySelectedDatePlan(new Date(2020, 11, 20)); // TEST TO SEE IF DAY, DATE and MONTH is changed for the selected day, And that notes shows up
displaySelectedDatePlan(new Date()); // TEST TO SEE IF DAY, DATE and MONTH is changed for the selected day, And that notes shows up
// monthArray saves the daybuttons to each month
const monthArray = 
	{"January": {},
	"February": {},
	"March": {},
	"April": {},
	"May": {},
	"June": {},
	"July": {},
	"August": {},
	"September": {},
	"October": {},
	"November": {},
	"December": {},
	};
const years = {};
const dayArray = {};

function returnMonth(monthString)
{
	switch (monthString) {
		case "January":
			return 0; // January
			break;
		case "February":
			return 1; // February
			break;
		case "Mars":
			return 2; // Mars etc....
			break;
		case "April":
			return 3;
			break;
		case "May":
			return 4;
			break;
		case "June":
			return 5;
			break;
		case "July":
			return 6;
			break;
		case "August":
			return 7;
			break;
		case "September":
			return 8;
			break;
		case "October":
			return 9;
			break;
		case "November":
			return 10;
			break;
		case "December":
			return 11;
			break;
	}
}

var storeDateNotes = {};
function saveNote()
{ 

	let noteText = document.getElementById("selectedDateTextArea");
	 
	// Splits year and month so you can use the separately
	let selectedMonthAndYear = document.getElementById("selectedMonthLabel");
	let monthYearSplit = selectedMonthAndYear.textContent.split(" ");
	let selectedYear = monthYearSplit[1];
	let selectedMonth = monthYearSplit[0];

	for(let dayNum = 1; dayNum < 32; dayNum++)
	{
		let currentYMD = selectedYear + ":" + returnMonth(selectedMonth) + ":" + dayNum;
		if(storeDateNotes[currentYMD])
		{
			let dayButton = document.getElementById("btnDay" + dayNum);
			dayButton.style.borderColor = "black";
		}
	}
	// For loop for creating an array with all the days connected to the notes
	for(let button = 1; button < 32; button++)
	{
		// Easier to write
		let stringBtn = "btnDay" + button;
		// ARRAY with all the buttondays btnDay1, btnDay2 etc....
	}
	try{
		for(let button = 1; button < 32; button++)
		{	
		dayArray["btnDay" + button];
		// ID of buttons
		let dayButton = document.getElementById("btnDay" + button);
		// dfpsdejfpijdp
		if(selectedMonth != monthArray[selectedMonth])
		{
			monthArray[selectedMonth] = dayArray;
		}
			if(years[selectedYear])
			{
				if(monthArray[selectedMonth])
				{
					if(dayArray[dayButton.id] != "Add a note:")
					{
						dayButton.style.borderColor = "black";
					}
				}
			}
		// Text of textfield
		noteText.value = "";
		// This removes a note that has been made if button is double clicked
		dayButton.addEventListener("dblclick", function()
		{
			if(dayButton.style.borderColor == "black")
			{
				noteText.value = "";
				noteText.placeholder = "Display notes for the selected date here...";
				dayButton.style.borderColor = "white";	
			}
		});
		// If btnDay1-btnDay31 is clicked this activates
		dayButton.addEventListener("click", function()
		{
			// Show the selected date at the top after clicking button NOT STARTED::::::::::

			// If a note has been saved this displays it
			if(dayButton.style.borderColor == "black")
			{
				noteText.placeholder = dayArray[dayButton.id];
				
			}
			// dayButton.id = btnDay
			// dayArray[dayButton.id] = texten "Add a note:"

			// Clicking button after writing something saves it
			if(noteText.value.length != 0 && dayButton.style.borderColor != "black")
			{	
				// Saves note to array. Write saved then resets after 1 second
				dayArray[dayButton.id] = noteText.value;
				// Change color of button that has saved note
				dayButton.style.borderColor = "black";
				noteText.placeholder = "Note saved";
				setTimeout(function(){ noteText.value = ""; }, 1000);	
					
				getNum = dayButton.id.replace( /^\D+/g, '');
				let date = new Date(selectedYear, returnMonth(selectedMonth), getNum)
				let numDate = date.getFullYear() +":"+ date.getMonth()+":"+getNum;
				storeDateNotes[numDate] = dayArray[dayButton.id];
			}
			// If a button has no note the default placeholder is shown
			if(dayButton.style.borderColor != "black")
			{
				noteText.placeholder = "Display notes for the selected date here...";
			}		
		})
		}
	}catch(err){
		
	}	
	// Updates the month and year everytime month changes
	document
		.getElementById("btnNextMonth")
		.addEventListener("click", saveNote);
	document
		.getElementById("btnPreviousMonth")
		.addEventListener("click", saveNote);
}
saveNote();