chrome.omnibox.setDefaultSuggestion({
  description:
    "Type a project ID (prefixed with !), studio (prefixed with $), or username (prefixed with @)",
});
chrome.omnibox.onInputStarted.addListener(() => {
  console.log("User started omnibox!");
});

chrome.omnibox.onInputEntered.addListener(async (text, disposition) => {
  console.log("User accepted what was entered:\n", text);
  let url;
  if (text.startsWith("!")) {
    url = `https://scratch.mit.edu/projects/${text.replace("!", "")}`;
  } else if (text.startsWith("@")) {
    url = `https://scratch.mit.edu/users/${text.replace("@", "")}`;
  } else if (text.startsWith("$")) {
    url = `https://scratch.mit.edu/studios/${text.replace("$", "")}`;
  } else if (text == "") {
    url = `https://scratch.mit.edu/`;
  } else {
    url = `https://scratch.mit.edu/${text}`;
  }
  switch (disposition) {
    case "currentTab":
      chrome.tabs.update({ url });
      break;
    case "newForegroundTab":
      chrome.tabs.create({ url });
      break;
    case "newBackgroundTab":
      chrome.tabs.create({ url, active: false });
      break;
  }
});
