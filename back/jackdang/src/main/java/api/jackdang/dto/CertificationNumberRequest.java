package api.jackdang.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 인증 번호 생성
 * */
@Data
@NoArgsConstructor
public class CertificationNumberRequest {

    // 전화번호
    private String phone;

    // 인증번호 종류
    private String type;


}
