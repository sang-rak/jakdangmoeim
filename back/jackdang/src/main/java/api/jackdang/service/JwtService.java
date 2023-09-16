package api.jackdang.service;

import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY = "jackdang"; // 시크릿 키 추후 env 관리
    private static final String ISSUER = "jackdang"; // 시크릿 키 추후 env 관리

    /*
     * JWT 토큰 생성
     */
    public String generateToken(String username) {
        Date now = new Date();
        int TokenExpirationTime = 1; // 토큰 만료 시간 1시간
        Date expiryData = new Date(now.getTime() + TokenExpirationTime * 3600000);

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // 헤더 타입 지정
                .setIssuer(ISSUER) // 토큰 발급자
                .setIssuedAt(now) // iat 토큰 발급 시간
                .setExpiration(expiryData)
                .claim("username", username) // 유저 아이디
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
}
