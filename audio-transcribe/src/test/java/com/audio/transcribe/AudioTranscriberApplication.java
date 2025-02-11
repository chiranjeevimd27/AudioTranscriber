package com.audio.transcribe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@RestController
public class AudioTranscriberApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(AudioTranscriberApplication.class, args);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5175") // Allow requests from your frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @PostMapping("/api/transcribe")
    public String transcribeAudio(@RequestParam("file") MultipartFile file) {
        // Process the file and return the transcription
        // For now, just return a placeholder response
        return "Transcription result for: " + file.getOriginalFilename();
    }
}