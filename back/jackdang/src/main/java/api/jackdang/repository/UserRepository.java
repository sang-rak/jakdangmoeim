package api.jackdang.repository;

import api.jackdang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
