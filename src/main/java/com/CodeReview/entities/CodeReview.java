package com.CodeReview.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CodeReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String pmdReport;

    @Column(columnDefinition = "TEXT")
    private String checkStyle;

    @Column(columnDefinition = "TEXT")
    private String spotBugs;

    @Column(columnDefinition = "TEXT")
    private String aiFeedBack;

    @OneToOne(mappedBy = "review")
    private CodeSubmission code;

    private LocalDateTime reviewedAt = LocalDateTime.now();
}
