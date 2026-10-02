type Lane = {
  src: string;
  label: string;
  summary: string;
  steps: string[];
};

export type Project = {
  id: string;
  kicker: string;
  title: string;
  short: string;
  body: string;
  tags: string[];
  shot: string;
  lanes: Lane[];
  graph: "ghl" | "front" | "social" | "zapier";
  dark: boolean;
  lead?: boolean;
  facts?: { value: string; label: string }[];
  caveat?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "ghl-recruitment",
    kicker: "GoHighLevel",
    title: "Recruitment CRM",
    short: "Recruitment CRM",
    body: "Practice account. A pipeline, a UK interview calendar, and a follow-up workflow left in draft.",
    tags: ["GoHighLevel", "Pipeline", "Calendar", "Workflow"],
    shot: "/projects/ghl-pipeline.png",
    dark: false,
    graph: "ghl",
    lead: true,
    facts: [
      { value: "5 stages", label: "New lead to won" },
      { value: "20 interviews", label: "Practice bookings" },
      { value: "30 min", label: "UK office hours" },
      { value: "Draft", label: "Workflow not published" },
    ],
    caveat:
      "Practice only. The people are fictional. The workflow has enrolled nobody, and customer email and SMS are off.",
    lanes: [
      {
        src: "/projects/ghl-pipeline.png",
        label: "Pipeline",
        summary:
          "One board, five stages. Five fictional candidates. Each contacted card already has an interview time.",
        steps: [
          "Stages: New lead, Contacted, Booked, Showed, Won",
          "Alex is still a new lead",
          "Morgan, Taylor, Sam, and Jane sit in Contacted",
          "Booked, Showed, and Won are empty on purpose",
        ],
      },
      {
        src: "/projects/ghl-contact.png",
        label: "Contact",
        summary:
          "Jane Test is not a real person. The tag and custom field come from an earlier cleaning-service practice. The note is about the interview.",
        steps: [
          "Tag: new-lead",
          "Custom field: Service Interested In",
          "Note: she asked about the interview format",
          "Email and phone are fake",
        ],
      },
      {
        src: "/projects/ghl-tasks.png",
        label: "Tasks",
        summary:
          "Follow-ups are tied to a person and a due date. Rows marked Example are HighLevel’s own samples, not mine.",
        steps: [
          "Overdue tasks are marked in red",
          "Morgan’s discount request is an escalation, not a normal follow-up",
          "Cleaning tasks are from the earlier practice",
          "Example rows were already in the account",
        ],
      },
      {
        src: "/projects/ghl-calendar.png",
        label: "Calendar",
        summary:
          "Twenty practice interviews in one week. Thirty minutes each. The clock on this screen is Manila. The slots still fall inside UK office hours.",
        steps: [
          "Tuesday and Wednesday only",
          "Names are all Test",
          "No real candidates were contacted",
        ],
      },
      {
        src: "/projects/ghl-hours.png",
        label: "Hours",
        summary: "The calendar is set for a UK interviewer, not for my timezone.",
        steps: [
          "30-minute meeting, 30-minute interval",
          "Europe/London",
          "Monday to Friday, 9:00 to 17:00",
          "Saturday and Sunday are off",
        ],
      },
      {
        src: "/projects/ghl-alerts.png",
        label: "Alerts",
        summary:
          "Customers were not emailed or texted. Only in-app alerts are on, and only when an appointment is booked.",
        steps: [
          "Email, SMS, and WhatsApp are off",
          "Cancellation, reschedule, reminder, and follow-up are off",
          "This was deliberate, so the practice bookings stayed quiet",
        ],
      },
      {
        src: "/projects/ghl-workflow.png",
        label: "Workflow",
        summary: "The path is drawn. It is still a draft, so it has not run.",
        steps: [
          "Form submitted",
          "Add the new-lead tag",
          "Create an opportunity in New lead",
          "Send a test email",
          "Status is Draft. Enrolled: 0",
        ],
      },
    ],
  },
  {
    id: "front-desk",
    kicker: "n8n",
    title: "AI Front Desk for a Dental Practice",
    short: "AI Front Desk",
    body: "Chat books the visit. Reminders, leads, and an error lane sit beside it.",
    tags: ["n8n", "Anthropic", "Google Calendar", "Gmail", "Sheets"],
    shot: "/projects/front-desk.png",
    dark: true,
    graph: "front",
    lanes: [
      {
        src: "/projects/front-desk.png",
        label: "Booking",
        summary: "A patient writes in website chat. One agent runs the appointment.",
        steps: [
          "Reads the calendar and existing bookings",
          "Books, moves, or cancels the visit",
          "Emails the confirmation",
          "Logs the booking on a sheet",
        ],
      },
      {
        src: "/projects/front-desk-error.png",
        label: "Errors",
        summary: "If another workflow fails, this one catches it so the rest keep running.",
        steps: [
          "Classifies what broke",
          "Writes it to an error log",
          "Retries when it is safe to retry",
          "Emails the team only if it is critical",
        ],
      },
      {
        src: "/projects/front-desk-reminders.png",
        label: "Reminders",
        summary: "Two clocks. Nobody on staff has to send these emails.",
        steps: [
          "Every day at 8am: people with a visit in the next 1–2 days get a reminder",
          "Every Monday at 8am: people from about six months ago get a recall",
          "Each send is written back to the patient sheet",
        ],
      },
      {
        src: "/projects/front-desk-leads.png",
        label: "Leads",
        summary: "A form on the website becomes a row, a reply, and a ping to staff.",
        steps: [
          "The form posts into n8n",
          "Fields are cleaned up",
          "The lead is saved to Google Sheets",
          "The person gets an auto-reply",
          "Staff get an email",
        ],
      },
    ],
  },
  {
    id: "social-followup",
    kicker: "Make.com",
    title: "Enquiry to Social Follow-up",
    short: "Social follow-up",
    body: "Enquiry is logged, then answered on email, Messenger, or WhatsApp.",
    tags: ["Make.com", "Google Sheets", "Gmail", "Messenger", "WhatsApp"],
    shot: "/projects/social-followup.png",
    dark: false,
    graph: "social",
    lanes: [
      {
        src: "/projects/social-followup.png",
        label: "Scenario",
        summary: "This is Make, not n8n. One webhook, one sheet, then a split by channel.",
        steps: [
          "The enquiry arrives",
          "It is saved as a row",
          "If they came from Facebook, Messenger replies",
          "If they came from WhatsApp, WhatsApp replies",
          "You also get an email",
        ],
      },
      {
        src: "/projects/social-followup-sheet.png",
        label: "The sheet",
        summary: "This is the log the scenario writes to.",
        steps: [
          "Columns: time, name, email, phone, channel, message, status",
          "Each new enquiry becomes one row",
          "Nothing is typed in by hand",
        ],
      },
    ],
  },
  {
    id: "zapier-routing",
    kicker: "Zapier",
    title: "Lead Routing with Priority Paths",
    short: "Lead routing",
    body: "Referrals get a drafted email. Everyone else notifies sales.",
    tags: ["Zapier", "Google Sheets", "Gmail", "AI by Zapier"],
    shot: "/projects/zapier-apollo.png",
    dark: false,
    graph: "zapier",
    lanes: [
      {
        src: "/projects/zapier-apollo.png",
        label: "Paths",
        summary:
          "One webhook. Two paths. Referrals get a drafted email. Everyone else notifies sales.",
        steps: [
          "The lead hits the webhook",
          "If they are a referral: save the row, AI drafts a reply, Gmail sends it to the client",
          "Anyone else: Gmail notifies the sales team",
        ],
      },
    ],
  },
];
