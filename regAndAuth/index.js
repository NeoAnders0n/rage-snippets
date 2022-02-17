let { x, y, z } = {
    x: -1467.9490966796875,
    y: -537.5188598632812,
    z: 50.73250961303711,
};

const {
    AUTH_AUTH,
    getIfAccountNameRegistered,
    AUTH_REGISTER,
} = require('./helper');

mp.events.add('playerJoin', (player) => {
    player.call('client::showRegistration', [player.socialClub]);
    player.dimension++;
    console.log(`[SERVER]: ${player.name} has joined the server!`);
});

mp.events.add(
    'server::acceptDataRegister',
    async (player, social, login, password) => {
        if (await getIfAccountNameRegistered(social))
            player.call('cef::msgSocialIsBusy');
        else {
            player.call('cef::msgRegSuccessful');
            if (await AUTH_REGISTER(social, login, password)) {
                player.call('cef::destroyRegistration');
                player.call('client::playerCustomCreateStart');
                player.position = new mp.Vector3(x, y, z); // TODO
            } else console.log('[LOG] Непредвиденная ошибка регистрации.');
        }
    }
);
// TODO
mp.events.add('server::playerAuth', async (player, login, password) => {
    if (await AUTH_AUTH(login, password)) {
        player.call('client::playerSpawnAfterRegistration');
        player.dimension = 0;
    } else player.call('cef::msgRegError');
});
// TODO
mp.events.add('server::playerSpawnAfterRegistration', (player) => {
    player.dimension = 0;
    /*    player.position = new mp.Vector3(
        -344.8243103027344,
        -2763.868408203125,
        5.782218933105469
    ); */
});
