package api.jackdang.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "name"}) // 무한루프 위험성으로 조인이 없는것만 ToString 추가
public class Gathering {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @OneToMany(mappedBy = "gathering")
    private List<User> users = new ArrayList<>();

    public Gathering(String name) {
        this.name = name;
    }
}
