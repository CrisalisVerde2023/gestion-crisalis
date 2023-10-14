package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.models.EmailType;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface EmailService {
    void sendEmailFromTemplate(String to, EmailType templateType) throws MessagingException, UnsupportedEncodingException;
}
