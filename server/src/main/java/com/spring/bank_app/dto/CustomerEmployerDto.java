package com.spring.bank_app.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CustomerEmployerDto {
    private Long customerId;
    private Long employerId;
}
