package com.CodeReview.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SessionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String refreshToken;

    private Date createdAt;
    private Date expiresAt;
}
