package api.jackdang.controller;

import api.jackdang.config.JwtTokenProvider;
import api.jackdang.dto.JwtResponse;
import api.jackdang.dto.LoginForm;
import api.jackdang.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtService jwtService; // provider로 빼기


    @PostMapping("/auth/login")
    @ResponseBody
    public JwtResponse authenticateUser(@RequestBody LoginForm loginForm) {
        // 사용자 인증
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword())
//        );
//
//        // 인증된 사용자 정보 가져오기
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // JWT 토큰 생성
        String userna = "test";
        String token = jwtService.generateToken(userna);

        return new JwtResponse(token);
    }

}
