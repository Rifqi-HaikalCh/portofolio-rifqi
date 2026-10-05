export async function submitContact(fields: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  });

  if (!response.ok) {
    throw new Error('Contact request failed');
  }
}
