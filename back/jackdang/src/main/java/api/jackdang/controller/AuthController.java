package api.jackdang.controller;

import api.jackdang.config.jwt.JwtTokenProvider;
import api.jackdang.dto.JwtResponse;
import api.jackdang.dto.LoginForm;
import api.jackdang.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {


//    private final AuthenticationManager authenticationManager;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtService jwtService; // provider로 빼기


    @GetMapping("/auth/login")
    @ResponseBody
    public JwtResponse authenticateUser(@RequestBody LoginForm loginForm) {
        // 사용자 인증
        final AuthenticationManager authenticationManager = authenticationManagerBuilder.getObject();
        System.out.println(authenticationManager);
        final Authentication authentication = authenticationManager.authenticate(loginForm.toAuthentication());
        System.out.println(authentication);
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword());

//        System.out.println(authenticationToken);

        // AuthenticationManager 에 token 을 넘기면 UserDetailsService 가 받아 처리하도록 한다.

//        try {
//            Authentication authentication = authenticationManager.authenticate(authenticationToken);
//        } catch (AuthenticationException e) {
//            e.printStackTrace(); // 에러 로그 출력 또는 로깅 프레임워크를 사용하여 로그 기록
//            throw new RuntimeException("Authenticaton falied:" + e.getMessage());  // 클라이언트에게 실패를 알릴 수 있는 예외 또는 오류 메시지 반환
//        }
//
//        System.out.println(authentication);
//        TEST
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword())
//        );

//        // 인증된 사용자 정보 가져오기
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // JWT 토큰 생성
        String token = jwtService.generateToken(loginForm.getUsername());

        return new JwtResponse(token);
    }

}
