function calculate(){
	var numProducts = 0;
	var numFeatures = 0;
	var baseHours = 0;
	var ipmHours = 0;
	var ieHours = 0;
	var uidHours = 0;

	/* Calculate number of products */
	/* Could actually iterate through this instead */
	var pro_reviews = $('#pro_reviews');
	var pro_questions = $('#pro_questions');

	if (pro_reviews.is(':checked')){numProducts++};
	if (pro_questions.is(':checked')){numProducts++};

	/* Calculate number of features */
	/* Could actually iterate through this instead */
	var fea_display = $('#fea_display');
	var fea_submission = $('#fea_submission');

	if (fea_display.is(':checked')){numFeatures++};
	if (fea_submission.is(':checked')){numFeatures++};

	//console.log("Products:" + numProducts);
	//console.log("Features:" + numFeatures);

	if (numProducts == 2 && numFeatures == 2){
		baseHours = 80;
		ieHours = 15;
		uidHours = 45;
		ipmHours = 20;
	} else if (numProducts == 2 && numFeatures == 1){
		baseHours = 50;
		ieHours = 5;
		uidHours = 30;
		ipmHours = 15;
	} else if (numProducts == 1 && numFeatures == 2){
		baseHours = 60;
		ieHours = 10;
		uidHours = 35;
		ipmHours = 15;
	} else if (numProducts == 1 && numFeatures == 1){
		baseHours = 40;
		ieHours = 5;
		uidHours = 25;
		ipmHours = 10;
	}

	//console.log("Base Hours: " + baseHours);

	/* Calculate Override Hours*/
	var overrideCount = $('#override_count').value;
	var override_std = $('#override_std');
	var override_high = $('#override_high');
	var stdMultiplier = 2; //# of hours for one standard override/custom styling 
	var highMultiplier = 5; //# of hours for one high level override/custom styling

	if (overrideCount != null){
		var overrideHours = 0;
		if (override_std.is(':checked')){
			overrideHours = overrideCount * stdMultiplier;
		} else if (override_high.is(':checked')){
			overrideHours = overrideCount * highMultiplier;
		}
		ieHours += overrideHours;
		ipmHours += 0.1 * overrideCount;
	}

	//console.log("Override Hours: " + overrideHours);

	/* Calculate Custom Styling Hours */
	var stylingCount = $('#styling_count').value;
	var styling_std = $('#styling_std');
	var styling_high = $('#styling_high');

	if (stylingCount != null){
		var stylingHours = 0;
		if (styling_std.is(':checked')){
			stylingHours = stylingCount * stdMultiplier;
		} else if (styling_high.is(':checked')){
			stylingHours = stylingCount * highMultiplier;
		}
		uidHours += stylingHours;
		ipmHours += 0.1 * stylingCount;
	}

	//console.log("Styling Hours: " + stylingHours);

	/* Hours Output */
	totalHours = baseHours + overrideHours + stylingHours;

	outputText = "<h4>Overall Hours</h4>"
	outputText += "<p><b>Base Hours:</b> " + baseHours + "<br>";
	outputText += "<b>Override Hours:</b> " + overrideHours + "<br>";
	outputText += "<b>Styling Hours:</b> " + stylingHours + "<br>";
	outputText += "<b>Total Hours:</b> " + totalHours + "</p>";

	outputText += "<h4>Breakdown</h4>";
	outputText += "<p><b>IPM Hours:</b> " + ipmHours + "<br>";
	outputText += "<b>IE Hours:</b> " + ieHours + "<br>";
	outputText += "<b>UID Hours:</b> " + uidHours + "</p>";

	var output_span = $('#output_span');
	output_span.append(outputText);
}