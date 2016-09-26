<?PHP


$message = "Name: " . $_POST['name'] . "\n";
$message .= "Phone: " . $_POST['phone'] . "\n";
$message .= "Email: " . $_POST['email'] . "\n";

$message .= "Comments:\n" . $_POST['message'];

$message = stripslashes($message);

$subject = "Gerald Website Inquiry";

$toEmail = "gerald@tolomeoltd.com";

$email = $_POST['email']; 

mail($toEmail,$subject,$message,"From: ".$email);



?>