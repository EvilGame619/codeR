package com.CodeReview.services.Implementation;

import com.CodeReview.dto.CodeReviewDTO;
import com.CodeReview.dto.CodeSubmissionDTO;
import com.CodeReview.entities.CodeReview;
import com.CodeReview.entities.CodeSubmission;
import com.CodeReview.repositories.CodeSubmissionRepository;
import com.CodeReview.services.CodeReviewService;
import com.CodeReview.services.CodeSubmissionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;


@Service
@RequiredArgsConstructor
public class CodeSubmissionServiceImple implements CodeSubmissionService {

    private final CodeSubmissionRepository codeSubmissionRepository;
    private final ModelMapper mapper;
    private final CodeReviewService codeReviewService;
    private File createTempJavaFile(String javaCode) throws IOException {
        // Create a temporary file with .java extension
        File tempFile = File.createTempFile("TempFile",".java");

        // Write the Java code into the file
        try (FileWriter writer = new FileWriter(tempFile)) {
            writer.write(javaCode);
        }
        // Return the created file
        return tempFile;
    }

    @Transactional
    @Override
    public CodeReviewDTO submit(CodeSubmissionDTO codeSubmissionDTO) throws Exception{
        //convert codesubmissiondto to entity
        CodeSubmission submittedCode = mapper.map(codeSubmissionDTO, CodeSubmission.class);

        //convert a temp java file
        File codeFile = createTempJavaFile(codeSubmissionDTO.getCode());

        //checkStyle
        ArrayList<String> checkStyle = codeReviewService.checkStyleAnalyze(codeFile);

        //spotbugs
        ArrayList<String> spotBugs = codeReviewService.spotBugsAnalyze(codeFile);

        //pmd
        ArrayList<String> pmd = codeReviewService.pmdAnalyze(codeFile);

        //save submitted code in repo
        CodeSubmission savedCode = codeSubmissionRepository.save(submittedCode);

        //save codeReview in repo
        CodeReview codeReview = codeReviewService.saveReview(checkStyle,spotBugs,pmd);

        codeReview.setCode(savedCode);
        return mapper.map(codeReview, CodeReviewDTO.class);
    }

}