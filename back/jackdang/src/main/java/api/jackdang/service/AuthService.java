package api.jackdang.service;

//import api.jackdang.config.jwt.JwtTokenProvider;
import api.jackdang.entity.Users;
import api.jackdang.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    public AuthService(BCryptPasswordEncoder bcryptPasswordEncoder, UserRepository userRepository) {
        this.bcryptPasswordEncoder = bcryptPasswordEncoder;
        this.userRepository = userRepository;
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


}
