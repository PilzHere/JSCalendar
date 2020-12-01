"use_strict";

const monthNames = [
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

const today = new Date();

function getCurrentTime() {
	const fullDate = today.toISOString().slice(0, 10);

	document.getElementById("selectedMonth").innerHTML =
		monthNames[today.getMonth()] + " " + today.getFullYear();
}

getCurrentTime();
