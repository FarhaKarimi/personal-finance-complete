package com.finance.service;

import com.finance.dto.TransactionRequest;
import com.finance.dto.TransactionResponse;
import com.finance.entity.Category;
import com.finance.entity.Transaction;
import com.finance.exception.ResourceNotFoundException;
import com.finance.repository.CategoryRepository;
import com.finance.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionService {
    
    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    
    @Transactional(readOnly = true)
    public List<TransactionResponse> getAllTransactions() {
        return transactionRepository.findAllByOrderByDateDesc()
            .stream()
            .map(TransactionResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public TransactionResponse getTransactionById(Long id) {
        Transaction transaction = transactionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("تراکنش با شناسه " + id + " یافت نشد"));
        return TransactionResponse.fromEntity(transaction);
    }
    
    @Transactional
    public TransactionResponse createTransaction(TransactionRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new ResourceNotFoundException("دسته با شناسه " + request.getCategoryId() + " یافت نشد"));
        
        Transaction transaction = new Transaction();
        // تبدیل string به enum
        transaction.setType(Transaction.TransactionType.valueOf(request.getType().toUpperCase()));
        transaction.setAmount(request.getAmount());
        transaction.setDate(request.getDate());
        transaction.setDescription(request.getDescription());
        transaction.setCategory(category);
        
        Transaction savedTransaction = transactionRepository.save(transaction);
        return TransactionResponse.fromEntity(savedTransaction);
    }
    
    @Transactional
    public TransactionResponse updateTransaction(Long id, TransactionRequest request) {
        Transaction transaction = transactionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("تراکنش با شناسه " + id + " یافت نشد"));
        
        Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new ResourceNotFoundException("دسته با شناسه " + request.getCategoryId() + " یافت نشد"));
        
        // تبدیل string به enum
        transaction.setType(Transaction.TransactionType.valueOf(request.getType().toUpperCase()));
        transaction.setAmount(request.getAmount());
        transaction.setDate(request.getDate());
        transaction.setDescription(request.getDescription());
        transaction.setCategory(category);
        
        Transaction updatedTransaction = transactionRepository.save(transaction);
        return TransactionResponse.fromEntity(updatedTransaction);
    }
    
    @Transactional
    public void deleteTransaction(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new ResourceNotFoundException("تراکنش با شناسه " + id + " یافت نشد");
        }
        transactionRepository.deleteById(id);
    }
}
