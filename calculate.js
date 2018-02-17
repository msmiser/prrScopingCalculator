/* TODO Would be nice if it calculates on the fly */
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

	if (pro_reviews.prop("checked")){numProducts++};
	if (pro_questions.prop("checked")){numProducts++};

	/* Calculate number of features */
	/* Could actually iterate through this instead */
	var fea_display = $('#fea_display');
	var fea_submission = $('#fea_submission');

	if (fea_display.prop("checked")){numFeatures++};
	if (fea_submission.prop("checked")){numFeatures++};

	//console.log("Products:" + numProducts);
	//console.log("Features:" + numFeatures);

	if (numProducts == 2 && numFeatures == 2){
		baseHours += 80;
		ieHours += 15;
		uidHours += 45;
		ipmHours += 20;
	} else if (numProducts == 2 && numFeatures == 1){
		baseHours += 50;
		ieHours += 5;
		uidHours += 30;
		ipmHours += 15;
	} else if (numProducts == 1 && numFeatures == 2){
		baseHours += 60;
		ieHours += 10;
		uidHours += 35;
		ipmHours += 15;
	} else if (numProducts == 1 && numFeatures == 1){
		baseHours += 40;
		ieHours += 5;
		uidHours += 25;
		ipmHours += 10;
	}

	//console.log("Base Hours: " + baseHours);

	/* Calculate Override Hours*/
	var overrideCount = $('#override_count').val();
	var override_std = $('#override_std');
	var override_high = $('#override_high');
	var overrideHours = 0;
	var stdMultiplier = 2; //# of hours for one standard override/custom styling 
	var highMultiplier = 5; //# of hours for one high level override/custom styling

	if (overrideCount != null){
		if (override_std.prop("checked")){
			overrideHours = overrideCount * stdMultiplier;
		} else if (override_high.prop("checked")){
			overrideHours = overrideCount * highMultiplier;
		}
		ieHours += overrideHours;
		ipmHours += 0.1 * overrideCount;
	}

	//console.log("Override Hours: " + overrideHours);

	/* Calculate Custom Styling Hours */
	var stylingCount = $('#styling_count').val();
	var styling_std = $('#styling_std');
	var styling_high = $('#styling_high');
	var stylingHours = 0;

	if (stylingCount != null){
		
		if (styling_std.prop("checked")){
			stylingHours = stylingCount * stdMultiplier;
		} else if (styling_high.prop("checked")){
			stylingHours = stylingCount * highMultiplier;
		}
		uidHours += stylingHours;
		ipmHours += 0.1 * stylingCount;
	}

	//console.log("Styling Hours: " + stylingHours);

	/* Calculate Responsive Hours */
	var scope_resp = $('#scope_resp');
	var resp_std = $('#resp_std').prop("checked");
	var resp_high = $('#resp_high').prop("checked");

	if (scope_resp.prop("checked")){
		if(resp_high){
			//High Level Responsive
			if (numProducts == 2 && numFeatures == 2){
				//RR & QA and Display & Submission
				baseHours += 70;
				ieHours += 10;
				uidHours += 50;
				ipmHours += 10;
			} else if (numProducts == 2 && numFeatures == 1){
				//RR & QA and Display OR Submission
				baseHours += 50;
				ieHours += 5;
				uidHours += 35;
				ipmHours += 10;
			} else if (numProducts == 1 && numFeatures == 2){
				//RR OR QA and Display & Submission
				baseHours += 40;
				ieHours += 5;
				uidHours += 30;
				ipmHours += 5;
			} else if (numProducts == 1 && numFeatures == 1){
				//RR OR QA and Display OR Submission
				baseHours += 30;
				ieHours += 5;
				uidHours += 20;
				ipmHours += 5;
			}
		}
		else {
			//Standard Responsive
			if (numProducts == 2 && numFeatures == 2){
				//RR & QA and Display & Submission
				baseHours += 50;
				ieHours += 10;
				uidHours += 30;
				ipmHours += 10;
			} else if (numProducts == 2 && numFeatures == 1){
				//RR & QA and Display OR Submission
				baseHours += 30;
				ieHours += 5;
				uidHours += 20;
				ipmHours += 5;
			} else if (numProducts == 1 && numFeatures == 2){
				//RR OR QA and Display & Submission
				baseHours += 25;
				ieHours += 5;
				uidHours += 15;
				ipmHours += 5;
			} else if (numProducts == 1 && numFeatures == 1){
				//RR OR QA and Display OR Submission
				baseHours += 20;
				ieHours += 5;
				uidHours += 10;
				ipmHours += 5;
			}
		}
	}

	/* Hours Output */
	var totalHours = baseHours + overrideHours + stylingHours;

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
	output_span.html(outputText);
}