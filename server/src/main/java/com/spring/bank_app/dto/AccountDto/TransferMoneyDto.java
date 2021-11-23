package com.spring.bank_app.dto.AccountDto;

public class TransferMoneyDto {
    private String accNumberFrom;
    private Double sumAccFrom;
    private String accNumberTo;
    private Double sumAccTo;

    public String getAccNumberFrom() {
        return accNumberFrom;
    }

    public void setAccNumberFrom(String accNumberFrom) {
        this.accNumberFrom = accNumberFrom;
    }

    public Double getSumAccFrom() {
        return sumAccFrom;
    }

    public void setSumAccFrom(Double sumAccFrom) {
        this.sumAccFrom = sumAccFrom;
    }

    public String getAccNumberTo() {
        return accNumberTo;
    }

    public void setAccNumberTo(String accNumberTo) {
        this.accNumberTo = accNumberTo;
    }

    public Double getSumAccTo() {
        return sumAccTo;
    }

    public void setSumAccTo(Double sumAccTo) {
        this.sumAccTo = sumAccTo;
    }
}
