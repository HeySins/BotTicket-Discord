const { Client, Events, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActivityType, ChannelType } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Config

token = ""

ch_id = "" // เอาได้ใน discord dev

client.once(Events.ClientReady, c => {

    const main_ticket = new EmbedBuilder()

	.setColor(0xffe194)

	.setTitle('**Meoaw Ticket**')

	.setDescription('_ _')

	.setThumbnail('https://cdn.discordapp.com/attachments/1090081082373840989/1098958590238281759/Untitled_design.png')

    .setImage('https://cdn.discordapp.com/attachments/1090081082373840989/1100582297356476467/standard.gif')

	.addFields(
		{ name: '> วิธีใช้งาน', value: '_ _\n`❓`: กดปุ่ม `ติอต่อ` ได้เลยค้าบ !'},
	)

	.setTimestamp()
	.setFooter({ text: '© 2023 MeoawJi Studio All rights reserved', iconURL: 'https://cdn.discordapp.com/attachments/1090081082373840989/1098958590238281759/Untitled_design.png'});

    const new_x = new ButtonBuilder()
        .setCustomId('new_cb')
        .setLabel('ติดต่อ')
        .setEmoji("📞")
        .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
		.addComponents(new_x);

    const panel = client.channels.cache.get(`${ch_id}`);

    panel.send({ embeds: [main_ticket], components: [row] })
	
	client.user.setActivity({
		
		name: "Dev by Meoaw",

		type: ActivityType.Streaming,

		url: "https://www.youtube.com/watch?v=LLZ16pIoDf8&t=6s"
		
     })
	
	console.log(`Welcome ${c.user.tag} to Meoaw Ticket ( Bot )`);
	
});

client.on(Events.InteractionCreate, async interactions => {

    if (interactions.isButton()) {

        if (interactions.customId.includes('new_cb')) {

            const modal = new ModalBuilder()
                .setCustomId('new_form')
                .setTitle('💼 ระบบติดต่อแอดมิน');
            
            const add_new = new TextInputBuilder()
                .setCustomId('story')

                .setLabel("📖 กรุณาใส่เรื่องที่ต้องการจะติดต่อ")

                .setRequired(true)

                .setPlaceholder("📕 ถ้าหากเปิดล่นจะโดนหมดเวลา !")

                .setStyle(TextInputStyle.Short);

            const NewActionRow = new ActionRowBuilder().addComponents(add_new);

            modal.addComponents(NewActionRow);

            await interactions.showModal(modal)

        }

    } else {

        if(interactions.isModalSubmit()) {

            if ( interactions.customId.includes('new_form')) {

                const text = interactions.fields.getTextInputValue('story');

                meoaw = client.channels.cache.get(`${ch_id}`);

                const thread = await meoaw.threads.create({
                    name: `${interactions.user.username}`,
                    type: ChannelType.PrivateThread,
                    reason: `${text}`,
                });
                
                console.log(`Created thread: ${thread.name}`);

                interactions.reply({ content: `ทำการสร้างตั๋วสำเร็จ !`, ephemeral: true})

                const thread_x = meoaw.threads.cache.find(x => x.name === `${interactions.user.username}`);

                await thread_x.members.add(`${interactions.user.id}`);

                await thread_x.members.add(`1032488860187373619`);

                const meoaw_x = new EmbedBuilder()

                    .setColor(0x7dffc9)

                    .setTitle('**Meoaw Private**')

                    .setDescription('_ _')

                    .setThumbnail('https://cdn.discordapp.com/attachments/1090081082373840989/1098958590238281759/Untitled_design.png')

                    .setImage('https://cdn.discordapp.com/attachments/1090081082373840989/1100582297356476467/standard.gif')

                    .addFields(
                        { name: '> ผู้ติดต่อ', value: `_ _\n🔖: <@${interactions.user.id}>\n_ _\n_ _`},
                        { name: '> ติดต่อเรื่อง', value: `_ _\n📭: ${text}\n_ _\n_ _`},
                    )

                    .setTimestamp()

                    .setFooter({ text: '© 2023 MeoawJi Studio All rights reserved', iconURL: 'https://cdn.discordapp.com/attachments/1090081082373840989/1098958590238281759/Untitled_design.png'});

                    const close = new ButtonBuilder()
                    .setCustomId('close_cb')
                    .setLabel('ปิดตั๋ว')
                    .setEmoji("🔒")
                    .setStyle(ButtonStyle.Danger);
            
                    const row = new ActionRowBuilder()
                        .addComponents(close);

                await thread_x.send({ embeds: [meoaw_x], components: [row] })

            }

        }
    }

})

client.on(Events.InteractionCreate, async interactions => {

    if (interactions.isButton()) {

        if (interactions.customId.includes('close_cb')) {

            if (interactions.user.id == "1032488860187373619") {
                await interactions.reply({
                    content: "> ตั๋วนี้ถูกปิดโดย <@"+interactions.user.id+">"
                })
                console.log(interactions.channel.id)
                meoaw = client.channels.cache.get(`${ch_id}`);

                const thread = meoaw.threads.cache.find(x => x.id === `${interactions.channel.id}`);
                await thread.setArchived(true);


               // await thread.delete();

            } else {

                interactions.reply({content: "คุณไม่สามารถปิดตั๋วได้ นอกจาก แอดมิน เท่านั้น !", ephemeral: true})
            }

        }

    }
})

client.login(`${token}`)