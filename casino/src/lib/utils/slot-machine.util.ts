import SlotToken from '$lib/enums/slot-token.enum';

const GetRandomSlotToken = (exclude: SlotToken[] = []): SlotToken => {
	const slotTokens = Object.values(SlotToken).filter(
		(val) => typeof val === 'number' && !exclude.includes(val)
	);

	const randomIndex = Math.floor(Math.random() * slotTokens.length);

	return slotTokens[randomIndex] as SlotToken;
};

const GetSlotTokenImage = (slot: SlotToken) => {
	switch (slot) {
		case SlotToken.CROCO:
			return '/slot/croco.png';
		case SlotToken.BELL:
			return '/slot/bell.png';
		case SlotToken.CHERRY:
			return '/slot/cherry.png';
		case SlotToken.DIAMOND:
			return '/slot/diamond.png';
		case SlotToken.HEARTH:
			return '/slot/hearth.png';
		case SlotToken.HORSESHOE:
			return '/slot/horseshoe.png';
		case SlotToken.LEMON:
			return '/slot/lemon.png';
		case SlotToken.SEVEN:
			return '/slot/seven.png';
		case SlotToken.WATERMELON:
			return '/slot/water-melon.png';
		default:
			return slot;
	}
};

const CalculateResult = (): SlotToken[] => {
	const rand = Math.random() * 100;

	if (rand < 0.1) return [SlotToken.SEVEN, SlotToken.SEVEN, SlotToken.SEVEN];
	if (rand < 0.25) return [SlotToken.DIAMOND, SlotToken.DIAMOND, SlotToken.DIAMOND];
	if (rand < 0.5) return [SlotToken.CHERRY, SlotToken.CHERRY, SlotToken.CHERRY];
	if (rand < 0.75) return [SlotToken.WATERMELON, SlotToken.WATERMELON, SlotToken.WATERMELON];
	if (rand < 1.4) return [SlotToken.LEMON, SlotToken.LEMON, SlotToken.LEMON];
	if (rand < 4) return [SlotToken.BELL, SlotToken.BELL, SlotToken.BELL];
	if (rand < 8) return [SlotToken.HORSESHOE, SlotToken.HORSESHOE, SlotToken.HORSESHOE];
	if (rand < 15) return [SlotToken.HEARTH, SlotToken.HEARTH, SlotToken.HEARTH];
	if (rand < 30) return [SlotToken.CROCO, SlotToken.CROCO, SlotToken.CROCO];

	const first = GetRandomSlotToken();
	return [first, GetRandomSlotToken([first]), GetRandomSlotToken([first])];
};

const GetWonAmount = (slots: SlotToken[]): number => {
	if (slots[0] === SlotToken.SEVEN) return 500;
	if (slots[0] === SlotToken.DIAMOND) return 250;
	if (slots[0] === SlotToken.CHERRY) return 125;
	if (slots[0] === SlotToken.WATERMELON) return 100;
	if (slots[0] === SlotToken.LEMON) return 70;
	if (slots[0] === SlotToken.BELL) return 40;
	if (slots[0] === SlotToken.HORSESHOE) return 30;
	if (slots[0] === SlotToken.HEARTH) return 15;
	if (slots[0] === SlotToken.CROCO) return 5;

	return 0;
};

export { GetRandomSlotToken, GetSlotTokenImage, CalculateResult, GetWonAmount };
