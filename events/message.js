const Discord = require("discord.js");
const cooldowns = new Discord.Collection();
const { prefix } = require("../config.json");

module.exports = {
  name: 'messageCreate',
  execute(message) {
    // Don't reply to bots or do anything without the command prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    /**
     * Array of strings containing the *optional* `args`
     *
     * **Does not** include the `prefix` or `command`
     * @type { string[] }
     */
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    /**
     * The name of the command the user inputs after the BOT prefix
     * @constant
     * @type {string}
     */
    const commandName = args.shift().toLowerCase();

    // If there isn't a command with that name, exit early.

    if (!message.client.commands.has(commandName)) return;

    const command =
      message.client.commands.get(commandName) || message.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (command.serverOnly && message.channel.type === "DM") {
      return message.reply("I can't execute that command inside a Direct Message!");
    }

    // If args is set to true in a command file, return
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }

      return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error trying to execute that command!");
    }
  },
};