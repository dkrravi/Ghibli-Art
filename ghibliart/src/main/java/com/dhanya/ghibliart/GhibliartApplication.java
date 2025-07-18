package com.dhanya.ghibliart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class GhibliartApplication {

	public static void main(String[] args) {
		SpringApplication.run(GhibliartApplication.class, args);
	}

}
