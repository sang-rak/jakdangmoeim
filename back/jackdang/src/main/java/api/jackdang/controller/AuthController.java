package api.jackdang.controller;

import api.jackdang.config.auth.PrincipalDetails;
import api.jackdang.dto.UserSignupRequestDTO;
import api.jackdang.entity.Users;
import api.jackdang.repository.UserRepository;
import api.jackdang.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/* 인증 관련 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final AuthService authService;

    /**
     * 회원가입
     * @param userSignupRequestDTO
     * @return
     */
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserSignupRequestDTO userSignupRequestDTO) {
        try {
            authService.signup(userSignupRequestDTO.getUsername(), userSignupRequestDTO.getNickname(), userSignupRequestDTO.getPhone(), userSignupRequestDTO.getPassword(), userSignupRequestDTO.getGender(), userSignupRequestDTO.getBirthday(),  userSignupRequestDTO.getRoles());
            return ResponseEntity.ok("사용자 가입이 완료되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Test
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // Tip : JWT를 사용하면 UserDetailsService를 호출하지 않기 때문에 @AuthenticationPrincipal 사용
    // 불가능.
    // 왜냐하면 @AuthenticationPrincipal은 UserDetailsService에서 리턴될 때 만들어지기 때문이다.

    // 유저 혹은 매니저 혹은 어드민이 접근 가능
    @GetMapping("user")
    public ResponseEntity<String> user(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        Long principalID = principal.getUser().getId();
        String principalUsername = principal.getUser().getUsername();
        String principalPassword = principal.getUser().getPassword();

        System.out.println("principal : " + principal.getUser().getId());
        System.out.println("principal : " + principal.getUser().getUsername());
        System.out.println("principal : " + principal.getUser().getPassword());

        return ResponseEntity.ok(principalUsername);
    }

//    @PostMapping("join")
//    public String join(@RequestBody Users user) {
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//        user.setRoles("ROLE_USER");
//        userRepository.save(user);
//        return "회원가입완료";
//    }


}
