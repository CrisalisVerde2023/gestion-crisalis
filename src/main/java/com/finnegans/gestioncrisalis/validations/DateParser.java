package com.finnegans.gestioncrisalis.validations;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateParser {

    public static Date parseStringToDate(String date, String pattern) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        Date parsedDate = formatter.parse(date);
        return parsedDate;
    }

    public static String formatDateToString(Date date, String pattern) {
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        String formattedDate = formatter.format(date);
        return formattedDate;
    }
}
