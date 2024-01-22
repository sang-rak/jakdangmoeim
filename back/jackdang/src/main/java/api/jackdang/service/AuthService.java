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

import java.util.Random;

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
    public Users signup(String username, String nickname, String phone, String password, String gender, String birthday) {
        // 중복 체크 로직
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("이미 사용 중인 유저 이름 입니다.");
        }

        if (userRepository.existsByNickname(nickname)) {
            throw new RuntimeException("이미 사용 중인 유저 닉네임 입니다.");
        }
        if (userRepository.existsByPhone(phone)) {
            throw new RuntimeException("이미 사용 중인 유저 전화 번호 입니다.");
        }

        // 사용자 생성
        Users newUser = new Users(username, nickname, phone, bcryptPasswordEncoder.encode(password), gender, birthday);
        newUser.setRoles("ROLE_USER");
        // 저장
        return userRepository.save(newUser);
    }

    /* 인증 번호 */

    public String sendRandomMessage(String phone) {

        Random rand = new Random();
        StringBuilder numStr = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            String ran = Integer.toString(rand.nextInt(10));
            numStr.append(ran);
        }
        // 문자 발송 로직 구현 예정
        // AuthService.send_msg(phone, numStr);

        return numStr.toString();
    }

    /**
     * validation check
     * 중복 전화번호
     */
    public boolean existsByPhone(String phone) {
        if (userRepository.existsByPhone(phone)) {
            throw new RuntimeException("이미 사용 중인 유저 전화 번호 입니다.");
        }
        return false;
    }


}
