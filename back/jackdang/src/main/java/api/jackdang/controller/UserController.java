package api.jackdang.controller;

import api.jackdang.dto.UserSignupRequestDTO;
import api.jackdang.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;

    @PostMapping("/api/v1/user/signup")
    public ResponseEntity<String> signup(@RequestBody UserSignupRequestDTO userSignupRequestDTO) {
        try {
            userService.signup(userSignupRequestDTO.getUsername(), userSignupRequestDTO.getAge(), userSignupRequestDTO.getPassword());
            return ResponseEntity.ok("사용자 가입이 완료되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/api/v1/user/login")
    public ResponseEntity<String> login() {
        try {
            String username = "ingrack";
            int age = 17;
            System.out.println(userService.makeJwtToken(username, age));
            return ResponseEntity.ok("Jwt 완료되었습니다.");

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}