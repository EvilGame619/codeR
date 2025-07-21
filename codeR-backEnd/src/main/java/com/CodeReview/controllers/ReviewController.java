package com.CodeReview.controllers;

import com.CodeReview.dto.CodeReviewDTO;
import com.CodeReview.services.CodeReviewService;
import com.CodeReview.services.CodeSubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
@CrossOrigin("http://localhost:5173")
public class ReviewController {

    private final CodeSubmissionService codeSubmissionService;
    private final CodeReviewService codeReviewService;

    @GetMapping("/{id}")
    public ResponseEntity<CodeReviewDTO> getCodeReview(@PathVariable Long id){
        return ResponseEntity.ok(codeReviewService.getReview(id));
    }


    @DeleteMapping("/{id}")
    public void deleteCodeReview(@PathVariable Long id){
        codeSubmissionService.deleteCode(id);

    }
}
