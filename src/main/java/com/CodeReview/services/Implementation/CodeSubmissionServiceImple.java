package com.CodeReview.services.Implementation;

import com.CodeReview.dto.CodeSubmissionDTO;
import com.CodeReview.entities.CodeSubmission;
import com.CodeReview.repositories.CodeSubmissionRepository;
import com.CodeReview.services.CodeSubmissionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class CodeSubmissionServiceImple implements CodeSubmissionService {
    @Autowired
    public CodeSubmissionServiceImple(CodeSubmissionRepository codeSubmissionRepository, ModelMapper mapper) {
        this.codeSubmissionRepository = codeSubmissionRepository;
        this.mapper = mapper;
    }

    private final CodeSubmissionRepository codeSubmissionRepository;

    private final ModelMapper mapper;


    @Override
    public CodeSubmissionDTO submit(CodeSubmissionDTO codeSubmissionDTO) {

        CodeSubmission submittedCode = mapper.map(codeSubmissionDTO, CodeSubmission.class);

        CodeSubmission savedCode = codeSubmissionRepository.save(submittedCode);

        return mapper.map(savedCode,CodeSubmissionDTO.class);
    }
}
