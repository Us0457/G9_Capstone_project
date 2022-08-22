package com.shopforhome.ecommerce.service;

import com.shopforhome.ecommerce.model.EmailDetails;

public interface EmailService {
	 String sendSimpleMail(EmailDetails details);
	 
	    // Method
	    // To send an email with attachment
	 String sendMailWithAttachment(EmailDetails details);

}
