/* TODO Would be nice if it calculates on the fly */
var count_products = 0;
var count_features = 0;
var count_styling = 0;
var count_overridess = 0;
var count_locales = 0;
var baseHours = 0;
var ipmHours = 0;
var ieHours = 0;
var uidHours = 0;

var lblBaseHours = $('#lblBaseHours');
var lblOverrideHours = $('#lblOverrideHours');
var lblStylingHours = $('#lblStylingHours');
var lblTotalHours = $('#lblTotalHours');
var lblIPMHours = $('#lblIPMHours');
var lblIEHours = $('#lblIEHours');
var lblUIDHours = $('#lblUIDHours');

var stdMultiplier = 2; //# of hours for one standard override/custom styling 
var highMultiplier = 5; //# of hours for one high level override/custom styling

var scope_resp = $('#scope_resp');
var scope_redes = $('#scope_redes');
var scope_other = $('#scope_other');
var scope_emails = $('#scope_emails');

var pro_reviews = $('#pro_reviews');
var pro_questions = $('#pro_questions');

var fea_display = $('#fea_display');
var fea_submission = $('#fea_submission');

function calculate(){
	baseHours = 0;
	ipmHours = 0;
	ieHours = 0;
	uidHours = 0;
	count_products = 0;
	count_features = 0;
	overrideHours = 0;
	stylingHours = 0;
	
	
	//Get Counts
	/* Calculate number of products */
	if (pro_reviews.prop("checked")){count_products++};
	if (pro_questions.prop("checked")){count_products++};

	/* Calculate number of features */
	if (fea_display.prop("checked")){count_features++};
	if (fea_submission.prop("checked")){count_features++};

	count_locales = $('#locale_count').val();
	count_overrides = $('#override_count').val();
	count_styling = $('#styling_count').val();


	if (count_products == 2 && count_features == 2){
		baseHours += 80;
		ieHours += 15;
		uidHours += 45;
		ipmHours += 20;
	} else if (count_products == 2 && count_features == 1){
		baseHours += 50;
		ieHours += 5;
		uidHours += 30;
		ipmHours += 15;
	} else if (count_products == 1 && count_features == 2){
		baseHours += 60;
		ieHours += 10;
		uidHours += 35;
		ipmHours += 15;
	} else if (count_products == 1 && count_features == 1){
		baseHours += 40;
		ieHours += 5;
		uidHours += 25;
		ipmHours += 10;
	}

	//console.log("Base Hours: " + baseHours);

	/* Calculate Override Hours*/
	var override_std = $('#override_std');
	var override_high = $('#override_high');
	var stdMultiplier = 2; //# of hours for one standard override/custom styling 
	var highMultiplier = 5; //# of hours for one high level override/custom styling

	if (count_overrides != null){
		if (override_std.prop("checked")){
			overrideHours = count_overrides * stdMultiplier;
		} else if (override_high.prop("checked")){
			overrideHours = count_overrides * highMultiplier;
		}
		ieHours += overrideHours;
		ipmHours += 0.1 * count_overrides;
	}

	//console.log("Override Hours: " + overrideHours);

	/* Calculate Custom Styling Hours */
	var styling_std = $('#styling_std');
	var styling_high = $('#styling_high');

	if (count_styling != null){
		
		if (styling_std.prop("checked")){
			stylingHours = count_styling * stdMultiplier;
		} else if (styling_high.prop("checked")){
			stylingHours = count_styling * highMultiplier;
		}
		uidHours += stylingHours;
		ipmHours += 0.1 * count_styling;
	}
	//console.log("Styling Hours: " + stylingHours);	

	/* Calculate Responsive Hours */
	resp_std = $('#resp_std').prop("checked");
	resp_high = $('#resp_high').prop("checked");

	if (scope_resp.prop("checked")){
		if(resp_high){
			//High Level Responsive
			if (count_products == 2 && count_features == 2){
				//RR & QA and Display & Submission
				baseHours += 70;
				ieHours += 10;
				uidHours += 50;
				ipmHours += 10;
			} else if (count_products == 2 && count_features == 1){
				//RR & QA and Display OR Submission
				baseHours += 50;
				ieHours += 5;
				uidHours += 35;
				ipmHours += 10;
			} else if (count_products == 1 && count_features == 2){
				//RR OR QA and Display & Submission
				baseHours += 40;
				ieHours += 5;
				uidHours += 30;
				ipmHours += 5;
			} else if (count_products == 1 && count_features == 1){
				//RR OR QA and Display OR Submission
				baseHours += 30;
				ieHours += 5;
				uidHours += 20;
				ipmHours += 5;
			}
		}
		else {
			//Standard Responsive
			if (count_products == 2 && count_features == 2){
				//RR & QA and Display & Submission
				baseHours += 50;
				ieHours += 10;
				uidHours += 30;
				ipmHours += 10;
			} else if (count_products == 2 && count_features == 1){
				//RR & QA and Display OR Submission
				baseHours += 30;
				ieHours += 5;
				uidHours += 20;
				ipmHours += 5;
			} else if (count_products == 1 && count_features == 2){
				//RR OR QA and Display & Submission
				baseHours += 25;
				ieHours += 5;
				uidHours += 15;
				ipmHours += 5;
			} else if (count_products == 1 && count_features == 1){
				//RR OR QA and Display OR Submission
				baseHours += 20;
				ieHours += 5;
				uidHours += 10;
				ipmHours += 5;
			}
		}
	}

	/* Additional Features */
	//TODO Replatform
	if (scope_other){
		if ($('#other-summary').prop("checked")){
			ieHours += 4;
			uidHours += 6;
		}
		if ($('#other-pixel').prop("checked")){
			ieHours += 10;
		}
		if ($('#other-seo').prop("checked")){
			ieHours += 10;
		}
		if ($('#other-hostedauth').prop("checked")){
			//Configuration + (Emails * Products * Locales)
			ieHours += (10 + (4 * count_products * count_locales ));
		}
		if ($('#other-siteauth').prop("checked")){
			ieHours += 10;
		}
		if ($('#other-pid').prop("checked")){
			ieHours += 10;
		}
		if ($('#other-import').prop("checked")){
			ieHours += 10;
		}
	}

	/* Locales */
	/* Calculation is 15% of Project Hours per locale */
	if (count_locales > 0){
		ieHoursPerLocale = ieHours * .15;
		ipmHoursPerLocale = ipmHours * .15;
		uidHoursPerLocale = uidHours * .15;

		ieHours = ieHours + (ieHoursPerLocale * count_locales);
		ipmHours = ipmHours + (ipmHoursPerLocale * count_locales);
		uidHours = uidHours + (uidHoursPerLocale * count_locales);
	}

	/* Emails */
	if (scope_emails.prop("checked")){
		email_branded = $('#email_branded').prop("checked");
		email_custom = $('#email_custom').prop("checked");
		email_count = $('#email_count').val();
		emailHours = 0;

		if (email_count > 0){
		//IPM hours for an email only project??
			if (email_branded){
				ieHours += 3;
				ipmHours += 1;
				uidHours += 2;

				if (email_count > 1){
					ieHours += (1 * email_count * count_locales);
					uidHours += (2 * email_count * count_locales);
				}
			} else if (email_custom){
				ieHours += 3;
				ipmHours += 2;
				uidHours += 20;

				if (email_count > 1){
					ieHours += (1 * email_count);
					uidHours += (2 * email_count);
				}
			}
		}

	}


	/* Hours Output */
	/*var totalHours = baseHours + overrideHours + stylingHours;*/
	show_errors();
	update_labels();
}

