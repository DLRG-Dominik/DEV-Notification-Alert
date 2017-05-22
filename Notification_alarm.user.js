
var allianceChatNotifcation = (localStorage.getItem("Chat") == "true"); // true = Chat-Notification sind standardmäßig aktiviert (Standard: true).
var allianceS5Notifcation = (localStorage.getItem("S5") == "true"); // true = Status 5-Notification sind standardmäßig aktiviert (Standard: true).
var allianceStatusNotifcation = (localStorage.getItem("Status") == "true"); // true = Alle anderen Status-Notification sind standardmäßig aktiviert (Standard: false).
var allianceChatPNotifcation = (localStorage.getItem("ChatP") == "true"); // true = Alle anderen Status-Notification sind standardmäßig aktiviert (Standard: false).
var timeout_Chat = localStorage.getItem("Chat_blend"); //Zeit in Sekunden wie lange Chat-Notifications angezeigt werden sollen (Standard: 3).
var timeout_S5 = localStorage.getItem("S5_blend"); //Zeit in Sekunden wie lange S5-Notifications angezeigt werden sollen (Standard: 3).
var timeout_Status = localStorage.getItem("Status_blend"); //Zeit in Sekunden wie lange Status-Notifications angezeigt werden sollen (Standard: 3).
var timeout_ChatPopup = localStorage.getItem("ChatP_blend");


var set = {
       locale: I18n.locale,
       translations: {
           de: {
               not_support:"Dieser Browser unterstützt leider keine HTML5-Notifications",
               init:"Notification-Alarm wird initalisiert, Bitte warten...",
               inithead:"Initalisierung",
               chat_message: "Chatnachricht von ",
               del:"Löschen"
           },
           en: {
               save:"This browser does not support HTML5 notifications",
               init:"Notification alarm is initialized, please wait ...",
               inithead:"Initialization",
               chat_message: "Chat message from",
               del:"Löschen"
           },
           nl: {
               save:"Helaas ondersteunt deze browser ondersteunt geen HTML5 meldingen",
               init:"Melding alarm wordt geactiveerd, Please wait ...",
               inithead:"initialisatie",
               chat_message: "Chat bericht ",
               del:"Löschen"
           }
       }
   };



