import moment from "moment";

export function dateToFromNowDaily(myDate) {
	// get from-now for this date
	var fromNow = moment(myDate).fromNow();

	// ensure the date is displayed with today and yesterday
	return moment(myDate).calendar(null, {
		// when the date is closer, specify custom values
		lastWeek: "DD/MM/YYYY",
		lastDay: "[Yesterday]",
		sameDay: "[Today]",
		nextDay: "[Tomorrow]",
		nextWeek: "dddd",
		// when the date is further away, use from-now functionality
		sameElse: function () {
				return "[" + fromNow + "]";
		},
	});
}
