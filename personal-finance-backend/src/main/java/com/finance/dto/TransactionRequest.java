package com.finance.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {
    
    @NotNull(message = "نوع تراکنش نمی‌تواند خالی باشد")
    private String type;
    
    @NotNull(message = "مبلغ نمی‌تواند خالی باشد")
    @Positive(message = "مبلغ باید بزرگتر از صفر باشد")
    private BigDecimal amount;
    
    @NotNull(message = "شناسه دسته نمی‌تواند خالی باشد")
    private Long categoryId;
    
    @NotNull(message = "تاریخ نمی‌تواند خالی باشد")
    private LocalDate date;
    
    private String description;
}
