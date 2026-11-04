export const leadErrorMessage = (status: number, code?: string) => {
  if (code === "rate_limited" || status === 429) return "Too many inquiries are being sent. Please wait before trying again.";
  switch (status) {
    case 400: return "Please check your project details and required fields.";
    case 405: return "The form request could not be processed. Please reload the page.";
    case 413: return "Your inquiry is too large. Please shorten the project details.";
    case 500: return "An unexpected error prevented your inquiry from being processed.";
    case 502: return "Email delivery is temporarily unavailable.";
    case 503: return "The inquiry service is not configured. Please contact me by email.";
    default: return "The inquiry service could not complete your request.";
  }
};
