package com.electronic_shop_tvo.electronicshoptvo.controller.publicapi;

import com.electronic_shop_tvo.electronicshoptvo.model.dto.item.ItemDto;
import com.electronic_shop_tvo.electronicshoptvo.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;

    @GetMapping
    public List<ItemDto> getAllItems() {
        log.info("Getting all items");

        return itemService.getAllItems().stream()
                .map(ItemDto::new)
                .toList();
    }

    @GetMapping("/{id}")
    public ItemDto getItemById(@PathVariable int id) {
        log.info("Getting item by id: {}", id);

        return new ItemDto(this.itemService.getItemById(id));
    }

    @GetMapping("/getByTitle/{title}")
    public List<ItemDto> getItemsByTitle(@PathVariable String title) {
        log.info("Getting item by title: {}", title);

        return itemService.getItemsByTitle(title).stream()
                .map(ItemDto::new)
                .toList();
    }
}
