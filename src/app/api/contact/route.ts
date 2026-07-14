import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Headers extraction
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(",")[0].trim()) : "Unknown IP";

    const country = req.headers.get("x-vercel-ip-country") || "";
    const city = req.headers.get("x-vercel-ip-city") || "";
    const region = req.headers.get("x-vercel-ip-country-region") || "";
    const location = `${city}, ${region}, ${country}`.trim().replace(/^,\s+|,\s+$/g, "");
    // NOTE: keep user-agent available for debugging/troubleshooting
    const userAgent = req.headers.get("user-agent") || "Unknown Device";


    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: "All fields required",
      }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({
        success: false,
        message: "Missing SMTP credentials.",
      }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send Email
    await transporter.sendMail({
      from: `"DurgBhumi Website" <${smtpUser}>`,
      to: "booking@durgbhumi.com",
      replyTo: email,
      subject: `New Enquiry - ${subject || "Website Enquiry"}`,
      html: `
        <div style="font-family: Arial; padding:20px; background:#f5f5f5;">
          <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; border:1px solid #e5e5e5;">
            <div style="background:#000; color:white; padding:20px; text-align:center;">
              <h2 style="margin:0;">New Enquiry Received</h2>
            </div>
            <div style="padding:25px;">
              <table cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse; font-size:15px;">
                <tr><td><strong>Name</strong></td><td>${name}</td></tr>
                <tr><td><strong>Email</strong></td><td>${email}</td></tr>
                <tr><td><strong>Phone</strong></td><td>${phone || "N/A"}</td></tr>
                <tr><td><strong>Subject</strong></td><td>${subject || "N/A"}</td></tr>
                <tr><td><strong>Received At</strong></td><td>${new Date().toLocaleString()}</td></tr>
                <tr><td><strong>IP Address</strong></td><td>${ip}</td></tr>
                <tr><td><strong>Location</strong></td><td>${location || "Unknown"}</td></tr>
                <tr><td><strong>User Agent</strong></td><td>${userAgent}</td></tr>

              </table>
              <hr style="margin:25px 0;" />
              <h3>Message</h3>
              <div style="background:#fafafa; padding:20px; border-radius:10px; border:1px solid #eee;">
                ${message}
              </div>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error: unknown) {
    console.error("EMAIL ERROR =>", error);

    const message = error instanceof Error ? error.message : "Failed to send email";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: message,
      },
      { status: 500 }
    );
  }

}