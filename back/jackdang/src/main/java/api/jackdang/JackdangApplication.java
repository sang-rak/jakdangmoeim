package api.jackdang;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.persistence.EntityManager;

@SpringBootApplication
public class JackdangApplication {

	public static void main(String[] args) {
		SpringApplication.run(JackdangApplication.class, args);
	}

}
