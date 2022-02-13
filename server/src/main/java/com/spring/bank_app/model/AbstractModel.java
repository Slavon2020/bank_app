package com.spring.bank_app.model;

import java.time.LocalDateTime;

public abstract class AbstractModel {
    private Long id;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
