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
