// src/background/index.ts
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);
  console.log("Sender:", sender);
  console.log("Send response:", sendResponse);
  // Handle messages
});
