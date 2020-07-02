// Add Sneak Attack dice to damage

// Prompt for number of sneak attack dice
let setDice = false;
let messageContent = ''
let dialogContent =
 `<form>
    <p>Actor: ${actor.name}</p>
    <p>Number of Sneak Attack Dice: <input type="number" id="sneakDice" style="width: 80px" value="0" /></p>
  </form>
      `;
new Dialog({
  title: "Sneak Attack (Set Dice)",
  content: dialogContent,
  buttons: {
    Set: {
      icon: "<i class='fas fa-check'></i>",
      label: "Set Sneak Attack Dice",
      callback: () => setDice = true
    },
    Remove: {
      icon: "<i class='fas fa-times'></i>",
      label: "Remove Sneak Attack Dice",
	  callback: () => setDice = false
    }
  },
  default: "Set",
  close: html => {
    if (setDice) {
		let sneakDice = Number(html.find("#sneakDice")[0].value);
		if (sneakDice === 0) {
			removeSneakDice();
		} else {
			setSneakDice(sneakDice);
		}
    } else {
		removeSneakDice();
	}
  }
}).render(true);

function setSneakDice(sneakDice) {
	actor.removeDamageDice('damage', 'Sneak Attack');
	actor.addDamageDice({
		selector: 'damage',
		name: 'Sneak Attack',
		diceNumber: sneakDice,
		dieSize: 'd6',
		category: 'precision',
		options: {
		  any: ['agile', 'finesse', 'ranged'],
		  all: ['flat-footed']
		}
	});
	messageContent = 'Set Sneak Attack dice to ' + sneakDice + 'd6.';
	chatMessage(messageContent);
}

function removeSneakDice() {
	actor.removeDamageDice('damage', 'Sneak Attack');
	messageContent = 'Removed all Sneak Attack dice.';
	chatMessage(messageContent);
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