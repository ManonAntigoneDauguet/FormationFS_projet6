package com.openclassrooms.mddapi.common;

import org.springframework.stereotype.Component;

@Component
public class Utils {

    /**
     * Checks if at least 1 letter is in lowercase in a string
     *
     * @param string as String to check
     * @return boolean
     */
    static public boolean isContainsLowercaseLetter(String string) {
        for (char letter : string.toCharArray()) {
            if (Character.isLowerCase(letter)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if at least 1 letter is in uppercase in a string
     *
     * @param string as String to check
     * @return boolean
     */
    static public boolean isContainsUppercaseLetter(String string) {
        for (char letter : string.toCharArray()) {
            if (Character.isUpperCase(letter)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if at least 1 special character exists in a string
     *
     * @param string as String to check
     * @return boolean
     */
    static public boolean isContainsSpecialCharacter(String string) {
        for (char letter : string.toCharArray()) {
            if (!Character.isLetter(letter) && !(Character.isDigit(letter))) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if at least 1 number exists in a string
     *
     * @param string as String to check
     * @return boolean
     */
    static public boolean isContainsNumber(String string) {
        for (char letter : string.toCharArray()) {
            if (Character.isDigit(letter)) {
                return true;
            }
        }
        return false;
    }
}
