module.exports = {
  name: 'massrole',
  description: 'Add or remove a role to/from all members.',
  aliases: [],
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply('You do not have permission to manage roles.');

    const action = args[0];
    const role = message.mentions.roles.first();
    if (!action || !['add', 'remove'].includes(action)) return message.reply('Usage: .massrole <add/remove> @role');
    if (!role) return message.reply('Please mention a role.');

    const members = await message.guild.members.fetch();
    let success = 0;
    let fail = 0;

    for (const member of members.values()) {
      if (member.user.bot) continue; // preskoči botove

      try {
        if (action === 'add' && !member.roles.cache.has(role.id)) {
          await member.roles.add(role);
          success++;
        } else if (action === 'remove' && member.roles.cache.has(role.id)) {
          await member.roles.remove(role);
          success++;
        }
      } catch (err) {
        console.error(`Failed for ${member.user.tag}:`, err);
        fail++;
      }
    }

    message.channel.send(`✅ Massrole completed! Success: ${success}, Failures: ${fail}`);
  },
};
