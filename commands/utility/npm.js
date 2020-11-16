const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');
module.exports = {
  name: "npm",
  category: "🛠 | Utility",
  usage: "npm <qery>",
  description: "Get package information from NPM",
  run: async (bot, message, args) => {
    
  if (!args[0]) throw 'You must provide a package name to search for.';
  const res = await (await fetch(`https://registry.npmjs.org/${args[0]}`)).json();
  if (!res) {
      throw `Cannot find '${args[0]}' package.`;
  }
  const body = res.versions[res['dist-tags'].latest];
  const embed = new MessageEmbed()
      .setAuthor(`npm | ${body.name}`)
      .setDescription(body.description)
      .addField('Version', body.version, true)
      .addField('License', body.license, true)
      .addField('Repository', `[Click Here](${body.repository.url.slice(4)})`, true)
      .addField('Dependencies', body.dependencies ? Object.keys(body.dependencies).join(', ') : 'None', true)
      .addField('Keywords', body.keywords ? body.keywords.join(', ') : 'None')
      .addField('Maintainers', body.maintainers.map(maintainer => maintainer.name).join(', '))
      .setColor('RED');
  message.channel.send(embed);

  }
};
