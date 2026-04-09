document.addEventListener("DOMContentLoaded", (event) => {
  console.log("realtime script loaded");
  const pathParts = globalThis.location.pathname.split("/");
  const shortCode = pathParts[pathParts.length - 1];
  const eventSource = new EventSource("/realtime/" + shortCode);

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    document.getElementById("clickCount").innerText = data.clickCount;
  };

  eventSource.onerror = (error) => {
    console.error("EventSource failed:", error);
    eventSource.close();
  };
});