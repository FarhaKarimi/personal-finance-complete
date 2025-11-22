package com.finance.service;

import com.finance.dto.SummaryResponse;
import com.finance.entity.Transaction;
import com.finance.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SummaryService {
    
    private final TransactionRepository transactionRepository;
    
    @Transactional(readOnly = true)
    public SummaryResponse getSummary() {
        List<Transaction> transactions = transactionRepository.findAll();
        
        BigDecimal totalIncome = transactions.stream()
            .filter(t -> t.getType() == Transaction.TransactionType.INCOME)
            .map(Transaction::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal totalExpense = transactions.stream()
            .filter(t -> t.getType() == Transaction.TransactionType.EXPENSE)
            .map(Transaction::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal balance = totalIncome.subtract(totalExpense);
        
        return new SummaryResponse(totalIncome, totalExpense, balance);
    }
}
