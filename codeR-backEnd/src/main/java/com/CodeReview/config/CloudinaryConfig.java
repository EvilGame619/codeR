package com.CodeReview.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Value("${cloudinary.key}")
    private String api_key;

    @Value("${cloudinary.secret}")
    private String secret;

    @Bean
    public Cloudinary cloudinary(){
        Map<String,String> config = Map.of(
                "cloud_name","dldsq8azs",
                "api_key", api_key,
                "api_secret",secret
        );

        return new Cloudinary(config);
    }
}
