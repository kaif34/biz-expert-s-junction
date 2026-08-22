<?php
/**
 * BizExperts Junction — Mail Handler
 * Uses PHP mail() via cPanel's sendmail (most reliable on shared hosting).
 * Upload to: public_html/send-mail.php
 */

// ─── CORS ────────────────────────────────────────────────────────────────────
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") { http_response_code(200); exit(); }
if ($_SERVER["REQUEST_METHOD"] !== "POST")    { http_response_code(405); echo json_encode(["success"=>false,"message"=>"Method not allowed"]); exit(); }

// ─── Config ───────────────────────────────────────────────────────────────────
$FROM_EMAIL  = "info@bizexpertsjunction.com";
$FROM_NAME   = "Biz Expert's Junction";
$ADMIN_EMAIL = "info@bizexpertsjunction.com";

// ─── Parse body ───────────────────────────────────────────────────────────────
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"Invalid JSON"]); exit(); }

function s($v) { return htmlspecialchars(strip_tags(trim($v ?? ""))); }

$type     = s($data["type"]            ?? "contact");
$uName    = s($data["name"]            ?? $data["fullName"] ?? "");
$uEmail   = filter_var(trim($data["email"] ?? ""), FILTER_VALIDATE_EMAIL);
$uPhone   = s($data["phone"]           ?? "");
$company  = s($data["company"]         ?? "");
$service  = s($data["service"]         ?? $data["jobTitle"] ?? $data["role"] ?? "");
$msg      = s($data["message"]         ?? "");
$exp      = s($data["experience"]      ?? "");
$notice   = s($data["noticePeriod"]    ?? "");
$resume   = s($data["resumeUrl"]       ?? "");
$jobTitle = s($data["jobTitle"]        ?? "");
$jobDept  = s($data["jobDepartment"]   ?? "");
$time     = date("d M Y, h:i A");

if (!$uName || !$uEmail) {
    http_response_code(400);
    echo json_encode(["success"=>false,"message"=>"Name and valid email required"]);
    exit();
}

// ─── Mail helper ──────────────────────────────────────────────────────────────
function send_mail($to, $to_name, $subject, $html_body) {
    global $FROM_EMAIL, $FROM_NAME;
    $headers  = "From: =?UTF-8?B?" . base64_encode($FROM_NAME) . "?= <{$FROM_EMAIL}>\r\n";
    $headers .= "Reply-To: {$FROM_EMAIL}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    // -f sets the envelope sender — critical for cPanel deliverability
    return mail($to, "=?UTF-8?B?" . base64_encode($subject) . "?=", $html_body, $headers, "-f {$FROM_EMAIL}");
}

// ─── Row helper for HTML tables ───────────────────────────────────────────────
function row($label, $value) {
    return "<tr>
      <td style='padding:10px 12px;border-bottom:1px solid #eee;font-weight:600;color:#555;width:155px;white-space:nowrap;'>{$label}</td>
      <td style='padding:10px 12px;border-bottom:1px solid #eee;'>{$value}</td>
    </tr>";
}

// ─── Email wrapper ────────────────────────────────────────────────────────────
function wrap($title, $content, $color = "#1e3a5f") {
    return "<!DOCTYPE html><html><body style='margin:0;padding:20px;background:#f4f6f9;font-family:Arial,sans-serif;'>
<div style='max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);'>
  <div style='background:{$color};padding:22px 28px;'>
    <h2 style='color:#fff;margin:0;font-size:18px;'>{$title}</h2>
  </div>
  <div style='padding:24px 28px;'>{$content}</div>
  <div style='background:#f4f6f9;padding:14px 28px;border-top:1px solid #eee;font-size:12px;color:#999;'>
    Biz Expert's Junction · info@bizexpertsjunction.com · +91 9045766447
  </div>
</div></body></html>";
}

