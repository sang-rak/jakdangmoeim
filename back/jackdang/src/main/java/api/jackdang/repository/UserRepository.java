package api.jackdang.repository;

import api.jackdang.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {


    Users findByUsername(String username);
    // 휴대폰 유저 정보 확인
    Users findByPhone(String phone);
    // 회원가입시 유저 존재 여부 학인
    boolean existsByUsername(String username);
    boolean existsByNickname(String nickname);
    boolean existsByPhone(String phone);



}
