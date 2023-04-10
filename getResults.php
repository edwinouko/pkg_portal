<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Get DataBase Values for Chart
function queryDB($connection,$queryName) {
	$resultSet = $connection->query($queryName);
	return(json_encode($resultSet->fetch_all()));
}
					
function queryDBFilter($connection,$queryS, $queryE, $programArray, $genderArray, $raceArray, $studtypeArray, $programyearArray, $departmentArray) {
	$sql = $queryS."WHERE PKGProgram IN ('".$programArray."')"." AND Gender IN ('".$genderArray."')"." AND Race IN ('".$raceArray."')".
	" AND StudentType IN ('".$studtypeArray."')"." AND ProgramYear IN ('".$programyearArray."')"." AND Department IN ('".$departmentArray."') ".$queryE;
	$resultSet = $connection->query($sql);
	
	return(json_encode($resultSet->fetch_all()));
}

$reqType = $_POST['reqType'];
					
if ($reqType=="allData"){
				
			$con=mysqli_connect("sql.mit.edu","pkgdata","sox58kir","pkgdata+registrationData");

			// Check connection
			if (mysqli_connect_errno()){
				echo "Failed to connect to MySQL: " . mysqli_connect_error();
				echo "<div class='sectionDiv' id='subMsgNeg'>
						<h2>Hmm, something went wrong. Please try again.</h2></div>";
			} else {
				// Get MetaData
				$query = "SELECT UpdateTime FROM MetaData";
				$updateTime = queryDB($con, $query);
				
				// Get all Rows
				$query = "SELECT COUNT(DISTINCT UID) FROM Registration";
				$allStudents = queryDB($con, $query);

				$query = "SELECT COUNT(DISTINCT UID) FROM Registration WHERE Gender='She/Her/Hers'";
				$femaleStudents = queryDB($con, $query);
				
				$query = "SELECT COUNT(DISTINCT UID) FROM Registration WHERE Gender!='No response'";
				$genderStudents = queryDB($con, $query);
				
				$query = "SELECT COUNT(DISTINCT Department) FROM Registration";
				$departmentNum= queryDB($con, $query);
				
				$query = "SELECT COUNT(DISTINCT UID) FROM Registration WHERE Race IN ('Black / African American', 'Indigenous American / American Indian / Alaskan Native', 'Hispanic / Latinx American','Native Hawaiian / Pacific Islander American')";
				$URMStudents= queryDB($con, $query);
				
				$query = "SELECT COUNT(DISTINCT UID) FROM Registration WHERE Race!='No response'";
				$raceStudents = queryDB($con, $query);
										
				// Get Plot Data - Program
				$query = "SELECT PKGProgram, COUNT(PKGProgram) AS tot FROM Registration GROUP BY PKGProgram ORDER BY tot DESC";
				$programPlot= queryDB($con, $query);
				
				// Get Plot Data - Degree
				$query = "SELECT StudentType, COUNT(StudentType) AS tot FROM Registration GROUP BY StudentType ORDER BY tot DESC";
				$degreePlot= queryDB($con, $query);
				
				// Get Plot Data - Gender
				$query = "SELECT Gender, COUNT(Gender) AS tot FROM Registration GROUP BY Gender ORDER BY tot DESC";
				$genderPlot= queryDB($con, $query);
				
				// Get Plot Data - Race
				$query = "SELECT Race, COUNT(Race) AS tot FROM Registration GROUP BY Race ORDER BY tot DESC";
				$racePlot= queryDB($con, $query);
				
				// Get Plot Data - Department
				$query = "SELECT Department, COUNT(Department) AS tot FROM Registration GROUP BY Department ORDER BY tot DESC";
				$departmentPlot= queryDB($con, $query);
				
				// Get Plot Data - Pipeline
				$query = "SELECT Pipeline, COUNT(Pipeline) AS tot FROM Registration GROUP BY Pipeline ORDER BY tot DESC";
				$pipelinePlot= queryDB($con, $query);			

				// Get Comment Data
				$query = "SELECT Comments FROM Registration WHERE Comments!=''";
				$comments= queryDB($con, $query);	
				
				// Get Metrics
				
				// Interest
				$query = "SELECT AVG(Q1_LearnSI) FROM Registration";
				$Q1_LearnSI= queryDB($con, $query);	
			
				$query = "SELECT AVG(Q1_LearnVS) FROM Registration";
				$Q1_LearnVS= queryDB($con, $query);	
		
				$query = "SELECT AVG(Q1_LearnSocPol) FROM Registration";
				$Q1_LearnSocPol= queryDB($con, $query);	
			
				$query = "SELECT AVG(Q1_LearnLead) FROM Registration";
				$Q1_LearnLead= queryDB($con, $query);	
			
				$query = "SELECT AVG(Q1_ParticPol) FROM Registration";
				$Q1_ParticPol= queryDB($con, $query);	
									
				// Importance
				$query = "SELECT AVG(Q2_ImpContext) FROM Registration";
				$Q2_ImpContext= queryDB($con, $query);	
									
				$query = "SELECT AVG(Q2_ImpExp) FROM Registration";
				$Q2_ImpExp= queryDB($con, $query);	
			
				$query = "SELECT AVG(Q2_ImpSkill) FROM Registration";
				$Q2_ImpSkill= queryDB($con, $query);	
			
				$query = "SELECT AVG(Q2_ImpRes) FROM Registration";
				$Q2_ImpRes= queryDB($con, $query);	
				
				$query = "SELECT AVG(Q2_ImpNet) FROM Registration";
				$Q2_ImpNet= queryDB($con, $query);	
									
				// Equip 
				$query = "SELECT AVG(Q3_EquipVol) FROM Registration";
				$Q3_EquipVol= queryDB($con, $query);	
							
				$query = "SELECT AVG(Q3_EquipCom) FROM Registration";
				$Q3_EquipCom= queryDB($con, $query);	

				$query = "SELECT AVG(Q3_EquipCareer) FROM Registration";
				$Q3_EquipCareer= queryDB($con, $query);			

				echo json_encode(array(
				"reqType"=> $reqType,
				"allStudents"=> $allStudents,
				"allExpStudents"=>$allStudents,
				"departmentNum"=> $departmentNum,
				"femaleStudents"=> $femaleStudents,
				"genderStudents"=> $genderStudents,
				"URMStudents"=> $URMStudents,
				"raceStudents"=> $raceStudents,
				"programPlot"=> $programPlot,
				"degreePlot"=> $degreePlot,
				"genderPlot"=> $genderPlot,
				"racePlot"=> $racePlot,
				"departmentPlot"=> $departmentPlot,
				"pipelinePlot"=> $pipelinePlot,
				"comments"=> $comments,
				"Q1_LearnSI" => $Q1_LearnSI,
				"Q1_LearnVS" => $Q1_LearnVS,
				"Q1_LearnSocPol" => $Q1_LearnSocPol,
				"Q1_LearnLead" => $Q1_LearnLead,
				"Q1_ParticPol" => $Q1_ParticPol,
				"Q2_ImpContext" => $Q2_ImpContext,
				"Q2_ImpExp" => $Q2_ImpExp,
				"Q2_ImpSkill" => $Q2_ImpSkill,					
				"Q2_ImpRes" => $Q2_ImpRes,
				"Q2_ImpNet" => $Q2_ImpNet,
				"Q3_EquipVol" => $Q3_EquipVol,
				"Q3_EquipCom" => $Q3_EquipCom,
				"Q3_EquipCareer" => $Q3_EquipCareer,
				"updateTime"=> $updateTime));
				
			}
			
			mysqli_close($con);
				
} else if ($reqType=="filterData"){
	
			$prog = $_POST['prog'];
			$gender = $_POST['gender'];
			$race = $_POST['race'];
			$deg = $_POST['deg'];
			$ay = $_POST['ay'];
			$dep = $_POST['dep'];
			$progArray = implode("','", $prog);
			$genderArray = implode("','", $gender);
			$raceArray = implode("','", $race);
			$degArray = implode("','", $deg);
			$ayArray = implode("','", $ay);
			$depArray = implode("','", $dep);

			$con=mysqli_connect("sql.mit.edu","pkgdata","sox58kir","pkgdata+registrationData");
			
			if (mysqli_connect_errno()){
				echo json_encode("Failed to connect to MySQL: " . mysqli_connect_error());
			} else {
				
				// All Students 
				$query = "SELECT COUNT(DISTINCT UID) FROM Registration";
				$allExpStudents = queryDB($con, $query);
			
				// Get all general data
				$queryStart = "SELECT COUNT(DISTINCT UID) FROM Registration ";
				$queryEnd = "";
				$allStudents = queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);

				$queryStart = "SELECT COUNT(DISTINCT UID) FROM Registration ";
				$queryEnd = "AND Gender='She/Her/Hers'";
				$femaleStudents = queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
				
				$queryStart = "SELECT COUNT(DISTINCT UID) FROM Registration ";
				$queryEnd = "AND Gender!='No response'";
				$genderStudents = queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
				
				$queryStart = "SELECT COUNT(DISTINCT UID) FROM Registration ";
				$queryEnd = "AND Race IN ('Black / African American', 'Indigenous American / American Indian / Alaskan Native', 'Hispanic / Latinx American','Native Hawaiian / Pacific Islander American')";
				$URMStudents= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);

				$queryStart = "SELECT COUNT(DISTINCT UID) FROM Registration ";
				$queryEnd = "AND Race!='No response'";
				$raceStudents = queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);

				$queryStart = "SELECT COUNT(DISTINCT Department) FROM Registration ";
				$queryEnd = "";
				$departmentNum = queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
				
				// Get Filter Data
				// Get Plot Data - Program
				$queryStart = "SELECT PKGProgram, COUNT(PKGProgram) AS tot FROM Registration ";
				$queryEnd = "GROUP BY PKGProgram ORDER BY tot DESC";
				$programPlot = queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
				
				// Get Plot Data - Degree
				$queryStart = "SELECT StudentType, COUNT(StudentType) AS tot FROM Registration ";
				$queryEnd = "GROUP BY StudentType ORDER BY tot DESC";
				$degreePlot = queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
				
				// Get Plot Data - Gender
				$queryStart = "SELECT Gender, COUNT(Gender) AS tot FROM Registration ";
				$queryEnd = "GROUP BY Gender ORDER BY tot DESC";
				$genderPlot = queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
				
				// Get Plot Data - Race
				$queryStart = "SELECT Race, COUNT(Race) AS tot FROM Registration ";
				$queryEnd = "GROUP BY Race ORDER BY tot DESC";
				$racePlot = queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
				
				// Get Plot Data - Department
				$queryStart = "SELECT Department, COUNT(Department) AS tot FROM Registration ";
				$queryEnd = "GROUP BY Department ORDER BY tot DESC";
				$departmentPlot = queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
				
				// Get Plot Data - Pipeline
				$queryStart = "SELECT Pipeline, COUNT(Pipeline) AS tot FROM Registration ";
				$queryEnd = "GROUP BY Pipeline ORDER BY tot DESC";
				$pipelinePlot = queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);			

				// Get Comment Data
				$queryStart = "SELECT Comments FROM Registration ";
				$queryEnd = "AND Comments!=''";
				$comments= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
				
				// Get Metrics
				// Interest
				$queryStart = "SELECT AVG(Q1_LearnSI) FROM Registration ";
				$queryEnd = "";
				$Q1_LearnSI= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
			
				$queryStart = "SELECT AVG(Q1_LearnVS) FROM Registration ";
				$queryEnd = "";
				$Q1_LearnVS= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
		
				$queryStart = "SELECT AVG(Q1_LearnSocPol) FROM Registration ";
				$queryEnd = "";
				$Q1_LearnSocPol= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
			
				$queryStart = "SELECT AVG(Q1_LearnLead) FROM Registration ";
				$queryEnd = "";
				$Q1_LearnLead= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
			
				$queryStart = "SELECT AVG(Q1_ParticPol) FROM Registration ";
				$queryEnd = "";
				$Q1_ParticPol= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
									
				// Importance
				$queryStart = "SELECT AVG(Q2_ImpContext) FROM Registration ";
				$queryEnd = "";
				$Q2_ImpContext= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
									
				$queryStart = "SELECT AVG(Q2_ImpExp) FROM Registration ";
				$queryEnd = "";
				$Q2_ImpExp= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
			
				$queryStart = "SELECT AVG(Q2_ImpSkill) FROM Registration ";
				$queryEnd = "";
				$Q2_ImpSkill= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
			
				$queryStart = "SELECT AVG(Q2_ImpRes) FROM Registration ";
				$queryEnd = "";
				$Q2_ImpRes= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
				
				$queryStart = "SELECT AVG(Q2_ImpNet) FROM Registration ";
				$queryEnd = "";
				$Q2_ImpNet= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
									
				// Equip 
				$queryStart = "SELECT AVG(Q3_EquipVol) FROM Registration ";
				$queryEnd = "";
				$Q3_EquipVol= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
							
				$queryStart = "SELECT AVG(Q3_EquipCom) FROM Registration ";
				$queryEnd = "";
				$Q3_EquipCom= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	

				$queryStart = "SELECT AVG(Q3_EquipCareer) FROM Registration ";
				$queryEnd = "";
				$Q3_EquipCareer= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);		

				echo json_encode(array( 
								"reqType"=> $reqType,
								"allStudents"=> $allStudents,
								"allExpStudents"=> $allExpStudents,
								"departmentNum"=> $departmentNum,
								"femaleStudents"=> $femaleStudents,
								"URMStudents"=> $URMStudents,
								"genderStudents"=> $genderStudents,
								"raceStudents"=> $raceStudents,
								"programPlot"=> $programPlot,
								"degreePlot"=> $degreePlot,
								"genderPlot"=> $genderPlot,
								"racePlot"=> $racePlot,
								"departmentPlot"=> $departmentPlot,
								"pipelinePlot"=> $pipelinePlot,
								"comments"=> $comments,
								"Q1_LearnSI" => $Q1_LearnSI,
								"Q1_LearnVS" => $Q1_LearnVS,
								"Q1_LearnSocPol" => $Q1_LearnSocPol,
								"Q1_LearnLead" => $Q1_LearnLead,
								"Q1_ParticPol" => $Q1_ParticPol,
								"Q2_ImpContext" => $Q2_ImpContext,
								"Q2_ImpExp" => $Q2_ImpExp,
								"Q2_ImpSkill" => $Q2_ImpSkill,					
								"Q2_ImpRes" => $Q2_ImpRes,
								"Q2_ImpNet" => $Q2_ImpNet,
								"Q3_EquipVol" => $Q3_EquipVol,
								"Q3_EquipCom" => $Q3_EquipCom,
								"Q3_EquipCareer" => $Q3_EquipCareer));
			}
			mysqli_close($con);
			
} else if($reqType=="getFilters"){
	$con=mysqli_connect("sql.mit.edu","pkgdata","sox58kir","pkgdata+registrationData");

	// Check connection
	if (mysqli_connect_errno()){
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		echo "<div class='sectionDiv' id='subMsgNeg'>
		<h2>Hmm, something went wrong. Please try again.</h2></div>";
	} else {
		$query ="SELECT DISTINCT Race FROM Registration ORDER BY Race ASC";
		$raceList = queryDB($con, $query);
		
		$query ="SELECT DISTINCT Race FROM CompletionData ORDER BY Race ASC";
		$raceList2 = queryDB($con, $query);
		
		$query ="SELECT DISTINCT Gender FROM Registration ORDER BY Gender ASC";
		$genderList = queryDB($con, $query);
		
		$query ="SELECT DISTINCT Gender FROM CompletionData ORDER BY Gender ASC";
		$genderList2 = queryDB($con, $query);
		
		$query ="SELECT DISTINCT StudentType FROM Registration ORDER BY StudentType ASC";
		$degList = queryDB($con, $query);
		
		$query ="SELECT DISTINCT StudentType FROM CompletionData ORDER BY StudentType ASC";
		$degList2 = queryDB($con, $query);
		
		$query ="SELECT DISTINCT Department FROM Registration ORDER BY Department ASC";
		$depList = queryDB($con, $query);
		
		$query ="SELECT DISTINCT Department FROM CompletionData ORDER BY Department ASC";
		$depList2 = queryDB($con, $query);
		
		$query ="SELECT DISTINCT ProgramYear FROM Registration ORDER BY ProgramYear ASC";
		$ayList = queryDB($con, $query);
		
		$query ="SELECT DISTINCT ProgramYear FROM CompletionData ORDER BY ProgramYear ASC";
		$ayList2 = queryDB($con, $query);
		
		$query ="SELECT DISTINCT PKGProgram FROM Registration ORDER BY PKGProgram ASC";
		$pkgProgramList = queryDB($con, $query);
		
		$query ="SELECT DISTINCT PKGProgram FROM CompletionData ORDER BY PKGProgram ASC";
		$pkgProgramList2 = queryDB($con, $query);
		
		echo json_encode(array(
					"reqType"=> $reqType,
					"raceList"=> $raceList,
					"genderList"=> $genderList,
					"degList"=> $degList,
					"depList"=> $depList,
					"ayList"=> $ayList,
					"pkgProgramList"=> $pkgProgramList,
					"raceList2"=> $raceList2,
					"genderList2"=> $genderList2,
					"degList2"=> $degList2,
					"depList2"=> $depList2,
					"ayList2"=> $ayList2,
					"pkgProgramList2"=> $pkgProgramList2));
	}
}else if ($reqType=="completionData"){
			$con=mysqli_connect("sql.mit.edu","pkgdata","sox58kir","pkgdata+registrationData");
					
			if (mysqli_connect_errno()){
				echo json_encode("Failed to connect to MySQL: " . mysqli_connect_error());
			} else {
				
				// All Students 
				$query = "SELECT COUNT(DISTINCT UID) FROM Registration";
				$allExpStudents = queryDB($con, $query);
			
				// Get Default Post-Program Data
				$query = "SELECT COUNT(DISTINCT TimeStamp) FROM CompletionData";
				$allStudents = queryDB($con, $query);
				
				// Get Learning Feedback
				$query = "SELECT LearningFeedback FROM CompletionData WHERE LearningFeedback!=''";
				$learningFeed= queryDB($con, $query);
				
				// Get PKG Ambassador 
				$query = "SELECT FirstName FROM CompletionData WHERE PKG_Ambassador='Yes'";
				$pkgAmbFN= queryDB($con, $query);

				$query = "SELECT LastName FROM CompletionData WHERE PKG_Ambassador='Yes'";
				$pkgAmbLN= queryDB($con, $query);

				$query = "SELECT Email FROM CompletionData WHERE PKG_Ambassador='Yes'";
				$pkgAmbEmail= queryDB($con, $query);

				// Get Optional Feedback
				$query = "SELECT OptionalFeedback FROM CompletionData WHERE OptionalFeedback!=''";
				$optionalFeed= queryDB($con, $query);
							
				function queryBuilder($con_, $column, $toCount=TRUE){
					if($toCount){
						$orderFilter = "(
							case ".$column."
							when 'Strongly Disagree' then 0 
							when 'Disagree' then 1
							when 'Agree' then 2
							when 'Strongly Agree' then 3
							when 'Not Applicable' then 4
							end
					   ) ";
						$query = "SELECT ".$column.", COUNT(".$column.") as tot FROM CompletionData WHERE ".$column." IS NOT NULL GROUP BY  ".$column." ORDER BY ".$orderFilter."";
					} else {
						$query = "SELECT ".$column." FROM CompletionData WHERE ".$column." IS NOT NULL";
					}
					return queryDB($con_, $query);
				}
				
				$better_understanding_agree = queryBuilder($con, "better_understanding_agree");

				$effect_understanding_social_issues= queryBuilder($con, "effect_understanding_social_issues", $toCount=FALSE);
							
				$gain_skills_social_change_agree= queryBuilder($con, "gain_skills_social_change_agree");

				$confidence_influencing_social_change_agree= queryBuilder($con, "confidence_influencing_social_change_agree");

				$effect_confidence_influencing_social_change = queryBuilder($con, "effect_confidence_influencing_social_change", $toCount=FALSE);
		
				$inspired_knowledge_forsocial_change_agree = queryBuilder($con, "inspired_knowledge_forsocial_change_agree");
				
				$incorporate_social_change_effort_academics_agree= queryBuilder($con, "incorporate_social_change_effort_academics_agree");

				$incorporate_social_change_effort_career_agree = queryBuilder($con, "incorporate_social_change_effort_career_agree");

				$effect_motivation_social_change = queryBuilder($con, "effect_motivation_social_change", $toCount=FALSE);

				$associate_name_feedback = queryBuilder($con, "associate_name_feedback", $toCount=FALSE);

				echo json_encode(array( 
				"reqType"=> $reqType,
				"learningFeed"=> $learningFeed,
				"optionalFeed"=> $optionalFeed,
				"pkgAmbFN"=> $pkgAmbFN,
				"pkgAmbLN"=> $pkgAmbLN,
				"pkgAmbEmail"=> $pkgAmbEmail,
				"better_understanding_agree" => $better_understanding_agree,
				"effect_understanding_social_issues" => $effect_understanding_social_issues,
				"gain_skills_social_change_agree" => $gain_skills_social_change_agree,
				"confidence_influencing_social_change_agree" => $confidence_influencing_social_change_agree,
				"effect_confidence_influencing_social_change" => $effect_confidence_influencing_social_change,
				"inspired_knowledge_forsocial_change_agree" => $inspired_knowledge_forsocial_change_agree,
				"incorporate_social_change_effort_academics_agree" => $incorporate_social_change_effort_academics_agree,
				"incorporate_social_change_effort_career_agree" => $incorporate_social_change_effort_career_agree,					
				"effect_motivation_social_change" => $effect_motivation_social_change,
				"associate_name_feedback" => $associate_name_feedback,
				"allStudents" => $allStudents,
				"allExpStudents" => $allExpStudents));
			}
			
			mysqli_close($con);
	
}else if ($reqType=="completionDataFilter"){
	
	$prog = $_POST['prog'];
	$gender = $_POST['gender'];
	$race = $_POST['race'];
	$deg = $_POST['deg'];
	$ay = $_POST['ay'];
	$dep = $_POST['dep'];
	$progArray = implode("','", $prog);
	$genderArray = implode("','", $gender);
	$raceArray = implode("','", $race);
	$degArray = implode("','", $deg);
	$ayArray = implode("','", $ay);
	$depArray = implode("','", $dep);

	$con=mysqli_connect("sql.mit.edu","pkgdata","sox58kir","pkgdata+registrationData");
	
	if (mysqli_connect_errno()){
		echo json_encode("Failed to connect to MySQL: " . mysqli_connect_error());
	} else {		
		// All Students
			
			$query = "SELECT COUNT(DISTINCT UID) FROM Registration";
			$allExpStudents = queryDB($con, $query);
			
			// Get Filtered Data
			$queryStart = "SELECT COUNT(DISTINCT TimeStamp) FROM CompletionData ";
			$queryEnd = "";
			$allStudents= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
			
			// Get Learning Feedback
			$queryStart = "SELECT LearningFeedback FROM CompletionData ";
			$queryEnd = "AND LearningFeedback!='' AND LearningFeedback IS NOT NULL";
			$learningFeed= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
			
			// Get PKG Ambassador 
			$queryStart = "SELECT FirstName FROM CompletionData ";
			$queryEnd = "AND PKG_Ambassador='Yes'";
			$pkgAmbFN= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
					
			$queryStart = "SELECT LastName FROM CompletionData ";
			$queryEnd = "AND PKG_Ambassador='Yes'";
			$pkgAmbLN= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
				
			$queryStart = "SELECT Email FROM CompletionData ";
			$queryEnd = "AND PKG_Ambassador='Yes'";
			$pkgAmbEmail= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
		
		// Get Optional Feedback
		$queryStart = "SELECT OptionalFeedback FROM CompletionData ";
		$queryEnd = "AND OptionalFeedback!='' ";
		$optionalFeed= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
		
		// Get Survey Results
		function queryBuilderFilter($con_, $column, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray, $toCount=TRUE){
			$queryEnd = "AND ".$column." IS NOT NULL";
			if($toCount){
				$queryStart = "SELECT ".$column.", COUNT(".$column.") as tot FROM CompletionData ";
				$orderFilter = "(
					case ".$column."
					when 'Strongly Disagree' then 0 
					when 'Disagree' then 1
					when 'Agree' then 2
					when 'Strongly Agree' then 3
					when 'Not Applicable' then 4
					end
			   ) ";
				$queryEnd = "AND ".$column." IS NOT NULL GROUP BY  ".$column." ORDER BY ".$orderFilter."";
			} else {
				$queryStart = "SELECT ".$column." FROM CompletionData ";
			}
			return queryDBFilter($con_, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
		}
		
		$better_understanding_agree = queryBuilderFilter($con, "better_understanding_agree", $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);

		$effect_understanding_social_issues= queryBuilderFilter($con, "effect_understanding_social_issues", $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray, $toCount=FALSE);
					
		$gain_skills_social_change_agree= queryBuilderFilter($con, "gain_skills_social_change_agree", $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);

		$confidence_influencing_social_change_agree= queryBuilderFilter($con, "confidence_influencing_social_change_agree", $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);

		$effect_confidence_influencing_social_change = queryBuilderFilter($con, "effect_confidence_influencing_social_change", $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray, $toCount=FALSE);

		$inspired_knowledge_forsocial_change_agree = queryBuilderFilter($con, "inspired_knowledge_forsocial_change_agree", $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);
		
		$incorporate_social_change_effort_academics_agree= queryBuilderFilter($con, "incorporate_social_change_effort_academics_agree", $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);

		$incorporate_social_change_effort_career_agree = queryBuilderFilter($con, "incorporate_social_change_effort_career_agree", $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);

		$effect_motivation_social_change = queryBuilderFilter($con, "effect_motivation_social_change", $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray, $toCount=FALSE);

		$associate_name_feedback = queryBuilderFilter($con, "associate_name_feedback", $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray, $toCount=FALSE);

		echo json_encode(array( 
		"reqType"=> $reqType,
		"learningFeed"=> $learningFeed,
		"optionalFeed"=> $optionalFeed,
		"pkgAmbFN"=> $pkgAmbFN,
		"pkgAmbLN"=> $pkgAmbLN,
		"pkgAmbEmail"=> $pkgAmbEmail,
		"better_understanding_agree" => $better_understanding_agree,
		"effect_understanding_social_issues" => $effect_understanding_social_issues,
		"gain_skills_social_change_agree" => $gain_skills_social_change_agree,
		"confidence_influencing_social_change_agree" => $confidence_influencing_social_change_agree,
		"effect_confidence_influencing_social_change" => $effect_confidence_influencing_social_change,
		"inspired_knowledge_forsocial_change_agree" => $inspired_knowledge_forsocial_change_agree,
		"incorporate_social_change_effort_academics_agree" => $incorporate_social_change_effort_academics_agree,
		"incorporate_social_change_effort_career_agree" => $incorporate_social_change_effort_career_agree,					
		"effect_motivation_social_change" => $effect_motivation_social_change,
		"associate_name_feedback" => $associate_name_feedback,
		"allStudents" => $allStudents,
		"allExpStudents" => $allExpStudents));
	
	}
	mysqli_close($con);	
} else if ($reqType=="downloadData"){
			$passwd = $_POST['passwd'];	
			if($passwd == "timthebeaver"){
				$prog = $_POST['prog'];
				$gender = $_POST['gender'];
				$race = $_POST['race'];
				$deg = $_POST['deg'];
				$ay = $_POST['ay'];
				$dep = $_POST['dep'];
				$progArray = implode("','", $prog);
				$genderArray = implode("','", $gender);
				$raceArray = implode("','", $race);
				$degArray = implode("','", $deg);
				$ayArray = implode("','", $ay);
				$depArray = implode("','", $dep);

				$con=mysqli_connect("sql.mit.edu","pkgdata","sox58kir","pkgdata+registrationData");
				
				if (mysqli_connect_errno()){
					echo json_encode("Failed to connect to MySQL: " . mysqli_connect_error());
				} else {
					
					$auth = 'Success';
					
					// Get Registration Column Names
					$query = "DESCRIBE Registration";
					$regTableNames= queryDB($con, $query);
					
					// Get Completion Column Names
					$query = "DESCRIBE CompletionData";
					$completionTableNames= queryDB($con, $query);
					
					// Get All Registration Data
					$queryStart = "SELECT * FROM Registration ";
					$queryEnd = "";
					$registrationData= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
					
					// Get All Completion Data
					$queryStart = "SELECT * FROM CompletionData ";
					$queryEnd = "";
					$completionData= queryDBFilter($con, $queryStart, $queryEnd, $progArray, $genderArray, $raceArray, $degArray, $ayArray, $depArray);	
					
					echo json_encode(array( 
					"reqType"=> $reqType,
					"auth"=> $auth,
					"registrationData"=> $registrationData,
					"completionData"=> $completionData,
					"regTableNames"=> $regTableNames,
					"completionTableNames"=> $completionTableNames));
				}
				
				mysqli_close($con);
			} else {
				$auth = 'Failure';
				sleep(5);
				echo json_encode(array( 
					"reqType"=> $reqType,
					"auth"=> $auth));
			}			
}
?> 






