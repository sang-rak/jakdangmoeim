package api.jackdang.service;

import api.jackdang.entity.User;
import api.jackdang.repository.UserRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Date;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /* 회원가입 */
    public User signup(String username, int age, String password) {
        // 중복 체크 로직
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("이미 사용 중인 유저 이름입니다.");
        }

        // 사용자 생성
        User newUser = new User(username, age, password);

        // 저장
        User savedUser = userRepository.save(newUser);

        return savedUser;
    }

    /*
     * 로그인
     * JWT 토큰 생성
     */
    public String makeJwtToken(String username, int age) {
        Date now = new Date();

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // 헤더 타입 지정
                .setIssuer("ingrack") // 토큰 발급자
                .setIssuedAt(now) // iat 토큰 발급 시간
                .setExpiration(new Date(now.getTime() + Duration.ofMinutes(30).toMillis())) // 토큰 만료 시간 30분
                .claim("username", username) // 유저 아이디
                .claim("age", age) // 유저 나이
                .signWith(SignatureAlgorithm.HS256, "secret") // 암호 추후 변경 예정
                .compact(); // JWT 토큰 생성
    }
}
