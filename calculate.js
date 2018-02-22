/* TODO Would be nice if it calculates on the fly */
var numProducts = 0;
var numFeatures = 0;
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

function calculate(){
	baseHours = 0;
	ipmHours = 0;
	ieHours = 0;
	uidHours = 0;
	numProducts = 0;
	numFeatures = 0;
	overrideHours = 0;
	stylingHours = 0;
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
	resp_std = $('#resp_std').prop("checked");
	resp_high = $('#resp_high').prop("checked");

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
			//Config 4 hours
			//Email 4 x product
			//User Migration 6 hours
			ieHours += (10 + (4 * numProducts));
		}
		if ($('#other-siteauth').prop("checked")){
			//TODO
		}
		if ($('#other-pid').prop("checked")){
			//TODO
		}
		if ($('#other-import').prop("checked")){
			//TODO
		}
	}

	/* Locales */
	/* Calculation is 15% of Project Hours per locale */
	locale_count = $('#locale_count').val();

	if (locale_count > 0){
		ieHoursPerLocale = ieHours * .15;
		ipmHoursPerLocale = ipmHours * .15;
		uidHoursPerLocale = uidHours * .15;

		ieHours = ieHours + (ieHoursPerLocale * locale_count);
		ipmHours = ipmHours + (ipmHoursPerLocale * locale_count);
		uidHours = uidHours + (uidHoursPerLocale * locale_count);
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
					ieHours += (1 * email_count * locale_count);
					uidHours += (2 * email_count * locale_count);
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
	update_labels();
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
	$("[id^=section]").addClass("disabled");
	$('#respType').hide();

	if(scope_redes.prop("checked")){
		$('#section_products').removeClass("disabled");
		$('#section_features').removeClass("disabled");
		$('#section_overrides').removeClass("disabled");
		$('#section_styling').removeClass("disabled");
		$('#section_locales').removeClass("disabled");
	}
	
	if(scope_other.prop("checked")){
		$('#section_addfeatures').removeClass("disabled");
	}

	if(scope_emails.prop("checked")){
		$('#section_locales').removeClass("disabled");
		$('#section_emails').removeClass("disabled");
	}
	
	if(scope_resp.prop("checked")){
		$('#section_products').removeClass("disabled");
		$('#section_features').removeClass("disabled");
		$('#section_overrides').removeClass("disabled");
		$('#section_styling').removeClass("disabled");
		$('#section_locales').removeClass("disabled");
		$('#section_responsive').removeClass("disabled");
		$('#respType').show();
	}
}

$(document).ready(function() {
	//Disabled/Enable sections based on scope.
	$("[id^=scope]").change(function() {
	    show_sections();       
	});

	//TODO Improve below
	$("[id^=pro]").change(function() {
	    calculate();
	});
	$("[id^=fea]").change(function() {
	    calculate();
	});

	$("[id^=override]").change(function() {
	    calculate();
	});

	$("[id^=styling]").change(function() {
	    calculate();
	});

	$("[id^=resp]").change(function() {
	    calculate();
	});

	$("[id^=scope]").change(function() {
	    calculate();
	});

	$("#locale_count").change(function() {
		calculate();
	});

	$("[id^=email]").change(function() {
		calculate();
	});
	$("[id^=other]").change(function() {
		calculate();
	});
});