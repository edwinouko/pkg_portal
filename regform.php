<!DOCTYPE html>
<html>
  <head>
    <meta name="robots" content="noindex">
    <title>PKG Registration Form</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<link rel="stylesheet" href="./res/regform.css">
	<script src="./res/global.js"></script>
  </head>

  
  <body>
  <div class='centered' id="pageTop"> 
			<img src='./images/PKG-Banner.png' class='bannerImage'/>
			<div class="testbox">
				<div class="generalDeets">
				<form action="submissionMsg.php" method="post">
				<div class="sectionDiv"><h2>PKG Student Registration</h2></div>
				<div class="sectionContent">
						<p>
						Welcome to the PKG Center! Thank you for your interest in our programs.<br><br> 

						In order to register with the center, please complete the following questions. We use this information to continue providing targeted programming to the MIT community. This form is expected to take less than 2 minutes to complete.<br><br>

						We are collecting information to better understand who participates in our programs, who we are missing, and how to make our programs better. Please be advised that certain sections of this form are required and others are optional. Your decision not
						to complete an optional section will have no impact on your participation with the program. The PKG Center may use aggregated information from this survey to share with potential future students, funders or stakeholders. All research or analysis using 
						this information will be presented in a way that individuals cannot be identified. If information from this survey is used for academic research, the same rules of reporting apply.</p><br><hr><br>
							
							<div><b>Select a PKG Program</b>:
							<select name="orgProgram" required autofocus>
										  <option disabled selected value> -- select an option -- </option>
										  <option value="Fellowships">Fellowships</option>
										  <option value="IDEAS">IDEAS Social Innovation Challenge</option>
										  <option value="IDEAS ELO">IDEAS ELO</option>
										  <option value="Social Impact Internships and Employment">Social Impact Internships and Employment</option>
										  <option value="PKG IAP: Health">PKG IAP: Health</option>
										  <option value="PKG Spring Break">PKG Spring Break</option>
										  <option value="PKG Connect: Summer Immersion">PKG Connect: Summer Immersion</option>
										  <option value="Get Good Stuff Done">Get Good Stuff Done</option>
										  <option value="Civic Engagement and Voting">Civic Engagement and Voting</option>
										  <option value="Community-Informed Field Immersion ELO">Community-Informed Field Immersion - ELO</option>
										  <option value="Active Community Engagement">Active Community Engagement</option>
										  <option value="ACE Intensive - ELO">ACE Intensive - ELO</option>
										  <option value="Community Conversations">Community Conversations</option>
										  <option value="Social Action Fair">Social Action Fair</option>
										  <option value="SP.250">SP.250: Transforming Good Intentions into Good Outcomes</option>	
										  <option value="SP.251">SP.251: How to Change the World: Experiences from Social Entrepreneurs</option>
										  <option value="Other">Other</option>	  
							</select></div><br>
							<div>If you selected 'Other', please enter the program name: <input type="text" name="programOther"></div><br>
							<div><b>When will you begin the program?</b><br>
							Academic Year: 
							<select name="academicYear" required>
										  <option disabled selected value> -- select an option -- </option>
										  <option value="2020-2021">2020-2021</option>
										  <option value="2021-2022">2021-2022</option>			  
							</select></div>	 Semester:
							<select name="programSem" required>
										  <option disabled selected value> -- select an option -- </option>
										  <option value="Fall">Fall</option>
										  <option value="IAP">IAP</option>
										  <option value="Winter">Winter</option>
										  <option value="Summer">Summer</option>				  
							</select></div><br>		
					</div>
					<div class='sectionDiv'><h2>General Details</h2></div><br>
					<div class="sectionContent">
							<div>Email: <input type="email" name="studEmail" value="<?php echo strtolower($_SERVER['SSL_CLIENT_S_DN_Email']);?>" required></div><br>
							<div>First Name: <input data-store="FName" type="text" name="studFName" required></div><br>
							<div>Last Name: <input data-store="LName" type="text" name="studLName" required></div><br>
							<div>MIT ID: <input data-store="ID" type="number" name="studID" required></div><br>
							<hr><br>
							<div>Academic Program:
							<select name="studProgram" data-store="studType" required>
										  <option disabled selected value> -- select an option -- </option>
										  <option value="Undergraduate">Undergraduate</option>
										  <option value="Graduate">Graduate</option>
										  <option value="OtherMIT">Other MIT Affiliate</option>							  
							</select></div><br>
							<div>Department:
							<select name="studDepartment" data-store="Dep" required>
										  <option disabled selected value> -- select an option -- </option>
										  <option value="Course 1 - Civil and Environmental Engineering">Course 1 - Civil and Environmental Engineering</option>
										  <option value="Course 2 - Mechanical Engineering">Course 2 - Mechanical Engineering</option>
										  <option value="Course 3 - Material Science">Course 3 - Material Science</option>							  
							</select></div><br>
							<div>Graduation Year (YYYY):<input data-store="GYear" type="number" name="gradYear" required></div><br>
							<div>FSILG Affiliation (if any):<input data-store="FSILG" type="text" name="FSILG" required></div><br>
							<hr><br>
							<div>Race / Ethnicity (optional):
							<select name="studRace" data-store="Ra">
										  <option disabled selected value> -- select an option -- </option>
										  <option value="Black American">Black / African American</option>
										  <option value="Asian American">Asian / South Asian American</option>
										  <option value="Indigenous American">Indigenous American / Alaskan Native</option>
										  <option value="Hispanic American">Hispanic / Lantinx American</option>
										  <option value="Pacific Islander American">Native Hawaiian / Pacific Islander American</option>
										  <option value="White American">White Caucasian American</option>	
										  <option value="International">International</option>		
										  <option value="Other">Other</option>
							</select></div><br>
							<div>If you answered 'Other', please feel free to specify here:<input type="text" name="studRaceSpec" data-store="RaO"></div><br>
							<div>Gender Identity / Pronouns (optional):
							<select name="studGender" data-store="Ge">
										  <option disabled selected value> -- select an option -- </option>
										  <option value="They">They / Them</option>
										  <option value="She">She / Her </option>
										  <option value="He">He / Him</option>
										  <option value="Other">Other</option>
							</select></div><br>
							<div>If you answered 'Other', please feel free to specify here:<input type="text" name="studGenderSpec" data-store="GeO"></div><br>
							<hr><br>
							<div>How did you learn about this PKG Offering?
							<select name="studPipeline" data-store="pipe">
										  <option disabled selected value> -- select an option -- </option>
										  <option value="Fellow student / friend">Fellow student / friend</option>
										  <option value="Faculty / Staff">Faculty / Staff</option>
										  <option value="PKG Website">PKG Website</option>
										  <option value="Poster">Poster</option>
										  <option value="Class Presentation from staff">Class Presentation from staff</option>
										  <option value="Email anouncement">Email anouncement</option>	
										  <option value="Activities Midway / Campus Fair">Activities Midway / Campus Fair</option>	
										  <option value="Social Media">Social Media</option>								  
										  <option value="Other">Other</option>
							</select></div><br>
							<div>If you answered 'Other', please feel free to specify here:<input type="text" id="studPipelineSpec" data-store="pipeO"></div><br>
					</div>
					
					<div class="sectionDiv"><h2>Personal Goals and Interests</h2></div><br>
					
					<div class="sectionContent" id="interestsContent">
							<b>How interested are you in the following? (1: Not interested; 5: Very interested)</b><br><br>
							<div class="slidecontainer">
							Learning about social issues: <b><span id="learnSIval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="learnSI" name="learnSI" required>
							</div><br>
							<div class="slidecontainer">
							Volunteering and service: <b><span id="learnVSval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="learnVS" name="learnVS" required>
							</div><br>
							<div class="slidecontainer"> 
							Working for social and political change: <b><span id="learnSocPolval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="learnSocPol" name="learnSocPol" required>
							</div><br>
							<div class="slidecontainer">
							Being a leader in your community: <b><span id="learnLeadval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="learnLead" name="learnLead" required>
							</div><br>
							<div class="slidecontainer">
							Participating in politics or community affairs: <b><span id="particPolval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="particPol" name="particePol" required>
							</div><br><hr><br>
							<!--- Q2 -->
							<b>How important are the following to you? (1: Not important; 5: Very important)</b><br><br>
							<div class="slidecontainer">
							Understanding the context behind various social issues: <b><span id="impContextval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="impContext" name="impContext" required>
							</div><br>
							<div class="slidecontainer">
							Gaining direct exposure to under-served communities: <b><span id="impExpval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="impExp" name="impExp" required>
							</div><br>
							<div class="slidecontainer">
							Building a concrete skill-set within the social impact space (communication, stakeholder analysis, power analysis, systems thinking, etc): <b><span id="impSkillval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="impSkill" name="impSkill" required>
							</div><br>
							<div class="slidecontainer">
							Accessing resources to develop and implement socially impactful solutions: <b><span id="impResval"></span></b> 
							<input type="range" min="1" max="5" value="3" class="slider" id="impRes" name="impRes" required>
							</div><br>
							<div class="slidecontainer">
							Networking with a community passionate about social impact: <b><span id="impNetval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="impNet" name="impNet" required>
							</div><br><hr><br>
							<!--- Q3 -->
							<b>How equipped do you currently feel to do the following? (1: Unequipped; 5: Very well equipped)</b><br><br>
							<div class="slidecontainer">
							Volunteer or contribute time towards a social cause you care about: <b><span id="equipVolval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="equipVol" name="equipVol" required>
							</div><br>
							<div class="slidecontainer">
							Make a difference in the community where you currently live: <b><span id="equipComval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="equipCom" name="equipCom" required> 
							</div><br>
							<div class="slidecontainer">
							Pursue a career in social impact: <b><span id="equipCareerval"></span></b>
							<input type="range" min="1" max="5" value="3" class="slider" id="equipCareer" name="equipCareer" required>
							</div><br><hr>
							
						<div class='socialCause'> 
						<p>Use the space below to let us know about the issues that interest you! Use a semicolon <b>(;)</b> to seperate keywords. (optional)</p>
						<div id="textareatag"><input type='text'/></div>
						</div>
						
						<input type="hidden" id="issuetags" name="issuetags" value = "" />
						
						<div> 
						<p>Tell us what you're hoping to get out of the program so we can improve our offerings! (optional)</p>
						<textarea rows="4" class="inputBox" id="problem1" maxlength="500" name="comments"></textarea>
						</div>
						
						</div> 
					</div> 
					
					<br>
					<input class="submitButton" type="submit" name="submit" value="Click to Register!">
				</form> 
				
			</div>
	</div>
  </body>
</html>
<script src="./res/regform.js"></script>