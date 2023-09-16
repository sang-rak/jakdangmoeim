package api.jackdang.controller;

import api.jackdang.dto.UserSignupRequestDTO;
import api.jackdang.entity.User;
import api.jackdang.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;

    /**
     * 회원가입
     * @param userSignupRequestDTO
     * @return
     */
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserSignupRequestDTO userSignupRequestDTO) {
        try {
            userService.signup(userSignupRequestDTO.getUsername(), userSignupRequestDTO.getAge(), userSignupRequestDTO.getPassword(), userSignupRequestDTO.getAuthority());
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
            String token = userService.login(loginForm.get("username"), loginForm.get("password"));
            return ResponseEntity.ok(token);
        } catch (UsernameNotFoundException e) {
            // 사용자가 없는 경우
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자가 없습니다.");
        } catch (RuntimeException e) {
            // 비밀번호 불일치 또는 기타 에러가 발생한 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: " + e.getMessage());
        }

    }

    /**
     * 로그인 JWT 발급
     * @return
     */
    @GetMapping("/loginJWT")
    public ResponseEntity<String> loginJWT() {
        try {
            String username = "ingrack";
            int age = 17;
            System.out.println(userService.makeJwtToken(username, age)); // 토큰 발급 확인
            return ResponseEntity.ok("Jwt 완료되었습니다.");

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
