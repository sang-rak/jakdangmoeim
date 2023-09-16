package api.jackdang.repository;

import api.jackdang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByUsername(String username);

    // 회원가입시 유저 존재 여부 학인
    boolean existsByUsername(String username);



}
