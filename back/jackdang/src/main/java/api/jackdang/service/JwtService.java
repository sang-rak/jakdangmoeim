package api.jackdang.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY = "jackdang"; // 시크릿 키 추후 env 관리


    /*
     * JWT 토큰 생성
     */
    public String generateToken(String username) {
        Date now = new Date();
        int TokenExpirationTime = 1; // 토큰 만료 시간 1시간
        Date expiryData = new Date(now.getTime() + TokenExpirationTime * 3600000);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryData)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
}
