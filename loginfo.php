<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

					$con=mysqli_connect("sql.mit.edu","pkgdata","sox58kir","pkgdata+registrationData");
					
					// Check connection
					if (mysqli_connect_errno()){
						echo json_encode('logFailure');
					} else {
						$userName = mysqli_real_escape_string($con,$_POST['userName']);
						
						$stmt = $con->prepare("INSERT INTO UserLog(User)	
												VALUES (?)");
						$stmt->bind_param("s", 
										   $userName);
						
						$returnVal = $stmt->execute();
						
						if (!$returnVal){
							echo json_encode('logFailure');
						} else {
							echo json_encode('logSuccess');
						}
					
					}

					mysqli_close($con);
									
?>