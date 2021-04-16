(()=>{

	console.log("javascript is linked up");

	// make slider go first then video showing
	// make custom video controls
	// make video close as soon as it ends 
	// do not upload video folder

	const sigils = document.querySelector('#navList'), // traditionally select .sigilContainer but it takes several eventlisteners
			banner = document.querySelector('#houseImages'),
			lightBox = document.querySelector(".lightbox"),
			houseName = document.querySelector('h1'),
			houseDescription = document.querySelector('.house-info'),
			vid = lightBox.querySelector('video'),
			close = document.querySelector('.close'),
			progressFill = document.querySelector('#prograssFill'),
			playBtn = document.querySelector('#playBtn'),
			volumeBtn = document.querySelector('#volumeBtn'),
			volumeSlider = document.querySelector("#volumeSlider");

	const houseInfo = [
		['Stark',`House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.`], // houseInfo[0][0] -> gets the first index of array

		['Baratheon',`House Baratheon of Storm's End is a legally extinct Great House of Westeros. A cadet branch was formerly the royal house, but House Lannister now controls the throne. House Baratheon traditionally ruled the Stormlands on the eastern coast of Westeros, aptly named for its frequent storms, from their seat of Storm's End.

			House Baratheon became the royal house of the Seven Kingdoms after Robert Baratheon led a rebellion against the Targaryen dynasty. At the end of the rebellion, Robert ascended the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark.` ], // houseInfo[1][1]

		['Lannister',`House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and most powerful families and oldest dynasties. It is also the current royal house of the Seven Kingdoms following the extinction of House Baratheon of King's Landing, which had been their puppet house anyway.

			The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a massive rocky promontory overlooking the Sunset Sea which has had habitations and fortifications built into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of the West. As the new royal house, they also rule directly over the Crownlands from their seat of the Red Keep in King's Landing, the traditional seat of the royal family.` ], // houseInfo[2][2]

		['Tully',`House Tully of Riverrun is an exiled Great House of Westeros. Its most senior member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue background. Their house words are "Family, Duty, Honor."` ], // houseInfo[3][3]

		['Greyjoy',`House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.

			House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the faith of the Drowned God.` ], // houseInfo[4][4]

		['Arryn',`House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Lords Paramount of the Vale and Wardens of the East under the Targaryen kings and Baratheon-Lannister kings. The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with his stepfather Petyr Baelish acting as Lord Protector until he reaches the age of majority. `] // houseInfo[5][5]
	];

	// start of function

	function playVideo() {
		vid.play();
	}

	function stopVideo() {
		vid.pause(); 
		vid.currentTime = 0;
	}

	function pauseVideo() {
		vid.pause;
	}

	function setHouseData(name, desc) {
		houseName.textContent = `House ${name}`;
			houseDescription.textContent = desc;
	}

	function setVideoSource(house) {
		// set the video source, load it and play it
		let targetSource = `video/House-${house.charAt(0).toUpperCase() + house.slice(1)}.mp4`; // stark -> Stark

		vid.src = targetSource;
		vid.load();
		playVideo();
	}

	// ---slider function
	function animateBanner(event) {
		// in this function, currentTarget = sigils = navList, event.target = whatever user clicks on
		if (event.target.className.includes('sigilContainer')) { //to avoid using forEach
			let multiplier = event.target.dataset.offset,
				offsetWidth = 600; //the width of each image

		banner.style.right = `${multiplier * offsetWidth}px`; //let the banner to slide
		}
	}

	function changeContent(event) {
		if (event.target.className.includes('sigilContainer')) {
			// pass house data and change the text content on the page
			setHouseData(houseInfo[event.target.dataset.offset][0],
						houseInfo[event.target.dataset.offset][1]);
		}
	}

	// ---lightbox function
	function popLightBox(event) {
		// to make function work only when user's click is on sigils
		if (event.target.className.includes('sigilContainer')) {

			window.setTimeout(function() {
				// add a class to open the lightbox(video)
				lightBox.classList.add('show-lightbox');
			

				//class = "sigilContainer xxxx"
				//split by space -> ["sigilContainer", "xxx,xxx,xxx"]
				//[1] ->the second item (house name)
				let targetHouse = event.target.className.split(" ")[1];
			
				setVideoSource(targetHouse);
				playVideo();
			}, 1000);
		}
	}

	// video controls
	function closeVideo(event) {			
				stopVideo();
				lightBox.classList.remove('show-lightbox');
	}

	function togglePlay(event) {
		playBtn.classList.toggle('play');
		if(event.target.className.includes('play')) {
			vid.pause();
		}
		else
		{
			vid.play();
		}
	}

	function showVolumeSlider(event) {
		volumeSlider.classList.toggle('volumeShow');	
	}

	function changeVolume(event) {
		vid.volume = event.target.value;
		let x = 100*vid.volume;
		volumeSlider.style.background = `linear-gradient(90deg, rgba(162,206,245,1) ${x}%, rgba(255,255,255,1) ${x}%)`;
	}


	// start of event handler
	// traditional eventlistener forEach takes up system memory:
	// sigils.forEach(sigil => sigil.addEventListener('click', animateBanner));
	sigils.addEventListener('click', animateBanner);
	sigils.addEventListener('click', changeContent);
	sigils.addEventListener('click', popLightBox);
	close.addEventListener('click', closeVideo);
	playBtn.addEventListener('click', togglePlay);
	volumeBtn.addEventListener('click', showVolumeSlider);
	volumeSlider.addEventListener('mousemove', changeVolume);


})();
