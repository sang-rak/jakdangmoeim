package api.jackdang.service;

import api.jackdang.config.jwt.JwtTokenProvider;
import api.jackdang.entity.Users;
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
    public Users signup(String username, int age, String password, String roles) {
        // 중복 체크 로직
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("이미 사용 중인 유저 이름입니다.");
        }

        // 사용자 생성
        Users newUser = new Users(username, age, bcryptPasswordEncoder.encode(password), roles);

        // 저장
        return userRepository.save(newUser);
    }

    /*
     * 로그인
     * JWT 토큰 생성
     */
    public String login(String username, String password) {
        // 사용자 정보 검색
        Users userEntity = userRepository.findByUsername(username);
        if(userEntity != null) {
            // 비밀번호 확인
            if (bcryptPasswordEncoder.matches(password, userEntity.getPassword())) {
                // 검증된 인증 정보로 JWT 토큰 생성
                return jwtTokenProvider.generateToken(username);
            } else {
                throw new RuntimeException("비밀번호가 일치하지 않습니다.");
            }
        } else {
            throw new UsernameNotFoundException("사용자가 없습니다: " + username);
        }
    }

}
