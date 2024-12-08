package api.jackdang.service;

import api.jackdang.entity.Users;
import api.jackdang.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@Slf4j
public class UserService {
    @Autowired
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bcryptPasswordEncoder;

    public UserService(BCryptPasswordEncoder bcryptPasswordEncoder, UserRepository userRepository) {
        this.bcryptPasswordEncoder = bcryptPasswordEncoder;
        this.userRepository = userRepository;
    }

    public boolean updatePassword(String phone, String newPassword) {
        Users user = userRepository.findByPhone(phone);
        if (user != null) {
            user.setPassword(bcryptPasswordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
