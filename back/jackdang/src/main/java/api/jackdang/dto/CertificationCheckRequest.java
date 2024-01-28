package api.jackdang.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 인증 번호 확인
 * */
@Data
@NoArgsConstructor
public class CertificationCheckRequest {

    private String certificationNumberCheck;

}
