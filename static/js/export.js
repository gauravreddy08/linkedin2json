(function () {
	if (typeof exportCV === "undefined") {
		window.exportCV = function () {

			var data = {
				"header": "Mr. Smith",
				"title": "",
				"location": "",
				"summary": "",
				"experience": [],
				"education": [],
				"publications": [],
				"languages": []
			};

			//  ------------ Header Section ------------

			let profiles = document.getElementById('profile-sticky-header-toggle');
			if (profiles != null && profiles.parentElement.nodeName == "SECTION") {
				let profiles_sections = profiles.parentElement;
				let header = profiles_sections.querySelectorAll(".t-24")[0];
				if (header)data.header = header.innerText;

				let title = profiles_sections.getElementsByClassName("text-body-medium")[0];
				if (title)data.title = title.innerText;

				let location = profiles_sections.getElementsByClassName("text-body-small inline")[0];
				if (location)data.location = location.innerText;
			}

			let abouts = document.getElementById('about');
			if (abouts != null && abouts.parentElement.nodeName == "SECTION") {
				let abouts_sections = abouts.parentElement;
				let about = abouts_sections.querySelectorAll('[aria-hidden="true"]');
				if (about.length > 1) {
					data.summary = about[1].innerText;
				}
			}

			//  ------------ Experience Section ------------

			let experiences = document.getElementById('experience');
			
			if (experiences != null && experiences.parentElement.nodeName == "SECTION") {
				const experiences_sections = experiences.parentElement;
				const experience_list = experiences_sections.getElementsByTagName("ul")[0];
				let items = [];
				if (experience_list) {
					items = experience_list.getElementsByTagName('li');
				}

				experience_index = 0

				while (experience_index < items.length) {

					const experience = items[experience_index].querySelectorAll('[aria-hidden="true"]');

					count = 0
					for (let i = 0; i < experience.length; i++) {
						if (experience[i].nodeName == "SPAN") {
							count++;
						}
						else {
							break;
						}
					}
					
					
					experience_index += items[experience_index].getElementsByTagName('li').length + 1;
							
					if (!experience) { continue; }

					console.log(count)
					
					if (count <= 5) { 
						data.experience.push({
							company: "",
							position: "",
							period: "",
							location: "",
							multiple_positions: false,
							achievements: ""
						});
						
						if (experience.length > 0 && experience[0].nodeName == "SPAN") {
							data.experience[data.experience.length - 1].position = experience[0].innerText;
						}

						if (experience.length > 1 && experience[1].nodeName == "SPAN") {
							data.experience[data.experience.length - 1].company = experience[1].innerText;
						}

						if (experience.length > 2 && experience[2].nodeName == "SPAN") {
							data.experience[data.experience.length - 1].period = experience[2].innerText;
						}

						if (experience.length > 3 && experience[3].nodeName == "SPAN") {
							data.experience[data.experience.length - 1].location = experience[3].innerText;
						}

						if (experience.length > 4 && experience[4].nodeName == "SPAN") {
							data.experience[data.experience.length - 1].achievements = experience[4].innerText;
						}

					}
					
					else {
						data.experience.push({
							company: "",
							total_years: "",
							multiple_positions: true,
							positions: []
						});					

						data.experience[data.experience.length - 1].company = experience[0].innerText;
						data.experience[data.experience.length - 1].total_years = experience[1].innerText;

						let index = 2;
						let temp = [];

						while (index < experience.length) {
							if (experience[index].nodeName == "SPAN") {
								temp.push(experience[index].innerText);
								index++;
							} else {
								data.experience[data.experience.length - 1].positions.push(temp);
								temp = [];
								index++; // Increment index even when not a SPAN element
							}
						}
					}
				}
			}

			//  ------------ Education Section ------------

			let educations = document.getElementById('education');
			
			if (educations != null && educations.parentElement.nodeName == "SECTION") {
				const educations_sections = educations.parentElement;
				const education_list = educations_sections.getElementsByTagName("ul")[0];
				let items = [];
				if (education_list) {
					items = education_list.getElementsByTagName('li');
				}

				education_index = 0 

				while (education_index < items.length) {

					const education = items[education_index].querySelectorAll('[aria-hidden="true"]');

					education_index += items[education_index].getElementsByTagName('li').length + 1;

					if (!education) { continue; }

					data.education.push({
						school: "",
						degree: "",
						years: "",
						description: ""
					});

					if (education.length > 0 && education[0].nodeName == "SPAN") {
						data.education[data.education.length - 1].school = education[0].innerText;
					}

					if (education.length > 1 && education[1].nodeName == "SPAN") {
						data.education[data.education.length - 1].degree = education[1].innerText;
					}

					if (education.length > 2 && education[2].nodeName == "SPAN") {
						data.education[data.education.length - 1].years = education[2].innerText;
					}

					if (education.length > 3) {
						data.education[data.education.length - 1].description = education[education.length - 1].innerText;
					}
				}
			}

			//  ------------ Publications Section ------------

			let publications = document.getElementById('publications');
			if (publications != null && publications.parentElement.nodeName == "SECTION") {
				const publications_sections = publications.parentElement;
				const publication_list = publications_sections.getElementsByTagName("ul")[0];
				let items = [];
				if (publication_list) {
					items = publication_list.getElementsByTagName('li');
				}
				
				for(let i = 0; i < items.length; i++) {
					const publication = items[i].querySelectorAll('[aria-hidden="true"]');
					if (!publication || publication.length < 2) { continue; }
					
					data.publications.push({
						title: "",
						publisher: "",
						date: "",
					});
					
					let publication_index = data.publications.length - 1;
					let span_index = 0;
					
					// Find title (usually the first meaningful span that's not too short)
					for (let j = 0; j < publication.length; j++) {
						if (publication[j].nodeName == "SPAN" && publication[j].innerText.trim() && 
							publication[j].innerText.length > 10 &&
							!publication[j].innerText.includes("·") &&
							!publication[j].innerText.includes("Other authors") &&
							!publication[j].innerText.includes("Show publication")) {
							data.publications[publication_index].title = publication[j].innerText.trim();
							span_index = j + 1;
							break;
						}
					}
					
					// Find publisher and date (usually contains "·" separator)
					for (let j = span_index; j < publication.length; j++) {
						if (publication[j].nodeName == "SPAN" && publication[j].innerText.trim() && 
							publication[j].innerText.includes("·")) {
							const parts = publication[j].innerText.split("·");
							if (parts.length >= 2) {
								data.publications[publication_index].publisher = parts[0].trim();
								data.publications[publication_index].date = parts[1].trim();
							} else {
								data.publications[publication_index].publisher = publication[j].innerText.trim();
							}
							span_index = j + 1;
							break;
						}
					}
				}
			}

			chrome.runtime.sendMessage({
				type: "export",
				info: data,
			});
		};
	}

	exportCV();
})();