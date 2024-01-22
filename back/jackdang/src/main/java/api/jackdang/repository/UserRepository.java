package api.jackdang.repository;

import api.jackdang.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {


    Users findByUsername(String username);

    // 회원가입시 유저 존재 여부 학인
    boolean existsByUsername(String username);
    boolean existsByNickname(String nickname);
    boolean existsByPhone(String phone);



}
