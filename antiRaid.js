const raidThreshold = 10; // koliko članova prije aktiviranja
const raidInterval = 20 * 1000; // interval za detekciju (20 sekundi)
const unlockAfter = 5 * 60 * 1000; // automatski otključaj nakon 5 min (u milisekundama)

let recentJoins = [];
let raidTriggered = false;

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    const now = Date.now();
    recentJoins.push(now);

    // Očisti joinove starije od intervala
    recentJoins = recentJoins.filter(joinTime => now - joinTime < raidInterval);

    if (recentJoins.length >= raidThreshold && !raidTriggered) {
      raidTriggered = true;
      recentJoins = []; // reset da ne spamma

      // Zaključaj sve tekst kanale
      member.guild.channels.cache
        .filter(ch => ch.isTextBased() && ch.viewable)
        .forEach(async (channel) => {
          try {
            await channel.permissionOverwrites.edit(member.guild.roles.everyone, {
              SEND_MESSAGES: false,
            });
          } catch (err) {
            console.error(`Failed to lock ${channel.name}:`, err);
          }
        });

      // Pošalji poruku vlasniku servera
      try {
        const owner = await member.guild.fetchOwner();
        await owner.send(`🚨 **Antiraid triggered!** Too many joins detected on **${member.guild.name}**. All channels locked and will auto-unlock in ${unlockAfter / 60000} minutes.`);
      } catch (err) {
        console.error('Could not send DM to owner:', err);
      }

      // ⚔️ Automatski kick (ako želiš, otkomentiraj)
      /*
      member.guild.members.cache
        .filter(m => m.joinedTimestamp > now - raidInterval && !m.user.bot)
        .forEach(async (m) => {
          try {
            await m.kick('Antiraid: suspicious join during raid');
          } catch (err) {
            console.error(`Failed to kick ${m.user.tag}:`, err);
          }
        });
      */

      console.log('Antiraid triggered! Channels locked.');

      // Automatsko otključavanje nakon određenog vremena
      setTimeout(async () => {
        member.guild.channels.cache
          .filter(ch => ch.isTextBased() && ch.viewable)
          .forEach(async (channel) => {
            try {
              await channel.permissionOverwrites.edit(member.guild.roles.everyone, {
                SEND_MESSAGES: true,
              });
            } catch (err) {
              console.error(`Failed to unlock ${channel.name}:`, err);
            }
          });

        raidTriggered = false;

        // Pošalji obavijest vlasniku
        try {
          const owner = await member.guild.fetchOwner();
          await owner.send(`✅ **Antiraid deactivated!** Channels on **${member.guild.name}** have been unlocked.`);
        } catch (err) {
          console.error('Could not send DM to owner after unlock:', err);
        }

        console.log('Antiraid deactivated, channels unlocked.');
      }, unlockAfter);
    }
  });
};
