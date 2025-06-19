require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// load commands
client.commands = new Collection();
for (const dir of fs.readdirSync('./commands')) {
  for (const file of fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith('.js'))) {
    const cmd = require(`./commands/${dir}/${file}`);
    client.commands.set(cmd.data.name, cmd);
  }
}

client.once('ready', () => {
  console.log(`Tacoma is online as ${client.user.tag}`);
});

client.on('interactionCreate', async i => {
  if (!i.isChatInputCommand()) return;
  const cmd = client.commands.get(i.commandName);
  if (!cmd) return;
  try { await cmd.execute(i); }
  catch (e) { console.error(e); await i.reply({ content: 'Error!', ephemeral: true }); }
});

client.login(process.env.TOKEN);
