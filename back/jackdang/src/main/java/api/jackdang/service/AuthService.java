package api.jackdang.service;

import api.jackdang.config.jwt.JwtTokenProvider;
import api.jackdang.entity.User;
import api.jackdang.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
public class AuthService {

    @Autowired
    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bcryptPasswordEncoder;

    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(BCryptPasswordEncoder bcryptPasswordEncoder, UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.bcryptPasswordEncoder = bcryptPasswordEncoder;
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    /* 회원가입 */
    public User signup(String username, int age, String password, String authority) {
        // 중복 체크 로직
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("이미 사용 중인 유저 이름입니다.");
        }

        // 사용자 생성
        User newUser = new User(username, age, bcryptPasswordEncoder.encode(password), authority);

        // 저장
        return userRepository.save(newUser);
    }

    /*
     * 로그인
     * JWT 토큰 생성
     */
    public String login(String username, String password) {
        // 사용자 정보 검색
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자가 없습니다: " + username));

        if (bcryptPasswordEncoder.matches(password, user.getPassword())) {
            // 검증된 인증 정보로 JWT 토큰 생성
            return jwtTokenProvider.generateToken(username);
        } else {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

    }
}
