import { Resend } from "resend";

import type { LeadRecord } from "@/lib/server/lead-types";
import { planLabels, projectTypeLabels } from "@/lib/validators/contact";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
  return new Resend(apiKey);
}

function formatLine(label: string, value: string) {
  return `${label}: ${value || "-"}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendLeadEmail(lead: LeadRecord) {
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.LEADS_FROM_EMAIL;

  if (!to || !from) {
    throw new Error("Missing LEADS_TO_EMAIL or LEADS_FROM_EMAIL environment variable.");
  }

  const resend = getResendClient();
  const subject = `New Lead - ${planLabels[lead.plan]} - ${lead.name}`;

  const safeLead = {
    timestamp: escapeHtml(lead.timestamp),
    name: escapeHtml(lead.name),
    email: escapeHtml(lead.email),
    company: escapeHtml(lead.company || "-"),
    plan: escapeHtml(planLabels[lead.plan]),
    projectType: escapeHtml(projectTypeLabels[lead.projectType]),
    budget: escapeHtml(lead.budget || "-"),
    timeline: escapeHtml(lead.timeline || "-"),
    message: escapeHtml(lead.message).replace(/\n/g, "<br/>"),
    pageUrl: escapeHtml(lead.pageUrl || "-"),
    ip: escapeHtml(lead.ip),
    userAgent: escapeHtml(lead.userAgent),
  };

  const text = [
    formatLine("Timestamp", lead.timestamp),
    formatLine("Name", lead.name),
    formatLine("Email", lead.email),
    formatLine("Company", lead.company),
    formatLine("Plan", planLabels[lead.plan]),
    formatLine("Project Type", projectTypeLabels[lead.projectType]),
    formatLine("Budget", lead.budget),
    formatLine("Timeline", lead.timeline),
    formatLine("Message", lead.message),
    formatLine("Page URL", lead.pageUrl),
    formatLine("IP", lead.ip),
    formatLine("User Agent", lead.userAgent),
  ].join("\n");

  const html = `
    <h2>New Lead</h2>
    <p><strong>Timestamp:</strong> ${safeLead.timestamp}</p>
    <p><strong>Name:</strong> ${safeLead.name}</p>
    <p><strong>Email:</strong> ${safeLead.email}</p>
    <p><strong>Company:</strong> ${safeLead.company}</p>
    <p><strong>Plan:</strong> ${safeLead.plan}</p>
    <p><strong>Project Type:</strong> ${safeLead.projectType}</p>
    <p><strong>Budget:</strong> ${safeLead.budget}</p>
    <p><strong>Timeline:</strong> ${safeLead.timeline}</p>
    <p><strong>Message:</strong><br/>${safeLead.message}</p>
    <hr />
    <p><strong>Page URL:</strong> ${safeLead.pageUrl}</p>
    <p><strong>IP:</strong> ${safeLead.ip}</p>
    <p><strong>User Agent:</strong> ${safeLead.userAgent}</p>
  `;

  await resend.emails.send({
    from,
    to,
    subject,
    text,
    html,
  });
}
