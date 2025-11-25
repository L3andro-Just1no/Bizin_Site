import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, interest, message, consent } = body;

    if (!name || !email || !interest || !message || !consent) {
      return NextResponse.json(
        { error: "Campos obrigatórios em falta" },
        { status: 400 }
      );
    }

    // Log the lead (in production, this would save to a database or send to a CRM)
    console.log("=== Nova Lead Recebida ===");
    console.log("Nome:", name);
    console.log("Email:", email);
    console.log("Empresa:", body.company || "Não informado");
    console.log("Interesse:", interest);
    console.log("Mensagem:", message);
    console.log("Consentimento:", consent);
    console.log("Timestamp:", new Date().toISOString());
    console.log("========================");

    // TODO: Integrate with CRM or send email notification
    // Example integrations:
    // - Send email via SendGrid/Resend
    // - Save to database (PostgreSQL, MongoDB, etc.)
    // - Send to CRM (Salesforce, HubSpot, etc.)
    // - Send to Slack/Discord notification

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

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

