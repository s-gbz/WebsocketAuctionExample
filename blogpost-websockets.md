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