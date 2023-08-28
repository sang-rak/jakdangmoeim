package api.jackdang.service;

import api.jackdang.entity.User;
import api.jackdang.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public User signup(String username, int age, String password) {
        // 중복 체크 로직
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("이미 사용 중인 유저 이름입니다.");
        }

        // 사용자 생성
        User newUser = new User(username, age, password); // 기본값으로 나이 0으로 설정

        // 저장
        User savedUser = userRepository.save(newUser);

        return savedUser;
    }
}
