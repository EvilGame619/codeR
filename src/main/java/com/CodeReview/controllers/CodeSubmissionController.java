package com.CodeReview.controllers;

import com.CodeReview.dto.CodeSubmissionDTO;
import com.CodeReview.services.CodeSubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/code")

public class CodeSubmissionController {

    private final CodeSubmissionService codeSubmissionService;
    @Autowired
    public CodeSubmissionController(CodeSubmissionService codeSubmissionService) {
        this.codeSubmissionService = codeSubmissionService;
    }

    @PostMapping("/submitCode")
    public ResponseEntity<CodeSubmissionDTO> submitCode(@RequestBody CodeSubmissionDTO codeSubmissionDTO){
        CodeSubmissionDTO submittedCode = codeSubmissionService.submit(codeSubmissionDTO);
        return ResponseEntity.ok(submittedCode);
    }
}
