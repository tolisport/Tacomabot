const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
  async execute(i) { await i.reply('Pong 🏓'); }
};
