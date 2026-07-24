import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✓ Email server connection verified");
    return true;
  } catch (error) {
    console.error("✗ Email server connection failed:", error.message);
    return false;
  }
};

export const sendOtpEmail = async (email, otp) => {
  console.log(`\n========================================`);
  console.log(`  OTP for ${email}: ${otp}`);
  console.log(`========================================\n`);

  console.log(`  EMAIL_USER: ${process.env.EMAIL_USER}`);
  console.log(`  EMAIL_PASS: ${process.env.EMAIL_PASS ? "••••••••" : "NOT SET"}`);
  console.log(`\n`);

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Verification Code",
      html: `
        <div style="margin: 0; padding: 0; background: #f9fafb;">
          <div style="font-family: Arial, sans-serif; max-width: 420px; margin: 30px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(139,92,246,0.15);">

            <!-- Header with dots background -->
            <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
              <!-- Dot pattern -->
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.15; background-image: radial-gradient(circle, #fff 1.5px, transparent 1.5px); background-size: 18px 18px;"></div>
              <div style="position: relative; z-index: 1;">
                <div style="width: 56px; height: 56px; margin: 0 auto 16px; background: rgba(255,255,255,0.2); border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 28px;">&#9993;</span>
                </div>
                <h2 style="color: #ffffff; margin: 0 0 6px; font-size: 22px; font-weight: 700;">Email Verification</h2>
                <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 14px;">Secure your account</p>
              </div>
            </div>

            <!-- Body -->
            <div style="background: #ffffff; padding: 36px 30px; text-align: center;">
              <p style="color: #4b5563; font-size: 15px; margin: 0 0 24px;">Use the code below to verify your email:</p>

              <!-- OTP box -->
              <div style="background: linear-gradient(135deg, #fdf2f8, #f3e8ff); border: 2px dashed #d8b4fe; border-radius: 12px; padding: 20px; margin: 0 0 24px;">
                <span style="font-size: 36px; font-weight: 800; color: #7c3aed; letter-spacing: 10px; font-family: 'Courier New', monospace;">${otp}</span>
              </div>

              <p style="color: #9ca3af; font-size: 13px; margin: 0 0 8px;">This code expires in <strong style="color: #6b7280;">10 minutes</strong>.</p>
              <p style="color: #9ca3af; font-size: 13px; margin: 0;">If you didn't request this, please ignore this email.</p>
            </div>

            <!-- Footer -->
            <div style="background: #f9fafb; padding: 16px 30px; text-align: center; border-top: 1px solid #f3f4f6;">
              <p style="color: #d1d5db; font-size: 12px; margin: 0;">Portfolio &copy; 2026 &middot; All rights reserved</p>
            </div>

          </div>
        </div>
      `,
    });
    console.log("✓ Email sent successfully! Message ID:", info.messageId);
    console.log("✓ Preview URL:", nodemailer.getTestMessageUrl(info));
    return true;
  } catch (error) {
    console.error("✗ Email sending FAILED:");
    console.error("  Error name:", error.name);
    console.error("  Error message:", error.message);
    console.error("  Error code:", error.code);
    if (error.response) {
      console.error("  Response:", error.response);
    }
    return false;
  }
};

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
