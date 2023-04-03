// https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
function exportToCsv(filename, rows, header) {
	let processRow = function (row) {
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
	const returnData = {
		label: 'Number of Students',
		data: someData,
		backgroundColor:bColor,
		borderColor: borColor,
		borderWidth: 2,
		hoverBorderWidth: 0
	  };

	const currentChartOptions = {
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
	const [programDataArray, programLabelArray] = getQuestionArrays('programPlot', result);
	
	// Plot Data - Degree
	const [degreeDataArray, degreeLabelArray] = getQuestionArrays('degreePlot', result);

	// Plot Data - Gender
	const [genderDataArray, genderLabelArray] = getQuestionArrays('genderPlot', result);
	
	// Plot Data - Race
	const [raceDataArray, raceLabelArray] = getQuestionArrays('racePlot', result);
			
	// Plot Data - Department
	const [departmentDataArray, departmentLabelArray] = getQuestionArrays('departmentPlot', result);
	
	// Get Departments Not represented
	var allDepartments = [
							'Course 1 - Civil and Environmental Engineering',
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
							'MAS - Media Arts and Science','STS - Science, Technology and Society'
						]
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
	const [programData, chartOptionsProgram] = plotData(programDataArray, 'rgba(0, 99, 132, 0.6)', 'rgba(0, 99, 132, 1)');
	
	// Degree Plot 
	const [degreeData, chartOptionsDegree] = plotData(degreeDataArray, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');

	//Gender Plot 
	const [genderData, chartOptionsGender] = plotData(genderDataArray, 'rgba(120, 99, 132, 0.6)', 'rgba(120, 99, 132, 1)');

	//Race Plot 
	const [raceData, chartOptionsRace] = plotData(raceDataArray, 'rgba(240, 99, 132, 0.6)', 'rgba(240, 99, 132, 1)');
	
	//Department Plot 
	const [departmentData, chartOptionsDepartment] = plotData(departmentDataArray, 'rgba(191, 191, 63, 0.8)', 'rgba(191, 191, 63, 0.8)', left_padding=50);

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

function detailedResponse(result, jsonName){
	let currentData = JSON.parse(result[jsonName]);
	let resp;
	for (i = 0; i < currentData.length; i++) {
		const str = currentData[i].toString().trim();
		if (str === null || str === "" || str === "undefined") continue;
		if(i==0){
			resp = '' + str;
		} else {
			resp = resp + '<br><br>' + str;
		}
	}
	return resp;
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

	const [better_understanding_agree_array, better_understanding_agree_labels] = getQuestionArrays('better_understanding_agree', result);
	const [gain_skills_social_change_agree_array, gain_skills_social_change_agree_labels] = getQuestionArrays('gain_skills_social_change_agree', result);
	const [confidence_influencing_social_change_agree_array, confidence_influencing_social_change_agree_labels] = getQuestionArrays('confidence_influencing_social_change_agree', result);
	const [inspired_knowledge_forsocial_change_agree_array, inspired_knowledge_forsocial_change_agree_labels] = getQuestionArrays('inspired_knowledge_forsocial_change_agree', result);
	const [incorporate_social_change_effort_academics_agree_array, incorporate_social_change_effort_academics_agree_labels] = getQuestionArrays('incorporate_social_change_effort_academics_agree', result);
	const [incorporate_social_change_effort_career_agree_array, incorporate_social_change_effort_career_agree_labels] = getQuestionArrays('incorporate_social_change_effort_career_agree', result);

	//Effect on understanding of Social issues
	document.getElementById("effect_understanding_social_issues").innerHTML = detailedResponse(result, "effect_understanding_social_issues");
	//Effect on Confidence to Influence Social Change
	document.getElementById("effect_confidence_influencing_social_change").innerHTML = detailedResponse(result, "effect_confidence_influencing_social_change");
	//Motivation to Influence Social Change
	document.getElementById("effect_motivation_social_change").innerHTML = detailedResponse(result, "effect_motivation_social_change");
	// Learning Feedback
	document.getElementById("learningFeedDiv").innerHTML = detailedResponse(result, "learningFeed");
	// Optional Feedback
	document.getElementById("optionalFeedDiv").innerHTML = detailedResponse(result, "optionalFeed");
	
	// PKG Ambassador Feedback
	const ambDataFN = JSON.parse(result.pkgAmbFN);
	const ambDataLN = JSON.parse(result.pkgAmbLN);
	const ambDataEmail = JSON.parse(result.pkgAmbEmail);
	let ambInnerHTML;
	for (i = 0; i < ambDataEmail.length; i++) {
		let tempFN = ambDataFN[i].toString();
		let tempName;
		if(tempFN=='No response'){
			tempName='';
		}else{
			tempName='('+ambDataFN[i].toString() + ' ' + ambDataLN[i].toString() + ')';
		}
		if(i==0){
			ambInnerHTML = '' + ambDataEmail[i].toString() + ' ' + tempName;
		} else {
			ambInnerHTML = ambInnerHTML + '<br>' + ambDataEmail[i].toString() + ' ' + tempName;
		}
	}
	document.getElementById('pkgAmbDiv').innerHTML = ambInnerHTML;

	
	// Plot Data
	//Structure PlotData
	//Program Plot 
	const [better_understanding_agree_data, better_understanding_agree_chart_option] = plotData(better_understanding_agree_array, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');
	const [inspired_knowledge_forsocial_change_agree_data, inspired_knowledge_forsocial_change_agree_chart_option] = plotData(inspired_knowledge_forsocial_change_agree_array, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');
	const [gain_skills_social_change_agree_data, gain_skills_social_change_agree_chart_option] = plotData(gain_skills_social_change_agree_array, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');
	const [confidence_influencing_social_change_agree_data, confidence_influencing_social_change_agree_chart_option] = plotData(confidence_influencing_social_change_agree_array, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');
	const [incorporate_social_change_effort_academics_agree_data, incorporate_social_change_effort_academics_agree_chart_option] = plotData(incorporate_social_change_effort_academics_agree_array, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');
	const [incorporate_social_change_effort_career_agree_data, incorporate_social_change_effort_career_agree_chart_option] = plotData(incorporate_social_change_effort_career_agree_array, 'rgba(33, 96, 1, 0.6)', 'rgba(33, 96, 1, 1)');
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
	gain_skills_social_change_agree = getChart("gain_skills_social_change_agree", gain_skills_social_change_agree_data, gain_skills_social_change_agree_labels, gain_skills_social_change_agree_chart_option);
	confidence_influencing_social_change_agree = getChart("confidence_influencing_social_change_agree", confidence_influencing_social_change_agree_data, confidence_influencing_social_change_agree_labels, confidence_influencing_social_change_agree_chart_option);
	inspired_knowledge_forsocial_change_agree = getChart("inspired_knowledge_forsocial_change_agree", inspired_knowledge_forsocial_change_agree_data, inspired_knowledge_forsocial_change_agree_labels, inspired_knowledge_forsocial_change_agree_chart_option);
	incorporate_social_change_effort_academics_agree = getChart("incorporate_social_change_effort_academics_agree", incorporate_social_change_effort_academics_agree_data, incorporate_social_change_effort_academics_agree_labels, incorporate_social_change_effort_academics_agree_chart_option);
	incorporate_social_change_effort_career_agree = getChart("incorporate_social_change_effort_career_agree", incorporate_social_change_effort_career_agree_data, incorporate_social_change_effort_career_agree_labels, incorporate_social_change_effort_career_agree_chart_option);
}
		
/// Get Value of Checked Boxes and Request Data
function getFilter(getCSV=false){
	function getChecked(chkboxName) {
		var arrayName = [];
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked.'.concat(chkboxName));
		for (const val of checkboxes) {
		  arrayName.push(val.value);
		}
		return arrayName;
	}

	// Year 
	var arrayAY = getChecked('AY');
	// Degree
	var arrayDeg = getChecked('Deg');
	// Gender 
	var arrayGender = getChecked("Gender");
	// Race 
	var arrayRace = getChecked("Race");
	// Prog
	var arrayProg = getChecked("Prog");
	// Department
	var arrayDep = getChecked("Dep");
		
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
				var inputData = output;
				// Update Chart
				getDataPlots(result=inputData,firstRun=false);
				
			}).fail(function (jqXHR, textStatus) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(jqXHR.responseText);
			});

	// Get Completion Data
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
			//fails here
			})
			.done(function (output) {
				var completionData = output;
				getCompletionDataPlots(result=completionData,firstRun=false);
			}).fail(function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
				console.log(jqXHR.responseText);
			});
				
	if(getCSV){
		// Download Objects
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

	// Get Checkbox Values
function getCheckBox(filterInput){
	function filterCategory(elemID, list1, list2, className){
		const valUL = document.getElementById(elemID);
		var valULList = '';
		const valArray1 = JSON.parse(list1);
		const valArray2 = JSON.parse(list2);
		var valULArray = arrayUnique(flattenArray(valArray1.concat(valArray2)));
		for(const someVal of valULArray){
			valULList = valULList + '<li><input type="checkbox" class="'+ className +'" value="'+ someVal +'"/> '+ someVal +' </li>';
		}
		valUL.innerHTML = valULList;
	}
	// Race 
	filterCategory("RaceUL", filterInput.raceList, filterInput.raceList2, "Race");
	// Gender
	filterCategory("GenderUL", filterInput.genderList, filterInput.genderList2, "Gender");
	// Program
	filterCategory("ProgUL", filterInput.pkgProgramList, filterInput.pkgProgramList2, "Prog");
	// Department
	filterCategory("DepUL", filterInput.depList, filterInput.depList2, "Dep");
	// AY
	filterCategory("AYUL", filterInput.ayList, filterInput.ayList2, "AY");
	// Degree
	filterCategory("DegUL", filterInput.degList, filterInput.degList2, "Deg");
}

/// Set up the Page, obtain checkbox values
$.ajax({
		type: "POST",
		url: "getResults.php",
		dataType:"json",
		data: {reqType:"getFilters"},
		async:false
	})
	.done(function (output) {
			var inputFilters = output;
			getCheckBox(filterInput=inputFilters);					 
			
	}).fail(function (jqXHR, textStatus) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(jqXHR.responseText);
	});

//Get all Registration data
$.ajax({
	type: "POST",
	url: "getResults.php",
	data:{reqType:"allData"},
	async:false
	})
	.done(function (output) {
		var inputData = $.parseJSON(output);
		getDataPlots(result=inputData,firstRun=true);					 	 
	});


/// Get all Completion Data
$.ajax({
		type: "POST",
		url: "getResults.php",
		data:{reqType:"completionData"},
		async:false
	})
	.done(function (output) {
			var completionData = $.parseJSON(output);
			getCompletionDataPlots(result=completionData,firstRun=true);					 	 
	});
				
/// Check List for Filter
function checkList(elementName) {
	let cList = document.getElementById(elementName);
	cList.getElementsByClassName('anchor')[0].onclick = function() {
		if (cList.classList.contains('visible')){
			cList.classList.remove('visible');
		}
		else {
			cList.classList.add('visible');
		}
	}
}

checkList('listAY');
checkList('listProg');
checkList('listRace');
checkList('listGender');
checkList('listDep');
checkList('listDegree');

// Set all options as true
$("input[type='checkbox']").prop("checked", true);

// Checking and unchecking options
function setVals(value){
	if($( "#listAY" ).hasClass( "visible" )){
		$('.AY:checkbox').prop("checked", value);
	}
	
	if($( "#listDegree" ).hasClass( "visible" )){
		$('.Deg:checkbox').prop("checked", value);
	}
	
	if($( "#listGender" ).hasClass( "visible" )){
		$('.Gender:checkbox').prop("checked", value);
	}
	
	if($( "#listRace" ).hasClass( "visible" )){
		$('.Race:checkbox').prop("checked", value);
	}
	
	if($( "#listDep" ).hasClass( "visible" )){
		$('.Dep:checkbox').prop("checked", value);
	}
	
	if($( "#listProg" ).hasClass( "visible" )){
		$('.Prog:checkbox').prop("checked", value);
	}
}

const selectAll = () => setVals(true);
const unselectAll = () => setVals(false);

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
	.done(function () {
		// Do Nothing
	}).fail(function (jqXHR, textStatus) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(jqXHR.responseText);
	});


