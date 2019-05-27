# Client Server Kommunikation mit Websockets

Kleines Rätsel: Welche Gemeinsamkeit teilen Chatanwendungen, Online Auktionshäuser und Newsticker? 

Richtig! Ihre Kernfunktion ist die Bereitstellung der neusten, verfügbaren Informationen für eine Gruppe von Benutzern. 
Betrachtet man klassische Schnittstellen von Client Server Architekturen, fällt jedoch schnell auf, 
dass übliche REST Schnitstellen in dem Fall nicht zum Ziel führen. 
Der Grund ist, dass meist nicht definiert ist wann neue Informationen zur Verfügung stehen.

Naive Lösungsmöglichkeiten umfassen deshalb meist "Polling", sprich die kontinuierliche Prüfung auf neue Updates. 
Im Wesen einer Client Server Anwendung, entspricht der Ansatz einer Welle von Serveranfragen die in festgelegten
Intervallen vom Client versendet werden. Aus Gründen von Performanz, Latenz und limitierter Bandbreite, ist dies
eine Strategie von der abzuraten ist.







Zuständigkeiten Kommunikation ist 

## Der Client
- Verwendung der nativen Browserimplemtierung [1]
- 
- Installation von STOMP 
`npm install stompjs @types/stompf net --save`

- Instanzvariablen für `WebSocket` und `Stomp.Client` anlegen
- Erstelle Objektinterface
- Wandle das Objekt beim Versenden in einen JSON String mittels `JSON.stringify(item)`
- Wandle den JSON String beim Empfang in ein AuctionItems mittels `JSON.parse(message.body)`
  
- 

- Warum tut man?

[1]: [](https://stackoverflow.com/questions/2002120/citing-the-author-of-a-blockquote-using-markdown-syntax)

- Websocket: Aktualisierung des neusten Preises bei Clients die neu hereinkommen
- Passiert durch updaten der Items im Backend

- Problem bei Clients: Unterbrechung des Countdown Timers bei Tabwechsel. Lösung durch Webworker, aber nicht hier und heute.