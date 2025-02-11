let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

// Okay, Are.na stuff!
let channelSlug = 'push-button-in-movies' // The “slug” is just the end of the URL


// SHARED METADATA FOR BOTH HTMLS
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelLink = document.querySelector('#channel-link')
	channelLink.href = 'https://www.are.na/channel/${channelSlug}'
}

// INDEX.HTML METADATA
if (window.location.pathname.includes('index.html')){
	let placeChannelInfo = (data) => {
		// Target some elements in your HTML:
		let channelTitle = document.querySelector('#title')
		let channelDescription = document.querySelector('#intro-p')
		
		channelTitle.innerHTML = data.title
		channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	}
} 

// MAIN.HTML METADATA
else if (window.location.pathname.includes('main.html')) {
	console.log('test2')
	let placeChannelInfo = (data) => {
		let channelCount = document.getElementById('#channel-count')
		
		channelCount.innerHTML = data.length
	}
}


// BLOCKS
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.querySelector('#channel-blocks')

	// LINKS
	if (block.class == 'Link') {
		console.log(block)
		let linkItem =
			`
			<div class="grid-item">
				<figure class="title-flex link-block">
					<img src="${ block.image.thumb.url }">
					<figcaption class="description fira">${ block.title }</figcaption>
				</figure>
			</div>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
	}

	// IMAGES
	else if (block.class == 'Image') {
		let imageItem =
			`
			<div class="grid-item">
				<figure class="title-flex image-block">
					<img src="${ block.image.thumb.url }">
					<figcaption class="description fira">${ block.title }</figcaption>
				</figure>
			</div>
			`
		channelBlocks.insertAdjacentHTML('beforeend', imageItem)
	}

	// TEXT
	else if (block.class == 'Text') {
		// …up to you!
	}

	// UPLOADED MEDIA
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type 

		// UPLOADED VIDS
		if (attachment.includes('video')) {
			let videoItem =
				`
				<div class="grid-item">
					<figure class="title-flex video-block">
						<img src="${ block.image.thumb.url }">
						<figcaption class="description fira">${ block.title }</figcaption>
					</figure>
				</div>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
		}

		// UPLOADED PDFS
		else if (attachment.includes('pdf')) {
			let pdfItem =
				`
				<div class="grid-item">
					<figure class="title-flex pdf-block">
						<img src="${ block.image.thumb.url }">
						<figcaption class="description fira">${ block.title }</figcaption>
					</figure>
				</div>
				`
			channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
		}

		// UPLOADED AUDIO
		else if (attachment.includes('audio')) {
			let audioItem =
				`
				<div class="grid-item">
					<figure class="title-flex audio-block">
						<img src="${ block.image.thumb.url }">
						<figcaption class="description fira">${ block.title }</figcaption>
					</figure>
				</div>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
		}
	}

	// LINKED MEDIA
	else if (block.class == 'Media') {
		let embed = block.embed.type

		// LINKED VIDS
		if (embed.includes('video')) {

			let linkedVideoItem =
				`
				<div class="grid-item">
					<figure class="title-flex linked-vid-block">
						<img src="${ block.image.thumb.url }">
						<figcaption class="description fira">${ block.title }</figcaption>
					</figure>
				</div>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// LINKED AUDIO
		else if (embed.includes('rich')) {
		let linkedAudioItem =
			`
			<div class="grid-item">
				<figure class="title-flex linked-audio-block">
					<img src="${ block.image.thumb.url }">
					<figcaption class="description fira">${ block.title }</figcaption>
				</figure>
			</div>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkedAudioItem)
		}
	}
}


// GO GET DATA!
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		placeChannelInfo(data)
		
		let myFunction = (block) => {
			if (block.class == 'Media') {
				console.log('media')
			}
		}

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})


		// GAMEBOY
		const images = document.querySelectorAll('#channel-blocks .grid-item img')

		if (images.length === 0) return

		let currentIndex = 0
		const gridColumns = 3

		// UPDATE SELECTED IMAGE
		function updateSelection() {
			images.forEach(img => img.classList.remove('selected'))
			if (images[currentIndex]){
				images[currentIndex].classList.add('selected')
			}
		}

		// BUTTONS
		const rightArrow = document.querySelector('.right-box')
		const leftArrow = document.querySelector('.left-box')
		const downArrow = document.querySelector('.down-box')
		const upArrow = document.querySelector('.up-box')
		
		// MOVE RIGHT
		rightArrow.addEventListener('click', () => {
			if(images.length === 0) return
			currentIndex = (currentIndex + 1) % images.length
			updateSelection()
		})

		// MOVE LEFT
		leftArrow.addEventListener('click', () => {
			if(images.length === 0) return
			currentIndex = (currentIndex - 1) % images.length
			updateSelection()
		})

		// MOVE DOWN
		downArrow.addEventListener('click', () => {
			if(images.length === 0) return
			let newIndex = currentIndex + gridColumns
			if (newIndex < images.length) {
				currentIndex = newIndex
				updateSelection()
			}
		})

		// MOVE UP
		upArrow.addEventListener('click', () => {
			if(images.length === 0) return
			let newIndex = currentIndex - gridColumns
			if (newIndex >= 0) {
				currentIndex = newIndex
				updateSelection()
			}
		})

		updateSelection()

		// KEYBOARD ARROWS
		document.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowRight'){
				currentIndex = (currentIndex + 1) % images.length
			}
			else if (event.key === 'ArrowLeft'){
				currentIndex = (currentIndex - 1) % images.length
			}
			else if (event.key === 'ArrowDown') {
				let newIndex = currentIndex + gridColumns
				if (newIndex < images.length) {
					currentIndex = newIndex
				}
			}
			else if (event.key === 'ArrowUp') {
				let newIndex = currentIndex - gridColumns
				if (newIndex >= 0) {
					currentIndex = newIndex
				}
			}
			updateSelection()
		})
		updateSelection()
	})


