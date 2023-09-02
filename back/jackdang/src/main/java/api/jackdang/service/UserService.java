package api.jackdang.service;

import api.jackdang.entity.User;
import api.jackdang.repository.UserRepository;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    /* 로그인 */
    public String makeJwtToken(String username, int age) {
        Date now = new Date();

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // (1)
                .setIssuer("fresh") // (2)
                .setIssuedAt(now) // (3)
                .setExpiration(new Date(now.getTime() + Duration.ofMinutes(30).toMillis())) // (4)
                .claim("username", username) // (5)
                .claim("age", age)
                .signWith(SignatureAlgorithm.HS256, "secret") // (6)
                .compact();
    }

}
