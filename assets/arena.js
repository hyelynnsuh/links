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
		let channelCount = document.getElementById('channel-count')
		
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
			<li class="grid-item link-block">
				<button>
					<figure class="title-flex">
						<img src="${ block.image.thumb.url }">
						<figcaption class="description fira">${ block.title }</figcaption>
					</figure>
				</button>
				<dialog>
					<div>
						<p class="fira block-title">${ block.title }</p>
						<p class="fira">${ block.description_html }</p>
					</div>
					<img src="${ block.image.thumb.url }">
					<button class="close fira">exit</button>
				</dialog>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
	}

	// IMAGES
	else if (block.class == 'Image') {
		let imageItem =
			`
			<li class="grid-item image-block media-popup">
				<button>
					<figure class="title-flex">
						<img src="${ block.image.thumb.url }">
						<figcaption class="description fira">${ block.title }</figcaption>
					</figure>
				</button>
				<dialog>
					<div>
						<p class="fira block-title">${ block.title }</p>
						<p class="fira">${ block.description_html }</p>
					</div>
					<img src="${ block.image.thumb.url }">
					<button class="close fira">exit</button>
				</dialog>
			</li>
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
				<li class="grid-item video-block">
					<button>
						<figure class="title-flex">
							<img src="${ block.image.thumb.url }">
							<figcaption class="description fira">${ block.title }</figcaption>
						</figure>
					</button>
					<dialog>
						<div>
							<p class="fira block-title">${ block.title }</p>
							<p class="fira">${ block.description_html }</p>
						</div>
						<img src="${ block.image.thumb.url }">
						<button class="close fira">exit</button>
					</dialog>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
		}

		// UPLOADED PDFS
		else if (attachment.includes('pdf')) {
			let pdfItem =
				`
				<li class="grid-item pdf-block">
					<button>
						<figure class="title-flex">
							<img src="${ block.image.thumb.url }">
							<figcaption class="description fira">${ block.title }</figcaption>
						</figure>
					</button>
					<dialog>
						<div>
							<p class="fira block-title">${ block.title }</p>
							<p class="fira">${ block.description_html }</p>
						</div>
						<img src="${ block.image.thumb.url }">
						<button class="close fira">exit</button>
					</dialog>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
		}

		// UPLOADED AUDIO
		else if (attachment.includes('audio')) {
			let audioItem =
				`
				<li class="grid-item">
					<button>
						<figure class="title-flex audio-block">
							<img src="${ block.image.thumb.url }">
							<figcaption class="description fira">${ block.title }</figcaption>
						</figure>
					</button>
					<dialog>
						<div>
							<p class="fira block-title">${ block.title }</p>
							<p class="fira">${ block.description_html }</p>
						</div>
						<img src="${ block.image.thumb.url }">
						<button class="close fira">exit</button>
					</dialog>
				</li>
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
				<li class="grid-item">
					<button>
						<figure class="title-flex linked-vid-block">
							<img src="${ block.image.thumb.url }">
							<figcaption class="description fira">${ block.title }</figcaption>
						</figure>
					</button>
					<dialog>
						<div>
							<p class="fira block-title">${ block.title }</p>
							<p class="fira">${ block.description_html }</p>
						</div>
						<img src="${ block.image.thumb.url }">
						<button class="close fira">exit</button>
					</dialog>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// LINKED AUDIO
		else if (embed.includes('rich')) {
		let linkedAudioItem =
			`
			<li class="grid-item">
				<button>
					<figure class="title-flex linked-audio-block">
						<img src="${ block.image.thumb.url }">
						<figcaption class="description fira">${ block.title }</figcaption>
					</figure>
				</button>
				<dialog>
					<div>
						<p class="fira block-title">${ block.title }</p>
						<p class="fira">${ block.description_html }</p>
					</div>
					<img src="${ block.image.thumb.url }">
					<button class="close fira">exit</button>
				</dialog>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkedAudioItem)
		}
	}
}


// MODAL - from Eric's Loom
let initInteraction = () => {
	// instead of repeating the same function for each media type, i made the same modal for all media types with the class "grid-item"
	let mediaBlocks = document.querySelectorAll('.grid-item')
	mediaBlocks.forEach((block) => {
		let openButton = block.querySelector('button')
		let dialog = block.querySelector('dialog')
		let closeModal = dialog.querySelector('button') 

		openButton.onclick = () => {
			dialog.showModal()
		}

		closeModal.onclick = () => {
			dialog.close()
		}

		dialog.onclick = (event) => {
			if (event.target == dialog) {
				dialog.close()
			}
		}
		
	})
}


// CREDIT WORK
let renderUser = (user, container) => {
	let userAddress = 
	`
		<address>
			<h3 class="futura">Made By ${ user.first_name}</h3>
		</address>
	`
	container.insertAdjacentHTML('beforeend', userAddress)
	
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
				images[currentIndex].scrollIntoView({
					behavior: 'smooth',
					block: 'center',
					inline: 'center'
				})
			}
		}

		// BUTTONS - modified from https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
		// DEFINE EACH ARROW
		const rightArrow = document.querySelector('.right-box')
		const leftArrow = document.querySelector('.left-box')
		const downArrow = document.querySelector('.down-box')
		const upArrow = document.querySelector('.up-box')
		
		// MOVING THROUGH THE GRID - modified from https://stackoverflow.com/questions/67571080/javascript-how-to-display-current-image-index-and-total-amount-of-images
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

		// KEYBOARD ARROWS - modified from https://www.geeksforgeeks.org/javascript-detecting-the-pressed-arrow-key/
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

		// MEDIA POPUP
		initInteraction() 

	})


// A BUTTON POP UP 
let button = document.querySelector('#info-popup')
let modal = document.querySelector('#dialog')
let closeButton = document.querySelector('.close')

button.onclick = () => {
	modal.showModal()
}

closeButton.onclick = ()=> {
	modal.close()
}

modal.onclick = (event) => {
	if (event.target == modal) {
		modal.close()
	}
}


// TOGGLE BUTTON EXPANDED SCREEN
document.addEventListener('DOMContentLoaded', function () { 
	const screen = document.getElementById('screen')
	const buttonBox = document.querySelector('.arrow-group', '.ab-flex')
	const toneToggle = document.querySelector('.tone-toggle')
	
	if (toneToggle) {
		toneToggle.addEventListener('click', () => {
			document.body.classList.toggle('dark-mode')
			document.body.classList.toggle('expanded-mode')

			if(document.body.classList.contains('expanded-mode')) {
				buttonBox.style.display = 'none'
			} else {
				buttonBox.style.display = 'flex'
			}
		})
	}

	// ADDING TAB BUTTON PRESS KEY LISTENER!! 
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Tab') {
			event.preventDefault()
			document.body.classList.toggle('expanded-mode')

			if (document.body.classList.contains('expanded-mode')) {
				buttonBox.style.display = 'none'
			} else {
				buttonBox.style.display = 'flex'
			}
		}
	})
})


