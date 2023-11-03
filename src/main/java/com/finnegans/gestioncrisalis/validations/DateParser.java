package com.finnegans.gestioncrisalis.validations;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateParser {

    public static Date parseStringToDate(String date, String pattern) throws ParseException {
        System.out.println("Parsing date string: " + date + ", using pattern: " + pattern); // Debug log
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        Date parsedDate = formatter.parse(date);
        System.out.println("Parsed date object: " + parsedDate); // Debug log
        return parsedDate;
    }

    public static String formatDateToString(Date date, String pattern) {
        System.out.println("Formatting date object: " + date + ", using pattern: " + pattern); // Debug log
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        String formattedDate = formatter.format(date);
        System.out.println("Formatted date string: " + formattedDate); // Debug log
        return formattedDate;
    }
}
