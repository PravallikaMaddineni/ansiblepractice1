package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class GoaltrackerbackendApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(GoaltrackerbackendApplication.class, args);
		System.out.println("Goal tracker backend is running!!");
	}

}
