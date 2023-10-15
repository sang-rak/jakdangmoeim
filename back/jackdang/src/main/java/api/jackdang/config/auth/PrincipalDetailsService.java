package api.jackdang.config.auth;

import api.jackdang.entity.Users;
import api.jackdang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService : 진입");
        Users user = userRepository.findByUsername(username);

        // 사용자 null 체크
        if(user != null) {
            return new PrincipalDetails(user);
        } else {
            throw  new UsernameNotFoundException("사용자가 없습니다: " + username);
        }

    }

}