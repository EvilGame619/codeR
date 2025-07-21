package com.CodeReview.services.Implementation;

import com.CodeReview.Exceptions.ResourceNotFoundException;
import com.CodeReview.dto.CodeReviewDTO;
import com.CodeReview.entities.CodeReview;
import com.CodeReview.repositories.CodeReviewRepository;
import com.CodeReview.services.CodeReviewService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CodeReviewImplementation implements CodeReviewService {

    private final ModelMapper mapper;
    private final CodeReviewRepository codeReviewRepository;
    private final CheckStyleService checkStyleService;
    private final PmdService pmdService;

    @Transactional
    @Override
    public CodeReview saveReview(ArrayList<String> checkStyle, ArrayList<String> spotbugs, ArrayList<String> pmd) {
        return codeReviewRepository.save(CodeReview.builder()
                .pmd(pmd)
                .checkStyle(checkStyle)
                .spotBugs(spotbugs)
                .build());
    }

    @Transactional
    @Override
    public ArrayList<String> checkStyleAnalyze(File file) {
        return checkStyleService.analyze(file);
    }

    @Transactional
    @Override
    public ArrayList<String> spotBugsAnalyze(File file) {
        return null;
    }

    @Transactional
    @Override
    public ArrayList<String> pmdAnalyze(File file) {
        return pmdService.pmdAnalyze(file);
    }

    @Transactional
    @Override
    public CodeReviewDTO getReview(Long id) {
        CodeReview  codeReview =  codeReviewRepository.findById(id).orElse(null);
        return mapper.map(codeReview, CodeReviewDTO.class);
    }


    @Override
    public void deleteReview(Long id) {
        CodeReview codeReview = codeReviewRepository.findById(id).orElse(null);
        if(codeReview == null ) throw new ResourceNotFoundException("Code Review not found with id: "+id);
        codeReview.setCode(null);
        codeReviewRepository.delete(codeReview);
    }

    @Override
    public CodeReview findReview(Long id){
        return codeReviewRepository.findById(id).orElse(null);
    }

}