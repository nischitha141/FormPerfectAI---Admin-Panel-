import React from 'react';
import VerifyEmailClient from './VerifyEmailClient';


export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const { email } = await params;

  return <VerifyEmailClient email={email} />;
}