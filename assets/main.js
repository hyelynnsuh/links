// FILTERING BUTTONS
let channelBlocks = document.querySelector('#channel-blocks')
let showAllButton = document.querySelector('#show-all')
let showImageButton = document.querySelector('#show-images')
let showVideoButton = document.querySelector('#show-vids')
let showLinkButton = document.querySelector('#show-links')

showImageButton.onclick = () => {
	channelBlocks.classList.add('show-images')
}