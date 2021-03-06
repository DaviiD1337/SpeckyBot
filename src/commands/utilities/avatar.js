module.exports = {
    name: "avatar",
    description: "Wanna see your profile picture?",
    usage: `[@user]`,
    category: "utilities",
    aliases: ["a","ava"]
}

module.exports.run = async (bot, msg) => {
    let user;

    if(msg.mentions.users.first()){

        user = msg.mentions.users.first();

    }else if(msg.Args[0]){

        await msg.guild.members.fetch(msg.Args[0])
        .then(member => {
            user = member.user
        })
    }

    if(typeof user == "undefined"){
        user = msg.author;
    }

    const embed = bot.embed()
    .setTitle(`${user.username}#${user.discriminator}`)
    .setImage(user.avatarURL())
    .setDescription(`[Link](${user.avatarURL()})`);

    msg.channel.send(embed);
}
