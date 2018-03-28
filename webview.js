//don't blame me for that piece of code :)
const path = require('path');

module.exports = (Franz) => {
	const getMessages = function getMessages() {
		Franz.setBadge(document.querySelectorAll(".hasUnreadMessages").length);
	}
	
	Franz.loop(getMessages);

	var addSearch = function(){

		if($('#chatRoomListHeader').length === 0){
			setTimeout(addSearch, 100);
			return;
		}

		$('#chatRoomListHeader').prepend('<label style="margin: 10px">Search</search><input style="margin-left: 10px" type="text" id="search"/>').css({ height: 60, "margin-top": 10});
		$("#chatRoomList").css({ "top": 60 })

		var press=0;
		var disableOnce = false;

		$("#search").on("focusout", function(e){

			if(!disableOnce){
				console.log(e); 
				press = 0;
			}   
			disableOnce = false;    
			
		})

		jQuery.expr[":"].myContains = jQuery.expr.createPseudo(function(arg) {
			return function( elem ) {
				return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
			};
		});

		var t;

		$("#search").on("keyup", function(e){ 
			//wait for enter key
			if (event.keyCode !== 13) {
				return;
			}

			var search = $(this).val();
			if(search.length>0){
				var results = $(".chatRoomListEntry .title:myContains("+search+")")
				disableOnce =true;

				if(results.length > press){
					$(".chatRoomListEntry .title:myContains("+search+")").eq(press++).click();
					setTimeout(function(){ $("#search").focus(); });    
				}else{
					//start from beginning
					press = 0;
				}
				
			}



		})
	}
	
	setTimeout(addSearch, 100);
	
};


 
