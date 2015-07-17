/*
 * To-Do:
 * 
 * BOBREPLACE, fun stuff
 * 
 */

$(document).ready(function(){

	console.log("Page loaded.");

	$("body").bind('keydown', function(event) {
		// console.log(event);
		if (event.keyCode == 39 && event.altKey) {
			console.log("Skipping form");
			activateChat();
		}
	})

	$('#sendButton').click(function(){
	    var button = $(this);
	    button.attr('disabled', 'disabled');
	    setTimeout(function() {
	         button.removeAttr('disabled');
	    },3000);
	    if(!$('#input').val()){
	       alert('field empty');
	       button.removeAttr('disabled');
	    }else{
	        // $('#message').html('done');
	        // alert("done");
	        $('#input').val('');
	    }
	});

	// LEFT COLUMN
	{
		// Declare all the variables.
		var room; var user; var roomPassword; var accessType; var chatType = "normal";
		var userRoomPassword; var userAccessPassword;
		var mad = 0; var valid;
		var channel = "1"; var username = "2";
		console.log(channel + username);
		console.log("Variables set.")

		// Hide all the password fields.
		$("#settingsPassword").hide();
		$("#userPassword").hide();
		console.log("Form fields hidden.");

		// Hide chat in the beginning.
		$(".middle").hide();
		$(".right").hide();
		$("#changeSettingsButton").hide();

		// Show password field for private chat rooms.
		$("input[name='settingsChatRoomType']").change(function() {
			if (this.value == "Private") {
				$("#settingsPassword").show();
				console.log("Private chat room password field shown.");
				return;
			} else {
				$("#settingsPassword").hide();
				console.log("Private chat room password field hidden.");
				return;
			}
		})

		// Show password field for admins.
		$("input[name='settingsUserRank']").change(function() {
			if (this.value == "Admin") {
				$("#userPassword").show();
				console.log("Admin password field shown.");
				return;
			} else {
				$("#userPassword").hide();
				console.log("Admin password field hidden.");
				return;
			}
		})

		// What happens when the settings are changed.
		$("#settings").submit(function() {
			// debugger;
			console.log("Settings form submitted!");



			// Set variables from what the user set.
			room = $("#settingsChatRoomName").val();
			user = $("#settingsUsername").val();
			accessType = $("input[name='settingsUserRank']").val();

			// No empty fields please.
			if (room == "") {
				if (mad > 2) {
					room = "lobby";
					return;
				} else {
					alert("Please choose a room.");
					mad++;
					return;
				}
			}
			if (user == "") {
				if (mad > 2) {
					user = "Mr. Charles";
					return;
				} else {
					alert("Please choose a username.");
					mad++;
					return;
				}
			}

			// Refix for privacy issues and what not.
			if (user.indexOf("Brandon") >= 0) {
				valid = false;
				return;
			}
			if (user.indexOf("Firebird") >= 0) {
				valid = false;
				return;
			}
			if (user.indexOf("1029") >= 0) {
				valid = false;
				return;
			}
			if (user.indexOf("Admin") >= 0) {
				valid = false;
				return;
			}
			if (user == "noah") {
				noahReturns();
			}

			if (valid) {
				room = "punahou" + room;
				return;
			} else {
				if (userAccessPassword == "bobadybobo") {
					alert("Nice try. Changing your username to User.");
					user = "User";
					room = "punahou" + room;
					return;
				}
			}

			// Password stuff.
			userRoomPassword = $("#settingsChatPassword").val();
			userAccessPassword = $("#settingsUserPassword").val();
			if (accessType == "Admin") {
				if (userAccessPassword == "bobadybobo") {
					fullAdminAccess();
					return;
				} else if (userAccessPassword == "brandon is cool") {
					adminAccess();
					return;
				} else if (userAccessPassword == "tbar") {
					proAccess();
					return;
				} else {
					accessDenied();
					return;
				}
			}

			// Reset fields.
			$("input[type='text']").val("");
			$("input[type='password']").val("");

			activateChat();
		})

	} // END OF LEFT COLUMN

	// ADMIN ACCESS
	{
		function adminAccess() {
			alert("Access granted!");
			$("#input").removeAttr("maxlength");
			chatType = "half pro";
		}

		function fullAdminAccess() {
			alert("Full access!");
			$("#input").removeAttr("maxlength");
			chatType = "brandon";
		}

		function accessDenied() {
			alert("Access denied.");
		}

		function proAccess() {
			alert("noah get off of her");
			chatType = "full pro";

		}

	} // END OF ADMIN ACCESS

	function noahReturns() {
		$("body").empty();
		$("body").append("noah you're not invited");
	}

	function activateChat() {
		// Activate chat!
		$("#settings").toggle("slide", {direction: "left"}, 1000);
		$(".middle").toggle("slide", {direction: "right"}, 1000);
		$(".right").fadeIn(2000);
		// $("#changeSettingsButton").show();
		channel = room;
		username = user;
		console.log(channel + username);
	}

	console.log("jQuery code finished.");

});