package com.spring.bank_app.dto.AccountDto;

import java.math.BigDecimal;

public class TransferMoneyDto {
    private String accNumberFrom;
    private BigDecimal sumAccFrom;
    private String accNumberTo;
    private BigDecimal sumAccTo;

    public String getAccNumberFrom() {
        return accNumberFrom;
    }

    public void setAccNumberFrom(String accNumberFrom) {
        this.accNumberFrom = accNumberFrom;
    }

    public BigDecimal getSumAccFrom() {
        return sumAccFrom;
    }

    public void setSumAccFrom(BigDecimal sumAccFrom) {
        this.sumAccFrom = sumAccFrom;
    }

    public String getAccNumberTo() {
        return accNumberTo;
    }

    public void setAccNumberTo(String accNumberTo) {
        this.accNumberTo = accNumberTo;
    }

    public BigDecimal getSumAccTo() {
        return sumAccTo;
    }

    public void setSumAccTo(BigDecimal sumAccTo) {
        this.sumAccTo = sumAccTo;
    }
}
