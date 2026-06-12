(function () {
	if (typeof exportCV === "undefined") {
		window.exportCV = function () {

			var data = {
				"linkedin_url": "",
				"all_p_elements": []
			};

			// Simple function to extract all p element texts without componentkey
			function extractAllPElements() {
				const pTexts = [];
				const pElements = document.querySelectorAll('p:not([componentkey])');
				
				pElements.forEach((p, index) => {
					const text = p.innerText?.trim();
					if (text && text.length > 0) {
						pTexts.push(text);
					}
				});
				
				return pTexts;
			}

			//  ------------ LinkedIn URL ------------
			
			data.linkedin_url = window.location.href;

			//  ------------ Extract All P Elements ------------
			
			data.all_p_elements = extractAllPElements();

			// Enhanced logging for debugging
			console.log("=== LinkedIn Profile Extraction Results ===");
			console.log("LinkedIn URL:", data.linkedin_url);
			console.log("All P Elements (", data.all_p_elements.length, "):", data.all_p_elements);
			console.log("Full data object:", data);

			chrome.runtime.sendMessage({
				type: "export",
				info: data,
			});
		};
	}

	exportCV();
})();