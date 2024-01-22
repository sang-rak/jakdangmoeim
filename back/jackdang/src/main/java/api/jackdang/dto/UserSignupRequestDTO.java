package api.jackdang.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 회원 가입
 * param: username, age, password
 */
@Data
@NoArgsConstructor
public class UserSignupRequestDTO {


    private String username;
    private String nickname;
    private String phone;
    private String password;
    private String gender;
    private String birthday;
    private String roles;

}
