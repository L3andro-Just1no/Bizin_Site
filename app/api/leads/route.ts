import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    // DEBUG: Log environment variables
    console.log("🔍 DEBUG - Environment Variables:");
    console.log("SENDGRID_API_KEY exists:", !!process.env.SENDGRID_API_KEY);
    console.log("SENDGRID_API_KEY length:", process.env.SENDGRID_API_KEY?.length || 0);
    console.log("SENDGRID_FROM_EMAIL:", process.env.SENDGRID_FROM_EMAIL);
    console.log("All env keys containing SENDGRID:", Object.keys(process.env).filter(k => k.includes('SENDGRID')));
    
    const body = await request.json();

    // Validate required fields
    const { name, email, interest, message, consent } = body;

    if (!name || !email || !interest || !message || !consent) {
      return NextResponse.json(
        { error: "Campos obrigatórios em falta" },
        { status: 400 }
      );
    }

    // Log the lead
    console.log("=== Nova Lead Recebida ===");
    console.log("Nome:", name);
    console.log("Email:", email);
    console.log("Empresa:", body.company || "Não informado");
    console.log("Interesse:", interest);
    console.log("Mensagem:", message);
    console.log("Consentimento:", consent);
    console.log("Timestamp:", new Date().toISOString());
    console.log("========================");

    // Send email notification via SendGrid
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
      try {
        const timestamp = new Date().toLocaleString("pt-PT", {
          timeZone: "Europe/Lisbon",
          dateStyle: "long",
          timeStyle: "short",
        });

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1c2544 0%, #2a3558 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-top: none; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #1c2544; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
    .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #87c76c; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    .timestamp { color: #87c76c; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">📧 Nova Mensagem de Contacto</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Formulário Bizin</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Nome</div>
        <div class="value">${name}</div>
      </div>
      
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}" style="color: #1c2544; text-decoration: none;">${email}</a></div>
      </div>
      
      ${
        body.company
          ? `
      <div class="field">
        <div class="label">Empresa</div>
        <div class="value">${body.company}</div>
      </div>
      `
          : ""
      }
      
      <div class="field">
        <div class="label">Área de Interesse</div>
        <div class="value">${interest}</div>
      </div>
      
      <div class="field">
        <div class="label">Mensagem</div>
        <div class="value" style="white-space: pre-wrap;">${message}</div>
      </div>
      
      <div class="field">
        <div class="label">Data e Hora</div>
        <div class="value timestamp">${timestamp}</div>
      </div>
    </div>
    <div class="footer">
      <p>Esta mensagem foi enviada através do formulário de contacto em <strong>Bizin</strong></p>
      <p style="margin-top: 10px; font-size: 11px; color: #999;">Para responder, utilize diretamente o email: ${email}</p>
    </div>
  </div>
</body>
</html>
        `;

        const emailText = `
Nova Mensagem de Contacto - Bizin

Nome: ${name}
Email: ${email}
${body.company ? `Empresa: ${body.company}\n` : ""}Área de Interesse: ${interest}
Mensagem: ${message}

Data e Hora: ${timestamp}

---
Para responder, utilize o email: ${email}
        `;

        await sgMail.send({
          to: "leandrojustino2025@gmail.com",
          from: process.env.SENDGRID_FROM_EMAIL,
          replyTo: email,
          subject: `Nova Mensagem de Contacto - ${interest}`,
          text: emailText,
          html: emailHtml,
        });

        console.log("✅ Email enviado com sucesso via SendGrid");
      } catch (emailError: any) {
        console.error("❌ Erro ao enviar email via SendGrid:", emailError);
        console.error("SendGrid error details:", emailError.response?.body);
        // Don't fail the request if email fails - still return success to user
      }
    } else {
      console.warn(
        "⚠️ SendGrid não configurado. Email não será enviado. Configure SENDGRID_API_KEY e SENDGRID_FROM_EMAIL no .env.local"
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem recebida com sucesso",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

