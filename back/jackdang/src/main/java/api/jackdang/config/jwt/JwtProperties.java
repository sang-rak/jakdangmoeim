package api.jackdang.config.jwt;

import org.springframework.beans.factory.annotation.Value;

public interface JwtProperties {

    String SECRET = "tlxmpa1!@3dasda32o543($)JIDSAMDasdfsemkofenffesmniofsmi342534wdaofdfd"; // ToDO yml으로 옮길 예정 비밀값
    int EXPIRATION_TIME = 1000 * 60 * 30; // 30분
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";

}
