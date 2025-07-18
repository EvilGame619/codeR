package com.CodeReview.services.Implementation;

import com.CodeReview.entities.SessionEntity;
import com.CodeReview.entities.UserEntity;
import com.CodeReview.repositories.SessionRepository;
import com.CodeReview.services.SessionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class SessionServiceImplementation implements SessionService {

    private final SessionRepository sessionRepository;


    @Override
    public SessionEntity saveSession(SessionEntity sessionEntity) {
        return sessionRepository.save(sessionEntity);
    }

    @Override
    public Boolean isSessionExists(Long userID) {
        SessionEntity session = sessionRepository.findByUserId(userID).orElse(null);
        return session != null;
    }

    @Override
    public String getRefreshToken(Long userID) {
        SessionEntity session = sessionRepository.findByUserId(userID).orElse(null);
        return session.getRefreshToken();
    }

    @Transactional
    @Override
    public void deleteSession(Long userID) {
        SessionEntity session = sessionRepository.findByUserId(userID).orElse(null);
        System.out.println(session);
        sessionRepository.delete(session);
        SessionEntity session1 = sessionRepository.findByUserId(userID).orElse(null);
        System.out.println(session1);
        log.info("User deleted");
    }

    private SessionEntity getSession(Long userID){
        return sessionRepository.findByUserId(userID).orElse(null);
    }

    @Transactional
    @Override
    public boolean validateSession(UserEntity user){
        SessionEntity session = getSession(user.getId());
        return !session.getExpiresAt().before(new Date());
    }
}
