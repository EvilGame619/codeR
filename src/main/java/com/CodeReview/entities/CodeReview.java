package com.CodeReview.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CodeReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    @CollectionTable(name = "check_style_error", joinColumns = @JoinColumn(name = "code_submission_id"))
    @Column(name = "check_style_errors")
    private List<String> checkStyle;

    @ElementCollection
    @CollectionTable(name = "spotbugs_error", joinColumns = @JoinColumn(name = "code_submission_id"))
    @Column(name = "spot_bugs_errors")
    private List<String> spotBugs;

    @ElementCollection
    @CollectionTable(name = "pmd_error", joinColumns = @JoinColumn(name = "code_submission_id"))
    @Column(name = "pmd_errors")
    private List<String> pmd;

    @OneToOne(mappedBy = "review")
    private CodeSubmission code;

    private LocalDateTime reviewedAt = LocalDateTime.now();
}