// ─── Build subjects + bodies by type ─────────────────────────────────────────
if ($type === "application") {
    // ── Admin ──
    $resumeLink = $resume ? "<a href='{$resume}' style='color:#e06b2d;'>Download</a>" : "Not uploaded";
    $adminSubject = "New Application: {$uName} → {$jobTitle}";
    $adminContent = "<table style='width:100%;border-collapse:collapse;'>"
        . row("Candidate",   "<strong>{$uName}</strong>")
        . row("Email",       "<a href='mailto:{$uEmail}' style='color:#e06b2d;'>{$uEmail}</a>")
        . row("Phone",       $uPhone)
        . row("Applied For", $jobTitle)
        . row("Department",  $jobDept)
        . row("Experience",  $exp ?: "—")
        . row("Notice",      $notice ?: "—")
        . row("Resume",      $resumeLink)
        . row("Cover Note",  $msg ?: "—")
        . row("Submitted",   $time)
        . "</table>";
    $adminBody = wrap("📋 New Job Application", $adminContent);

    // ── User ──
    $userSubject = "Application Received – {$jobTitle} | Biz Expert's Junction";
    $userContent = "<p>Dear <strong>{$uName}</strong>,</p>
<p>Thank you for applying for the <strong>{$jobTitle}</strong> role at <strong>Biz Expert's Junction</strong>.</p>
<p>Our recruitment team will review your profile and reach out within <strong>24–48 hours</strong> if it matches the requirement.</p>
<p>For queries, contact us at <a href='mailto:info@bizexpertsjunction.com' style='color:#e06b2d;'>info@bizexpertsjunction.com</a></p>
<br><p style='color:#555;'>Best regards,<br><strong>Biz Expert's Junction Team</strong></p>";
    $userBody = wrap("✅ Application Received!", $userContent);

} elseif ($type === "talent") {
    // ── Admin ──
    $resumeLink   = $resume ? "<a href='{$resume}' style='color:#e06b2d;'>Download</a>" : "Not uploaded";
    $adminSubject = "Talent Network: {$uName} ({$service})";
    $adminContent = "<table style='width:100%;border-collapse:collapse;'>"
        . row("Name",      "<strong>{$uName}</strong>")
        . row("Email",     "<a href='mailto:{$uEmail}' style='color:#e06b2d;'>{$uEmail}</a>")
        . row("Phone",     $uPhone)
        . row("Role",      $service ?: "—")
        . row("Resume",    $resumeLink)
        . row("Submitted", $time)
        . "</table>";
    $adminBody = wrap("🌐 Talent Network Registration", $adminContent);

    // ── User ──
    $userSubject = "Welcome to Biz Expert's Junction Talent Network!";
    $userContent = "<p>Dear <strong>{$uName}</strong>,</p>
<p>Welcome to the <strong>Biz Expert's Junction Talent Network</strong>!</p>
<p>Your profile is now in our talent pool. We match profiles to openings regularly and will reach out when a suitable opportunity arises.</p>
<p>Contact us anytime at <a href='mailto:info@bizexpertsjunction.com' style='color:#e06b2d;'>info@bizexpertsjunction.com</a></p>
<br><p style='color:#555;'>Best regards,<br><strong>Biz Expert's Junction Team</strong></p>";
    $userBody = wrap("🎉 You're in Our Talent Network!", $userContent);

} else {
    // ── Admin ──
    $adminSubject = "New Inquiry: {$uName} ({$company})";
    $adminContent = "<table style='width:100%;border-collapse:collapse;'>"
        . row("Name",    "<strong>{$uName}</strong>")
        . row("Email",   "<a href='mailto:{$uEmail}' style='color:#e06b2d;'>{$uEmail}</a>")
        . row("Phone",   $uPhone)
        . row("Company", $company)
        . row("Service", $service)
        . row("Message", nl2br($msg))
        . row("Time",    $time)
        . "</table>";
    $adminBody = wrap("📩 New Client Inquiry", $adminContent);

    // ── User ──
    $userSubject = "Thank you for contacting Biz Expert's Junction";
    $userContent = "<p>Dear <strong>{$uName}</strong>,</p>
<p>Thank you for reaching out to <strong>Biz Expert's Junction</strong> regarding <strong>{$service}</strong>.</p>
<p>Our team will review your requirement and respond within <strong>one business day</strong>.</p>
<p>For urgent matters, reply to this email or call <strong>+91 9045766447</strong>.</p>
<br><p style='color:#555;'>Best regards,<br><strong>Biz Expert's Junction Team</strong><br>
<a href='mailto:info@bizexpertsjunction.com' style='color:#e06b2d;'>info@bizexpertsjunction.com</a></p>";
    $userBody = wrap("✅ Inquiry Received!", $userContent);
}

// ─── Send ─────────────────────────────────────────────────────────────────────
$adminSent = send_mail($ADMIN_EMAIL, $FROM_NAME, $adminSubject, $adminBody);
$userSent  = send_mail((string)$uEmail, $uName,   $userSubject,  $userBody);

// Log result to cPanel error log (view via cPanel → Logs → Error Log)
error_log("[BEJ] type={$type} | to={$uEmail} | admin=" . ($adminSent?"OK":"FAIL") . " | user=" . ($userSent?"OK":"FAIL"));

echo json_encode([
    "success"    => $adminSent || $userSent,
    "admin_sent" => $adminSent,
    "user_sent"  => $userSent,
    "message"    => ($adminSent && $userSent)
                    ? "Both emails sent."
                    : ((!$adminSent && !$userSent) ? "Both emails failed." : "Partial send.")
]);
