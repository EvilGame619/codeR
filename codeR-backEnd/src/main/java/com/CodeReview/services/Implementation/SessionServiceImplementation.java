package com.CodeReview.services.Implementation;

import com.CodeReview.entities.SessionEntity;
import com.CodeReview.repositories.SessionRepository;
import com.CodeReview.services.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SessionServiceImplementation implements SessionService {

    private final SessionRepository sessionRepository;

    @Override
    public SessionEntity saveSession(SessionEntity sessionEntity) {
        return sessionRepository.save(sessionEntity);
    }

    @Override
    public Boolean findSession(Long userID) {
        SessionEntity session = sessionRepository.findByUserId(userID).orElse(null);
        return session != null;
    }

    @Override
    public String getRefreshToken(Long userID) {
        SessionEntity session = sessionRepository.findByUserId(userID).orElse(null);
        return session.getRefreshToken();
    }

    @Override
    public void deleteSession(Long userID) {
        SessionEntity session = sessionRepository.findByUserId(userID).orElse(null);
        sessionRepository.delete(session);
    }
}
