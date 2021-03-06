const { readdirSync, readFileSync } = require('fs');
const { Collection } = require('discord.js');
const { join } = require('path');

const alreadyLoaded = [];

module.exports = async (bot) => {
    bot.setMaxListeners(50);

    bot.stats = {};
    bot.stats.commandsExecuted = 0;
    bot.stats.slots = 0;

    bot.cache = {};
    bot.cache.messages = [];
    bot.cache.lastImage = {};
    bot.cache.console = {};
    bot.cache.console.debug = false;
    bot.cache.chatbot = {};
    bot.cache.cooldown = new Collection();
    bot.cache.runningcmds = [];
    bot.cache.globalchat = new Collection();
    bot.cache.math = {};

    bot.economy = {}

    bot.globalchats = new Collection();

    bot.userphone = []

    bot.debugN = 0;

    bot.settings = {};

    bot.config = JSON.parse(readFileSync(join(process.cwd(),'..','config.json')));

    const sF = [];
    for (const a in require.extensions) sF.push(a);
    bot.supportedFiles = new RegExp("("+sF.join('|')+")$");

    if(typeof bot.config.apikeys == "object"){
        Object.keys(bot.config.apikeys).forEach(prop => {
            bot.config[prop] = bot.config.apikeys[prop];
        })
    }

    const sequence =
    [
        "startup",
        "events"
    ];

    [
        ...sequence,
        ...readdirSync(join(__dirname,'botloader')).map(v => sequence && v.match(bot.supportedFiles).length > 0 && !sequence.includes(v.replace(bot.supportedFiles,'')) ? v.replace(bot.supportedFiles,'') : null).clean()
    ]
    .forEach(async x => {
        if(x == 'music'){
            if(alreadyLoaded.includes(x)){
                return;
            }else{
                alreadyLoaded.push(x)
            }
        }

        if(bot.log){
            bot.log(`\n\nLoading ${x.toUpperCase()}!\n`.info);
        }else{
            console.log(`\n\nLoading ${x.toUpperCase()}!\n`.info);
        }
        require(join(__dirname,'botloader',x))(bot);
    });
}
