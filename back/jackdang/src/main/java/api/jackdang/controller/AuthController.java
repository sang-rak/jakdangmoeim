package api.jackdang.controller;

import api.jackdang.config.auth.PrincipalDetails;
import api.jackdang.dto.CertificationCheckRequest;
import api.jackdang.dto.CertificationNumberRequest;
import api.jackdang.dto.UserSignupRequestDTO;
import api.jackdang.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;


/* 인증 관련 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final AuthService authService;
    @Autowired
    private HttpSession session;
    /**
     * 회원가입
     * @param userSignupRequestDTO
     * @return
     */
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserSignupRequestDTO userSignupRequestDTO) {
        try {
            authService.signup(userSignupRequestDTO.getUsername(), userSignupRequestDTO.getNickname(), userSignupRequestDTO.getPhone(), userSignupRequestDTO.getPassword(), userSignupRequestDTO.getGender(), userSignupRequestDTO.getBirthday());
            return ResponseEntity.ok("사용자 가입이 완료되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Tip : JWT를 사용하면 UserDetailsService를 호출하지 않기 때문에 @AuthenticationPrincipal 사용
    // 불가능.
    // 왜냐하면 @AuthenticationPrincipal은 UserDetailsService에서 리턴될 때 만들어지기 때문이다.

    // 유저 혹은 매니저 혹은 admin 이 접근 가능
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

    // 인증 번호 생성
    @PostMapping("certificationNumber")
    @ResponseBody
    public ResponseEntity<String> CertificationNumber(@RequestBody CertificationNumberRequest certificationNumberRequest) {
        try {
            String phone = certificationNumberRequest.getPhone();
            // 이미 가입된 전화 번호가 있으면
            authService.existsByPhone(phone);

            String certificationNumber = authService.sendRandomMessage(phone);
            session.setAttribute("certificationNumber", certificationNumber);

            // 세션의 만료 시간을 180초(3분)으로 설정
            session.setMaxInactiveInterval(180);

            String certificationNumberTEST = (String) session.getAttribute("certificationNumber"); // TEST
            System.out.println(certificationNumberTEST + " : "); // TEST

            return ResponseEntity.ok("인증번호 문자발송이 완료되었습니다.");
        }
        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    // 인증 번호 확인
    @PostMapping("certificationNumberCheck")
    @ResponseBody
    public ResponseEntity<String> certificationNumberCheck(@RequestBody CertificationCheckRequest certificationCheckRequest, HttpSession session) {
        try {
            String certificationNumberCheck = certificationCheckRequest.getCertificationNumberCheck();
            String certificationNumber = (String) session.getAttribute("certificationNumber");
            System.out.println("certificationNumberCheck");
            System.out.println(certificationNumberCheck);
            System.out.println("certificationNumber");
            System.out.println(certificationNumber);
            if (certificationNumberCheck.equals(certificationNumber)) {
                session.removeAttribute("certificationNumber");
                return ResponseEntity.ok("인증 번호 확인 되었습니다.");
            }
            return ResponseEntity.badRequest().body("인증 번호가 틀립니다.");
        }
        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
