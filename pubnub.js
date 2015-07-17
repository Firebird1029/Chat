$(document).ready(function () {
	// console.log("Page loaded.");

	var pubnub = PUBNUB.init({
		publish_key: '',
		subscribe_key: ''
	});
	console.log("Pubnub initiated.");

	var messageContent = $('#input');
	var sendMessageButton = $('#sendButton');
	var messageList = $('#list');

	valid = true;

	// Default. Will be changed later.
	var channel = "User";
	var username = "User";
	var lastMessage = "allah bar";
	var message;
	console.log("Pubnub variables set.");

	function handleMessage(message) {
		console.log("New message from " + message.username + ", on channel " + channel);
		var messageEl = $("<li class='message'><span class='username'>" +message.username + ": </span>" + message.text + "</li>");
		messageList.prepend(messageEl);
		// messageList.listview('refresh');
		console.log("Message added to list.");
	};

	sendMessageButton.click(function(event) {
		console.log("Starting to send message.");
		message = messageContent.val();
		valid = true;
		if (message == lastMessage) {
			messageContent.val("");
			alert("Stop spamming");
		}
		lastMessage = message;
		if (message == '') {
			console.log("Message is empty.");
			return;
		}
		if (message.length > 1000) {
			console.log("Message is too long.");
			return;
		}

		if (valid) {
			pubnub.publish({
				channel: channel,
				message: {
					username: username,
					text: message
				}
			});
			messageContent.val("");
			console.log("Message sent successfully.");
			return;
		} else {
			console.log("Message unsuccessful.");
			messageContent.val("");
			return;
		}
	});

	messageContent.bind('keydown', function(event) {
		if (event.keyCode == 13) {
			console.log("Enter button pressed.");
			// console.log(event);
			if (event.altKey) {
				console.log("Alt button pressed.");
			} else {
				// return true;
				if ($("#sendButton").prop("disabled")) {
					console.log("disabled");
				} else {
					console.log("enabled");
					sendMessageButton.click();
				}
				return false;
			}
		}
	})

	pubnub.subscribe({
		channel: channel,
		message: handleMessage
	});
})