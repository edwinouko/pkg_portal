// https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
function exportToCsv(filename, rows, header) {
	var processRow = function (row) {
		var finalVal = '';
		for (var j = 0; j < row.length; j++) {
			var innerValue = row[j] === null ? '' : row[j].toString();
			if (row[j] instanceof Date) {
				innerValue = row[j].toLocaleString();
			};
			var result = innerValue.replace(/"/g, '""');
			if (result.search(/("|,|\n)/g) >= 0)
				result = '"' + result + '"';
			if (j > 0)
				finalVal += ',';
			finalVal += result;
		}
		return finalVal + '\n';
	};

	var csvFile = header.join(",")+ '\n';
	for (var i = 0; i < rows.length; i++) {
		csvFile += processRow(rows[i]);
	}

	var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) { // IE 10+
		navigator.msSaveBlob(blob, filename);
	} else {
		var link = document.createElement("a");
		if (link.download !== undefined) { // feature detection
			// Browsers that support HTML5 download attribute
			var url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", filename);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
}

function getQuestionArrays(element_name, result){
	const element = JSON.parse(result[element_name]);
	let element_array =  [];
	let element_labels = [];
	for (i = 0; i < element.length; i++) {
		element_array.push(parseInt(element[i][1]));
		element_labels.push(String(element[i][0]));
	}
	return [element_array, element_labels];
}

// Create the Chart Variables (that will be updated via AJAX)
function getChart(id_name, data, labels, thisChartOption){
	let elementCanvas = document.getElementById(id_name).getContext("2d");
	return new Chart(elementCanvas, {
		type: 'horizontalBar',
		data: {
		  labels: labels,
		  datasets: [data],
		},
		options: thisChartOption
	  });
}

//Structure PlotData
function plotData(someData, bColor, borColor, left_padding=0){
	var returnData = {
		label: 'Number of Students',
		data: someData,
		backgroundColor:bColor,
		borderColor: borColor,
		borderWidth: 2,
		hoverBorderWidth: 0
	  };

	  var currentChartOptions = {
		legend: {
			 display: false
		 },
	   scales: {
				 xAxes: [{
					 ticks: {
					 beginAtZero: true
				 }
		 }]	
	   },
		 layout: {
			 padding: {
			   left: left_padding
			 }
		 },
	   elements: {
		 rectangle: {
		   borderSkipped: 'left',
		 }
	   }
	 };
	return [returnData, currentChartOptions];	  
}

function getDataPlots(result, firstRun=TRUE){

		//Update data			
		if (firstRun==true){
			var updateTime = JSON.parse(result.updateTime);
			document.getElementById("lastUpdatedTag").innerHTML = '<b>Last Updated : </b>' + updateTime;
		}	
		
		var totalStudentsSQL = JSON.parse(result.allStudents);
		totalStudentsSQL = parseInt(totalStudentsSQL[0]);
		var expAnnualStudents = JSON.parse(result.allExpStudents);
		var pcTarget = parseInt((totalStudentsSQL/expAnnualStudents) * 100);
		if(pcTarget>100){
			pcTarget = 100;
		}
		document.getElementById("studentCounter").innerHTML = totalStudentsSQL;
		document.getElementById("studentCounter").style.width = pcTarget + "%";
			
		var departmentNumSQL = JSON.parse(result.departmentNum);
		departmentNumSQL = parseInt(departmentNumSQL[0]);
		var depTarget = parseInt(departmentNumSQL/40 * 100);
		document.getElementById("departmentCounter").innerHTML = departmentNumSQL;
		document.getElementById("departmentCounter").style.width = depTarget + "%";
		
		var femaleStudentsSQL = JSON.parse(result.femaleStudents);
		femaleStudentsSQL = parseInt(femaleStudentsSQL[0]);
		
		var genderStudentsSQL = JSON.parse(result.genderStudents);
		genderStudentsSQL = parseInt(genderStudentsSQL[0]);
		
		var femalePC = parseInt(femaleStudentsSQL/genderStudentsSQL * 100);
		document.getElementById("femaleCounter").innerHTML = femalePC + "%";
		document.getElementById("femaleCounter").style.width = femalePC + "%";
		
		var URMStudentsSQL = JSON.parse(result.URMStudents);
		URMStudentsSQL = parseInt(URMStudentsSQL[0]);
		
		var raceStudentsSQL = JSON.parse(result.raceStudents);
		raceStudentsSQL = parseInt(raceStudentsSQL[0]);
		
		var URMPC = parseInt(URMStudentsSQL/raceStudentsSQL * 100);
		document.getElementById("URMCounter").innerHTML = URMPC + "%";
		document.getElementById("URMCounter").style.width = URMPC + "%";

		// Plot Data - Program
		let programDataArray, programLabelArray;
		[programDataArray, programLabelArray] = getQuestionArrays('programPlot', result);
		
		// Plot Data - Degree
		let degreeDataArray, degreeLabelArray;
		[degreeDataArray, degreeLabelArray] = getQuestionArrays('degreePlot', result);
		
		// Plot Data - Gender
		let genderDataArray, genderLabelArray;
		[genderDataArray, genderLabelArray] = getQuestionArrays('genderPlot', result);
		
		// Plot Data - Race
		let raceDataArray, raceLabelArray;
		[raceDataArray, raceLabelArray] = getQuestionArrays('racePlot', result);
				
		// Plot Data - Department
		let departmentDataArray, departmentLabelArray;
		[departmentDataArray, departmentLabelArray] = getQuestionArrays('departmentPlot', result);
		
		// Get Departments Not represented
		var allDepartments = ['Course 1 - Civil and Environmental Engineering',
                   'Course 2 - Mechanical Engineering','Course 3 - Material Science',
                   'Course 4 - Architecture','Course 5 - Chemistry','Course 6 - Electrical Engineering and Computer Science',
                   'Course 7 - Biology','Course 8 - Physics','Course 9 - Brain and Cognitive Sciences',
                   'Course 10 - Chemical Engineering','Course 11 - Urban Studies and Planning',
                   'Course 12 - Earth, Atmospheric and Planetary Sciences','Course 14 - Economics',
                   'Course 15 - Management','Course 16 - Aeronautics and Astronautics',
                   'Course 17 - Political Science','Course 18 - Mathematics',
                   'Course 20 - Biological Engineering','Course 21 - Humanities',
                   '21A - Anthropology','21E/21S - Humanities + Engineering/Science',
                   '21G - Global Studies and Languages','21H - History','21L - Literature',
                   '21M - Music and Theater Arts','22 - Nuclear Science and Engineering',
                   '24 - Linguistics','CMS/21W - Comparative Media Studies / Writing',
                   'IDS - Data, Systems and Society','IMES - Medical Engineering and Science',
                   'MAS - Media Arts and Science','STS - Science, Technology and Society']
		var missingDepartment = allDepartments.filter(x => !departmentLabelArray.includes(x));
		var missingDepartmentString = missingDepartment.join('<br>')
		var missingDepDiv = document.getElementById('missingDepDiv')
		missingDepDiv.innerHTML = '<b>Departments not represented :</b><br>' + missingDepartmentString;
		
		// Plot Data - Pipeline
		var pipelinePlotData = JSON.parse(result.pipelinePlot);
		// Sort in Descending order
		pipelinePlotData = pipelinePlotData.sort(function(a, b){
			return b[1] - a[1];
		});
		
		var pipelineDataArray =  [];
		var pipelineLabelArray = [];
		var pipelineOther = '<b>Other Responses:</b><br>';
		for (i = 0; i < pipelinePlotData.length; i++) {
			if(i<10){
				 pipelineDataArray.push(parseInt(pipelinePlotData[i][1]));
				 pipelineLabelArray.push(String(pipelinePlotData[i][0]));
			}else{
				pipelineOther = pipelineOther + String(pipelinePlotData[i][0]) + ' : ' + parseInt(pipelinePlotData[i][1]) + '<br>';
			}
		}
		
		if(pipelinePlotData.length > 10){
			var pipelineDiv = document.getElementById('pipelineDiv')
			pipelineDiv.innerHTML = pipelineOther;
		}
		
		// Comments Data
		var commentsData = JSON.parse(result.comments);
		var commentsInnerHTML;
		for (i = 0; i < commentsData.length; i++) {
			tempComment = String(commentsData[i]);
			if(i==0){
				commentsInnerHTML = '' + tempComment;
			} else {
				commentsInnerHTML = commentsInnerHTML + '<br><br>' + tempComment;
			}
		}
		
		var commentsDiv = document.getElementById('commentsDiv')
		commentsDiv.innerHTML = commentsInnerHTML;

		///Questions
		var Q1_LearnSI = parseFloat(JSON.parse(result.Q1_LearnSI));
		var Q1_LearnVS = parseFloat(JSON.parse(result.Q1_LearnVS));
		var Q1_LearnSocPol = parseFloat(JSON.parse(result.Q1_LearnSocPol));
		var Q1_LearnLead = parseFloat(JSON.parse(result.Q1_LearnLead));
		var Q1_ParticPol = parseFloat(JSON.parse(result.Q1_ParticPol));
		
		var Q2_ImpContext = parseFloat(JSON.parse(result.Q2_ImpContext));
		var Q2_ImpExp = parseFloat(JSON.parse(result.Q2_ImpExp));
		var Q2_ImpSkill = parseFloat(JSON.parse(result.Q2_ImpSkill));
		var Q2_ImpRes = parseFloat(JSON.parse(result.Q2_ImpRes));
		var Q2_ImpNet = parseFloat(JSON.parse(result.Q2_ImpNet));
		
		var Q3_EquipVol = parseFloat(JSON.parse(result.Q3_EquipVol));
		var Q3_EquipCom = parseFloat(JSON.parse(result.Q3_EquipCom));
		var Q3_EquipCareer = parseFloat(JSON.parse(result.Q3_EquipCareer));
		
		// Create arrays 
		var Q1_DataLabels = ["Participating in politics or community affairs", "Volunteering and service", "Social and political change", "Community Leadership", "Exploring social issues"];
		var Q1_DataArray = [Q1_ParticPol,Q1_LearnVS,Q1_LearnSocPol,Q1_LearnLead,Q1_LearnSI];
		
		var Q2_DataLabels = ["Understanding the context behind social issues", "Accessing resources", "Exposure to underserved communities", "Building a concrete skill-set","Networking"];
		var Q2_DataArray = [Q2_ImpContext, Q2_ImpRes, Q2_ImpExp, Q2_ImpSkill,Q2_ImpNet ];
		
		var Q3_DataLabels = ["Make a difference in your community", "Volunteer towards a cause", "Pursue a career in social impact"];
		var Q3_DataArray =[Q3_EquipCom,Q3_EquipVol,Q3_EquipCareer];

		//Plot data
				if(!firstRun){
					// Destroy Chart variables before recreating
					programChart.destroy();
					degreeChart.destroy();
					genderChart.destroy();
					raceChart.destroy();
					departmentChart.destroy();
					pipelineChart.destroy();
					interestChart.destroy();
					priorityChart.destroy();
					supportChart.destroy();
				}
				
				//Program Plot 
				let programData, chartOptionsProgram = plotData(programDataArray, 'rgba(0, 99, 132, 0.6)', 'rgba(0, 99, 132, 1)');
				
				// Degree Plot 
				let degreeData, chartOptionsDegree = plotData(degreeDataArray, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');

				//Gender Plot 
				let genderData, chartOptionsGender = plotData(genderDataArray, 'rgba(120, 99, 132, 0.6)', 'rgba(120, 99, 132, 1)');

				//Race Plot 
				let raceData, chartOptionsRace = plotData(raceDataArray, 'rgba(240, 99, 132, 0.6)', 'rgba(240, 99, 132, 1)');
				
				//Department Plot 
				let departmentData, chartOptionsDepartment = plotData(departmentDataArray, 'rgba(191, 191, 63, 0.8)', 'rgba(191, 191, 63, 0.8)', left_padding=50);

				// Learning Outcomes Bar Plots			
				var interestData = {
				  label: 'Degree of Interest (0-5)',
				  data:Q1_DataArray,
				  backgroundColor: 'rgba(120, 99, 132, 0.6)',
				  borderColor: 'rgba(120, 99, 132, 1)',
				  borderWidth: 0,
				  hoverBorderWidth: 0
				};
				
				var priorityData = {
				  label: 'Degree of Prioritization (0-5)',
				  data:Q2_DataArray,
				  backgroundColor: 'rgba(120, 99, 132, 0.6)',
				  borderColor: 'rgba(120, 99, 132, 1)',
				  borderWidth: 0,
				  hoverBorderWidth: 0
				};

				var supportData = {
				  label: 'Degree of Support (0-5)',
				  data:Q3_DataArray,
				  backgroundColor: 'rgba(120, 99, 132, 0.6)',
				  borderColor: 'rgba(120, 99, 132, 1)',
				  borderWidth: 0,
				  hoverBorderWidth: 0
				};

				var chartOptionsLearnOutcomes = {
				   legend: {
						display: false
					},
				  scales: {
							xAxes: [{
						        ticks: {
									    beginAtZero: true,
										max: 5,
										min: 0
							}
					}]	
				  },
					layout: {
						padding: {
						  left: 30
						}
					},
				  elements: {
					rectangle: {
					  borderSkipped: 'left',
					}
				  }
				};

				//Pipeline Plot 
				var pipelineData = {
				  label: 'Number of Students',
				  data: pipelineDataArray,
				  backgroundColor:'rgba(0, 99, 132, 0.6)',
				  borderColor: 'rgba(0, 99, 132, 1)',
				  borderWidth: 2,
				  hoverBorderWidth: 0
				};

				var chartOptionsPipeline = {
				   legend: {
						display: false
					},
				  scales: {
							xAxes: [{
						        ticks: {
								beginAtZero: true
							}
					}]	
				  },
				  elements: {
					rectangle: {
					  borderSkipped: 'left',
					}
				  }
				};

				programChart = getChart("programChart", programData, programLabelArray, chartOptionsProgram);
				degreeChart = getChart("degreeChart", degreeData, degreeLabelArray, chartOptionsDegree);
				genderChart = getChart("genderChart", genderData, genderLabelArray, chartOptionsGender);
				raceChart = getChart("raceChart", raceData, raceLabelArray, chartOptionsRace);
				departmentChart = getChart("departmentChart", departmentData, departmentLabelArray, chartOptionsDepartment);
				interestChart = getChart("interestChart", interestData, Q1_DataLabels, chartOptionsLearnOutcomes);
				priorityChart = getChart("prioritiesChart", priorityData, Q2_DataLabels, chartOptionsLearnOutcomes);
				supportChart = getChart("supportChart", supportData, Q3_DataLabels, chartOptionsLearnOutcomes);
				pipelineChart = getChart("pipelineChart", pipelineData, pipelineLabelArray, chartOptionsPipeline);
		}

function getCompletionDataPlots(result, firstRun=TRUE){
		
		var totalStudentsComplete = JSON.parse(result.allStudents);
		totalStudentsComplete = parseInt(totalStudentsComplete[0]);
		var expAnnualComplete = JSON.parse(result.allExpStudents);
		console.log(expAnnualComplete);
		var pcTargetComplete = parseInt((totalStudentsComplete/expAnnualComplete) * 100);
		if(pcTargetComplete>100){
			pcTargetComplete = 100;
		}
		document.getElementById("studentCompletion").innerHTML = totalStudentsComplete;
		document.getElementById("studentCompletion").style.width = pcTargetComplete + "%";

		//Exit Survey Questions
		let better_understanding_agree_array, better_understanding_agree_labels, gain_skills_social_change_agree_array,
		 gain_skills_social_change_agree_labels, confidence_influencing_social_change_agree_array, 
		 confidence_influencing_social_change_agree_labels, inspired_knowledge_forsocial_change_agree_array,
		  inspired_knowledge_forsocial_change_agree_labels, incorporate_social_change_effort_academics_agree_array,
		   incorporate_social_change_effort_academics_agree_labels,
		   incorporate_social_change_effort_career_agree_array, incorporate_social_change_effort_career_agree_labels;  

		better_understanding_agree_array, better_understanding_agree_labels = getQuestionArrays('better_understanding_agree', result);
		gain_skills_social_change_agree_array, gain_skills_social_change_agree_labels = getQuestionArrays('gain_skills_social_change_agree', result);
		confidence_influencing_social_change_agree_array, confidence_influencing_social_change_agree_labels = getQuestionArrays('confidence_influencing_social_change_agree', result);
		inspired_knowledge_forsocial_change_agree_array, inspired_knowledge_forsocial_change_agree_labels = getQuestionArrays('inspired_knowledge_forsocial_change_agree', result);
		incorporate_social_change_effort_academics_agree_array, incorporate_social_change_effort_academics_agree_labels = getQuestionArrays('incorporate_social_change_effort_academics_agree', result);
		incorporate_social_change_effort_career_agree_array, incorporate_social_change_effort_career_agree_labels = getQuestionArrays('incorporate_social_change_effort_career_agree', result);

		function detailedResponse(result, idName, jsonName){
			var currentData = JSON.parse(result[jsonName]);
			var optionalInnerHTML;
			for (i = 0; i < currentData.length; i++) {
				tempData = String(currentData[i]);
				if(i==0){
					optionalInnerHTML = '' + tempData;
				} else {
					optionalInnerHTML = optionalInnerHTML + '<br><br>' + tempData;
				}
			}
			let thisDiv = document.getElementById(idName);
			thisDiv.innerHTML = optionalInnerHTML;
		}
		//Effect on understanding of Social issues
		detailedResponse(result, "effect_understanding_social_issues", "effect_understanding_social_issues");
		//Effect on Confodence to Influence Social Change
		detailedResponse(result, "effect_confidence_influencing_social_change", "effect_confidence_influencing_social_change");
		//Motivation to Influence Social Change
		detailedResponse(result, "effect_motivation_social_change", "effect_motivation_social_change");
		//Associate name with feedback
		detailedResponse(result, "associate_name_feedback", "associate_name_feedback");
		// Learning Feedback
		detailedResponse(result, 'learningFeedDiv', 'learningFeed');
		// Optional Feedback
		detailedResponse(result, 'optionalFeedDiv', 'optionalFeed');
		
		// PKG Ambassador Feedback
		var ambDataFN = JSON.parse(result.pkgAmbFN);
		var ambDataLN = JSON.parse(result.pkgAmbLN);
		var ambDataEmail = JSON.parse(result.pkgAmbEmail);
		var ambInnerHTML;
		for (i = 0; i < ambDataEmail.length; i++) {
			tempEmail = String(ambDataEmail[i]);
			tempFN = String(ambDataFN[i]);
			tempLN = String(ambDataLN[i]);
			if(tempFN=='No response'){
				tempName='';
			}else{
				tempName='('+tempFN + ' ' + tempLN + ')';
			}
			if(i==0){
				ambInnerHTML = '' + tempEmail + ' ' + tempName;
			} else {
				ambInnerHTML = ambInnerHTML + '<br>' + tempEmail + ' ' + tempName;
			}
		}
		
		var pkgAmbDiv = document.getElementById('pkgAmbDiv')
		pkgAmbDiv.innerHTML = ambInnerHTML;
		// Plot Data
				//Structure PlotData
				//Program Plot 
				let better_understanding_agree_data, better_understanding_agree_chart_option;
				let inspired_knowledge_forsocial_change_agree_data, inspired_knowledge_forsocial_change_agree_chart_option;
				let gain_skills_agree_social_change_data, gain_skills_agree_social_change_chart_option;
				let confidence_influencing_social_change_agree_data, confidence_influencing_social_change_agree_chart_option;
				let incorporate_social_change_effort_academics_agree_data, incorporate_social_change_effort_academics_agree_chart_option;
				[better_understanding_agree_data, better_understanding_agree_chart_option] = plotData(better_understanding_agree_array, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');
				[inspired_knowledge_forsocial_change_agree_data, inspired_knowledge_forsocial_change_agree_chart_option] = plotData(inspired_knowledge_forsocial_change_agree_array, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');
				[gain_skills_agree_social_change_data, gain_skills_agree_social_change_chart_option] = plotData(gain_skills_social_change_agree_array, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');
				[confidence_influencing_social_change_agree_data, confidence_influencing_social_change_agree_chart_option] = plotData(confidence_influencing_social_change_agree_array, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');
				[incorporate_social_change_effort_academics_agree_data, incorporate_social_change_effort_academics_agree_chart_option] = plotData(incorporate_social_change_effort_academics_agree_array, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');
				
				if(!firstRun){
					// Destroy Chart variables before recreating
					better_understanding_agree.destroy();
					gain_skills_social_change_agree.destroy();
					confidence_influencing_social_change_agree.destroy();
					inspired_knowledge_forsocial_change_agree.destroy();
					incorporate_social_change_effort_academics_agree.destroy();
					incorporate_social_change_effort_career_agree.destroy();
				}
				// Create the Chart Variables (that will be updated via AJAX)
				better_understanding_agree = getChart("better_understanding_agree", better_understanding_agree_data, better_understanding_agree_labels, better_understanding_agree_chart_option);
				gain_skills_social_change_agree = getChart("gain_skills_social_change_agree", gain_skills_social_change_agree_data, gain_skills_social_change_agree_labels, gain_skills_agree_social_change_chart_option);
				confidence_influencing_social_change_agree = getChart("confidence_influencing_social_change_agree", confidence_influencing_social_change_agree_data, confidence_influencing_social_change_agree_labels, confidence_influencing_social_change_agree_chart_option);
				inspired_knowledge_forsocial_change_agree = getChart("inspired_knowledge_forsocial_change_agree", inspired_knowledge_forsocial_change_agree_data, inspired_knowledge_forsocial_change_agree_labels, inspired_knowledge_forsocial_change_agree_chart_option);
				incorporate_social_change_effort_academics_agree = getChart("incorporate_social_change_effort_academics_agree", incorporate_social_change_effort_academics_agree_data, incorporate_social_change_effort_academics_agree_labels, incorporate_social_change_effort_academics_agree_chart_option);
				incorporate_social_change_effort_career_agree = getChart("incorporate_social_change_effort_career_agree", incorporate_social_change_effort_career_agree_data, incorporate_social_change_effort_career_agree_labels, incorporate_social_change_effort_career_agree_chart_option);
		}
		
/// Get Value of Checked Boxes and Request Data
function getFilter(getCSV=false){
		// Year 
		var arrayAY = [];
		var checkboxesAY = document.querySelectorAll('input[type=checkbox]:checked.AY');

		for (var i = 0; i < checkboxesAY.length; i++) {
		  arrayAY.push(checkboxesAY[i].value);
		}

		// Degree
		var arrayDeg = [];
		var checkboxesDeg = document.querySelectorAll('input[type=checkbox]:checked.Deg');

		for (var i = 0; i < checkboxesDeg.length; i++) {
		  arrayDeg.push(checkboxesDeg[i].value);
		}

		// Gender 
		var arrayGender = [];
		var checkboxesGender = document.querySelectorAll('input[type=checkbox]:checked.Gender');

		for (var i = 0; i < checkboxesGender.length; i++) {
		  arrayGender.push(checkboxesGender[i].value);
		}

		// Race 
		var arrayRace = [];
		var checkboxesRace = document.querySelectorAll('input[type=checkbox]:checked.Race');

		for (var i = 0; i < checkboxesRace.length; i++) {
		  arrayRace.push(checkboxesRace[i].value);
		}

		// Prog
		var arrayProg = [];
		var checkboxesProg = document.querySelectorAll('input[type=checkbox]:checked.Prog');

		for (var i = 0; i < checkboxesProg.length; i++) {
		  arrayProg.push(checkboxesProg[i].value);
		}
		
		// Department
		var arrayDep = [];
		var checkboxesDep = document.querySelectorAll('input[type=checkbox]:checked.Dep');

		for (var i = 0; i < checkboxesDep.length; i++) {
		  arrayDep.push(checkboxesDep[i].value);
		}
		
		dataPush = {
						reqType:"filterData",
						prog:arrayProg,
						race:arrayRace,
						gender:arrayGender,
						deg:arrayDeg,
						ay:arrayAY,
						dep:arrayDep
					};
		
        $.ajax({
                    type: "POST",
                    url: "getResults.php",
					dataType:"json",
					data: dataPush
                })
                .done(function (output) {
					 //console.log(output);
                     var inputData = output;
					 
					 // Update Chart
					 getDataPlots(result=inputData,firstRun=false);
					 //console.log(inputData);				 
					 
                }).fail(function (jqXHR, textStatus) {
					 console.log(jqXHR);
					 console.log(textStatus);
					 console.log(jqXHR.responseText);
				});

		/// Get Completion Data
		dataCompletionPush = {
						reqType:"completionDataFilter",
						prog:arrayProg,
						race:arrayRace,
						gender:arrayGender,
						deg:arrayDeg,
						ay:arrayAY,
						dep:arrayDep
				}

		$.ajax({
                    type: "POST",
                    url: "getResults.php",
					dataType:"json",
					data:dataCompletionPush
                })
                .done(function (output) {
                     var completionData = output;
					 getCompletionDataPlots(result=completionData,firstRun=false);
					 	 
                }).fail(function (jqXHR, textStatus) {
					 console.log(jqXHR);
					 console.log(textStatus);
					 console.log(jqXHR.responseText);
				});
				
				

				
		if(getCSV==true){
				// Get Download Objects
				var password = document.getElementById("passwd").value;
				document.getElementById("authMsg").innerHTML = 'Authenticating. Please Wait ...';
		
				dataDownloadPush = {
									reqType:"downloadData",
									prog:arrayProg,
									race:arrayRace,
									gender:arrayGender,
									deg:arrayDeg,
									ay:arrayAY,
									dep:arrayDep,
									passwd:password
							}
			
				$.ajax({
                    type: "POST",
                    url: "getResults.php",
					dataType:"json",
					data:dataDownloadPush
                })
                .done(function (output) {
                     var downloadData = output;
					 document.getElementById("passwd").value = '';
					 document.getElementById("authMsg").innerHTML = '';
					 // Check for Auth
					 if(output.auth=='Failure'){
						 alert('Invalid Password');
					 }else{
						 hidePassDiv();
						 var registrationData = JSON.parse(downloadData.registrationData);
						 var completionData = JSON.parse(downloadData.completionData);
						 var regTableNames = JSON.parse(downloadData.regTableNames);
						 var completionTableNames = JSON.parse(downloadData.completionTableNames);
						 
						 // Get Registration Table Names
						 var regNamesVector = [];
						 for (i = 0; i < regTableNames.length; i++) {
							regNamesVector[i]=regTableNames[i][0];
						 }
						 
						 var completionNamesVector = [];
						 for (i = 0; i < completionTableNames.length; i++) {
							completionNamesVector[i]=completionTableNames[i][0];
						 } 
						 exportToCsv('registrationData.csv',registrationData,regNamesVector);
						 exportToCsv('programCompletionData.csv',completionData,completionNamesVector);
					 }
					 
					 	 
                }).fail(function (jqXHR, textStatus) {
					 alert('Invalid Password or Connection');
					 document.getElementById("passwd").value = '';
					 document.getElementById("authMsg").innerHTML = '';
					 console.log(jqXHR);
					 console.log(textStatus);
					 console.log(jqXHR.responseText);
				});
		}			
}

/// Get Unique Array Elements
function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

function flattenArray(array){
	var newArr =[];
	for(var i = 0; i < array.length; i++){
		newArr = newArr.concat(array[i]);
	}
	return newArr;
}

/// Set Filters
function getCheckBox(filterInput){
	// Race 
	var raceUL = document.getElementById('RaceUL');
	var raceULList = '';
	var raceULArray1 = JSON.parse(filterInput.raceList);
	var raceULArray2 = JSON.parse(filterInput.raceList2);
	var raceULArray = arrayUnique(flattenArray(raceULArray1.concat(raceULArray2)));
	for(i=0;i<raceULArray.length;i++){
		raceULList = raceULList + '<li><input type="checkbox" class="Race" value="'+raceULArray[i]+'"/> '+raceULArray[i]+' </li>';
	}
	raceUL.innerHTML = raceULList;
	
	// Gender
	var genderUL = document.getElementById('GenderUL');
	var genderULList = '';
	var genderULArray1 = JSON.parse(filterInput.genderList);
	var genderULArray2 = JSON.parse(filterInput.genderList2);
	var genderULArray = arrayUnique(flattenArray(genderULArray1.concat(genderULArray2)));
	for(i=0;i<genderULArray.length;i++){
		genderULList = genderULList + '<li><input type="checkbox" class="Gender" value="'+genderULArray[i]+'"/> '+genderULArray[i]+' </li>';
	}
	genderUL.innerHTML = genderULList;

	// Program
	var progUL = document.getElementById('ProgUL');
	var progULList = '';
	var progULArray1 = JSON.parse(filterInput.pkgProgramList);
	var progULArray2 = JSON.parse(filterInput.pkgProgramList2);
	var progULArray = arrayUnique(flattenArray(progULArray1.concat(progULArray2)));
	for(i=0;i<progULArray.length;i++){
		progULList = progULList + '<li><input type="checkbox" class="Prog" value="'+progULArray[i]+'"/> '+progULArray[i]+' </li>';
	}
	progUL.innerHTML = progULList;

	// Department
	var depUL = document.getElementById('DepUL');
	var depULList = '';
	var depULArray1 = JSON.parse(filterInput.depList);
	var depULArray2 = JSON.parse(filterInput.depList2);
	var depULArray = arrayUnique(flattenArray(depULArray1.concat(depULArray2)));
	for(i=0;i<depULArray.length;i++){
		depULList = depULList + '<li><input type="checkbox" class="Dep" value="'+depULArray[i]+'"/> '+depULArray[i]+' </li>';
	}
	depUL.innerHTML = depULList;

	// AY
	var ayUL = document.getElementById('AYUL');
	var ayULList = '';
	var ayULArray1 = JSON.parse(filterInput.ayList);
	var ayULArray2 = JSON.parse(filterInput.ayList2);
	var ayULArray = arrayUnique(flattenArray(ayULArray1.concat(ayULArray2)));
	for(i=0;i<ayULArray.length;i++){
		ayULList = ayULList + '<li><input type="checkbox" class="AY" value="'+ayULArray[i]+'"/> '+ayULArray[i]+' </li>';
	}
	ayUL.innerHTML = ayULList;

	// Degree
	var degUL = document.getElementById('DegUL');
	var degULList = '';
	var degULArray1 = JSON.parse(filterInput.degList);
	var degULArray2 = JSON.parse(filterInput.degList2);
	var degULArray = arrayUnique(flattenArray(degULArray1.concat(degULArray2)));

	for(i=0;i<degULArray.length;i++){
		degULList = degULList + '<li><input type="checkbox" class="Deg" value="'+degULArray[i]+'"/> '+degULArray[i]+' </li>';
	}
	degUL.innerHTML = degULList;

}
	/// Set up the Page
	        $.ajax({
                    type: "POST",
                    url: "getResults.php",
					dataType:"json",
					data: {reqType:"getFilters"},
					async:false
                })
                .done(function (output) {
                     var inputFilters = output;
					 // Update Filters
					 getCheckBox(filterInput=inputFilters);					 
					 
                }).fail(function (jqXHR, textStatus) {
					 console.log(jqXHR);
					 console.log(textStatus);
					 console.log(jqXHR.responseText);
				});
    $.ajax({
                    type: "POST",
                    url: "getResults.php",
					data:{reqType:"allData"},
					async:false
                })
                .done(function (output) {
					 //console.log(output);
                     var inputData = $.parseJSON(output);
					 //testData = inputData;
					 getDataPlots(result=inputData,firstRun=true);
					 //console.log(result);
					 	 
                });

	/// Get Completion Data
    $.ajax({
                    type: "POST",
                    url: "getResults.php",
					data:{reqType:"completionData"},
					async:false
                })
                .done(function (output) {
					 //console.log(output);
                     var completionData = $.parseJSON(output);
					 //testData = completionData;
					 getCompletionDataPlots(result=completionData,firstRun=true);
					 //console.log(result);
					 	 
                });
				
		/// Check List for Filter
		var checkListAY = document.getElementById('listAY');
		checkListAY.getElementsByClassName('anchor')[0].onclick = function(evt) {
		  if (checkListAY.classList.contains('visible'))
			checkListAY.classList.remove('visible');
		  else
			checkListAY.classList.add('visible');
		}

		var checkListProg = document.getElementById('listProg');
		checkListProg.getElementsByClassName('anchor')[0].onclick = function(evt) {
		  if (checkListProg.classList.contains('visible'))
			checkListProg.classList.remove('visible');
		  else
			checkListProg.classList.add('visible');
		}

		var checkListRace = document.getElementById('listRace');
		checkListRace.getElementsByClassName('anchor')[0].onclick = function(evt) {
		  if (checkListRace.classList.contains('visible'))
			checkListRace.classList.remove('visible');
		  else
			checkListRace.classList.add('visible');
		}

		var checkListDep = document.getElementById('listDep');
		checkListDep.getElementsByClassName('anchor')[0].onclick = function(evt) {
		  if (checkListDep.classList.contains('visible'))
			checkListDep.classList.remove('visible');
		  else
			checkListDep.classList.add('visible');
		}

		var checkListGender = document.getElementById('listGender');
		checkListGender.getElementsByClassName('anchor')[0].onclick = function(evt) {
		  if (checkListGender.classList.contains('visible'))
			checkListGender.classList.remove('visible');
		  else
			checkListGender.classList.add('visible');
		}

		var checkListDegree = document.getElementById('listDegree');
		checkListDegree.getElementsByClassName('anchor')[0].onclick = function(evt) {
		  if (checkListDegree.classList.contains('visible'))
			checkListDegree.classList.remove('visible');
		  else
			checkListDegree.classList.add('visible');
		}

		// Set all options as true
		$("input[type='checkbox']").prop("checked", true);

		// Set all options as true
		function selectAll(){
			if($( "#listAY" ).hasClass( "visible" )){
				$('.AY:checkbox').prop("checked", true);
			}
			
			if($( "#listDegree" ).hasClass( "visible" )){
				$('.Deg:checkbox').prop("checked", true);
			}
			
			if($( "#listGender" ).hasClass( "visible" )){
				$('.Gender:checkbox').prop("checked", true);
			}
			
			if($( "#listRace" ).hasClass( "visible" )){
				$('.Race:checkbox').prop("checked", true);
			}
			
			if($( "#listDep" ).hasClass( "visible" )){
				$('.Dep:checkbox').prop("checked", true);
			}
			
			if($( "#listProg" ).hasClass( "visible" )){
				$('.Prog:checkbox').prop("checked", true);
			}
		}

		// Uncheck all options
		function unselectAll(){
			if($( "#listAY" ).hasClass( "visible" )){
				$('.AY:checkbox').prop("checked", false);
			}
			
			if($( "#listDegree" ).hasClass( "visible" )){
				$('.Deg:checkbox').prop("checked", false);
			}
			
			if($( "#listGender" ).hasClass( "visible" )){
				$('.Gender:checkbox').prop("checked", false);
			}
			
			if($( "#listRace" ).hasClass( "visible" )){
				$('.Race:checkbox').prop("checked", false);
			}
			
			if($( "#listDep" ).hasClass( "visible" )){
				$('.Dep:checkbox').prop("checked", false);
			}
			
			if($( "#listProg" ).hasClass( "visible" )){
				$('.Prog:checkbox').prop("checked", false);
			}
		}

		// Show Password Div 
		function showPassDiv(){
			var passDivElem = document.getElementById('passwdDiv');
			$(passDivElem).show();
		}
		
		function hidePassDiv(){
			var passDivElem = document.getElementById('passwdDiv');
			$(passDivElem).hide();
		}
		hidePassDiv();

		//// Print Functionality
		function printReport()
		{
			var elemSide = document.getElementById('sidePageBody');
			var elemPrint1 = document.getElementById('printPageBodyInner1');
			var elemPrint2 = document.getElementById('printPageBodyInner2');
			var elemPrint3 = document.getElementById('printPageBodyInner3');
			var elemPrint4 = document.getElementById('printPageBodyInner4');
			var elemButtons = document.getElementById('buttonDiv');
			$(elemPrint1).removeClass("w3-card");
			$(elemPrint2).removeClass("w3-card");
			$(elemPrint3).removeClass("w3-card");
			$(elemPrint4).removeClass("w3-card");
			
			var DD1 = document.getElementById('listAY');
			var DD2 = document.getElementById('listDegree');
			var DD3 = document.getElementById('listGender');
			var DD4 = document.getElementById('listRace');
			var DD5 = document.getElementById('listDep');
			var DD6 = document.getElementById('listProg');
			$(DD1).addClass("visible");
			$(DD2).addClass("visible");
			$(DD3).addClass("visible");
			$(DD4).addClass("visible");
			$(DD5).addClass("visible");
			$(DD6).addClass("visible");
			
			var departmentDiv = document.getElementById('missingDepDiv');
			var pipelineDiv = document.getElementById('pipelineDiv');
			var commentsDiv = document.getElementById('commentsDiv');
			var pkgAmbDiv = document.getElementById('pkgAmbDiv');
			var learningFeedDiv = document.getElementById('learningFeedDiv');
			var optionalFeedDiv = document.getElementById('optionalFeedDiv');
			
			$(departmentDiv).removeClass("overflowMinimal");
			$(pipelineDiv).removeClass("overflowMinimal");
			$(commentsDiv).removeClass("overflowMinimal");
			$(pkgAmbDiv).removeClass("overflowMinimal");
			$(learningFeedDiv).removeClass("overflowMinimal");
			$(optionalFeedDiv).removeClass("overflowMinimal");
			
			$(elemButtons).hide();
			$(elemSide).hide();

			window.print();
			$(elemSide).show();
			$(elemButtons).show();
			$(elemPrint1).addClass("w3-card");
			$(elemPrint2).addClass("w3-card");
			$(elemPrint3).addClass("w3-card");
			$(elemPrint4).addClass("w3-card");
			
			$(departmentDiv).addClass("overflowMinimal");
			$(pipelineDiv).addClass("overflowMinimal");
			$(commentsDiv).addClass("overflowMinimal");
			$(pkgAmbDiv).addClass("overflowMinimal");
			$(learningFeedDiv).addClass("overflowMinimal");
			$(optionalFeedDiv).addClass("overflowMinimal");
			
			return false;
		}
		
		// Log User
		$.ajax({
                    type: "POST",
                    url: "loginfo.php",
					data:{userName:document.getElementById("certName").innerHTML},
					async:false
                })
                .done(function (output) {
					// Do Nothing
                }).fail(function (jqXHR, textStatus) {
					 console.log(jqXHR);
					 console.log(textStatus);
					 console.log(jqXHR.responseText);
				});


