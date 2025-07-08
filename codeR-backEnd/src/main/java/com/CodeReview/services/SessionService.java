package com.CodeReview.services;

import com.CodeReview.entities.SessionEntity;

public interface SessionService {

    SessionEntity saveSession(SessionEntity sessionEntity);

    Boolean findSession(Long userID);

    String getRefreshToken(Long userID);

    void deleteSession(Long userID);
}
