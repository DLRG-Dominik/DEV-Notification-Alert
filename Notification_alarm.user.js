
var allianceChatNotifcation = true; // true = Chat-Notification sind standardmäßig aktiviert (Standard: true).
var allianceS5Notifcation = true; // true = Status 5-Notification sind standardmäßig aktiviert (Standard: true).
var allianceStatusNotifcation = false; // true = Alle anderen Status-Notification sind standardmäßig aktiviert (Standard: false).
var timeout_Chat = 3; //Zeit in Sekunden wie lange Chat-Notifications angezeigt werden sollen (Standard: 3).
var timeout_Status = 3; //Zeit in Sekunden wie lange Status-Notifications angezeigt werden sollen (Standard: 3).



var set = {
       locale: I18n.locale,
       translations: {
           de: {
               not_support:"Dieser Browser unterstützt leider keine HTML5-Notifications",
               //init:"Notification-Alarm wird initalisiert, Bitte warten...",
               init:"Laden...",
               del:"Löschen"
           },
           en: {
               save:"This browser does not support HTML5 notifications",
               init:"Notification alarm is initialized, please wait ...",
               del:"Löschen"
           },
           nl: {
               save:"Helaas ondersteunt deze browser ondersteunt geen HTML5 meldingen",
               init:"Melding alarm wordt geactiveerd, Please wait ...",
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
            var notification = new Notification('Chatnachricht von '+username, {
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
notifyMe("Initalisierung...",set.translations[set.locale].init,"init");
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
