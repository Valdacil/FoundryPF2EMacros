// Toggle Sneak Attack on/off

let messageContent = ''
// Check Roll Options
if (actor.getRollOptions(['all', 'damage-roll']).includes('flat-footed')) {
    chatMessage('Sneak Attack OFF');
	actor.toggleRollOption('damage-roll', 'flat-footed');
} else {
    chatMessage('Sneak Attack ON');
	actor.toggleRollOption('damage-roll', 'flat-footed');
}

function chatMessage(messageContent) {
	// create the message
	if (messageContent !== '') {
		let chatData = {
			user: game.user._id,
			speaker: ChatMessage.getSpeaker(),
			content: messageContent,
		};
		ChatMessage.create(chatData, {});
	}
}