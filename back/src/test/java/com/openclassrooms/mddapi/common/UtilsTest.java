package com.openclassrooms.mddapi.common;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static com.openclassrooms.mddapi.common.Utils.*;
import static org.junit.jupiter.api.Assertions.*;

class UtilsTest {

    @ParameterizedTest
    @CsvSource({"Test, true", "test, true", "TEST, false", "1234, false"})
    void testIsContainsLowercaseLetter(String string, Boolean expected) {
        Boolean result = isContainsLowercaseLetter(string);
        assertEquals(expected, result);
    }

    @ParameterizedTest
    @CsvSource({"Test, true", "TEST, true", "test, false", "1234, false"})
    void testIsContainsUppercaseLetter(String string, Boolean expected) {
        Boolean result = isContainsUppercaseLetter(string);
        assertEquals(expected, result);
    }

    @ParameterizedTest
    @CsvSource({"test!, true", "t$st, true", "Test, false", "TEST4, false", "1234, false"})
    void testIsContainsSpecialCharacter(String string, Boolean expected) {
        Boolean result = isContainsSpecialCharacter(string);
        assertEquals(expected, result);
    }

    @ParameterizedTest
    @CsvSource({"TEST4, true", "1234, true", "Test, false", "test!, false"})
    void testIsContainsNumber(String string, Boolean expected) {
        Boolean result = isContainsNumber(string);
        assertEquals(expected, result);
    }
}