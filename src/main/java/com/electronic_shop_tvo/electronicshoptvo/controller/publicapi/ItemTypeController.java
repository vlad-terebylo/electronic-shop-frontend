package com.electronic_shop_tvo.electronicshoptvo.controller.publicapi;

import com.electronic_shop_tvo.electronicshoptvo.model.dto.itemType.ItemTypeDto;
import com.electronic_shop_tvo.electronicshoptvo.service.ItemTypeService;
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
@RequestMapping("/itemTypes")
public class ItemTypeController {
    private final ItemTypeService itemTypeService;

    @GetMapping
    public List<ItemTypeDto> getAllItemTypes() {
        log.info("Getting all item types");

        return this.itemTypeService.getAllItemTypes().stream()
                .map(ItemTypeDto::new)
                .toList();
    }

    @GetMapping("/{id}")
    public ItemTypeDto getItemTypeById(@PathVariable int id) {
        log.info("Getting item type by id: {}", id);

        return new ItemTypeDto(itemTypeService.getItemTypeByItemId(id));
    }
}
