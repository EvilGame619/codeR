package com.CodeReview.services.Implementation;

import com.CodeReview.Exceptions.LimitExceeded;
import com.CodeReview.Exceptions.ResourceNotFoundException;
import com.CodeReview.dto.CodeReviewDTO;
import com.CodeReview.dto.CodeSubmissionDTO;
import com.CodeReview.dto.ReportDTO;
import com.CodeReview.entities.CodeReview;
import com.CodeReview.entities.CodeSubmission;
import com.CodeReview.entities.UserEntity;
import com.CodeReview.repositories.CodeSubmissionRepository;
import com.CodeReview.services.CodeReviewService;
import com.CodeReview.services.CodeSubmissionService;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor

public class CodeSubmissionServiceImple implements CodeSubmissionService {

    private static final Logger log = LoggerFactory.getLogger(CodeSubmissionServiceImple.class);
    private final CodeSubmissionRepository codeSubmissionRepository;
    private final ModelMapper mapper;
    private final CodeReviewService codeReviewService;
    private final UserService userService;
    private File createTempJavaFile(String javaCode) throws IOException {
        // Create a temporary file with .java extension
        File tempFile = File.createTempFile("TempFile",".java");

        // Write the Java code into the file
        try (Writer writer = new OutputStreamWriter(new FileOutputStream(tempFile), StandardCharsets.UTF_8)) {
            writer.write(javaCode);
        }
        // Return the created file
        return tempFile;
    }

    @Transactional
    @Override
    public CodeReviewDTO submit(CodeSubmissionDTO codeSubmissionDTO) throws Exception{

        boolean check = checkNumberOfSubmissions();
        if(check) {
            //convert codesubmissiondto to entity
            CodeSubmission submittedCode = new CodeSubmission();

            //convert a temp java file
            File codeFile = createTempJavaFile(codeSubmissionDTO.getCode());

            //checkStyle
            ArrayList<String> checkStyle = codeReviewService.checkStyleAnalyze(codeFile);

            //spotbugs
            ArrayList<String> spotBugs = codeReviewService.spotBugsAnalyze(codeFile);

            //pmd
            ArrayList<String> pmd = codeReviewService.pmdAnalyze(codeFile);


            //save submitted code in repo
            submittedCode.setFile(Files.readAllBytes(codeFile.toPath()));
            submittedCode.setUser(userService.getUserFromJWT());

            CodeSubmission savedCode = codeSubmissionRepository.save(submittedCode);
            submittedCode.setFilename(codeFile.getName());
            //save codeReview in repo
            CodeReview codeReview = codeReviewService.saveReview(checkStyle, spotBugs, pmd);
            savedCode.setReview(codeReview);
            codeReview.setCode(savedCode);


            return mapper.map(codeReview, CodeReviewDTO.class);
        }else{
            throw new LimitExceeded("Limit of 5 Code Submission exceeded buy subscription for more reviews");
        }
    }

    @Transactional
    @Override
    public boolean checkNumberOfSubmissions() {

        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<CodeSubmission> allCodes = codeSubmissionRepository.findAllByUser(user);
        if(allCodes.size()>5) return false;
        else return true;
    }

    @Transactional
    @Override
    public Page<ReportDTO> getReports(int page){
        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<CodeSubmission> allCodes = codeSubmissionRepository.findAllByUser(user);
        List<ReportDTO> reportList = allCodes.stream().map((el)->mapper.map(el, ReportDTO.class)).toList();

        int size = 7;
        int start = (int) PageRequest.of(page,size).getOffset();
        int end = Math.min((start+size),reportList.size());
        List<ReportDTO> pagedList = reportList.subList(start,end);

        return new PageImpl<>(pagedList, PageRequest.of(page,size), reportList.size());
    }

    @Transactional
    @Override
    public String getJavaCode(Long id) {
        CodeSubmission code = codeSubmissionRepository.findById(id).orElse(null);
        byte[] javaCodeByteArray = code.getFile();
        String javaCode = new String(javaCodeByteArray, StandardCharsets.UTF_8);
        return javaCode;
    }

    @Transactional
    @Override
    public void deleteCode(Long id) {
        CodeSubmission codeSubmission = codeSubmissionRepository.findById(id).orElse(null);
        if(codeSubmission == null) throw new ResourceNotFoundException("Code Not Found with id: "+ id);
        codeSubmission.setReview(null);
        codeSubmissionRepository.delete(codeSubmission);
        System.out.println("Code Deleted");
    }

    @Transactional
    @Override
    public void changeName(Long id, String name) {
        CodeSubmission codeSubmission = codeSubmissionRepository.findById(id).orElse(null);
        if(codeSubmission == null) throw new ResourceNotFoundException("Code Not Found with id: "+ id);

        codeSubmission.setFilename(name);
    }

}