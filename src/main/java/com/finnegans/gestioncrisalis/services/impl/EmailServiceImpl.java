package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.enums.EmailType;
import com.finnegans.gestioncrisalis.services.EmailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    public EmailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }
    @Value("${tomcat.url}")
    private String hostUrl;
    @Value("${spring.mail.username}")
    private String fromEmail;
    @Value("${spring.mail.application.name}")
    private String applicationName;
    @Override
    @Async
    public void sendEmailFromTemplate(String to, EmailType templateType) throws MessagingException, UnsupportedEncodingException {
        Context context = new Context();
        String htmlContent = templateEngine.process("bienvenida.html", context);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(new InternetAddress(fromEmail, applicationName));
        helper.setTo(to);
        helper.setSubject("Bienvenido a ".concat(applicationName).concat("! 🎉"));
        htmlContent = htmlContent.replaceAll("\\$\\{USUARIO\\}", to.substring(0, to.indexOf("@")));
        htmlContent = htmlContent.replaceAll("\\$\\{HOST_URL\\}", hostUrl);
        helper.setText(htmlContent, true);

        javaMailSender.send(message);
    }
}
