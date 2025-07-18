package com.CodeReview.services;

import com.CodeReview.entities.SessionEntity;
import com.CodeReview.entities.UserEntity;

public interface SessionService {

    SessionEntity saveSession(SessionEntity sessionEntity);

    Boolean isSessionExists(Long userID);

    String getRefreshToken(Long userID);

    void deleteSession(Long userID);

    boolean validateSession(UserEntity user);
}
