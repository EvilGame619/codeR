package com.CodeReview.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
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

    @JsonIgnore
    @OneToOne(mappedBy = "review")
    private CodeSubmission code;

    @CreationTimestamp
    private LocalDateTime reviewedAt = LocalDateTime.now();
}
