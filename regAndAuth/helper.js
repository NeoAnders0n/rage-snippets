const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const md5 = require('md5');

async function getIfAccountNameRegistered(accountName) {
    if (!accountName) return false;
    let result = await prisma.accounts.findFirst({
        where: { accountName: accountName },
    });
    if (!result) return false;
    return result.length !== 0;
}

async function AUTH_REGISTER(social, accountName, password) {
    if (!social && !accountName && !password) return false;
    let result = await prisma.accounts.create({
        data: {
            accountName: accountName,
            password: md5(password),
            social: social,
            email: '',
            temp: '',
        },
    });
    console.log(result);
    if (!result) return false;
    return result.length !== 0;
}

async function AUTH_AUTH(accountName, password) {
    if (!accountName && !password) return false;
    let result = await prisma.accounts.findMany({
        where: {
            accountName: accountName,
            password: md5(password),
        },
    });
    if (!result) return false;
    return result.length !== 0;
}

async function getAllHouses() {
    return await prisma.dbhouses.findMany();
}

async function getHouseDataById(id) {
    if (!id) return false;
    return await prisma.dbhouses.findUnique({ where: { houseId: id } });
}

module.exports = {
    getIfAccountNameRegistered,
    AUTH_REGISTER,
    AUTH_AUTH,
    getAllHouses,
    getHouseDataById,
};
