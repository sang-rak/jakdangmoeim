package api.jackdang.controller;

import api.jackdang.config.jwt.JwtTokenProvider;
import api.jackdang.dto.JwtResponse;
import api.jackdang.dto.LoginForm;
import api.jackdang.dto.UserSignupRequestDTO;
import api.jackdang.entity.User;
import api.jackdang.service.AuthService;
import api.jackdang.service.JwtService;
import api.jackdang.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

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
            authService.signup(userSignupRequestDTO.getUsername(), userSignupRequestDTO.getAge(), userSignupRequestDTO.getPassword(), userSignupRequestDTO.getRoles());
            return ResponseEntity.ok("사용자 가입이 완료되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * 로그인
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<String> loginSuccess(@RequestBody Map<String, String> loginForm) {
        try {
            String token = authService.login(loginForm.get("username"), loginForm.get("password"));
            return ResponseEntity.ok(token);
        } catch (UsernameNotFoundException e) {
            // 사용자가 없는 경우
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자가 없습니다.");
        } catch (RuntimeException e) {
            // 비밀번호 불일치 또는 기타 에러가 발생한 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: " + e.getMessage());
        }

    }
}
