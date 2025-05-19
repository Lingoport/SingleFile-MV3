export class RestFormApi {
	constructor(token, restApiUrl, fileFieldName, urlFieldName) {
		this.controller = new AbortController(); // move here if needed
		this.token = token;
		this.restApiUrl = restApiUrl;
		this.fileFieldName = fileFieldName;
		this.urlFieldName = urlFieldName;
	}

	async upload(token, content, restApiUrl, fileFieldName) {
		const storage = chrome.storage?.sync || browser.storage?.sync;

		// Helper to load from storage as a Promise
		const getStorageData = (keys) =>
			new Promise((resolve) => storage.get(keys, resolve));

		const saved = await getStorageData([
			"saveToRestFormApiUrlInput",
			"saveToRestFormApiTokenInput",
			"saveToRestFormApiFileFieldNameInput"
		]);

		// Use passed-in params if provided, otherwise fallback to stored values
		const serverURL =  saved.saveToRestFormApiUrlInput || "";
		const email =  saved.saveToRestFormApiFileFieldNameInput || "";
		const serverToken =  saved.saveToRestFormApiTokenInput || "";

		console.log("Upload endpoint:", serverURL);
		console.log("Upload email:", email);
		console.log("Token:", serverToken);

		const blob = content instanceof Blob
			? content
			: new Blob([content], { type: "text/html" });

		const formData = new FormData();
		formData.append("theFile", blob, "InContext.html");
		formData.append("theToken", serverToken);
		formData.append("theEmail", email);

		for (let [key, val] of formData.entries()) {
			console.log("FormData entry:", key, val);
		}

		const uploadUrl = serverURL.endsWith("/")
			? serverURL + "document/upload"
			: serverURL + "/document/upload";

		console.log("Upload uploadUrl:", uploadUrl);

		const response = await fetch(uploadUrl, {
			method: "POST",
			body: formData,
			signal: this.controller?.signal
		});

		const text = await response.text();
		console.log("Server response:", text);

		if ([200, 201].includes(response.status)) {
			return text;
		} else {
			throw new Error(text);
		}
	}


	abort() {
		if (this.controller) {
			this.controller.abort();
		}
	}
}
