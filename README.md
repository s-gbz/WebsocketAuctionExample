# WebSocketAuctionExample
Code example for the corresponding blogpost ["WebSockets made easy with STOMP.js and Spring Boot"](https://www.adesso.de/de/news/blog/websockets-leichtgemacht-mit-stomp-js-und-spring-boot.jsp).

## Start the server
Open a terminal and:
<pre><code>
cd Server-Backend-Spring

gradlew build

gradlew bootrun
</pre></code>

Make sure to use Gradle 5 and Java 11. 

## Start the client
Open a terminal and:
<pre><code>
cd Client-Frontend-Angular

npm install

ng serve --open
</pre></code>
