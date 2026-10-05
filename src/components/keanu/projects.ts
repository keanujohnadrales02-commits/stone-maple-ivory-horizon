type Lane = {
  src?: string;
  label: string;
  summary: string;
  caption?: string;
  steps: string[];
};

export type Project = {
  id: string;
  kicker: string;
  title: string;
  short: string;
  body: string;
  tags: string[];
  shot?: string;
  lanes: Lane[];
  graph: "ghl" | "front" | "social" | "zapier";
  dark: boolean;
  lead?: boolean;
  facts?: { value: string; label: string }[];
  caveat?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "ghl-appointment-management",
    kicker: "GoHighLevel",
    title: "GoHighLevel CRM & Appointment Management",
    short: "CRM & Appointment Management",
    shot: "/projects/home-tours-pipeline.jpg",
    body: "Self-directed Home Tours practice: organize contacts, track registrations, manage follow-ups, and schedule appointments.",
    tags: ["CRM administration", "Follow-up tasks", "Scheduling", "Client updates"],
    dark: true,
    graph: "ghl",
    lead: true,
    facts: [
      { value: "7", label: "tour pipeline stages" },
      { value: "1", label: "sample tour booking" },
      { value: "Draft", label: "untested workflow" },
    ],
    caveat: "Self-directed project with fictional contacts for DEMO Home Tours. CRM and funnel work documented in the October 4–5, 2026 practice checklist, with original setup screenshots. A controlled form submission was checked; the workflow was not run. No paid client work or live results are claimed. The registration workflow remained Draft, with 0 enrolled and no verified end-to-end automation.",
    lanes: [
      {
        label: "CRM & pipelines",
        src: "/projects/home-tours-pipeline.jpg",
        caption: "Home Tours - Buyers: Alex Test in Registered and Jane Test in Confirmed. Six columns are visible; Closed is documented in the checklist.",
        summary: "Organized a Home Tours practice account using contact fields, tags, notes, and opportunity cards.",
        steps: [
          "Created Home Tours - Buyers: Registered, Confirmed, Attended, No-show, Consult Booked, Under Contract, Closed.",
          "Added Tour Date, Party Size, and Tour Attendance fields plus the home-tour-registered tag.",
          "Updated Jane Test to Confirmed; Alex Test remained in Registered with attendance not confirmed.",
          "Created a separate Recruiting pipeline and recorded Sam Test in Applied. These are fictional practice records.",
        ],
      },
      {
        label: "Tasks & notes",
        src: "/projects/home-tours-tasks.jpg",
        caption: "Jane’s Home Tours follow-up is complete; the headcount reminder is listed. Other rows belong to earlier practice, including cleaning-service tasks.",
        summary: "Practised daily VA administration: follow-up tasks, due dates, contact links, attendance notes, and client handoffs.",
        steps: [
          "Created Jane’s attendance follow-up, linked it to her contact, and marked it complete after recording the practice update.",
          "Recorded Jane’s party size as 2 and Alex’s as 3; only Jane was confirmed.",
          "Created a headcount reminder due October 7 at 9:00 AM Austin time.",
          "Documented Done / Blocked / Tomorrow / Questions, including a question about tracking guests separately from bookings.",
        ],
      },
      {
        label: "Calendar",
        src: "/projects/home-tours-calendar.png",
        caption: "Saturday shows one class booking out of 20 capacity, at 10 PM Taipei time (9 AM Austin). The weekday blocks are separate recruitment practice bookings.",
        summary: "Configured a separate Saturday Home Bus Tour practice calendar and checked the Austin-to-Taipei time conversion.",
        steps: [
          "Class Booking: 240-minute duration and interval, 20-seat capacity, Saturday 9:00 AM–1:00 PM America/Chicago.",
          "Created one sample booking for Jane Test on October 10. GHL displayed 1/20 bookings; Party Size recorded Jane plus one guest.",
          "The 20 seats are capacity, not 20 bookings. Alex’s registration was not a confirmed booking.",
          "Checked notification settings before booking; the checklist records no customer email or SMS sent. Corrected the blocked demo call’s time zone.",
        ],
      },
      {
        label: "Registration funnel",
        src: "/projects/home-tours-registration.jpg",
        caption: "Register page from the three-step DEMO funnel. The architecture photo is the retained template image, not a real team or client.",
        summary: "Adapted a template into Tour Info → Register → Thank You, kept in preview. Registration is a request, not a confirmed seat.",
        steps: [
          "Embedded the Styled registration form with five required fields: first name, last name, email, tour date, and seats needed.",
          "Mapped Tour Date and Party Size to contact fields.",
          "The checklist records desktop/mobile checks and one controlled submission using the existing Casey Test contact.",
          "The form reached Thank You, updated the existing record, and left the count at 20 contacts. No messages were sent; no domain was connected.",
        ],
      },
      {
        label: "Draft workflow",
        src: "/projects/home-tours-draft-workflow.jpg",
        caption: "Home Tours - Funnel Registration (draft): filtered form trigger, tag, opportunity action, and internal notification. This is configuration evidence, not an execution log.",
        summary: "Configured a form-specific registration workflow. It remained Draft, with 0 enrolled and no workflow test.",
        steps: [
          "Trigger: submission of Home Tours Registration - Styled (DEMO) only.",
          "Add home-tour-registered, then create/update an opportunity in Home Tours - Buyers > Registered.",
          "Configure an in-app notification to Keanu; no customer message action in this draft.",
          "Documented overlapping registration triggers. They require consolidation and testing before any future activation.",
        ],
      },
      {
        label: "Completed checks",
        src: "/projects/home-tours-validation.jpg",
        caption: "An empty submission shows all five required-field errors and remains on the form. Screenshot from the recorded preview test.",
        summary: "The checklist documents the 20-step coached practice and F0–F9 funnel checks. Form testing and workflow execution are separate.",
        steps: [
          "Checked saved field values after reload and removed an accidental duplicate to return to 20 contacts.",
          "Checked pipeline stages, task completion, notification settings, and the calendar time zone.",
          "Practised SMS-only DND on a fictional opt-out record; no real STOP message is claimed.",
          "The proposed five-workflow expansion, future SOPs, and dashboards are not presented as completed or tested work.",
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
