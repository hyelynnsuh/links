// FILTERING BUTTONS
let channelBlocks = document.querySelector('#channel-blocks')
let showAllButton = document.querySelector('#show-all-button')
let showImageButton = document.querySelector('#show-image-button')
let showVideoButton = document.querySelector('#show-vids-button')
let showLinkButton = document.querySelector('#show-links-button')

showAllButton.onclick = () => {
	channelBlocks.classList.add('show-video', 'show-image', 'show-link')
}
showImageButton.onclick = () => {
	channelBlocks.classList.remove('show-video', 'show-image', 'show-link')
	channelBlocks.classList.add('show-image')
}
showVideoButton.onclick = () => {
	channelBlocks.classList.remove('show-video', 'show-image', 'show-link')
	channelBlocks.classList.add('show-video')
}
showLinkButton.onclick = () => {
	channelBlocks.classList.remove('show-video', 'show-image', 'show-link')
	channelBlocks.classList.add('show-link')
}

document.addEventListener('DOMContentLoaded', function () {
	const welcomeModal = document.getElementById('welcome-modal')
	const closeModal = document.getElementById('close-modal')
	const welcomeText = document.getElementById('welcome-text')

	const text = "how to play: scroll through and click on an item to see its description. press a for instructions and b to go to the are.na. for more fun, try clicking on the toggle at the top of the screen or use your tab key on your keyboard"
	let index = 0

	function typeWriter() {
		if (index < text.length) {
			welcomeText.textContent += text.charAt(index)
			index++
			setTimeout(typeWriter, 70)
		}
	}

	if (welcomeModal) {
		welcomeModal.showModal()
		typeWriter()
	}

	closeModal.addEventListener('click', () => {
		welcomeModal.close()
	})

	welcomeModal.addEventListener('click', (event) => {
		if (event.target === welcomeModal) {
			welcomeModal.close()
		}
	})
})
