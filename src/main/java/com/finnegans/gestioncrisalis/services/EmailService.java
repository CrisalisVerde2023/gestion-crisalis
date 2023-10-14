package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.enums.EmailType;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface EmailService {
    void sendEmailFromTemplate(String to, EmailType templateType) throws MessagingException, UnsupportedEncodingException;
}
