package com.dhanya.ghibliart.service;

import com.dhanya.ghibliart.client.StabilityAIClient;
import com.dhanya.ghibliart.dto.TextToImageRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GhibliArtService {
    private final StabilityAIClient stabilityAIClient;
    private final String apiKey;

    public GhibliArtService(StabilityAIClient stabilityAIClient, @Value("${stability.api.key}") String apiKey) {
        this.stabilityAIClient = stabilityAIClient;
        this.apiKey = apiKey;
    }

    public byte[] createGhibliArt(MultipartFile image, String prompt) {
        String finalPrompt = prompt + ", in the beautiful, detailed anime style of Studio Ghibli.";
        String engineId = "stable-diffusion-v1-6";
        String stylePreset = "anime";

        return stabilityAIClient.generateImageFromImage(
                "Bearer " + apiKey,
                engineId,
                image,
                finalPrompt,
                stylePreset
        );
    }

    public byte[] createGhibliArtFromText(String prompt, String style) {
        String finalPrompt = prompt + ", in the beautiful, detailed anime style of Studio Ghibli.";
        String engineId = "stable-diffusion-v1-6";
        String stylePreset = switch (style) {
            case "anime", "cinematic", "digital-art", "fantasy-art", "pixel-art",
                 "analog-film", "comic-book", "enhance", "isometric", "line-art",
                 "low-poly", "modeling-compound", "neon-punk", "origami",
                 "photographic", "3d-model", "tile-texture" -> style;
            default -> "anime"; // fallback style
        };

        TextToImageRequest requestPayload = new TextToImageRequest(finalPrompt, stylePreset);

        return stabilityAIClient.generateImageFromText(
                "Bearer " + apiKey,
                engineId,
                requestPayload
        );
    }
}
