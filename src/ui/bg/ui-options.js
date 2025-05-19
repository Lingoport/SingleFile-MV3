document.addEventListener("DOMContentLoaded", () => {
  const storage = chrome.storage?.sync || browser.storage?.sync;

  const urlInput = document.getElementById("saveToRestFormApiUrlInput");
  const tokenInput = document.getElementById("saveToRestFormApiTokenInput");
  const emailInput = document.getElementById("saveToRestFormApiFileFieldNameInput");
  const saveButton = document.getElementById("saveButton");
  const status = document.getElementById("statusMessage");

  // Load saved options
  storage.get(["saveToRestFormApiUrlInput", "saveToRestFormApiTokenInput", "saveToRestFormApiFileFieldNameInput"], (items) => {
    urlInput.value = items.saveToRestFormApiUrlInput || "";
    tokenInput.value = items.saveToRestFormApiTokenInput || "";
    emailInput.value = items.saveToRestFormApiFileFieldNameInput || "";
  });

  // Enable save button on input change
  [urlInput, tokenInput, emailInput].forEach(input => {
    input.addEventListener("input", () => {
      saveButton.disabled = false;
      status.textContent = "";
      status.classList.remove("success", "error");
    });
  });

  saveButton.addEventListener("click", () => {
    const url = urlInput.value.trim();
    const token = tokenInput.value.trim();

    if (!url.startsWith("http")) {
      status.textContent = "Invalid URL format";
      status.classList.remove("success", "error");
      status.classList.add("status", "error");
      return;
    }

    let validateUrl = url.endsWith("/") ? url + "validateToken" : url + "/validateToken";
    const formData = new FormData();
    formData.append("type", "chrome");
    formData.append("token", token);

    const http = new XMLHttpRequest();
    http.open("POST", validateUrl, true);
    http.onreadystatechange = function () {
      if (http.readyState === 4) {
        status.classList.remove("success", "error");
        if (http.responseText.includes("Chrome token successfully validated")) {
          const data = {
            saveToRestFormApiUrlInput: url,
            saveToRestFormApiTokenInput: token,
            saveToRestFormApiFileFieldNameInput: emailInput.value.trim()
          };
          storage.set(data, () => {
            status.textContent = "Credentials saved successfully.";
            status.classList.add("status", "success");
            saveButton.disabled = true;
          });
        } else {
          status.textContent = "Token validation failed.";
          status.classList.add("status", "error");
        }
      }
    };
    http.send(formData);
  });
});
