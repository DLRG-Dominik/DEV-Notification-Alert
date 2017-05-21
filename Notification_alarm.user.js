
var allianceChatNotifcation = (localStorage.getItem("Chat") == "true"); // true = Chat-Notification sind standardmäßig aktiviert (Standard: true).
var allianceS5Notifcation = (localStorage.getItem("S5") == "true"); // true = Status 5-Notification sind standardmäßig aktiviert (Standard: true).
var allianceStatusNotifcation = (localStorage.getItem("Status") == "true"); // true = Alle anderen Status-Notification sind standardmäßig aktiviert (Standard: false).
var timeout_Chat = 3; //Zeit in Sekunden wie lange Chat-Notifications angezeigt werden sollen (Standard: 3).
var timeout_Status = 3; //Zeit in Sekunden wie lange Status-Notifications angezeigt werden sollen (Standard: 3).
console.log(allianceChatNotifcation);


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

    }


    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {

            if (permission === "granted") {
                var notification = new Notification("Benachrichtungen aktiviert!");
            }
        });
    }


}
$( "body" ).append('<script>function reload_notification() { window.location.reload(); }</script>');
function NotificationAlarm_show_settings()
{
  $( "body" ).append('<li><a href="https://dlrg-dominik.github.io/DEV-Notification-Alert/settings_'+ set.locale +'.html" class="btn btn-success btn-xs lightbox-open" id="N-A_activate">N-A Settings</a></li>');
  $('#N-A_activate').click();
  window.focus();
  $('#N-A_activate').remove();
}
notifyMe(set.translations[set.locale].inithead,set.translations[set.locale].init,"init");
(function(){

if(allianceChatNotifcation)
    {
    $('<a href="#" class="btn btn-success btn-xs pull-right" title="Notification-Alarm aus/ein schalten">N-A: Chat</a>').appendTo($('#chat_outer .panel-heading'))
        .click(function(e){
        allianceChatNotifcation = !allianceChatNotifcation;
        $(this).hasClass("btn-success") ? $(this).removeClass("btn-success").addClass("btn-danger"): $(this).addClass("btn-success").removeClass("btn-danger");
        return false;
    });
    }
    else
    {
       $('<a href="#" class="btn btn-danger btn-xs pull-right" title="Notification-Alarm aus/ein schalten">N-A: Chat</a>').appendTo($('#chat_outer .panel-heading'))
        .click(function(e){
        allianceChatNotifcation = !allianceChatNotifcation;
        $(this).hasClass("btn-success") ? $(this).removeClass("btn-success").addClass("btn-danger"): $(this).addClass("btn-success").removeClass("btn-danger");
        return false;
    });
    }
    if(allianceS5Notifcation)
    {
       $('<a href="#" class="btn btn-success btn-xs pull-right" title="Notification-Alarm aus/ein schalten">N-A: Status 5</a>').appendTo($('#chat_outer .panel-heading'))
        .click(function(e){
        allianceS5Notifcation = !allianceS5Notifcation;
        $(this).hasClass("btn-success") ? $(this).removeClass("btn-success").addClass("btn-danger"): $(this).addClass("btn-success").removeClass("btn-danger");
        return false;
    });
    }
    else
    {
    $('<a href="#" class="btn btn-danger btn-xs pull-right" title="Notification-Alarm aus/ein schalten">N-A: Status 5</a>').appendTo($('#chat_outer .panel-heading'))
        .click(function(e){
        allianceS5Notifcation = !allianceS5Notifcation;
        $(this).hasClass("btn-success") ? $(this).removeClass("btn-success").addClass("btn-danger"): $(this).addClass("btn-success").removeClass("btn-danger");
        return false;
    });
    }

    if(allianceStatusNotifcation)
    {
      $('<a href="#" class="btn btn-success btn-xs pull-right" title="Notification-Alarm aus/ein schalten">N-A: Status</a>').appendTo($('#chat_outer .panel-heading'))
        .click(function(e){
        allianceStatusNotifcation = !allianceStatusNotifcation;
        $(this).hasClass("btn-success") ? $(this).removeClass("btn-success").addClass("btn-danger"): $(this).addClass("btn-success").removeClass("btn-danger");
        return false;
    });
    }
    else
    {
    $('<a href="#" class="btn btn-danger btn-xs pull-right" title="Notification-Alarm aus/ein schalten">N-A: Status</a>').appendTo($('#chat_outer .panel-heading'))
        .click(function(e){
        allianceStatusNotifcation = !allianceStatusNotifcation;
        $(this).hasClass("btn-success") ? $(this).removeClass("btn-success").addClass("btn-danger"): $(this).addClass("btn-success").removeClass("btn-danger");
        return false;
    });
    }
    var allianceChatBuffer = allianceChat;
    var radioMessageBuffer = radioMessage;
    var missionListBuffer = mission_list;
    allianceChat = function(t){
        allianceChatBuffer(t);
        if(user_id !== t.user_id && allianceChatNotifcation){

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
                    notifyMe(t.caption,t.fms_text,"Status",t.fms_real,t.id);
                }
            }
            else
            {
                notifyMe(t.caption,t.fms_text,"Status",t.fms_real,t.id);
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
