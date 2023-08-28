package api.jackdang.dto;

/**
 * 회원 가입
 * param: username, age, password
 */
public class UserSignupRequestDTO {
    private String username;
    private int age;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