function show_errors(){
	$("[id^=error]").empty();
	$("#overall-warnings").empty();
	var warningMsgs = '';

	//TODO: prob better way to do all this to accommodate future updates to the form
	if (scope_redes.prop("checked") || scope_resp.prop("checked") || scope_other.prop("checked")){
		if (!pro_reviews.prop("checked") && !pro_questions.prop("checked")){
			$('#error-products').text("* Please select one");
		}

		if (!fea_display.prop("checked") && !fea_submission.prop("checked")){
			$('#error-features').text("* Please select one");
		}
	} 
	if (scope_emails.prop("checked")){
		if (email_count == ''){
			$('#error-emails').text("* Please enter number of emails per locale");
		}
		//warningMsgs += "<li>Verify emails are sent by BV<br>";
	}

	// if (warningMsgs != ''){
	// 	$("#overall-warnings").html(warningMsgs);
	// 	$("#overall-warnings").prepend("Warnings:<br>");
	// }
}

function update_labels(){
	totalHours = uidHours + ipmHours + ieHours;

	lblBaseHours.text(Math.round(baseHours));
	lblIEHours.text(Math.round(ieHours));
	lblIPMHours.text(Math.round(ipmHours));
	lblUIDHours.text(Math.round(uidHours));
	lblOverrideHours.text(Math.round(overrideHours));
	lblStylingHours.text(Math.round(stylingHours));
	lblTotalHours.text(Math.round(totalHours));
}

function show_sections(){
	//Reset sections
	$("[id^=section]").hide();

	if(scope_redes.prop("checked")){
		$('#section_products').show();
		$('#section_features').show();
		$('#section_overrides').show();
		$('#section_styling').show();
		$('#section_locales').show();
	}
	
	if(scope_other.prop("checked")){
		$('#section_addfeatures').show();
		$('#section_products').show();
	}

	if(scope_emails.prop("checked")){
		$('#section_locales').show();
		$('#section_emails').show();
	}
	
	if(scope_resp.prop("checked")){
		$('#section_products').show();
		$('#section_features').show();
		$('#section_overrides').show();
		$('#section_styling').show();
		$('#section_locales').show();
		$('#section_responsive').show();
	}
}

$(document).ready(function() {

	$("[id^=section]").hide();
	
	//Disabled/Enable sections based on scope.
	$("[id^=scope]").change(function() {
	    show_sections();       
	});

	$("#form-calculator :input").change(function(){
		calculate();
	});
});