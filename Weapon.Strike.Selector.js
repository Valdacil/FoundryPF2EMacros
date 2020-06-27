// Actions - Strike macro
// ---------------------------------------------------------

let myaction = ''

// error checking
let targets = canvas.tokens.controlled;
if (targets.length != 1) {
  ui.notifications.warn("You must select exactly 1 token.");
  return;
}

let strikeOptions = [];
for (let action of canvas.tokens.controlled[0].actor.data.data.actions) {
  strikeOptions.push({
    desc: `${action.name}`
  });
}

if (strikeOptions.length == 0) {
  ui.notifications.warn("No strikes found on this token!");
  return;
}

let dialogContent =
 `<form>
    <p>Actor: ${token.name}</p>
    <p>Strike: <select id="strikeSelect">`;
for (let i = 0 ; i < strikeOptions.length ; i++) {
	let option = strikeOptions[i];
	dialogContent += `<option value="${i}">${option.desc}</option>`;
}
dialogContent +=
     `</select></p>
    <p>Modifier: <input type="number" id="modRoll" style="width: 80px" value="0" /></p>
  </form>
      `;

// Build dialog box
let dialog = new Dialog({
	title: `${token.name} Strikes`,
	content: dialogContent,
	buttons: {
		wattack: {
			//icon: "<i class='fas fa-check'></i>",
			label: "Attack!",
			callback: () => myaction = "act1",
		},
		wattack2: {
			//icon: "<i class='fas fa-check'></i>",
			label: "MAP 1",
			callback: () => myaction = "act2",
		},
		wattack3: {
			//icon: "<i class='fas fa-check'></i>",
			label: "MAP 2+",
			callback: () => myaction = "act3",
		},
		wdmg: {
			//icon: "<i class='fas fa-check'></i>",
			label: "Damage",
			callback: () => myaction = "dmg",
		},
		cancel: {
			//icon: "<i class='fas fa-times'></i>",
			label: "Cancel",
			callback: () => myaction = "cancel",
		},
	},
	default: "cancel",
	// close: () => execute(myaction, strikeSelect)
	close: html => {
		let chosenOption = strikeOptions[html.find("#strikeSelect")[0].value];
		execute(myaction, chosenOption.desc);
    }
}, {
	width: 400
});

dialog.render(true);

// Execute rolls
function execute(myaction, weapon) {
	if (!(myaction === "cancel")) {
		let myweapon = (canvas.tokens.controlled[0].actor.data.data.actions ?? []).filter(action => action.type === 'strike').find(strike => strike.name === weapon);
		if (!myweapon) {
			ui.notifications.warn("You dont have that weapon.");
			return;
		}
		switch (myaction) {
			case "act1": myweapon.attack(event); break;
			case "act2": myweapon.variants[1].roll(event); break;
			case "act3": myweapon.variants[2].roll(event); break;
			case "dmg": myweapon.damage(event); break;
			default: return
		}
		dialog.render(true);
	}
}
