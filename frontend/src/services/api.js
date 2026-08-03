
const API_URL = import.meta.env.VITE_API_URL || "https://backend-ruby-nine-62.vercel.app";

export async function sendMessage(data) {
  try {
    // 1. Dispatch email to saiganesh0565@gmail.com via Web3Forms public API
    const emailPayload = {
      access_key: "c7d4b05e-5811-4e5d-933c-75a4818f5807",
      name: data.name,
      email: data.email,
      message: data.message,
      subject: `🚀 Portfolio Message from ${data.name}`,
      from_name: "Sai Ganesh Portfolio",
    };

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailPayload),
    }).catch((err) => console.log("Email dispatch warning:", err));

    // 2. Save into database backend
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server responded with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
}

