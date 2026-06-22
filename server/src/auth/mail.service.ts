import { Injectable, Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';

interface PasswordResetEmail {
  email: string;
  resetUrl: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  private createTransport() {
    const { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return null;
    }

    return nodemailer.createTransport({
      auth: {
        pass: SMTP_PASS,
        user: SMTP_USER,
      },
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
    });
  }

  async sendPasswordResetEmail({ email, resetUrl }: PasswordResetEmail) {
    const transport = this.createTransport();

    if (!transport) {
      this.logger.warn(
        `WARN SMTP is not configured. Password reset link for ${email}: ${resetUrl}`,
      );
      return;
    }

    await transport.sendMail({
      from: process.env.MAIL_FROM || 'BabyHub <no-reply@babyhub.local>',
      html: `
        <p>We received a request to reset your BabyHub password.</p>
        <p><a href="${resetUrl}">Reset your password</a></p>
        <p>This link expires in 15 minutes. If you did not request it, ignore this email.</p>
      `,
      subject: 'Reset your BabyHub password',
      text: `Reset your BabyHub password: ${resetUrl}\nThis link expires in 15 minutes.`,
      to: email,
    });

    this.logger.log(`INFO password reset email sent: ${email}`);
  }
}
