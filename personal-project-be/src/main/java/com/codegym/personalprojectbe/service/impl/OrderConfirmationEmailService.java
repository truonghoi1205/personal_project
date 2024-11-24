package com.codegym.personalprojectbe.service.impl;

import com.codegym.personalprojectbe.model.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class OrderConfirmationEmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public OrderConfirmationEmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendOrderConfirmationEmail(String to, Order order, List<OrderItem> orderItems, Payment payment, String returnStore) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        NumberFormat numberFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));

        StringBuilder orderItemsHtml = new StringBuilder();
        for (OrderItem orderItem : orderItems) {
            Product product = orderItem.getProductDetail().getProduct();
            String productName = product.getName();
            String concentration = product.getConcentration();

            String productImageUrl = "";

            Set<Image> images = product.getImages();
            for (Image image : images) {
                productImageUrl = image.getUrl();
                break;
            }

            orderItemsHtml.append("<tr>")
                    .append("<td style=\"border-bottom: 1px solid #ddd; padding: 10px;\">")
                    .append("<img src=\"" + productImageUrl + "\" alt=\"" + productName + "\" style=\"width: 60px; height: auto; margin-right: 10px;\">")
                    .append("</td>")
                    .append("<td style=\"border-bottom: 1px solid #ddd; padding: 10px;\">" + productName + " x " + orderItem.getQuantity() + "<br>" + "<small>" + concentration + "/" + orderItem.getProductDetail().getVolume() + "ml" + "</small>" + "</td>")
                    .append("<td style=\"border-bottom: 1px solid #ddd; padding: 10px; text-align: right;\">" + numberFormat.format(orderItem.getPrice()) + "</td>")
                    .append("</tr>");
        }

        orderItemsHtml.append("<tr>")
                .append("<td colspan=\"2\" style=\"padding: 10px; text-align: right;\">Tổng cộng:</td>")
                .append("<td style=\"padding: 10px; text-align: right;\"><strong>" + numberFormat.format(order.getTotalPrice()) + "</strong></td>")
                .append("</tr>");

        String htmlContent = "<!DOCTYPE html>"
                + "<html lang=\"vi\">"
                + "<head>"
                + "    <meta charset=\"UTF-8\">"
                + "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">"
                + "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
                + "    <title>Xác nhận đơn hàng " + order.getOrderCode() + "</title>"
                + "</head>"
                + "<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;\">"
                + "    <table align=\"center\" width=\"600\" style=\"background-color: #ffffff; padding: 20px; border: 1px solid #ddd;\">"
                + "        <tr>"
                + "            <td style=\"text-align: center;\">"
                + "                <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px\">"
                + "                    <h2 style=\"color: #333; margin: 0;\">Tên website</h2>"
                + "                    <p style=\"margin: 0;\">ĐƠN HÀNG " + order.getOrderCode() + "</p>"
                + "                </div>"
                + "                <h3 style=\"color: #333;\">Cảm ơn bạn đã mua hàng!</h3>"
                + "                <p>Xin chào " + order.getCustomer().getName() + ", Chúng tôi đã nhận được đặt hàng của bạn và đã sẵn sàng để vận chuyển. Chúng tôi sẽ thông báo cho bạn khi đơn hàng được gửi đi.</p>"
                + "                <a href=\"#\" style=\"background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;\">Xem đơn hàng</a> hoặc <a href=\"" + returnStore + "\">Đến cửa hàng của chúng tôi</a>"
                + "            </td>"
                + "        </tr>"
                + "        <tr>"
                + "            <td style=\"padding: 20px 0;\">"
                + "                <h4>Thông tin đơn hàng</h4>"
                + "                <table width=\"100%\" style=\"border-collapse: collapse;\">"
                + orderItemsHtml.toString()
                + "                </table>"
                + "            </td>"
                + "        </tr>"
                + "        <tr>"
                + "            <td>"
                + "                <h4>Thông tin khách hàng</h4>"
                + "                <table width=\"100%\" style=\"border-collapse: collapse;\">"
                + "                    <tr>"
                + "                        <td style=\"padding: 10px;\">"
                + "                            <strong>Địa chỉ giao hàng:</strong><br>" + "order.getShippingAddress()" + "<br>"
                + "                            <strong>Phương thức vận chuyển:</strong><br>" + "Giao hàng miễn phí toàn quốc" + "<br>"
                + "                        </td>"
                + "                        <td style=\"padding: 10px;\">"
                + "                            <strong>Địa chỉ thanh toán:</strong><br>" + "order.getBillingAddress()" + "<br>"
                + "                            <strong>Phương thức thanh toán:</strong><br>" + payment.getPaymentMethod() + "<br>"
                + "                        </td>"
                + "                    </tr>"
                + "                </table>"
                + "            </td>"
                + "        </tr>"
                + "        <tr>"
                + "            <td style=\"text-align: center; padding: 20px; color: #888;\">"
                + "                Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên lạc với chúng tôi tại <a href=\"mailto:supportEmail\" style=\"color: #007bff;\">supportEmail</a>"
                + "            </td>"
                + "        </tr>"

                + "    </table>"
                + "</body>"
                + "</html>";

        helper.setTo(to);
        helper.setSubject("Xác nhận đơn hàng " + order.getOrderCode());
        helper.setText(htmlContent, true);

        javaMailSender.send(message);
    }
}
