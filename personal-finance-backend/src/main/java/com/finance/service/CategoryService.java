package com.finance.service;

import com.finance.dto.CategoryRequest;
import com.finance.dto.CategoryResponse;
import com.finance.entity.Category;
import com.finance.exception.BadRequestException;
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
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;
    
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
            .stream()
            .map(CategoryResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("دسته با شناسه " + id + " یافت نشد"));
        return CategoryResponse.fromEntity(category);
    }
    
    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.getName());
        // تبدیل string به enum
        category.setType(Category.CategoryType.valueOf(request.getType().toUpperCase()));
        
        Category savedCategory = categoryRepository.save(category);
        return CategoryResponse.fromEntity(savedCategory);
    }
    
    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("دسته با شناسه " + id + " یافت نشد"));
        
        category.setName(request.getName());
        // تبدیل string به enum
        category.setType(Category.CategoryType.valueOf(request.getType().toUpperCase()));
        
        Category updatedCategory = categoryRepository.save(category);
        return CategoryResponse.fromEntity(updatedCategory);
    }
    
    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("دسته با شناسه " + id + " یافت نشد");
        }
        
        // بررسی استفاده دسته در تراکنش‌ها
        if (transactionRepository.existsByCategoryId(id)) {
            throw new BadRequestException("این دسته در تراکنش‌ها استفاده شده است و نمی‌تواند حذف شود");
        }
        
        categoryRepository.deleteById(id);
    }
}
