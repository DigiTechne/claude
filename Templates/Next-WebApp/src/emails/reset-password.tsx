import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from "react-email";

interface ResetPasswordProps {
  resetUrl: string;
  userEmail: string;
}

export function ResetPassword({ resetUrl, userEmail }: ResetPasswordProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb" }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", padding: "24px" }}>
          <Heading style={{ fontSize: "24px", color: "#111827" }}>Reset your password</Heading>
          <Text style={{ color: "#374151" }}>
            Hi {userEmail}, click the button below to reset your password. This link expires in 1
            hour.
          </Text>
          <Section style={{ marginTop: "24px" }}>
            <Button
              href={resetUrl}
              style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              Reset password
            </Button>
          </Section>
          <Text style={{ color: "#6b7280", fontSize: "14px", marginTop: "24px" }}>
            If you didn&apos;t request a password reset, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
