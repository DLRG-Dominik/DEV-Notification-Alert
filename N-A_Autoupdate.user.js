// ==UserScript==
// @name         DEV-Notification_Alarm
// @namespace    http://www.fsprogramming.de
// @version      1.0
// @description  Zeigt eine Browser-Notification wenn eine Chat-Nachricht, einen Status 5, einen neuen Einsatz oder ein allgemeiner Status eingeht.
// @author       DLRG-Dominik
// @include      *://www.leitstellenspiel.de/
// @exclude      *://www.leitstellenspiel.de/mission*
// @updateURL    https://github.com/DLRG-Dominik/DEV-Notification-Alert/raw/master/N-A_Autoupdate.user.js
// @downloadURL  https://github.com/DLRG-Dominik/DEV-Notification-Alert/raw/master/N-A_Autoupdate.user.js
// @grant        none
// ==/UserScript==

$('head').append('<script id="n-a_js" src="https://github.com/DLRG-Dominik/DEV-Notification-Alert/raw/master/Notification_alarm.user.js" type="text/javascript"></script>');
