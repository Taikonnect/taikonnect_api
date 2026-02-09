import { Injectable } from '@nestjs/common';
import { mail } from '../../configs/env';
import { MailerService } from '@nestjs-modules/mailer';
import { env } from 'process';


interface mailerProps {
  to: string
  subject: string
  text: string,
  name: string,
  token: string,
  code?: string
}

@Injectable()
export class MailService {

  constructor(
    private readonly mailerService: MailerService
  ) { }

  async ResetPassword(data: mailerProps) {

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const html = `
              <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding: 30px 0;">

              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#ffffff; border-radius:8px; padding:30px; max-width:500px; text-align:center;">

                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <h2 style="margin:0; color:#333;">Verificação de segurança</h2>
                  </td>
                </tr>

                <tr>
                  <td align="center"
                      style="color:#555; font-size:15px; line-height:1.6; padding-bottom:20px; text-align:center;">
                    Olá,<br /><br />
                    Use o código abaixo para concluir sua verificação.<br />
                    Este código é válido por alguns minutos.
                  </td>
                </tr>

                <!-- Código -->
                <tr>
                  <td align="center" style="padding:20px 0;">
                    <div style="
                      display:inline-block;
                      padding:15px 25px;
                      font-size:28px;
                      letter-spacing:6px;
                      font-weight:bold;
                      background:#f0f0f0;
                      color:#000;
                      border-radius:6px;
                    ">
                      ${data.code}
                    </div>
                  </td>
                </tr>

                <!-- Aviso -->
                <tr>
                  <td align="center"
                      style="color:#777; font-size:13px; line-height:1.5; padding-top:20px; text-align:center;">
                    Se você não solicitou este código, ignore este e-mail.
                  </td>
                </tr>

                <!-- Rodapé -->
                <tr>
                  <td align="center" style="color:#aaa; font-size:12px; padding-top:30px;">
                    © 2026 Sua Empresa. Todos os direitos reservados.
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
    `

    const msg = {
      to: data.to,
      from: 'no-reply@taikonnect.com.br',
      subject: data.subject,
      text: data.text,
      html: html,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })

  }

}
