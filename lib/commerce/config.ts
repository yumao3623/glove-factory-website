export type CommerceConfig = {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseServiceRoleKey?: string;
  paddleApiKey?: string;
  paddleWebhookSecret?: string;
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;
  paypalClientId?: string;
  paypalClientSecret?: string;
  paypalWebhookId?: string;
  resendApiKey?: string;
  appUrl: string;
  rfqRecipient: string;
  emailFrom: string;
};

export function getCommerceConfig(): CommerceConfig {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    paddleApiKey: process.env.PADDLE_API_KEY,
    paddleWebhookSecret: process.env.PADDLE_WEBHOOK_SECRET,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
    paypalWebhookId: process.env.PAYPAL_WEBHOOK_ID,
    resendApiKey: process.env.RESEND_API_KEY,
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3005",
    rfqRecipient: process.env.RFQ_RECIPIENT ?? "yumao3623@gmail.com",
    emailFrom: process.env.EMAIL_FROM ?? "JS Meilai <rfq@mail.jsmeilai.com>",
  };
}

export function missingConfig(...keys: Array<string | undefined>) {
  return keys.map((key, index) => key ? null : `required value #${index + 1}`).filter((key): key is string => Boolean(key));
}
