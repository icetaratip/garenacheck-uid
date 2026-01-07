export default async function handler(req, res) {
    // Only POST allowed
    if (req.method !== 'POST') {
        return res.status(405).json({ status: 405, message: 'Method not allowed' });
    }

    const { game, player_id } = req.body;

    // Validate
    if (!game || !player_id) {
        return res.status(400).json({ status: 400, message: 'Missing game or player_id' });
    }

    const validGames = ['FREEFIRE', 'ROV'];
    if (!validGames.includes(game.toUpperCase())) {
        return res.status(400).json({ status: 400, message: 'Invalid game type' });
    }

    // Get token from env
    const apiToken = process.env.API_TOKEN;
    if (!apiToken) {
        return res.status(500).json({ status: 500, message: 'Server config error' });
    }

    try {
        // Call external API
        const response = await fetch('https://api.icetaratip.com/v1/api/check_player_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            },
            body: JSON.stringify({
                game: game.toUpperCase(),
                player_id: String(player_id)
            })
        });

        const data = await response.json();
        return res.status(response.ok ? 200 : response.status).json(data);

    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}
