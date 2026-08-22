/**
 * Mailer utility — calls the PHP send-mail.php endpoint hosted on cPanel.
 * The PHP script sends:
 *   1. Inquiry / notification email → info@bizexpertsjunction.com
 *   2. Thank you / confirmation email → user's submitted email address
 *
 * Update MAILER_URL to your deployed domain once uploaded to cPanel.
 */

// ─── Change this to your actual domain once deployed ─────────────────────────
const MAILER_URL =
  import.meta.env.VITE_MAILER_URL || "https://www.bizexpertsjunction.com/send-mail.php";

interface ContactInquiryData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  jobTitle?: string;
  jobDepartment?: string;
  experience?: string;
  noticePeriod?: string;
  message?: string;
  resumeUrl?: string;
}

interface TalentData {
  name: string;
  email: string;
  phone: string;
  role?: string;
  resumeUrl?: string;
}

async function postToMailer(payload: Record<string, string | undefined>) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000); // 10-second timeout

  try {
    const res = await fetch(MAILER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Mailer returned ${res.status}: ${text}`);
    }

    return res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

/**
 * Contact / Requirement Form
 * → Sends inquiry to info@bizexpertsjunction.com
 * → Sends thank you email to the user
 */
export async function sendContactInquiryEmails(data: ContactInquiryData) {
  try {
    const result = await postToMailer({
      type: "contact",
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      message: data.message,
    });
    return { success: true, result };
  } catch (error) {
    console.error("[Mailer] Contact inquiry error:", error);
    return { success: false, error };
  }
}

/**
 * Job Application Form
 * → Sends application details to info@bizexpertsjunction.com
 * → Sends confirmation email to the applicant
 */
export async function sendJobApplicationEmails(data: ApplicationData) {
  try {
    const result = await postToMailer({
      type: "application",
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      jobTitle: data.jobTitle,
      jobDepartment: data.jobDepartment,
      experience: data.experience,
      noticePeriod: data.noticePeriod,
      message: data.message,
      resumeUrl: data.resumeUrl,
    });
    return { success: true, result };
  } catch (error) {
    console.error("[Mailer] Application email error:", error);
    return { success: false, error };
  }
}

/**
 * Talent Network Form
 * → Sends profile info to info@bizexpertsjunction.com
 * → Sends welcome email to the candidate
 */
export async function sendTalentNetworkEmails(data: TalentData) {
  try {
    const result = await postToMailer({
      type: "talent",
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      resumeUrl: data.resumeUrl,
    });
    return { success: true, result };
  } catch (error) {
    console.error("[Mailer] Talent network email error:", error);
    return { success: false, error };
  }
}
