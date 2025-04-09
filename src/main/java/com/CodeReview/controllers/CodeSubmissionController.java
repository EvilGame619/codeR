package com.CodeReview.controllers;

import com.CodeReview.dto.CodeReviewDTO;
import com.CodeReview.dto.CodeSubmissionDTO;
import com.CodeReview.services.CodeSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/code")
@CrossOrigin("http://localhost:5173")
public class CodeSubmissionController {

    private final CodeSubmissionService codeSubmissionService;
    @Autowired
    public CodeSubmissionController(CodeSubmissionService codeSubmissionService) {
        this.codeSubmissionService = codeSubmissionService;
    }

    @PostMapping("/submitCode")
    public ResponseEntity<CodeReviewDTO> submitCode(@RequestBody CodeSubmissionDTO codeSubmissionDTO) throws Exception{
        CodeReviewDTO submittedCode = codeSubmissionService.submit(codeSubmissionDTO);
        return ResponseEntity.ok(submittedCode);
    }
}
