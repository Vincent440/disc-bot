"use strict";

// using .env to hide API keys and the Discord token
require("dotenv").config();

// Axios for simplfying API requests
const axios = require("axios");

// Using the file system to pull in the command files and dymanically create a command list
const fs = require("fs");

// Get the discord.js module
const Discord = require("discord.js");

// Grab the command prefix
const { prefix } = require("./config.json");

// Get the Discord API token from the `.env` file.
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

// Create a new Discord client
const client = new Discord.Client();

// Create a new command collection (similar to JavaScript Maps)
client.commands = new Discord.Collection();

// Get all `.js` files from the `commands/` directory 
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  // Gets all files from the commands folder.
  const command = require(`./commands/${file}`);

  // Set a new item in the collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

// Response for empty prefixed messages.
const botHelpMessage = `**Command not found**
*Please see the list of available commands*

**Example**
\`>help\` - *Help command lists all available commands*`;

// Command list of all available commands.
const helpCommandList = `**VinBot** *help* 
**Command List**

*Examples*
\`>server\` - Displays current server information
\`>user\` - Displays username and ID
\`>avatar\` - Displays your avatar

\`>joke\` - Tells a random joke
\`>dog\` - Shows a random Dog image
\`>cat\` - Shows a random Cat image
\`>fox\` - Shows a random Fox image`;


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
   * The command the user inputs after the BOT prefix
   * @constant
   * @type {string}
   */
  const command = args.shift().toLowerCase();

  switch (command) {
    case "args-info":
      client.commands.get("args-info").execute(message, args);
      break;
    case "ping":
      client.commands.get("ping").execute(message, args);
      break;
    case `help`:
      message.channel.send(helpCommandList);
      break;
    case `server`:
      client.commands.get("server").execute(message, args);
      break;
    case `user`:
      client.commands.get("user").execute(message, args);
      break;
    case `joke`:
      client.commands.get("joke").execute(message, args);
      break;
    case `avatar`:
      client.commands.get("avatar").execute(message, args);
      break;
    case `dog`:
      client.commands.get("dog").execute(message, args);
      break;
    case `cat`:
      client.commands.get("cat").execute(message, args);
      break;
    case `fox`:
      client.commands.get("fox").execute(message, args);
      break;
    case `bird`:
      client.commands.get("bird").execute(message, args);
      break;
    case `parakeet`:
      client.commands.get("parakeet").execute(message, args);
      break;
    default:
      message.channel.send(botHelpMessage);
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
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to ${member.guild.name}, ${member}`);
});

// login to Discord with your app's token
client.login(DISCORD_TOKEN);
