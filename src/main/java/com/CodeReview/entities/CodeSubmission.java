package com.CodeReview.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CodeSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne
//    @JoinColumn(name="user_id")
//    private UserEntity user;
//
//    @Column(columnDefinition = "TEXT")
    private String code;

    private String filename;

    @OneToOne
    @JoinColumn(name = "code_id")
    private CodeReview review;
    @CreationTimestamp
    private LocalDateTime submittedAt = LocalDateTime.now();
}
