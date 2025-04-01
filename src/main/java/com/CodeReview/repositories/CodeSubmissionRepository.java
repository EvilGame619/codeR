package com.CodeReview.repositories;

import com.CodeReview.entities.CodeSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeSubmissionRepository extends JpaRepository<CodeSubmission, Long> {
}
