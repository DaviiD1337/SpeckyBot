module.exports = {
    name: "delet",
    description: "Deletes the last 3 messages!",
    category: "admin",
    aliases: ["..","."],
    perms: ['MANAGE_MESSAGES'],
    cmdperms: ['MANAGE_MESSAGES']
}

module.exports.run = async (bot, msg) => {
    await msg.channel.messages.fetch({ limit: 3 })
    .then(messages => {
        messages.forEach(async message => {
            message.delete();
        })
    })
}
