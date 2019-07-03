package de.grilborzer.serverbackendspring.rest;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@CrossOrigin
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // Endpoint for client registry
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/socket-registry").setAllowedOrigins("*");
    }

    // Endpoint for client topic subscription
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // One channel:
        registry.enableSimpleBroker("/update-items");

        // Further channels:
        // registry.enableSimpleBroker("/update-items", "/another-channel", "...");
    }
}