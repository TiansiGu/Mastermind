package com.Mastermind;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The main application of the backend program
 */
@SpringBootApplication // means the main application (entry) of the program, only add once
public class MastermindApplication {
    public static void main(String[] args) {
        SpringApplication.run(MastermindApplication.class, args);
    }
}
