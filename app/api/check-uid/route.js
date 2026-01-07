import { NextResponse } from 'next/server';

export async function POST(request) {
    const { game, player_id } = await request.json();

    if (!game || !player_id) {
        return NextResponse.json({ status: 400, message: 'Missing game or player_id' }, { status: 400 });
    }

    const validGames = ['FREEFIRE', 'ROV'];
    if (!validGames.includes(game.toUpperCase())) {
        return NextResponse.json({ status: 400, message: 'Invalid game type' }, { status: 400 });
    }

    const apiToken = process.env.API_TOKEN;
    if (!apiToken) {
        return NextResponse.json({ status: 500, message: 'Server config error' }, { status: 500 });
    }

    try {
        const response = await fetch('https://api.icetaratip.com/v1/api/check_player_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`,
            },
            body: JSON.stringify({
                game: game.toUpperCase(),
                player_id: String(player_id),
            }),
        });

        const data = await response.json();

        if (response.ok && data.status === 200 && data.data) {
            return NextResponse.json({
                status: 200,
                message: 'Player found',
                account_id: data.data.account_id,
                role: data.data.role,
            });
        }

        return NextResponse.json({
            status: data.status || 400,
            message: data.message || data.error || 'ไม่พบข้อมูลผู้เล่น',
        }, { status: 400 });

    } catch (error) {
        return NextResponse.json({ status: 500, message: 'Internal server error' }, { status: 500 });
    }
}
