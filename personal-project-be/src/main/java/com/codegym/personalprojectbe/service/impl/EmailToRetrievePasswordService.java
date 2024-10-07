package com.codegym.personalprojectbe.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailToRetrievePasswordService {

    private final JavaMailSender javaMailSender;
    @Autowired
    public EmailToRetrievePasswordService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendVerifyEmail(String to, String confirmationUrl) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        String htmlContent = "<!DOCTYPE html>"
                + "<html lang=\"vi\">"
                + "<head>"
                + "    <meta charset=\"UTF-8\">"
                + "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">"
                + "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
                + "    <title>Xác Nhận Tài Khoản</title>"
                + "</head>"
                + "<body style=\"margin: 0; padding: 0; background-color: #f4f4f4;\">"
                + "    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">"
                + "        <tr>"
                + "            <td style=\"padding: 20px 0 30px 0;\">"
                + "                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" style=\"border-collapse: collapse;\">"
                + "                    <!-- Header -->"
                + "                    <tr>"
                + "                        <td align=\"center\" bgcolor=\"#FC650B\" style=\"padding: 40px 0 30px 0;\">"
                + "                        </td>"
                + "                    </tr>"
                + "                    <!-- Body -->"
                + "                    <tr>"
                + "                        <td bgcolor=\"#ffffff\" style=\"padding: 40px 30px 40px 30px;\">"
                + "                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">"
                + "                                <tr>"
                + "                                    <td style=\"color: #333333; text-align: center; font-family: Arial, sans-serif; font-size: 24px;\">"
                + "                                        <b style=\"margin-bottom: 30px;\"> Real Estate Platform. Lấy lại mật khẩu tài khoản!</b>"
                + "                                    </td>"
                + "                                </tr>"
                + "                                <tr>"
                + "                                    <td style=\"padding: 20px 0 30px 0; color: #555555; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;\">"
                + "                                        Để lấy lại tài khoản yêu quý của bạn, vui lòng nhấn vào nút dưới đây để xác nhận rằng bạn chủ nhân tài khoản:"
                + "                                    </td>"
                + "                                </tr>"
                + "                                <tr>"
                + "                                    <td align=\"center\">"
                + "                                        <a href=\"" + confirmationUrl + "\" style=\"background-color: #FC650B; color: white; padding: 15px 25px; text-decoration: none; font-size: 16px; border-radius: 5px; font-family: Arial, sans-serif;\">Đặt lại mật khẩu</a>"
                + "                                    </td>"
                + "                                </tr>"
                + "                            </table>"
                + "                        </td>"
                + "                    </tr>"
                + "                    <!-- Footer -->"
                + "                    <tr>"
                + "                        <td bgcolor=\"#FC650B\" style=\"padding: 30px 30px 30px 30px;\">"
                + "                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">"
                + "                                <tr>"
                + "                                    <td style=\"color: #ffffff; text-align: center; font-family: Arial, sans-serif; font-size: 14px;\" width=\"75%\">"
                + "                                        &copy; 2024 Real Estate Platform. All rights reserved.<br/>"
                + "                                    </td>"
                + "                                </tr>"
                + "                            </table>"
                + "                        </td>"
                + "                    </tr>"
                + "                </table>"
                + "            </td>"
                + "        </tr>"
                + "    </table>"
                + "</body>"
                + "</html>";

        helper.setTo(to);
        helper.setSubject("Real Estate Platforms");
        helper.setText(htmlContent, true);

        javaMailSender.send(message);
    }
}