function notifyMe(username,message,type="init",fms="2",vid="0") {

    if (!("Notification" in window)) {
        alert(set.translations[set.locale].not_support);
    }


    else if (Notification.permission === "granted") {

        if(type =="init")
        {
            var notification = new Notification(username, {
                body: message,
                icon: "https://www.leitstellenspiel.de/images/logo-header.png"
            });
        }
        else if(type =="Chat")
        {
            var notification = new Notification(set.translations[set.locale].chat_message+username, {
                body: message,
                icon: "https://raw.githubusercontent.com/DLRG-Dominik/LSSNotifity-Alarm/master/134895.png"
            });
            setTimeout(function() {     notification.close(); }, timeout_Chat*1000);
            notification.onclick = function () {
                window.focus();
            };
        }
        else if(type =="Status")
        {
            var notification = new Notification(username, {
                body: message,
                icon: "https://raw.githubusercontent.com/DLRG-Dominik/LSSNotifity-Alarm/master/Status_"+fms+".png",
            });
            setTimeout(function() {     notification.close(); }, timeout_Status*1000);
            notification.onclick = function () {

                $( "body" ).append('<a href="/vehicles/'+ vid +'" id="v_'+vid+'_'+fms+'" class="btn btn-xs btn-default lightbox-open">'+username+'</a>');
                $('#v_'+vid+'_'+fms+'').click();
                window.focus();
                $('#v_'+vid+'_'+fms+'').remove();
            };
        }
        else if(type =="S5")
        {
            var notification = new Notification(username, {
                body: message,
                icon: "https://raw.githubusercontent.com/DLRG-Dominik/LSSNotifity-Alarm/master/Status_"+fms+".png",
            });
            setTimeout(function() {     notification.close(); }, timeout_S5*1000);
            notification.onclick = function () {

                $( "body" ).append('<a href="/vehicles/'+ vid +'" id="v_'+vid+'_'+fms+'" class="btn btn-xs btn-default lightbox-open">'+username+'</a>');
                $('#v_'+vid+'_'+fms+'').click();
                window.focus();
                $('#v_'+vid+'_'+fms+'').remove();
            };
        }

    }


    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {

            if (permission === "granted") {
                var notification = new Notification("Benachrichtungen aktiviert!");
            }
            else {
              
            }
        });
    }


}
var $mainDiv = $('<div id="chatNote" class="panel panel-default"><div class="panel-heading">Chat</div></div>');
$mainDiv.css({
    'position': 'fixed',
    'width': '250px',
    'z-index': '99999',
    'margin-left': '-255px',
    'top': '20%',
    'left': '100%',
    'display':'none',
    'cursor':'pointer'
});
$mainDiv.click(function(){
    $(this).hide('slow');
});
var $contentDiv = $('<div class="panel-body" style="background-color: white;"></div>');
var $ul = $('<ul id="chatNoteUl"></ul>');
$ul.css({
    'list-style': 'none',
    'margin-left': '0',
    'padding-left':' 20px'
});
$ul.appendTo($contentDiv);
$contentDiv.appendTo($mainDiv);
$mainDiv.appendTo($('body'));
var MainDivTimer;
function hideMainDiv(){
    clearTimeout(MainDivTimer);
    MainDivTimer = setTimeout(function(){
        $mainDiv.hide('slow');
    },timeout_ChatPopup*1000);
}
function ChatPopup(date,user_id,username,mission_id,message)
{
  var e = "<li><span class='mission_chat_message_username'>[" + date + "] <a href='/profile/" + user_id + "' class='lightbox-open'>" + username + ":</a></span>";
  mission_id && (e = e + "<a href='/missions/" + mission_id + "' class='lightbox-open'><span class='glyphicon glyphicon-bell'></span></a> ");
  e = e + " " + message + "</li>";
  $(e).appendTo($ul).delay(timeout_ChatPopup*1000).hide('slow',function(){$(this).remove();});
  $mainDiv.show('slow');
  hideMainDiv();

}
function NotificationAlarm_show_settings()
{
  var content = $('#navbar-mobile-footer').prev();
  $.ajax({
		type: "GET",
		url: "https://dlrg-dominik.github.io/DEV-Notification-Alert/settings_"+ set.locale +".html",
		data: "",
		dataType: "html",
		success: function(msg){

			if(parseInt(msg)!=0)
			{
        content.hide();
        $('footer').hide();
        $('col_navbar_holder').hide();
				$('body').append(msg);
      }
    }
	});
}
notifyMe(set.translations[set.locale].inithead,set.translations[set.locale].init,"init");
(function(){
    var allianceChatBuffer = allianceChat;
    var radioMessageBuffer = radioMessage;
    var missionListBuffer = mission_list;
    allianceChat = function(t){
        allianceChatBuffer(t);
        if(user_id !== t.user_id && allianceChatNotifcation && !allianceChatPNotifcation){

            notifyMe(t.username,t.message,"Chat");
        }
        else if (user_id !== t.user_id && allianceChatPNotifcation && !allianceChatNotifcation) {
          ChatPopup(t.date,t.user_id,t.username,t.mission_id,t.message);
        }
        else if (user_id !== t.user_id && allianceChatPNotifcation && allianceChatNotifcation)
        {
            ChatPopup(t.date,t.user_id,t.username,t.mission_id,t.message);
            notifyMe(t.username,t.message,"Chat");
        }
    };
    radioMessage = function(t){
        radioMessageBuffer(t);
        if(t.fms_real == 5 && allianceS5Notifcation){
            if(t.fms_text.startsWith("[Verband]"))
            {
                if(!alliance_ignore_fms)
                {
                    notifyMe(t.caption,t.fms_text,"S5",t.fms_real,t.id);
                }
            }
            else
            {
                notifyMe(t.caption,t.fms_text,"S5",t.fms_real,t.id);
            }
        }
        else if(t.fms_real != 5 && allianceStatusNotifcation){
            if(t.fms_text.startsWith("[Verband]"))
            {
                if(!alliance_ignore_fms)
                {
                    notifyMe(t.caption,t.fms_text,"Status",t.fms_real,t.id);
                }
            }
            else
            {
                notifyMe(t.caption,t.fms_text,"Status",t.fms_real,t.id);
            }
        }
    };
})();
