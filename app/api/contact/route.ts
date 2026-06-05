import { Resend } from "resend";
import { z } from "zod";
import { NextResponse } from "next/server";
import { appendFormSubmission } from "../../lib/googleSheets";

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  newsletter: z.boolean().optional(),
  formType: z.string().optional(), // To identify which form (contact, playbook, etc.)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      message,
      newsletter,
      formType = "contact",
    } = validatedData;

    // Prepare email content
    const emailSubject =
      formType === "playbook"
        ? "New ERP Hiring Playbook Request"
        : "New Contact Form Submission";

    const emailHtml = `
      <h2>${emailSubject}</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      ${newsletter ? "<p><em>Subscribed to newsletter</em></p>" : ""}
      <hr />
      <p><small>Form Type: ${formType}</small></p>
    `;

    // Log to Google Sheets
    await appendFormSubmission({
      timestamp: new Date().toISOString(),
      formType,
      firstName,
      lastName,
      email,
      phone,
      company,
      message,
      newsletter,
    }).catch((err) => console.error("Google Sheets logging failed:", err));

    // Send email using Resend (failure is logged but does not block success)
    const { error: emailError } = await resend.emails.send({
      from: "Ponderosa Talent Group <onboarding@resend.dev>",
      to: ["drake.olson@ponderosatalent.com"],
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
    }

    return NextResponse.json(
      { success: true, message: "Submission received" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 },
      );
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
