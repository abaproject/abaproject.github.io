	<?php 
	function sendGcmNotify($reg_ids, $message)
	{
		$fields = array(
			'registration_ids'  => $reg_ids
		);
		
		$headers = array(
			'Authorization: key=' . 'AIzaSyDq5WEWwiKCcDotArJXJUY6gX2AEDcxArM',
			'Content-Type: application/json'
		);
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, 'https://android.googleapis.com/gcm/send');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
		
		$result = curl_exec($ch);
		if ($result === FALSE) {
			die('Problem occurred: ' . curl_error($ch));
		}
		curl_close($ch);
	}
	
	sendGcmNotify(	'fyV3H2ngsjc:APA91bFnQowrdhwxVwhqdgTSFZw21p0oW4UyLO6uJ9YS72hc47MqYyQqOEhLuOr2W-aj6iBgBD55McQJv8dtM764lYUp8J5M82Rm4_qYpPHfMFKyieV5-YV0xyG5zuKVVmbO_HDG476W',
		'Test for message'
	);