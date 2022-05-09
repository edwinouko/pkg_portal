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




function getDataPlots(result, firstRun=TRUE){
		

		//////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////// Update Data
		//////////////////////////////////////////////////////////////////////////////////////////		
			
		if (firstRun==true){
			var updateTime = JSON.parse(result.updateTime);
			document.getElementById("lastUpdatedTag").innerHTML = '<b>Last Updated : </b>' + updateTime;
		}	
		
		var totalStudentsSQL = JSON.parse(result.allStudents);
		totalStudentsSQL = parseInt(totalStudentsSQL[0]);
		//console.log(totalStudentsSQL);
		var expAnnualStudents = JSON.parse(result.allExpStudents);
		var pcTarget = parseInt((totalStudentsSQL/expAnnualStudents) * 100);
		if(pcTarget>100){
			pcTarget = 100;
		}
		document.getElementById("studentCounter").innerHTML = totalStudentsSQL;
		document.getElementById("studentCounter").style.width = pcTarget + "%";
			
		var departmentNumSQL = JSON.parse(result.departmentNum);
		departmentNumSQL = parseInt(departmentNumSQL[0]);
		//console.log(departmentNumSQL);
		var depTarget = parseInt(departmentNumSQL/40 * 100);
		document.getElementById("departmentCounter").innerHTML = departmentNumSQL;
		document.getElementById("departmentCounter").style.width = depTarget + "%";
		
		var femaleStudentsSQL = JSON.parse(result.femaleStudents);
		femaleStudentsSQL = parseInt(femaleStudentsSQL[0]);
		
		var genderStudentsSQL = JSON.parse(result.genderStudents);
		genderStudentsSQL = parseInt(genderStudentsSQL[0]);
		
		//console.log(femaleStudentsSQL);
		var femalePC = parseInt(femaleStudentsSQL/genderStudentsSQL * 100);
		document.getElementById("femaleCounter").innerHTML = femalePC + "%";
		document.getElementById("femaleCounter").style.width = femalePC + "%";
		
		var URMStudentsSQL = JSON.parse(result.URMStudents);
		URMStudentsSQL = parseInt(URMStudentsSQL[0]);
		
		var raceStudentsSQL = JSON.parse(result.raceStudents);
		raceStudentsSQL = parseInt(raceStudentsSQL[0]);
		
		//console.log(URMStudentsSQL);
		var URMPC = parseInt(URMStudentsSQL/raceStudentsSQL * 100);
		document.getElementById("URMCounter").innerHTML = URMPC + "%";
		document.getElementById("URMCounter").style.width = URMPC + "%";



		// Plot Data - Program
		var programPlotData = JSON.parse(result.programPlot);
		var programDataArray =  []; //[40, 70, 100, 120,20];
		var programLabelArray = []; //["Fellowships","Summer Immersion","IDEAS","Social Impact Employment","ACE"];
		var i;
		for (i = 0; i < programPlotData.length; i++) {
		  programDataArray.push(parseInt(programPlotData[i][1]));
		  programLabelArray.push(String(programPlotData[i][0]));
		}
		
		// Plot Data - Degree
		var degreePlotData = JSON.parse(result.degreePlot);
		var degreeDataArray =  [];
		var degreeLabelArray = [];
		for (i = 0; i < degreePlotData.length; i++) {
		  degreeDataArray.push(parseInt(degreePlotData[i][1]));
		  degreeLabelArray.push(String(degreePlotData[i][0]));
		}
		
		// Plot Data - Gender
		var genderPlotData = JSON.parse(result.genderPlot);
		var genderDataArray =  [];
		var genderLabelArray = [];
		for (i = 0; i < genderPlotData.length; i++) {
		  genderDataArray.push(parseInt(genderPlotData[i][1]));
		  genderLabelArray.push(String(genderPlotData[i][0]));
		}
		
		// Plot Data - Race
		var racePlotData = JSON.parse(result.racePlot);
		var raceDataArray =  [];
		var raceLabelArray = [];
		for (i = 0; i < racePlotData.length; i++) {
		  raceDataArray.push(parseInt(racePlotData[i][1]));
		  raceLabelArray.push(String(racePlotData[i][0]));
		}
				
		// Plot Data - Department
		var departmentPlotData = JSON.parse(result.departmentPlot);
		var departmentDataArray =  [];
		var departmentLabelArray = [];
		for (i = 0; i < departmentPlotData.length; i++) {
		  departmentDataArray.push(parseInt(departmentPlotData[i][1]));
		  departmentLabelArray.push(String(departmentPlotData[i][0]));
		}
		
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
		
		/// Questions
		
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
		
		
		//////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////// Plot Data
		//////////////////////////////////////////////////////////////////////////////////////////
		
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
				
				
				///// Structure PlotData


				//////// Program Plot 
				/*
				var programData = {
				  labels: programSizeLabelArray,
				  datasets: [{
					data: programSizeDataArray,
					backgroundColor: [
					  "rgba(248, 118, 109, 0.5)",
					  "rgba(229, 135, 0, 0.5)",
					  "rgba(201, 152, 0, 0.5)",
					  "rgba(163, 165, 0, 0.5)",
					  "rgba(107,177,0,0.5)",
					  "rgba(0, 186, 56, 0.5)",
					  "rgba(0, 191, 125, 0.5)",
					  "rgba(0, 192, 175, 0.5)",
					  "rgba(0, 188, 216, 0.5)",
					  "rgba(0,176,246,0.5)",
					  "rgba(97, 156, 255, 0.5)",
					  "rgba(185, 131, 255, 0.5)",
					  "rgba(97, 156, 255, 0.5)",
					  "rgba(174,135,255,0.5)",
					  "rgba(219, 114, 251, 0.5)",
					  "rgba(245, 100, 227, 0.5)",
					  "rgba(255,97,195,0.5)",
					  "rgba(255, 105, 156, 0.5)"
					]
				  }]
				};
				*/

				//////// Program Plot 
				var programData = {
				  label: 'Number of Students',
				  data: programDataArray,
				  backgroundColor:'rgba(0, 99, 132, 0.6)',
				  borderColor: 'rgba(0, 99, 132, 1)',
				  borderWidth: 2,
				  hoverBorderWidth: 0
				};


				var chartOptionsProgram = {
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


				//////// Degree Plot 
				var degreeData = {
				  label: 'Number of Students',
				  data: degreeDataArray,
				  backgroundColor:'rgba(33, 96, 1, 0.6)',
				  borderColor: 'rgba(33, 96, 1, 1)',
				  borderWidth: 2,
				  hoverBorderWidth: 0
				};

				var chartOptionsDegree = {
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


				//////// Gender Plot 

				var genderData = {
				  label: 'Number of Students',
				  data: genderDataArray,
				  backgroundColor: 'rgba(120, 99, 132, 0.6)',
				  borderColor: 'rgba(120, 99, 132, 1)',
				  borderWidth: 2,
				  hoverBorderWidth: 0
				};

				var chartOptionsGender = {
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


				//////// Race Plot 
				var raceData = {
				  label: 'Number of Students',
				  data: raceDataArray,
				  backgroundColor:'rgba(240, 99, 132, 0.6)',
				  borderColor: 'rgba(240, 99, 132, 1)',
				  borderWidth: 2,
				  hoverBorderWidth: 0
				};

				var chartOptionsRace = {
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


				//////// Department Plot 

				var departmentData = {
				  label: 'Number of Students',
				  data: departmentDataArray,
				  backgroundColor:'rgb(191, 191, 63, 0.8)',
				  borderColor: 'rgb(191, 191, 63, 0.8)',
				  borderWidth: 0,
				  hoverBorderWidth: 0
				};

				var chartOptionsDepartment = {
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
						  left: 50
						}
					},
				  elements: {
					rectangle: {
					  borderSkipped: 'left',
					}
				  }
				};


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




				// Radar Data
				/*
				var interestData = {
				  labels: Q1_DataLabels,
				  datasets: [{
					label: "Pre-program",
					backgroundColor: "rgba(233,51,51,0.2)",
					borderColor: "rgba(233,51,51, 1)",
					data: Q1_DataArray
				  },{
					label: "Post-program",
					backgroundColor: "rgba(120,120,255,0.2)",
					borderColor: "rgba(120,120,255, 1)",
					data: [4.1, 4.9, 4.1, 4.9, 4.4]
				  }
				  ]
				};
				

				var priorityData = {
				  labels: Q2_DataLabels,
				  datasets: [{
					label: "Pre-program",
					backgroundColor: "rgba(233,51,51,0.2)",
					borderColor: "rgba(233,51,51, 1)",
					data: Q2_DataArray
				  },{
					label: "Post-program",
					backgroundColor: "rgba(120,120,255,0.2)",
					borderColor: "rgba(120,120,255, 1)",
					data: [3.1, 3.9, 4.1, 2.9, 3.4]
				  }
				  ]
				};

				var supportData = {
				  labels: Q3_DataLabels,
				  datasets: [{
					label: "Pre-program",
					backgroundColor: "rgba(233,51,51,0.2)",
					borderColor: "rgba(233,51,51, 1)",
					data: Q3_DataArray
				  },{
					label: "Post-program",
					backgroundColor: "rgba(120,120,255,0.2)",
					borderColor: "rgba(120,120,255, 1)",
					data: [4.1, 4.9, 4.1]
				  }
				  ]
				};

				

				// Radar Plots
				var radarOptions = {
				  responsive: true,
				  tooltips: false,
				  // scale: https://www.chartjs.org/docs/latest/axes/radial/linear.html#axis-range-settings 
				  scale: {
					angleLines: {
					  display: true
					},
					pointLabels:{
					  // https://www.chartjs.org/docs/latest/axes/radial/linear.html#point-label-options 
					  fontSize: 12,
					  fontColor: 'black',
					  callback: function(value, index, values) {
						return value;
					  }
					},
					ticks: {
					  // https://www.chartjs.org/docs/latest/axes/styling.html#tick-configuration
					  // suggestedMax and suggestedMin settings only change the data values that are used to scale the axis
					  suggestedMin: 0,
					  suggestedMax: 5,
					  stepSize: 1, // 25 - 50 - 75 - 100 
					  maxTicksLimit: 11, // Or use maximum number of ticks and gridlines to show 
					  display: false, // remove label text only,
					}
				  },
				  legend: {
					// https://www.chartjs.org/docs/latest/configuration/legend.html
					labels: {
					  padding: 10,
					  fontSize: 14,
					  lineHeight: 30,
					},
				  },
				};
				*/

				//////// Pipeline Plot 
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



				// Create the Chart Variables (that will be updated via AJAX)

				/*
				var programCanvas = document.getElementById("programChart").getContext("2d");
				programChart = new Chart(programCanvas, {
					type: 'polarArea',
					data: programData
				});
				*/
				
				var programCanvas = document.getElementById("programChart").getContext("2d");
				programChart = new Chart(programCanvas, {
				  type: 'horizontalBar',
				  data: {
					labels: programLabelArray,
					datasets: [programData],
				  },
				  options: chartOptionsProgram
				});

				var degreeCanvas = document.getElementById("degreeChart").getContext("2d");
				degreeChart = new Chart(degreeCanvas, {
				  type: 'horizontalBar',
				  data: {
					labels: degreeLabelArray,
					datasets: [degreeData],
				  },
				  options: chartOptionsDegree
				});

				var genderCanvas = document.getElementById("genderChart").getContext("2d");
				genderChart = new Chart(genderCanvas, {
				  type: 'horizontalBar',
				  data: {
					labels: genderLabelArray,
					datasets: [genderData],
				  },
				  options: chartOptionsGender
				});

				var raceCanvas = document.getElementById("raceChart").getContext("2d");
				raceChart = new Chart(raceCanvas, {
				  type: 'horizontalBar',
				  data: {
					labels: raceLabelArray,
					datasets: [raceData],
				  },
				  options: chartOptionsRace
				});


				var departmentCanvas = document.getElementById("departmentChart").getContext("2d");
				departmentChart = new Chart(departmentCanvas, {
				  //type: 'bar',
				  type: 'horizontalBar',
				  data: {
					labels: departmentLabelArray,
					datasets: [departmentData],
				  },
				  options: chartOptionsDepartment
				});


				var interestCanvas = document.getElementById("interestChart").getContext("2d");
				interestChart = new Chart(interestCanvas, {
				  //type: 'bar',
				  type: 'horizontalBar',
				  data: {
					labels: Q1_DataLabels,
					datasets: [interestData],
				  },
				  options: chartOptionsLearnOutcomes
				});
				
				var priorityCanvas = document.getElementById("prioritiesChart").getContext("2d");
				priorityChart = new Chart(priorityCanvas, {
				  //type: 'bar',
				  type: 'horizontalBar',
				  data: {
					labels: Q2_DataLabels,
					datasets: [priorityData],
				  },
				  options: chartOptionsLearnOutcomes
				});
				
				var supportCanvas = document.getElementById("supportChart").getContext("2d");
				supportChart = new Chart(supportCanvas, {
				  //type: 'bar',
				  type: 'horizontalBar',
				  data: {
					labels: Q3_DataLabels,
					datasets: [supportData],
				  },
				  options: chartOptionsLearnOutcomes
				});

				/*
				interestPlot = new Chart(document.getElementById("interestChart"), {
				  type: 'radar',
				  data: interestData,
				  options: chartOptionsInterest
				});
				

				priorityPlot = new Chart(document.getElementById("prioritiesChart"), {
				  type: 'radar',
				  data: priorityData,
				  options: radarOptions
				});

				supportPlot = new Chart(document.getElementById("supportChart"), {
				  type: 'radar',
				  data: supportData,
				  options: radarOptions
				});

				*/

				var pipelineCanvas = document.getElementById("pipelineChart").getContext("2d");
				pipelineChart = new Chart(pipelineCanvas, {
				  type: 'horizontalBar',
				  data: {
					labels: pipelineLabelArray,
					datasets: [pipelineData],
				  },
				  options: chartOptionsPipeline
				});
		}

function getCompletionDataPlots(result, firstRun=TRUE){
		
		var totalStudentsComplete = JSON.parse(result.allStudents);
		totalStudentsComplete = parseInt(totalStudentsComplete[0]);
		//console.log(totalStudentsSQL);
		var expAnnualComplete = JSON.parse(result.allExpStudents);
		console.log(expAnnualComplete);
		var pcTargetComplete = parseInt((totalStudentsComplete/expAnnualComplete) * 100);
		if(pcTargetComplete>100){
			pcTargetComplete = 100;
		}
		document.getElementById("studentCompletion").innerHTML = totalStudentsComplete;
		document.getElementById("studentCompletion").style.width = pcTargetComplete + "%";

		//////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////// Calculate Survey % (that are saying Yes)
		//////////////////////////////////////////////////////////////////////////////////////////		
		var Q1_Network_Length = JSON.parse(result.Q1_Network).length;
		var Q1_Network_PC = Math.round((1 - ((JSON.parse(result.Q1_Network).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q1_Network_Length))*100);
		
		var Q1_Res_Length = JSON.parse(result.Q1_Res).length;
		var Q1_Res_PC = Math.round((1 - ((JSON.parse(result.Q1_Res).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q1_Res_Length))*100);
			
		var Q1_SI_Length = JSON.parse(result.Q1_SI).length;
		var Q1_SI_PC = Math.round((1 - ((JSON.parse(result.Q1_SI).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q1_SI_Length))*100);
		
		var Q1_Skill_Length = JSON.parse(result.Q1_Skill).length;
		var Q1_Skill_PC = Math.round((1 - ((JSON.parse(result.Q1_Skill).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q1_Skill_Length))*100);
		
		var Q1_USC_Length = JSON.parse(result.Q1_USC).length;
		var Q1_USC_PC = Math.round((1 - ((JSON.parse(result.Q1_USC).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q1_USC_Length))*100);
		
		var Q1_CompletionDataArray = [Q1_SI_PC,Q1_USC_PC,Q1_Skill_PC,Q1_Network_PC,Q1_Res_PC];
		var Q1_CompletionLabelArray = [['Provided context on important','social issues'],
									   ['Provided exposure to','under-served communities'],
									   ['Developed specific skills that','are valuable to future work'],
									   ['Provided exposure to a community','passionate about social impact'],
									   ['Provided access to resources you','needed to design and implement','impactful solutions']];
		
		var Q2_Context_Length = JSON.parse(result.Q2_Context).length;
		var Q2_Context_PC = Math.round((1 - ((JSON.parse(result.Q2_Context).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q2_Context_Length))*100);
		
		var Q2_Network_Length = JSON.parse(result.Q2_Network).length;
		var Q2_Network_PC = Math.round((1 - ((JSON.parse(result.Q2_Network).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q2_Network_Length))*100);
		
		var Q2_Res_Length = JSON.parse(result.Q2_Res).length;
		var Q2_Res_PC = Math.round((1 - ((JSON.parse(result.Q2_Res).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q2_Res_Length))*100);
		
		var Q2_Skill_Length = JSON.parse(result.Q2_Skill).length;
		var Q2_Skill_PC = Math.round((1 - ((JSON.parse(result.Q2_Skill).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q2_Skill_Length))*100);
		
		var Q2_USC_Length = JSON.parse(result.Q2_USC).length;
		var Q2_USC_PC = Math.round((1 - ((JSON.parse(result.Q2_USC).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q2_USC_Length))*100);
		
		var Q2_CompletionDataArray = [Q2_Context_PC,Q2_USC_PC,Q2_Skill_PC,Q2_Res_PC,Q2_Network_PC];
		var Q2_CompletionLabelArray = [['Understanding the context behind','various social issues'],
										['Gaining direct exposure to','under-served communities'],
										['Building a concrete skill-set','within the social impact space'],
										['Accessing resources to develop and','implement socially impactful solutions'],
										['Networking with a community passionate','about social impact']];
										
		var Q3_Career_Length = JSON.parse(result.Q3_Career).length;
		var Q3_Career_PC = Math.round((1 - ((JSON.parse(result.Q3_Career).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q3_Career_Length))*100);
		
		var Q3_Com_Length = JSON.parse(result.Q3_Com).length;
		var Q3_Com_PC = Math.round((1 - ((JSON.parse(result.Q3_Com).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q3_Com_Length))*100);
		
		var Q3_Vol_Length = JSON.parse(result.Q3_Vol).length;
		var Q3_Vol_PC = Math.round((1 - ((JSON.parse(result.Q3_Vol).filter(function (str) { return str.indexOf('Yes') === -1; }).length)/Q3_Vol_Length))*100);
		
		var Q3_CompletionDataArray = [Q3_Vol_PC,Q3_Com_PC,Q3_Career_PC];
		var Q3_CompletionLabelArray = [['Volunteer or contribute time towards a','social cause you care about'],
									   ['Make a difference in the community','where you currently live'],
									   'Pursue a career in social impact'];		
					
		// Learning Feedback
		var learningData = JSON.parse(result.learningFeed);
		var learningInnerHTML;
		for (i = 0; i < learningData.length; i++) {
			tempComment = String(learningData[i]);
			if(i==0){
				learningInnerHTML = '' + tempComment;
			} else {
				learningInnerHTML = learningInnerHTML + '<br><br>' + tempComment;
			}
		}
		
		var learningFeedDiv = document.getElementById('learningFeedDiv')
		learningFeedDiv.innerHTML = learningInnerHTML;
		
		// Optional Feedback
		var optionalData = JSON.parse(result.optionalFeed);
		var optionalInnerHTML;
		for (i = 0; i < optionalData.length; i++) {
			tempComment = String(optionalData[i]);
			if(i==0){
				optionalInnerHTML = '' + tempComment;
			} else {
				optionalInnerHTML = optionalInnerHTML + '<br><br>' + tempComment;
			}
		}
		
		var optionalFeedDiv = document.getElementById('optionalFeedDiv')
		optionalFeedDiv.innerHTML = optionalInnerHTML;
		
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
		
		//////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////// Plot Data
		//////////////////////////////////////////////////////////////////////////////////////////
		
				if(!firstRun){
					// Destroy Chart variables before recreating
					Q1_CompletionChart.destroy();
					Q2_CompletionChart.destroy();
					Q3_CompletionChart.destroy();
				}
				
				
				///// Structure PlotData

				//////// Program Plot 
				var Q1_CompletionData = {
				  label: '% Students responding Yes',
				  data: Q1_CompletionDataArray,
				  backgroundColor:'rgba(0, 99, 132, 0.6)',
				  borderColor: 'rgba(0, 99, 132, 1)',
				  borderWidth: 2,
				  hoverBorderWidth: 0
				};
				
				var Q2_CompletionData = {
				  label: '% Students responding Yes',
				  data: Q2_CompletionDataArray,
				  backgroundColor:'rgba(0, 99, 132, 0.6)',
				  borderColor: 'rgba(0, 99, 132, 1)',
				  borderWidth: 2,
				  hoverBorderWidth: 0
				};
				
				var Q3_CompletionData = {
				  label: '% Students responding Yes',
				  data: Q3_CompletionDataArray,
				  backgroundColor:'rgba(0, 99, 132, 0.6)',
				  borderColor: 'rgba(0, 99, 132, 1)',
				  borderWidth: 2,
				  hoverBorderWidth: 0
				};


				var chartOptionsCompletion = {
				   legend: {
						display: false
					},
				  scales: {
							xAxes: [{
						        ticks: {
									        beginAtZero: true,
											max: 100,
											min: 0
							}
					}]	
				  },
				  layout: {
						padding: {
						  left: 0
						}
					},
				  elements: {
					rectangle: {
					  borderSkipped: 'left',
					}
				  }
				};



				// Create the Chart Variables (that will be updated via AJAX)
				
				var Q1_CompletionCanvas = document.getElementById("Q1_CompletionChart").getContext("2d");
				Q1_CompletionChart = new Chart(Q1_CompletionCanvas, {
				  type: 'horizontalBar',
				  data: {
					labels: Q1_CompletionLabelArray,
					datasets: [Q1_CompletionData],
				  },
				  options: chartOptionsCompletion
				});

				var Q2_CompletionCanvas = document.getElementById("Q2_CompletionChart").getContext("2d");
				Q2_CompletionChart = new Chart(Q2_CompletionCanvas, {
				  type: 'horizontalBar',
				  data: {
					labels: Q2_CompletionLabelArray,
					datasets: [Q2_CompletionData],
				  },
				  options: chartOptionsCompletion
				});
				
				
				var Q3_CompletionCanvas = document.getElementById("Q3_CompletionChart").getContext("2d");
				Q3_CompletionChart = new Chart(Q3_CompletionCanvas, {
				  type: 'horizontalBar',
				  data: {
					labels: Q3_CompletionLabelArray,
					datasets: [Q3_CompletionData],
				  },
				  options: chartOptionsCompletion
				});

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

		//console.log(arrayProg);
		//console.log(arrayDep);
		//console.log(arrayAY);
		//console.log(arrayRace);
		//console.log(arrayGender);
		//console.log(arrayDeg);
		
		
		dataPush = {
						reqType:"filterData",
						prog:arrayProg,
						race:arrayRace,
						gender:arrayGender,
						deg:arrayDeg,
						ay:arrayAY,
						dep:arrayDep
					};
		
		//console.log(dataPush);
		 
		/// Get Registration Data
		
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
					 //console.log(output);
                     var completionData = output;
					 //console.log(completionData);
					 getCompletionDataPlots(result=completionData,firstRun=false);
					 //console.log(result);
					 	 
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
					 //console.log(output);
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
						
						 //console.log(completionData);
						 //getCompletionDataPlots(result=completionData,firstRun=false);
						 //console.log(result);
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
					 //console.log(output);
                     var inputFilters = output;
					 // Update Filters
					 //console.log(inputFilters);
					 getCheckBox(filterInput=inputFilters);					 
					 
                }).fail(function (jqXHR, textStatus) {
					 console.log(jqXHR);
					 console.log(textStatus);
					 console.log(jqXHR.responseText);
				});
	
	
	
	
	/// Get General Data
	//var testData;
	
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
			//$("input[type='checkbox']").prop("checked", false);
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
					// console.log(JSON.parse(output));
					// Do Nothing
                }).fail(function (jqXHR, textStatus) {
					 console.log(jqXHR);
					 console.log(textStatus);
					 console.log(jqXHR.responseText);
				});


