package com.CodeReview.controllers;

import com.CodeReview.dto.CodeReviewDTO;
import com.CodeReview.dto.CodeSubmissionDTO;
import com.CodeReview.dto.ReportDTO;
import com.CodeReview.services.CodeReviewService;
import com.CodeReview.services.CodeSubmissionService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/code")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class CodeSubmissionController {

    private final CodeSubmissionService codeSubmissionService;


    @PostMapping("/submitCode")
    public ResponseEntity<CodeReviewDTO> submitCode(@RequestBody CodeSubmissionDTO codeSubmissionDTO) throws Exception{
        CodeReviewDTO submittedCode = codeSubmissionService.submit(codeSubmissionDTO);
        return ResponseEntity.ok(submittedCode);
    }
    @GetMapping("/getSubmittedCodes")
    public ResponseEntity<Page<ReportDTO>> getSubmittedCodes(@RequestParam("page") int pageNumber){
        return ResponseEntity.ok(codeSubmissionService.getReports(pageNumber));
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getCode(@PathVariable Long id){
        return ResponseEntity.ok(codeSubmissionService.getJavaCode(id));
    }

    @PostMapping("/changeName/{id}")
    public void renameCode(@PathVariable Long id, @RequestBody Map<String, String> body){
        codeSubmissionService.changeName(id, body.get("name"));
    }


}
