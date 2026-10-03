// Set to the public inbox that should receive enquiries. No credentials belong here.
export const CONTACT_EMAIL: string = "";

// Production URL of the n8n Webhook node in the "Site enquiry to tracker" workflow
// (POST, path "site-enquiry"). The browser calls it directly, so it is public by design.
// Sends fail (and the form says so) until that workflow is active.
export const ENQUIRY_WEBHOOK_URL: string =
  "https://tester-ai-n8n-m7ht.onrender.com/webhook/site-enquiry";
