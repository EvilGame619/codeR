package com.CodeReview.Exceptions;

public class LimitExceeded extends RuntimeException {

    public LimitExceeded(String message) {
        super(message);
    }
}
