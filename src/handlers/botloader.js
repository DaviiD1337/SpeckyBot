const { readdirSync } = require('fs');

let alreadyLoaded = [];

module.exports = async (bot) => {
    bot.setMaxListeners(50);
    
    bot.stats = {};
    bot.stats.commandsExecuted = 0;
    bot.stats.slots = 0;

    bot.cache = {};
    bot.cache.messages = [];
    bot.cache.lastImage = {};
    bot.cache.console = {};
    bot.cache.chatbot = {};
    bot.cache.console.debug = false;

    bot.debugN = 0;

    bot.settings = {};

    bot.config = {};
    bot.config = require('../../config.json');

    bot.supportedFiles = /.(js|coffee|coffeescript|litcoffee)$/g;

    if(typeof bot.config.apikeys == "object"){
        for (const [key, value] in bot.config.apikeys){
            bot.config[key] = value;
        }
        bot.config.apikeys = null;
    }

    const sequence =
    [
        "prototypes",
        "botfunctions"
    ];

    [
        ...sequence,
        ...readdirSync('./handlers/botloader/').map(v => sequence && v.match(bot.supportedFiles).length > 0 && !sequence.includes(v.replace(bot.supportedFiles,'')) ? v.replace(bot.supportedFiles,'') : null).clean()
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
        require(`./botloader/${x}`)(bot);
    });
}
