package com.openclassrooms.mddapi.common.exception;

public class SubscriberException extends RuntimeException {

    public SubscriberException(String message) {
        super(message);
    }

    public SubscriberException(String message, Throwable e) {
        super(message, e);
    }

}
