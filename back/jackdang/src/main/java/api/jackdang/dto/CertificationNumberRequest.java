package api.jackdang.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 인증 번호 생성
 * */
@Data
@NoArgsConstructor
public class CertificationNumberRequest {

    private String phone;

}
