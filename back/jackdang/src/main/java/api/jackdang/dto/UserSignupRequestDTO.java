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

    public UserSignupRequestDTO(String username, String nickname, String phone, String password, String gender, String birthday,  String roles) {
        this.username = username;
        this.nickname = nickname;
        this.phone = phone;
        this.password = password;
        this.gender = gender;
        this.birthday = birthday;
        this.roles = roles;
    }
}
