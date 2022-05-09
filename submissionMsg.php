<!DOCTYPE html>
<html>
  <head>
    <meta name="robots" content="noindex">
    <title>PKG Registration Form</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<link rel="stylesheet" href="./res/regform.css">
  </head>
  
  <style>
  
  .sectionDiv{
	width:100%;
    border: none;
    color: white;
	padding:2px;
	padding-left:10px;
	box-sizing: border-box;
  }
  
  .sectionContent{
	  padding-left:10px;
	  box-sizing: border-box;
  }
  
  #subMsgPos{
	  background-color: #00ba35;
  }
  
  #subMsgNeg{
	  background-color: #ba3000;
  }
  
  </style>
  
  
  
  <body>
  <div class='centered'> 
			<img src='./images/PKG-Banner.png' class='bannerImage'/>
	<div class="testbox">
		<div class="generalDeets">
				
<?php
				
				if (isset($_POST['submit']))
				{
							 
					// Execute this code if the submit button is pressed.
					
					//date_default_timezone_set('Asia/Kolkata');
					//$dateInput = date('Y\-m\-d');
					//$timeInput = date('H\:i\:s');
					//$ip = (string)$_SERVER['REMOTE_ADDR'];

					$con=mysqli_connect("sql.mit.edu","pkgdata","sox58kir","pkgdata+registrationData");
					// Check connection
					if (mysqli_connect_errno()){
					    echo "Failed to connect to MySQL: " . mysqli_connect_error();
					    echo "<div class='sectionDiv' id='subMsgNeg'>
							    <h2>Hmm, something went wrong. Please try again.</h2></div>";
					} else {
						
						$pkgProgram = mysqli_real_escape_string($con,$_POST['orgProgram']);
						$year = mysqli_real_escape_string($con,$_POST['programYear']);
						$sem = mysqli_real_escape_string($con,$_POST['programSem']);
						
						// General Details
						$firstName = mysqli_real_escape_string($con,$_POST['studFName']);
						$lastName = mysqli_real_escape_string($con,$_POST['studLName']);
						$email = mysqli_real_escape_string($con,$_POST['studEmail']);
						$MITID = mysqli_real_escape_string($con,$_POST['studID']);
						$program = mysqli_real_escape_string($con,$_POST['studProgram']);
						$department = mysqli_real_escape_string($con,$_POST['studDepartment']);
						$gradYear = mysqli_real_escape_string($con,$_POST['gradYear']);
						$fsilg = mysqli_real_escape_string($con,$_POST['FSILG']);
						$race = mysqli_real_escape_string($con,$_POST['studRace']);
						if($race == "Other"){
							$race = mysqli_real_escape_string($con,$_POST['studRaceSpec']);
						}
						$gender = mysqli_real_escape_string($con,$_POST['studGender']);
						if($gender == "Other"){
							$gender = mysqli_real_escape_string($con,$_POST['studGenderSpec']);
						}
						$pipeline = mysqli_real_escape_string($con,$_POST['studPipeline']);
						if($pipeline == "Other"){
							$pipeline = mysqli_real_escape_string($con,$_POST['studPipelineSpec']);
						}
						
						// Interest Questions
						$learnSI = mysqli_real_escape_string($con,$_POST['learnSI']);
						$learnVS = mysqli_real_escape_string($con,$_POST['learnVS']);
						$learnSocPol = mysqli_real_escape_string($con,$_POST['learnSocPol']);
						$learnLead = mysqli_real_escape_string($con,$_POST['learnLead']);
						$particPol = mysqli_real_escape_string($con,$_POST['particPol']);
						
						$impContext = mysqli_real_escape_string($con,$_POST['impContext']);
						$impExp = mysqli_real_escape_string($con,$_POST['impExp']);
						$impSkill = mysqli_real_escape_string($con,$_POST['impSkill']);
						$impRes = mysqli_real_escape_string($con,$_POST['impRes']);
						$impNet = mysqli_real_escape_string($con,$_POST['impNet']);
						
						$equipVol = mysqli_real_escape_string($con,$_POST['equipVol']);
						$equipCom = mysqli_real_escape_string($con,$_POST['equipCom']);
						$equipCareer = mysqli_real_escape_string($con,$_POST['equipCareer']);
						
						$issueTags = mysqli_real_escape_string($con,$_POST['issueTags']);
						$comments = mysqli_real_escape_string($con,$_POST['comments']);
					
						
						$stmt = $con->prepare("INSERT INTO Registration(FirstName, LastName, MIT_ID, Email, StudentType, 
																		Department, GradYear, FSILG, Race, Gender, 
																		Pipeline, PKGProgram, ProgramYear, ProgramSem, Q1_LearnSI, 
																		Q1_LearnVS, Q1_LearnSocPol, Q1_LearnLead, Q1_ParticPol, Q2_ImpContext, 
																		Q2_ImpExp, Q2_ImpSkill, Q2_ImpRes, Q2_ImpNet, Q3_EquipVol,
														                Q3_EquipCom, Q3_EquipCareer, IssueTags, Comments)	
												VALUES (?,?,?,?,?,
														?,?,?,?,?,
														?,?,?,?,?,
														?,?,?,?,?,
														?,?,?,?,?,
														?,?,?,?)");
			
						$stmt->bind_param("ssssssssssssssiiiiiiiiiiiiiss", 
										   $firstName,$lastName,$MITID,$email,$program,
										   $department,$gradYear,$fsilg,$race,$gender,
										   $pipeline,$pkgProgram,$year,$sem,$learnSI,
										   $learnVS,$learnSocPol,$learnLead,$particPol,$impContext,
										   $impExp,$impSkill,$impRes,$impNet,$equipVol,
										   $equipCom,$equipCareer,$issueTags,$comments);
						
						$returnVal = $stmt->execute();
						
						//"INSERT INTO Registration (FirstName, LastName, MIT_ID) 
						//      VALUES('$firstName','Test', 913751111)";
							  
						/*  
						$sql="INSERT INTO Registration(FirstName, LastName, MIT_ID, Email, StudentType, Department, GradYear, 
														  FSILG, Race, Gender, Pipeline, PKGProgram, ProgramYear, ProgramSem,
														  Q1_LearnSI, Q1_LearnVS, Q1_LearnSocPol, Q1_LearnLead, Q1_PracticePol, 
														  Q2_ImpContext, Q2_ImpExp, Q2_ImpSkill, Q2_ImpRes, Q2_ImpNet, Q3_EquipVol,
														  Q3_EquipCom, Q3_EquipCareer, IssueTags, Comments) 
								VALUES ('$firstName','$lastName','$MITID','$email','$program','$department','$gradYear',
										'$fsilg','$race','$gender','$pipeline','$pkgProgram','$year','$sem',
										'$learnSI','$learnVS','$learnSocPol','$learnLead','$practicePol',
										'$impContext','$impExp','$impSkill','$impRes','$impNet','$equipVol',
										'$equipCom','$equipCareer','$issueTags','$comments')";
						*/
						
						if (!$returnVal){
							echo "<div class='sectionDiv' id='subMsgNeg'>
									<h2>Hmm, something went wrong. Please try again.</h2></div>";
							die('Error: ' . mysqli_error($con));
						} else {
							echo "<div class='sectionDiv' id='subMsgPos'>
								<h2>Thanks! You have successfully registered!</h2>
							  </div>";

						}
					
					}

					mysqli_close($con);
		
				}

				?>
			
				
				</div>
		</div>
	</div>
  </body>
</html>

