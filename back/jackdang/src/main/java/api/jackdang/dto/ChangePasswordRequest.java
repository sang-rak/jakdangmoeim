package api.jackdang.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
/**
 *  패스워드 변경
 * */
@Data
@NoArgsConstructor
public class ChangePasswordRequest {

    private String phone;
    private String newPassword;

}
