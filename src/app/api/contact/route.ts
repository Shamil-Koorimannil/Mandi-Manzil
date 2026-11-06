import { NextRequest, NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = validateContactForm(body);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Please correct the highlighted errors.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, message } = body;

    // Server-side logging for audit and recordkeeping
    const submission = {
      receivedAt: new Date().toISOString(),
      sender: `${firstName} ${lastName}`,
      email,
      message,
    };
    
    // If RESEND_API_KEY is configured in production environment, dispatch email
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Mandi Manzil Web <noreply@mandimanzil.com>",
            to: process.env.CONTACT_RECEIVER_EMAIL || "info@mandimanzil.com",
            subject: `New Inquiry from ${firstName} ${lastName}`,
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
          }),
        });
      } catch (emailErr) {
        console.error("Email notification dispatch error:", emailErr);
      }
    }

    console.log("[Mandi Manzil Form Submission Received]:", submission);

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out to Mandi Manzil. Your message has been received, and our team will get back to you shortly.",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your message. Please try again or reach out directly at info@mandimanzil.com.",
      },
      { status: 500 }
    );
  }
}
