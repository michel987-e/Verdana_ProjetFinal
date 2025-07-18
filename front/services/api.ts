export async function sendTokenToBackend(token: string) {
  try {
    const response = await fetch('http://<TON_BACKEND>:<PORT>/notification/register-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    console.log('Token envoyé au backend :', data);
  } catch (err) {
    console.error('Erreur envoi token backend :', err);
  }
}
