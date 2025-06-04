package com.CodeReview.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.io.File;
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

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="user_id")
    private UserEntity user;

    @Lob
    @Column(length = 100000)
    private byte[] file;

    private String filename;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "code_id")
    private CodeReview review;

    @CreationTimestamp
    private LocalDateTime submittedAt = LocalDateTime.now();
}
