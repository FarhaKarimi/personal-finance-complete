package com.finance.dto;

import com.finance.entity.Category;
import com.finance.entity.Transaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {
    private Long id;
    private String type;
    private BigDecimal amount;
    private CategoryResponse category;
    private LocalDate date;
    private String description;
    
    public static TransactionResponse fromEntity(Transaction transaction) {
        TransactionResponse response = new TransactionResponse();
        response.setId(transaction.getId());
        // تبدیل enum به string با حروف کوچک
        response.setType(transaction.getType().name().toLowerCase());
        response.setAmount(transaction.getAmount());
        response.setCategory(CategoryResponse.fromEntity(transaction.getCategory()));
        response.setDate(transaction.getDate());
        response.setDescription(transaction.getDescription());
        return response;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryResponse {
        private Long id;
        private String name;
        private String type;
        
        public static CategoryResponse fromEntity(Category category) {
            CategoryResponse response = new CategoryResponse();
            response.setId(category.getId());
            response.setName(category.getName());
            // تبدیل enum به string با حروف کوچک
            response.setType(category.getType().name().toLowerCase());
            return response;
        }
    }
}
