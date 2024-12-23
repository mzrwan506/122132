// استدعاء مكتبة discord.js
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// إنشاء الكائن client مع تحديد النوايا المطلوبة
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const PREFIX = '+';
const REQUIRED_ROLE_ID = '1298821210485821450';

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'come') {
        if (!message.member.roles.cache.has(REQUIRED_ROLE_ID)) {
            return message.reply('ليس لديك إذن لاستخدام هذا الأمر.');
        }

        const userToMention = message.mentions.users.first();
        if (!userToMention) {
            return message.reply('لا يمكنني العثور على هذا المستخدم. تأكد من ذكره بشكل صحيح.');
        }

        const userMessage = args.slice(1).join(' ');
        if (!userMessage) {
            return message.reply('قم بكتابة الرسالة التي تريد إرسالها بعد ذكر الشخص.');
        }

        const embedMessage = new EmbedBuilder()
            .setColor('#84040e')
            .setTitle('استدعاء')
            .setDescription(`تم استدعاؤك من قبل ${message.author.tag} في القناة ${message.channel}`)
            .setImage('https://cdn.discordapp.com/attachments/1298585757887238188/1299333363974406144/image.png')
            .setThumbnail('https://cdn.discordapp.com/attachments/1298585757887238188/1299333313185710090/2pic.png')
            .addFields({ name: 'رسالة:', value: userMessage });

        try {
            await userToMention.send({ embeds: [embedMessage] });
            message.channel.send(`تم استدعاء الشخص بنجاح <:rcheck:1257529596123938926>`);
        } catch (error) {
            console.error('Error sending DM:', error);
            message.reply('حدث خطأ أثناء محاولة إرسال الرسالة في الخاص.');
        }
    }
});

// تسجيل الدخول باستخدام Token
require('dotenv').config();
client.login(process.env.DISCORD_TOKEN);
