"use strict";
require("dotenv").config();

const fs = require("fs");
const Discord = require("discord.js");
const { prefix } = require("./config.json");
const commandFolders = fs.readdirSync("./commands");

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Discord.Client();
const cooldowns = new Discord.Collection();

// Create a new command collection (similar to JavaScript Maps)
client.commands = new Discord.Collection();



for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    // Gets all files from the commands folder.
    const command = require(`./commands/${folder}/${file}`);

    // Set a new item in the collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
  }
}

/**
 * The message the BOT has access to respond to
 * @param {?string} message
 */
const handleMessage = (message) => {
  // Don't reply to bots or do anything without the command prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  /**
   * Array of strings containing the *optional* `args`
   *
   * **Does not** include the `prefix` or `command`
   * @constant
   * @type {string[]}
   */
  const args = message.content.slice(prefix.length).trim().split(/ +/);

  /**
   * The name of the command the user inputs after the BOT prefix
   * @constant
   * @type {string}
   */
  const commandName = args.shift().toLowerCase();

  // If there isn't a command with that name, exit early.

  if (!client.commands.has(commandName)) return;

  const command =
    client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (command.serverOnly && message.channel.type === "dm") {
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
};

// Connect to the Discord
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", handleMessage);

// Create an event listener for new guild members
client.on("guildMemberAdd", (member) => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find((channelToNotify) => channelToNotify.name === "general");
  console.log(member)
  console.log(channel)
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to ${member.guild.name}, ${member}`);
});

// login to Discord with your app's token
client.login(DISCORD_TOKEN);
