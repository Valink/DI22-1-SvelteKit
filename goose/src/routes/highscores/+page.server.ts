import * as db from '$lib/server/infrastructure/http/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const response = await db.fetchHighScores();
		return {
			body: {
				highScores: response.map((player: { Name: string; Points: number; Id: number }) => ({
					name: player.Name,
					point: player.Points
				}))
			}
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			body: {
				error: 'Internal Server Error'
			}
		};
	}
};