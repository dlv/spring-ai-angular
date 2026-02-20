package br.com.pradolabs.api_ai;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

// Exclude the problematic auto-configuration in the test context so the ApplicationContext can load
@SpringBootTest(properties = {
	"spring.ai.chat.memory.repository.jdbc.enabled=false",
	"spring.autoconfigure.exclude=org.springframework.ai.model.chat.memory.repository.jdbc.autoconfigure.JdbcChatMemoryRepositoryAutoConfiguration"
})
class ApiAiApplicationTests {

	@Test
	void contextLoads() {
	}

}
