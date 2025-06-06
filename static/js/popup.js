function downloadJSON(info) {
	// Create a nicely formatted JSON string
	const jsonData = JSON.stringify(info, null, 2);
	
	// Create a blob with the JSON data
	const blob = new Blob([jsonData], { type: 'application/json' });
	
	// Create a download link
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `${info.header.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
	
	// Trigger the download
	document.body.appendChild(a);
	a.click();
	
	// Clean up
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

const exportButton = document.getElementById("export");

// NEW: Regex moved to top for reuse
const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w\-\_]+\/?$/;

// Replace getActiveTab with getProfileTabs
// Retrieve all LinkedIn profile tabs in the current window
const getProfileTabs = () => new Promise(resolve => {
	chrome.tabs.query({ currentWindow: true }, tabs => {
		const profileTabs = tabs.filter(tab => linkedinRegex.test(tab.url));
		resolve(profileTabs);
	});
});

const executeScript = (tabId, file) => {
	chrome.scripting.executeScript({
		target: { tabId },
		files: [file],
	})
	.then(() => console.log(`Injected content script into tab ${tabId}.`))
	.catch(err => console.error(err));
};

const handleButtonClick = (button, file) => {
	if (button.disabled) return;
	getProfileTabs().then(tabs => {
		if (tabs.length === 0) return;
		tabs.forEach(tab => executeScript(tab.id, file));
	});
};

exportButton.addEventListener("click", () => handleButtonClick(exportButton, "/static/js/export.js"));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "export") {
		const hasStatus = document.getElementById("status");
		if (hasStatus) hasStatus.remove();
		const textElement = document.createElement("p");
		textElement.id = "status";
		textElement.textContent = `The LinkedIn profile JSON file has been downloaded.`;
		document.getElementById("export").insertAdjacentElement("afterend", textElement);
		downloadJSON(request.info);
	}
});

chrome.commands.onCommand.addListener(command => {
	if (command === "export_cv") handleButtonClick(exportButton, "/static/js/export.js");
});

// Enable/disable the button based on whether there is at least one LinkedIn profile tab in the current window.
getProfileTabs().then(tabs => {
	exportButton.disabled = tabs.length === 0;
});