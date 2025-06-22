package com.CodeReview.services.Implementation;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;

import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor

public class CloudinaryService {

    private final static Logger logger = LoggerFactory.getLogger(CloudinaryService.class);
    private final Cloudinary cloudinary;

    public String getCloudinaryLink(MultipartFile multipartFile){
        try{
            Map uploadResult = cloudinary.uploader().upload(multipartFile.getBytes(), ObjectUtils.emptyMap());
            String uri = (String) uploadResult.get("secure_url");
            logger.info(uri);
            return uri;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}
