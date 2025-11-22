package com.finance.controller;

import com.finance.dto.SummaryResponse;
import com.finance.service.SummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/summary")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SummaryController {
    
    private final SummaryService summaryService;
    
    @GetMapping
    public ResponseEntity<SummaryResponse> getSummary() {
        SummaryResponse summary = summaryService.getSummary();
        return ResponseEntity.ok(summary);
    }
}
