<!DOCTYPE html>
<html>
<title>PKG Data Portal</title>
<meta charset="UTF-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="./css/home.css">
<!-- Charts made with chartjs.org --->

<body class="w3-light-grey">

<!-- Page Container -->
<div class="w3-content w3-margin-top" style="max-width:1400px;">

  <!-- The Grid -->
  <div class="w3-row-padding">
  
    <!-- Left Column -->
    <div class="w3-third" id="sidePageBody"> 
    
      <div class="w3-white w3-text-grey w3-card-4">
        <div class="w3-display-container" style="padding:10px;">
           <img src="/images/PKG-Banner2.png" style="width:100%; margin-bottom:0px;">
        </div>
        <div class="w3-container">
		  <p style="font-size:16px;">Welcome, <span id="certName"><?php echo $_SERVER['SSL_CLIENT_S_DN_CN']; ?></span></p>
          
          <p class="w3-large"><b><i class="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>General Indicators</b></p>
          <p>Student Registrations</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge w3-teal" id="studentCounter"></div>
          </div>
		  <p>Student Completion Reports</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge w3-teal" id="studentCompletion"></div>
          </div>
          <p>MIT Departments Represented</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge w3-teal" id="departmentCounter">
              <div class="w3-center w3-text-white"></div>
            </div>
          </div>
          <br>

          <p class="w3-large w3-text-theme"><b><i class="fa fa-globe fa-fw w3-margin-right w3-text-teal"></i>Diversity and Inclusion</b></p>
          <p>Female Representation (% of all registrants)</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge w3-teal" id="femaleCounter">
              <div class="w3-center w3-text-white"></div>
            </div>
          </div>
          <p>URM Representation (% of all registrants)</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge w3-teal" id="URMCounter"></div>
          </div><br>
		  <p id="lastUpdatedTag"><b>Last Updated :</b> </p>
        </div>
      </div><br>

    <!-- End Left Column -->
    </div>

    <!-- Right Column -->
    <div class="w3-twothird" id="printPageBody">
		<div class="w3-container w3-card w3-white w3-margin-bottom" id="printPageBodyInnerHeader">
			<div id="buttonDiv" style="margin-left:10px;">
				<div id="passwdDiv">
				Enter password to proceed: <input type="text" id="passwd" name="fname"> <input type="submit" value="Submit" onclick="getFilter(getCSV=true)">
				<br><span id="authMsg"></span>
				</div>
				<div style="cursor:pointer; padding:0px 10px 0px 10px; background:#009688; border-width:1px; border-style:solid; border-color:#000; color:#FFF; width:150px; text-align:center;" id="filterButton" onclick="getFilter()">
					<h5>Filter Data</h5>
				</div>
				<div style="cursor:pointer; padding:0px 10px 0px 10px; background:#FFF; border-width:1px; border-style:solid; border-color:#000; color:#000; width:150px; text-align:center; margin-left:5px;" id="unselectButton" onclick="selectAll()">
					<h5>Select All</h5>
				</div>
				<div style="cursor:pointer; padding:0px 10px 0px 10px; background:#FFF; border-width:1px; border-style:solid; border-color:#000; color:#000; width:150px; text-align:center; margin-left:5px;" id="unselectButton" onclick="unselectAll()">
					<h5>Unselect All</h5>
				</div>
				<div style="cursor:pointer; padding:0px 10px 0px 10px; background:#005f96; color:#FFF; margin-left:5px; border-width:1px; border-style:solid; border-color:#000; width:120px; text-align:center;" id="printButton" onclick="printReport()">
					<h5>Print</h5>
				</div>
				<div style="cursor:pointer; padding:0px 10px 0px 10px; background:#005f96; color:#FFF; margin-left:5px; width:120px; border-width:1px; border-style:solid; border-color:#000;  text-align:center;" id="downloadButton" onclick="showPassDiv()">
					<h5>Download</h5>
				</div>

			</div>
			<div id='dropDownDiv'>
				<div id="listAY" class="dropdown-check-list" tabindex="100" style="margin-left:10px;">
				  <span class="anchor">Year</span>
				  <ul class="items" id="AYUL">
					<li><input type="checkbox" value="2020-2021" class="AY"/> 2020-2021 </li>
					<li><input type="checkbox" value="2021-2022" class="AY"/> 2021-2022 </li>
				  </ul>
				</div>
				<div id="listDegree" class="dropdown-check-list" tabindex="100" style="margin-left:10px;">
				  <span class="anchor">Degree</span>
				  <ul class="items" id="DegUL">
					<li><input type="checkbox" class="Deg" value="Undergraduate"/> Undergraduate </li>
					<li><input type="checkbox" class="Deg" value="Graduate"/> Graduate </li>
					<li><input type="checkbox" class="Deg" value="Other"/> Other </li>
				  </ul>
				</div>
				<div id="listGender" class="dropdown-check-list" tabindex="100" style="margin-left:10px;">
				  <span class="anchor">Gender</span>
				  <ul class="items" id="GenderUL">
					<li><input type="checkbox" class="Gender" value="They"/> They/Them </li>
					<li><input type="checkbox" class="Gender" value="She" /> She/Her/Hers </li>
					<li><input type="checkbox" class="Gender" value="He" /> He/Him/His </li>
					<li><input type="checkbox" class="Gender" value="Other" /> Other </li>
					<li><input type="checkbox" class="Gender" value="No response" /> No response </li>
				  </ul>
				</div>
				<div id="listRace" class="dropdown-check-list" tabindex="100" style="margin-left:10px;">
				  <span class="anchor">Race</span>
				  <ul class="items" id="RaceUL">
					<li><input type="checkbox" class="Race" value="Black American"/> Black/African American</li>
					<li><input type="checkbox" class="Race" value="Asian American"/> Asian American</li>
					<li><input type="checkbox" class="Race" value="Indigenous American"/> American Indian/Alaskan Native</li>
					<li><input type="checkbox" class="Race" value="Hispanic American"/> Hispanic/Latinx American</li>
					<li><input type="checkbox" class="Race" value="Pacific Islander American"/> Native Hawaiian/Pacific Islander American</li>
					<li><input type="checkbox" class="Race" value="White American"/> White/Caucasian American</li>
					<li><input type="checkbox" class="Race" value="International"/> International</li>
					<li><input type="checkbox" class="Race" value="Other"/> Other</li>
					<li><input type="checkbox" class="Race" value="No response" /> No response </li>
				  </ul>
				</div>
				<div id="listDep" class="dropdown-check-list" tabindex="100" style="margin-left:10px;">
				  <span class="anchor">Department</span>
				  <ul class="items" id="DepUL">
					<li><input type="checkbox" class="Dep" value="Undeclared"/> Undeclared</li>
					<li><input type="checkbox" class="Dep" value="Course 1 - Civil and Environmental Engineering"/> Course 1 - Civil and Environmental Engineering</li>
					<li><input type="checkbox" class="Dep" value="Course 2 - Mechanical Engineering"/> Course 2 - Mechanical Engineering</li>
					<li><input type="checkbox" class="Dep" value="Course 3 - Material Science"/> Course 3 - Material Science</li>
					<li><input type="checkbox" class="Dep" value="Course 4 - Architecture"/> Course 4 - Architecture</li>
					<li><input type="checkbox" class="Dep" value="Course 5 - Chemistry"/> Course 5 - Chemistry</li>
					<li><input type="checkbox" class="Dep" value="Course 6 - Electrical Engineering and Computer Science"/> Course 6 - Electrical Engineering and Computer Science</li>
					<li><input type="checkbox" class="Dep" value="Course 7 - Biology"/> Course 7 - Biology</li>
					<li><input type="checkbox" class="Dep" value="Course 8 - Physics"/> Course 8 - Physics</li>
					<li><input type="checkbox" class="Dep" value="Course 9 - Brain and Cognitive Sciences"/> Course 9 - Brain and Cognitive Sciences</li>
					<li><input type="checkbox" class="Dep" value="Course 10 - Chemical Engineering"/> Course 10 - Chemical Engineering</li>
					<li><input type="checkbox" class="Dep" value="Course 11 - Urban Studies and Planning"/> Course 11 - Urban Studies and Planning</li>
					<li><input type="checkbox" class="Dep" value="Course 12 - Earth, Atmospheric and Planetary Sciences"/> Course 12 - Earth, Atmospheric and Planetary Sciences</li>
					<li><input type="checkbox" class="Dep" value="Course 14 - Economics"/> Course 14 - Economics</li>
					<li><input type="checkbox" class="Dep" value="Course 15 - Management"/> Course 15 - Management</li>
					<li><input type="checkbox" class="Dep" value="Course 16 - Aeronautics and Astronautics"/> Course 16 - Aeronautics and Astronautics</li>
					<li><input type="checkbox" class="Dep" value="Course 17 - Political Science"/> Course 17 - Political Science</li>
					<li><input type="checkbox" class="Dep" value="Course 18 - Mathematics"/> Course 18 - Mathematics</li>
					<li><input type="checkbox" class="Dep" value="Course 20 - Biological Engineering"/> Course 20 - Biological Engineering</li>
					<li><input type="checkbox" class="Dep" value="Course 21 - Humanities"/> Course 21 - Humanities</li>
					<li><input type="checkbox" class="Dep" value="21A - Anthropology"/> 21A - Anthropology</li>
					<li><input type="checkbox" class="Dep" value="21E/21S - Humanities + Engineering/Science"/> 21E/21S - Humanities + Engineering/Science</li>
					<li><input type="checkbox" class="Dep" value="21G - Global Studies and Languages"/> 21G - Global Studies and Languages</li>
					<li><input type="checkbox" class="Dep" value="21H - History"/> 21H - History</li>
					<li><input type="checkbox" class="Dep" value="21L - Literature"/> 21L - Literature</li>
					<li><input type="checkbox" class="Dep" value="21M - Music and Theater Arts"/> 21M - Music and Theater Arts</li>
					<li><input type="checkbox" class="Dep" value="22 - Nuclear Science and Engineering"/> 22 - Nuclear Science and Engineering</li>
					<li><input type="checkbox" class="Dep" value="24 - Linguistics"/> 24 - Linguistics</li>
					<li><input type="checkbox" class="Dep" value="CMS/21W - Comparative Media Studies / Writing"/> CMS/21W - Comparative Media Studies / Writing</li>
					<li><input type="checkbox" class="Dep" value="IDS - Data, Systems and Society"/> IDS - Data, Systems and Society</li>
					<li><input type="checkbox" class="Dep" value="IMES - Medical Engineering and Science"/> IMES - Medical Engineering and Science</li>
					<li><input type="checkbox" class="Dep" value="MAS - Media Arts and Science"/> MAS - Media Arts and Science</li>
					<li><input type="checkbox" class="Dep" value="STS - Science, Technology and Society"/> STS - Science, Technology and Society</li>
					<li><input type="checkbox" class="Dep" value="Other"/> Other</li>
				  </ul>
				</div>
				<div id="listProg" class="dropdown-check-list" tabindex="100" style="margin-left:10px;">
				  <span class="anchor">Program</span>
				  <ul class="items" id="ProgUL">
					<li><input type="checkbox" class="Prog" value="Fellowships"/> Fellowships</li>
					<li><input type="checkbox" class="Prog" value="IDEAS"/> IDEAS</li>
					<li><input type="checkbox" class="Prog" value="IDEAS ELO"/> IDEAS ELO</li>
					<li><input type="checkbox" class="Prog" value="SII"/> SI Internships</li>
					<li><input type="checkbox" class="Prog" value="PKGIAPHealth"/> PKG IAP: Health</li>
					<li><input type="checkbox" class="Prog" value="PKGSpringBreak"/> PKG Spring Break</li>
					<li><input type="checkbox" class="Prog" value="SummerImmersion"/> Summer Immersion</li>
					<li><input type="checkbox" class="Prog" value="GGSD"/> Get Good Stuff Done</li>
					<li><input type="checkbox" class="Prog" value="CEV"/> Civic Engagement & Voting</li>
					<li><input type="checkbox" class="Prog" value="CIFIFallELO"/> CIFI Fall ELO</li>
					<li><input type="checkbox" class="Prog" value="CIFISummerELO"/> CIFI Summer ELO</li>
					<li><input type="checkbox" class="Prog" value="ACE"/> ACE</li>
					<li><input type="checkbox" class="Prog" value="ACEELO"/> ACE - Fall ELO</li>
					<li><input type="checkbox" class="Prog" value="CommConversations"/> Community Conversations</li>
					<li><input type="checkbox" class="Prog" value="SAF"/> Social Action Fair</li>
					<li><input type="checkbox" class="Prog" value="SP250"/> SP.250</li>
					<li><input type="checkbox" class="Prog" value="SP251"/> SP.251</li>
					<li><input type="checkbox" class="Prog" value="Other"/> Other</li>
				  </ul>
				</div>
			</div>
		</div>
	
      <div class="w3-container w3-card w3-white w3-margin-bottom" id="printPageBodyInner1" style="page-break-before: always">
        <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Participation & Demographic Data</h2>
        <div class="w3-container">
          <h5 class="w3-opacity"><b>Program Participation</b></h5>
		  <div class='chartHolder'>
          <canvas id="programChart" width="4000" height="4000"></canvas>
		  </div>
          <hr>
        </div>
        <div class="w3-container">
          <h5 class="w3-opacity"><b>Degree Representation</b></h5>
		  <div class='chartHolder'>
			<canvas id="degreeChart" width="400" height="150"></canvas>
          </div>
		  <hr>
        </div>
        <div class="w3-container">
          <h5 class="w3-opacity"><b>Gender Representation</b></h5>
		  <div class='chartHolder'>
			<canvas id="genderChart" width="400" height="150"></canvas>
          </div>
		  <hr>
        </div>
		<div class="w3-container">
          <h5 class="w3-opacity"><b>Racial / Ethnic Representation</b></h5>
		  <div class='chartHolder'>
			<canvas id="raceChart" width="400" height="250"></canvas>
          </div>
		  <hr>
        </div>
		<div class="w3-container" style="page-break-before: always;">
          <h5 class="w3-opacity"><b>Department Representation</b></h5>
		  <div class='chartHolder'>
			<canvas id="departmentChart" width="500" height="600"></canvas>
          </div>
		  <div id="missingDepDiv" class="textDiv overflowMinimal">
		  </div><br><br>
        </div>
      </div>

      <div class="w3-container w3-card w3-white" id="printPageBodyInner2" style="page-break-before: always">
        <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Student Interests and Goals</h2>
		  <div class="w3-container">
          <h5 class="w3-opacity"><b>How interested are you in the following? (1: Not interested; 5: Very interested)</b></h5>
		  <div class='chartHolder'>
			<canvas id="interestChart" width="800" height="550"></canvas>
          </div>
		  <hr>
		  </div>
	      <div class="w3-container">
          <h5 class="w3-opacity"><b>How important are the following to you? (1: Not important; 5: Very important)</b></h5>
		  <div class='chartHolder'>
			<canvas id="prioritiesChart" width="850" height="550"></canvas>
          </div>
		  <hr>
		  </div>
	  	  <div class="w3-container" style="page-break-before: always">
          <h5 class="w3-opacity"><b>How equipped do you currently feel to do the following? (1: Unequipped; 5: Very well equipped)</b></h5>
		  <div class='chartHolder'>
			<canvas id="supportChart" width="850" height="550"></canvas>
          </div>
		  <hr>
		  </div>
	  </div>
	  
	  <div class="w3-container w3-card w3-white" style="margin-top:20px; page-break-before: always;" id="printPageBodyInner3"">
        <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Miscellaneous</h2>
          <div class="w3-container">
          <h5 class="w3-opacity"><b>Student Pipeline (How did you learn about this program?)</b></h5>
		  <div class='chartHolder'>
			<canvas id="pipelineChart" width="800" height="1000"></canvas>
          </div>
		  <div id="pipelineDiv" class="textDiv overflowMinimal">
		   <b>Other Responses:</b>None
		  </div><br>
		  <hr>
		  </div>
	      <div class="w3-container">
          <h5 class="w3-opacity"><b>Student Comments / Priorities</b></h5>
		  <div id="commentsDiv" class="textDiv overflowMinimal">
          </div>
		  <hr>
		  </div>
	  </div>

	  <div class="w3-container w3-card w3-white" style="margin-top:20px; page-break-before: always;" id="printPageBodyInner4">
	  <!-- <div class="w3-container w3-card w3-white" id="printPageBodyInner2" style="page-break-before: always"> -->
        <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Post-Program Feedback</h2>
		  <div class="w3-container">
          <h5 class="w3-opacity"><b>I have a better understanding of a social issue(s)/challenge(s) addressed by this program.</b></h5>
		  <div class='chartHolder'>
			<canvas id="better_understanding_agree" width="800" height="550"></canvas>
          </div>
		  <hr>
		  </div>

	      <div class="w3-container">
          <h5 class="w3-opacity"><b>Please describe the ways in which this program affected your understanding of relevant social issue(s)/challenge(s).</b></h5>
		  <div class='chartHolder'>
			<canvas id="effect_understanding_social_issues" width="850" height="550"></canvas>
          </div>
		  <hr>
		  </div>

	  	  <div class="w3-container" style="page-break-before: always">
          <h5 class="w3-opacity"><b>I have gained skills that will allow me to contribute to social change within a community.</b></h5>
		  <div class='chartHolder'>
			<canvas id="gain_skills_social_change_agree" width="850" height="550"></canvas>
          </div>
		  <hr>
		  </div>

		  <div class="w3-container">
          <h5 class="w3-opacity"><b>I am more confident in my ability to influence social change within a community.</b></h5>
		  <div class='chartHolder'>
			<canvas id="confidence_influencing_social_change_agree" width="850" height="550"></canvas>
          </div>
		  <hr>
		  </div>

		  <div class="w3-container">
          <h5 class="w3-opacity"><b>Please describe the ways in which this program affected your skills and confidence in your ability to influence social change. </b></h5>
		  <div class='chartHolder'>
			<canvas id="effect_confidence_influencing_social_change" width="850" height="550"></canvas>
          </div>
		  <hr>
		  </div>

		  <div class="w3-container">
          <h5 class="w3-opacity"><b>I am inspired to use my knowledge and skills to support social change efforts in my life outside of work and school. </b></h5>
		  <div class='chartHolder'>
			<canvas id="inspired_knowledge_forsocial_change_agree" width="850" height="550"></canvas>
          </div>
		  <hr>
		  </div>
		  
		  <div class="w3-container">
          <h5 class="w3-opacity"><b>I am considering how to incorporate social change efforts into my academic interests.</b></h5>
		  <div class='chartHolder'>
			<canvas id="incorporate_social_change_effort_academics_agree" width="850" height="550"></canvas>
          </div>
		  <hr>
		  </div>

		  <div class="w3-container">
          <h5 class="w3-opacity"><b>I am considering how to incorporate social change efforts into my future career.</b></h5>
		  <div class='chartHolder'>
			<canvas id="incorporate_social_change_effort_career_agree" width="850" height="550"></canvas>
          </div>
		  <hr>
		  </div>

		  <div class="w3-container">
          <h5 class="w3-opacity"><b>Please describe the ways in which this program affected your motivations to participate in social change efforts, now at MIT and in the future.</b></h5>
		  <div class='chartHolder'>
			<canvas id="effect_motivation_social_change" width="850" height="550"></canvas>
          </div>
		  <hr>
		  </div>

		  <div class="w3-container">
          <h5 class="w3-opacity"><b>Please check this box if you are okay with us associating your name with any quotes or feedback from this form.</b></h5>
		  <div class='chartHolder'>
			<canvas id="associate_name_feedback" width="850" height="550"></canvas>
          </div>
		  <hr>
		  </div>

		  <div class="w3-container">
			<h5 class="w3-opacity"><b>Program Feedback</b></h5>
			<div id="learningFeedDiv" class="textDiv overflowMinimal"></div>
		  </div>
		  <hr>
		  <div class="w3-container">
			<h5 class="w3-opacity"><b>Optional Feedback</b></h5>
			<div id="optionalFeedDiv" class="textDiv overflowMinimal">
			</div>
		  </div>
	  </div>
    <!-- End Right Column -->
    </div>
    
  <!-- End Grid -->
  </div>
  
  <!-- End Page Container -->
</div>
<script src="./js/functions.js"></script>
</body>
</html>