package com.finance.dto;

import com.finance.entity.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    
    @NotBlank(message = "نام دسته نمی‌تواند خالی باشد")
    private String name;
    
    @NotNull(message = "نوع دسته نمی‌تواند خالی باشد")
    private String type;
}
