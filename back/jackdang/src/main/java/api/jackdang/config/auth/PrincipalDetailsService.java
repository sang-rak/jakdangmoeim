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

        if(user == null) {
            throw  new UsernameNotFoundException("사용자가 없습니다: " + username);
        }
        return new PrincipalDetails(user);

    }

    /*
     * 로그인
     * JWT 토큰 생성
     */
//    public String login(String username, String password) {
//        // 사용자 정보 검색
//        Users userEntity = userRepository.findByUsername(username);
//        if(userEntity != null) {
//            // 비밀번호 확인
//            if (bcryptPasswordEncoder.matches(password, userEntity.getPassword())) {
//                // 검증된 인증 정보로 JWT 토큰 생성
//                return jwtTokenProvider.generateToken(username);
//            } else {
//                throw new RuntimeException("비밀번호가 일치하지 않습니다.");
//            }
//        } else {
//            throw new UsernameNotFoundException("사용자가 없습니다: " + username);
//        }
//    }
}