package br.com.pradolabs.api_ai.memory;

import br.com.pradolabs.api_ai.chat.ChatMessage;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat-memory")
public class MemoryChatController {

    private final MemoryChatService memoryChatService;

    public MemoryChatController(MemoryChatService memoryChatService) {
        this.memoryChatService = memoryChatService;
    }

    @PostMapping
    ChatMessage simpleChat(@RequestBody ChatMessage chatMessage){
        var response = this.memoryChatService.simpleChat(chatMessage.message());
        return new ChatMessage(response);
    }
}
