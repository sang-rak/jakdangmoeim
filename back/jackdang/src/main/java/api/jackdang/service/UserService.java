package api.jackdang.service;

import api.jackdang.config.jwt.JwtTokenProvider;
import api.jackdang.entity.User;
import api.jackdang.repository.UserRepository;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Duration;
import java.util.*;

@Service
@Transactional
@Slf4j
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    public UserService(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository, AuthenticationManagerBuilder authenticationManagerBuilder, JwtTokenProvider jwtTokenProvider) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    /* 회원가입 */
    public User signup(String username, int age, String password, String authority) {
        // 중복 체크 로직
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("이미 사용 중인 유저 이름입니다.");
        }

        // 사용자 생성
        User newUser = new User(username, age, password, authority);

        // 저장
        User savedUser = userRepository.save(newUser);

        return savedUser;
    }

    /*
     * 로그인
     * JWT 토큰 생성
     */
    public String login(String username, String password) {
        // 사용자 정보 검색
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자가 없습니다: " + username));

        // 비밀번호 검증
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
        // 검증된 인증 정보로 JWT 토큰 생성
        return jwtTokenProvider.generateToken(username);
    }

    /*
     * 로그인
     * JWT 토큰 생성 테스트
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
