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
    private int age;
    private String password;
    private String authority;

    public UserSignupRequestDTO(String username, int age, String password, String authority) {
        this.username = username;
        this.age = age;
        this.password = password;
        this.authority = authority;
    }
}
