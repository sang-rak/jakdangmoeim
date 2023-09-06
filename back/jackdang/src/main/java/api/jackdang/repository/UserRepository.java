package api.jackdang.repository;

import api.jackdang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByUsername(String username);


    // 회원가입시 유저 존재 여부 학인
    boolean existsByUsername(String username);


}
