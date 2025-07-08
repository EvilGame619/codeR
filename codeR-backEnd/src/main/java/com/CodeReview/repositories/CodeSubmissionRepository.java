package com.CodeReview.repositories;

import com.CodeReview.entities.CodeSubmission;
import com.CodeReview.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodeSubmissionRepository extends JpaRepository<CodeSubmission, Long> {

    @Query("SELECT c FROM CodeSubmission c WHERE c.user = :user")
    List<CodeSubmission> findAllByUser(@Param("user")UserEntity user);
}
