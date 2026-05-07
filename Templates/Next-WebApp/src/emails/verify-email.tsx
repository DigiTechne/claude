import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from "react-email";

interface VerifyEmailProps {
  verificationUrl: string;
  userEmail: string;
}

export function VerifyEmail({ verificationUrl, userEmail }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb" }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", padding: "24px" }}>
          <Heading style={{ fontSize: "24px", color: "#111827" }}>Verify your email</Heading>
          <Text style={{ color: "#374151" }}>
            Hi {userEmail}, click the button below to verify your email address.
          </Text>
          <Section style={{ marginTop: "24px" }}>
            <Button
              href={verificationUrl}
              style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              Verify email
            </Button>
          </Section>
          <Text style={{ color: "#6b7280", fontSize: "14px", marginTop: "24px" }}>
            If you didn&apos;t create an account, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
