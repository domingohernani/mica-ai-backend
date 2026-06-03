import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  resend = new Resend(process.env.RESEND_API_KEY);

  async send(
    from: string,
    to: string | string[],
    subject: string,
    html: string,
    cc?: string | string[],
  ) {
    const payload: any = {
      from: from,
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      html: html,
    };

    if (cc) {
      payload.cc = Array.isArray(cc) ? cc : [cc];
    }

    const { data, error } = await this.resend.emails.send(payload);

    if (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Email delivery failed',
          detail: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }
}
