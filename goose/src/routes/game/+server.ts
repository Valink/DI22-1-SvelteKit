import * as db from '$lib/server/infrastructure/http/db';

export async function POST({ request }: { request: Request }) {
	const form = await request.formData();
	const data = {
		name: form.get('name') as string,
		point: parseInt(form.get('point') as string)
	};

	const player: IPlayer = { id: 0, ...data };
	await db.postScore(player);
	return { success: true };
}