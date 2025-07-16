export function aiResponse(userMessage) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reversed = userMessage.split('').reverse().join('');
      resolve(`🤖 ${reversed}`);
    }, 1000);
  });
}