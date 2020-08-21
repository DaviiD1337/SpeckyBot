const { Message } = require('discord.js');

module.exports = bot => {

    Message.prototype.extend = function(){

        // Return if already extended
        if(this._extended) return this;

        /** The Cloned Message Object. */
        const msg = Object.assign(Object.create(Object.getPrototypeOf(this)), this);

        // Args
        msg.Args = msg.content.split(/\s|\n/g);
        while(msg.Args[0] == bot.config.prefix && msg.Args.length > 0){
            const fix = msg.Args[0] + msg.Args[1];
            msg.Args[1] = fix;
            msg.Args = msg.Args.slice(1);
        }
        msg.Args = msg.Args.slice(1).clean();
        msg.args = msg.Args.toLowerCase();
        msg.ARGS = msg.Args.toUpperCase();


        // Links
        msg.links = (msg.content ? msg.content.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g) : []) || []


        // Flags
        const flags = msg.content.toLowerCase().match(/--([a-z]+)/g);
        msg._flags = [];
        if(flags){
            msg._flags = flags.map(f=>f.slice(2)); // removes the "--" on the beginning
        }
        msg.hasFlag = (input) => {
            return msg._flags.includes(input.toLowerCase());
        }
        msg.flag = msg.hasFlag;


        // Client
        msg.client = msg.client || bot;


        // Safety if extending twice
        msg._extended = true;

        // Returns the new Message object
        return msg;
    }

}