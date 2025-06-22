package com.CodeReview.services.Implementation;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    public String getRefreshTokenFromCookie(HttpServletRequest request){
        if(request.getCookies() !=null){
            for(Cookie cookie: request.getCookies()){
                if("refreshToken".equals(cookie.getName())){
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
