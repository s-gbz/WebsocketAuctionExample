package de.grilborzer.serverbackendspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@SpringBootApplication
public class ServerBackendSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerBackendSpringApplication.class, args);
	}

}