import {
  TransactionalEmailsApi,
  SendSmtpEmail,
  TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";

// Instanciar API de correos transaccionales
const apiInstance = new TransactionalEmailsApi();

// Establecer la clave de API
apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

const smtpEmail = new SendSmtpEmail();

export async function SendEmail(email: string, name: string, res: string) {
  smtpEmail.subject = "Confirmación de Cuenta - ControlIIT";
  smtpEmail.to = [{ email: email, name: name }];
  smtpEmail.htmlContent = `
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
          body { font-family: 'Montserrat', sans-serif; background-color: #f8f9fa; margin: 0; padding: 0; color: #333; }
          .container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 40px; }
          h1 { text-align: center; color: #007bff; font-size: 32px; font-weight: 700; margin-bottom: 30px; }
          p { line-height: 1.6; color: #555; font-size: 18px; }
          .code { display: inline-block; padding: 10px 20px; background-color: #f1f1f1; color: #333; font-size: 24px; font-weight: bold; border-radius: 5px; margin: 20px 0; }
          .button { display: inline-block; padding: 15px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 30px; text-align: center; font-size: 18px; }
          .cta { text-align: center; margin-top: 40px; }
          .footer { text-align: center; margin-top: 60px; font-size: 14px; color: #888; }
          .icon { display: inline-block; margin-bottom: 10px; }
          img { max-width: 100%; border-radius: 10px; margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>¡Bienvenido a ControlIIT!</h1>
          <p>Hola ${name},</p>
          <p>Estamos encantados de darte la bienvenida a ControlIIT. Para completar tu registro, por favor utiliza el siguiente código de verificación:</p>

          <div class="code">${res}</div>

          <img src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="ControlIIT" />

          <div class="cta">
            <p>Haz clic en el botón de abajo para verificar tu cuenta:</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/email-verified" class="button">Verificar Cuenta</a>
          </div>

          <p>Si no solicitaste este correo, simplemente ignóralo.</p>

          <div class="footer">
            <p>© 2024 ControlIIT. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  smtpEmail.sender = { name: "ControlIIT", email: "nspes2020@gmail.com" };

  try {
    // Enviar el correo transaccional
    await apiInstance.sendTransacEmail(smtpEmail);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
