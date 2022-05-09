

		function create_pdf() {

			var doc = new jsPDF('p', 'mm', 'letter');
			var img = new Image();
			img.src = 'IDEAS_Application.jpg';
			
			var pageHeight= doc.internal.pageSize.height;
			var pageWidth= doc.internal.pageSize.width;
			
			doc.addImage(img, 'JPEG', 15, 10, pageWidth-30, 12);
			
			// Default export is a4 paper, portrait, using milimeters for units
			
			// Meta Information
			var orgName = get_value("orgName");
			var orgWeb = get_value("orgWebsite");
			//var orgProgram = get_value("orgProgram");
			//var orgRegion = get_value("orgRegion");
			var orgStage = get_value("orgStage");
			var orgAge = get_value("orgAge");
			
			// Executive Summary
			//var executiveSum = get_value("executiveSum");
			
			// Problem 
			var problem1 = get_value("problem1");
			var problem2 = get_value("problem2");
			var problem3 = get_value("problem3");
			var problem4 = get_value("problem4");

			// Solution 
			var solution1 = get_value("solution1");
			var solution2 = get_value("solution2");
			var solution3 = get_value("solution3");
			var solution4 = get_value("solution4");
			
			// Project
			var project1 = get_value("project1");
			var project2 = get_value("project2");
			var project3 = get_value("project3");
			var project4 = get_value("project4");
			
			// Impact 
			var impact1 = get_value("impact1");
			var impact2 = get_value("impact2");
			
			// Team
			var team1 = get_value("team1");
			var team2 = get_value("team2");
			
			doc.setFontType("bold");
			doc.setFontSize("23");
			doc.text(15, 35, orgName +'\n');
			
			var text = "Website: " + orgWeb + "Project Age (months): " + orgAge  +
			"Stage: " + orgStage;
			
			var splitText = doc.splitTextToSize(text, 280)
			
			doc.setFontType("normal");
			doc.setFontSize("11"); 
			
			var y = 45;
			for (var i = 0; i < splitText.length; i++) {                
				if (y > 252) {
					y = 21;
					doc.addPage();
					}
			doc.text(15, y, splitText[i]);
			y = y + 7;
			} 
			
			y = y-6;
			doc.line(15, y, pageWidth-16, y);
			
			// Executive Summary
			
			/*y = y +14;
			if (y > 240) {
				y = 21;
				doc.addPage();
			}
			doc.setFontType("normal");
			doc.setFontSize("18");	
			doc.text(15, y, 'Executive Summary');
			y = y+10;
			
			var splitExecText = doc.splitTextToSize(executiveSum, 280)
			
			doc.setFontType("normal");
			doc.setFontSize("11"); 
			
			for (var i = 0; i < splitExecText.length; i++) {                
				if (y > 252) {
					y = 21;
					doc.addPage();
					}
			doc.text(15, y, splitExecText[i]);
			y = y + 7;
			}
			*/
			
			// Problem Statement
			
			y = y +14;
			if (y > 240) {
				y = 21;
				doc.addPage();
			}
			doc.setFontType("normal");
			doc.setFontSize("18");	
			doc.text(15, y, 'Problem Identification');
			y = y+10;
			
			probText = problem1 + "\n" + problem2 + "\n" + problem3 + "\n" + problem4;
			
			var splitProbText = doc.splitTextToSize(probText, 280)
			
			doc.setFontType("normal");
			doc.setFontSize("11"); 
			
			for (var i = 0; i < splitProbText.length; i++) {                
				if (y > 252) {
					y = 21;
					doc.addPage();
					}
			doc.text(15, y, splitProbText[i]);
			y = y + 7;
			}
			
			// Solutions 
			
			y = y +5;
			if (y > 240) {
				y = 21;
				doc.addPage();
			}
			doc.setFontType("normal");
			doc.setFontSize("18");	
			doc.text(15, y, 'Solution');
			y = y+10;
			
			solText = solution1 + "\n" + solution2 + "\n" + solution3 + "\n" + solution4;
			
			var splitSolText = doc.splitTextToSize(solText, 280)
			
			doc.setFontType("normal");
			doc.setFontSize("11"); 
			
			for (var i = 0; i < splitSolText.length; i++) {                
				if (y > 252) {
					y = 21;
					doc.addPage();
					}
			doc.text(15, y, splitSolText[i]);
			y = y + 7;
			}
			
			// Project 
			
			y = y +5;
			if (y > 240) {
				y = 21;
				doc.addPage();
			}
			doc.setFontType("normal");
			doc.setFontSize("18");	
			doc.text(15, y, 'Project Details / Feasibility');
			y = y+10;
			
			projText = project1 + "\n" + project2 + "\n" + project3 + "\n" +
						project4;
			
			var splitProjText = doc.splitTextToSize(projText, 280)
			
			doc.setFontType("normal");
			doc.setFontSize("11"); 
			
			for (var i = 0; i < splitProjText.length; i++) {                
				if (y > 252) {
					y = 21;
					doc.addPage();
					}
			doc.text(15, y, splitProjText[i]);
			y = y + 7;
			}
			
			// Impact 
			
			y = y +5;
			if (y > 240) {
				y = 21;
				doc.addPage();
			}
			doc.setFontType("normal");
			doc.setFontSize("18");	
			doc.text(15, y, 'Measuring Impact');
			y = y+10;
			
			impactText = impact1 + "\n" + impact2;
			
			var splitImpactText = doc.splitTextToSize(impactText, 280)
			
			doc.setFontType("normal");
			doc.setFontSize("11"); 
			
			for (var i = 0; i < splitImpactText.length; i++) {                
				if (y > 252) {
					y = 21;
					doc.addPage();
					}
			doc.text(15, y, splitImpactText[i]);
			y = y + 7;
			}
			
			// Team
			
			y = y +5;
			if (y > 240) {
				y = 21;
				doc.addPage();
			}
			doc.setFontType("normal");
			doc.setFontSize("18");	
			doc.text(15, y, 'Team');
			y = y+10;
			
			teamText = team1 + "\n" + team2;
			
			var splitTeamText = doc.splitTextToSize(teamText, 280)
			
			doc.setFontType("normal");
			doc.setFontSize("11"); 
			
			for (var i = 0; i < splitTeamText.length; i++) {                
				if (y > 252) {
					y = 21;
					doc.addPage();
					}
			doc.text(15, y, splitTeamText[i]);
			y = y + 7;
			}
			
			
			
			// doc.save(orgName+'.pdf');
			
			// Save pdf to server to be merged with the Timeline and Budget files
			
			function randomString(length, chars) {
				var result = '';
				for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
				return result;
			}
			var pdfName = 'QA_' + randomString(37, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
			
			// output as blob
			var pdf = doc.output('blob');
			
			var pdfData = new FormData();
			
			pdfData.append('file1' , pdf);
			pdfData.append('fileName' , pdfName);
			
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
			  if (this.readyState == 4) {
				if (this.status !== 200) {
				  // handle error
				}
			  }
			}

			xhr.open('POST', 'upload_pdf.php', true);	
			//console.log(pdfData);
			xhr.send(pdfData);
			
			// Submit Form to merge PDFs

			document.getElementById("fileName").value = pdfName;
			
			
			// Validate the files
			var processFiles = true;
			
			if(document.getElementById('inputPDF2').value == "" || document.getElementById('inputPDF2').value == ""){
				processFiles = false;
				alert('Both the Timeline and Budget are required');
			} else {
			
				var fileExt2 = document.getElementById('inputPDF2').value.match(/\.([^\.]+)$/)[1];
				if (fileExt2!='pdf') {
					  processFiles = false;
					  alert('Please Upload the Timeline in .PDF Format');
				}
				
				var fileExt3 = document.getElementById('inputPDF3').value.match(/\.([^\.]+)$/)[1];
				if (fileExt3!='pdf') {
					  processFiles = false;
					  alert('Please Upload the Budget in .PDF Format');
				}
				
				if(document.getElementById('inputPDF4').value != ""){
					var fileExt4 = document.getElementById('inputPDF4').value.match(/\.([^\.]+)$/)[1];
					if (fileExt4!='pdf') {
					  processFiles = false;
					  alert('Please Upload the Supplement in .PDF Format');
					}
					
				}
			
		}

		if(processFiles==true){
		
			document.getElementById("uploadForm").submit();
			
			// Display Mailchimp Template
			// window.open('https://mailchi.mp/d8997834af0c/proposal-template-spring-20-landing-page-463975', '_blank');
			
		}
		
	}
	
	//////////////////////
	/////////// Keyword Processing Code
	//////////////////////
	
	$('#textareatag input').on('keyup', function(e){
	   var key = e.which;
	   if(key == 186){
		  $('<button/>').text($(this).val().slice(0, -1)).insertBefore($(this));
		  $(this).val('').focus();
		  inputTags();
	   };
	});

	/// Insert a few key words to get things going
		  $('<button/>').text('Climate Change').insertBefore($('#textareatag input'));
		  $('#textareatag input').val('').focus();
		  
		  $('<button/>').text('Global Health').insertBefore($('#textareatag input'));
		  $('#textareatag input').val('').focus();
		  
		  $('<button/>').text('Poverty Alleviation').insertBefore($('#textareatag input'));
		  $('#textareatag input').val('').focus();
		  
		  inputTags();

	function inputTags() {
	  var buttonText = document.getElementById("textareatag").innerHTML;
	  var tags = buttonText.replaceAll("<button>","");
	  tags = tags.replaceAll("</button>",";");
	  tags = tags.replaceAll('<input type="text">','');
	  var taginput = document.getElementById("issuetags");
	  taginput.value = tags;
	  //console.log(tags);
	}

	$('#textareatag').on('click', 'button', function(e){
	   e.preventDefault();
	  $(this).remove();
	  inputTags();
	   return false;
	})
	
	$(window).scrollTop(0);
	
	//////////////////////
	/////////// Slider Animation
	//////////////////////
	
	// Update Slider Values when slider is moved
	// Q1 
	
	var slider1 = document.getElementById("learnSI");
	var output1 = document.getElementById("learnSIval");
	output1.innerHTML = slider1.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider1.oninput = function() {
	  output1.innerHTML = this.value;
	}
  
	var slider2 = document.getElementById("learnVS");
	var output2 = document.getElementById("learnVSval");
	output2.innerHTML = slider2.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider2.oninput = function() {
	  output2.innerHTML = this.value;
	}

	var slider3 = document.getElementById("learnSocPol");
	var output3 = document.getElementById("learnSocPolval");
	output3.innerHTML = slider3.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider3.oninput = function() {
	  output3.innerHTML = this.value;
	}
  
  	var slider4 = document.getElementById("learnLead");
	var output4 = document.getElementById("learnLeadval");
	output4.innerHTML = slider4.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider4.oninput = function() {
	  output4.innerHTML = this.value;
	}
  
	var slider5 = document.getElementById("particPol");
	var output5 = document.getElementById("particPolval");
	output5.innerHTML = slider5.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider5.oninput = function() {
	  output5.innerHTML = this.value;
	}

	// Q2 
	
	var slider6 = document.getElementById("impContext");
	var output6 = document.getElementById("impContextval");
	output6.innerHTML = slider6.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider6.oninput = function() {
	  output6.innerHTML = this.value;
	}
	
	var slider7 = document.getElementById("impExp");
	var output7 = document.getElementById("impExpval");
	output7.innerHTML = slider7.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider7.oninput = function() {
	  output7.innerHTML = this.value;
	}
	
	var slider8 = document.getElementById("impSkill");
	var output8 = document.getElementById("impSkillval");
	output8.innerHTML = slider8.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider8.oninput = function() {
	  output8.innerHTML = this.value;
	}
	
	
	var slider9 = document.getElementById("impRes");
	var output9 = document.getElementById("impResval");
	output9.innerHTML = slider9.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider9.oninput = function() {
	  output9.innerHTML = this.value;
	}
	
	
	var slider10 = document.getElementById("impNet");
	var output10 = document.getElementById("impNetval");
	output10.innerHTML = slider10.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider10.oninput = function() {
	  output10.innerHTML = this.value;
	}
	
	
	// Q3
	
	var slider11 = document.getElementById("equipVol");
	var output11 = document.getElementById("equipVolval");
	output11.innerHTML = slider11.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider11.oninput = function() {
	  output11.innerHTML = this.value;
	}
	
	
	var slider12 = document.getElementById("equipCom");
	var output12 = document.getElementById("equipComval");
	output12.innerHTML = slider12.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider12.oninput = function() {
	  output12.innerHTML = this.value;
	}
	 
	
	var slider13 = document.getElementById("equipCareer");
	var output13 = document.getElementById("equipCareerval");
	output13.innerHTML = slider13.value; // Display the default slider value

	
	// Update the current slider value (each time you drag the slider handle)
	slider13.oninput = function() {
	  output13.innerHTML = this.value;
	}
	
	
	
// Code Attribution - Modified from samples on Stackoverflow
