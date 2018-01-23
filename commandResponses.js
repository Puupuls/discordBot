exports.ping = async function(message, args, client){
  const m = await message.channel.send("Ping?");
  m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
}

exports.kick = async function(message, args){
  member = message.mentions.members.first();
  if(member == undefined){
    message.channel.send('You must specify target!')
    return
  }
  member.kick(args.slice(1).join(' ')).then(member => {
    message.channel.send('Successfully kicked ' + member)
  }).catch((error)=>{
    message.channel.send('Failed to kick ' + member)
    if(error == "DiscordAPIError: Privilege is too low..."){
      message.channel.send("You don't have high enaugh privileges!")
    }
  })

}

exports.ban = async function(message, args){
  member = message.mentions.members.first();

  if(member == undefined){
    message.channel.send('You must specify target!')
    return
  }
  member.ban(args.slice(1).join(' ')).then(member => {
    message.channel.send('Successfully banned ' + member)
  }).catch((error)=>{
    message.channel.send('Failed to ban ' + member)
    if(error == "DiscordAPIError: Privilege is too low..."){
      message.channel.send("You don't have high enough privileges!")
    }
  })
}

exports.unban = async function(message, args){
  var member
  message.client.users.forEach((user)=>{
    if(user.username.indexOf(args[0])){
      member = user;
    }
  })
  if(member == undefined){
    message.channel.send('You must specify target!')
    return
  }
  message.guild.unban(member).then(member => {
    message.channel.send('Successfully unbanned ' + member)
  }).catch((error)=>{
    message.channel.send('Failed to unban ' + member)
    if(error == "DiscordAPIError: Privilege is too low..."){
      message.channel.send("You don't have high enough privileges!")
    }
  })
}

exports.timeBan = async function(message, args){
  member = message.mentions.members.first();
  time = args[1];
  if(member == undefined){
    message.channel.send('You must specify target!')
    return
  }
  if(time == undefined){
    message.channel.send('You must specify ban time')
    return
  }
  member.ban(args.slice(2).join(' ')).then(member => {
    message.channel.send('Successfully banned ' + member + ' for ' + time + 's')
    setTimeout(()=>{
      message.guild.unban(member).then(member => {
        message.channel.send('Successfully unbanned ' + member)
      }).catch(()=>{
        message.channel.send('Failed to unban ' + member)
      })
      var invite = message.channel.createInvite({maxUses: 1}).then(invite => {
        member.send("Your ban time has ended, Huray!!! " + invite)
      }).catch(()=>{
        member.send("Your ban time has ended, Huray!!! Ask admin to send you an invite link.")
      })
    }, time*1000);
  }).catch((error)=>{
    message.channel.send('Failed to ban ' + member)
    if(error == "DiscordAPIError: Privilege is too low..."){
      message.channel.send("You don't have high enough privileges!")
    }
  })
}

exports.timeMute = async function(message, args){
  member = message.mentions.members.first();
  time = args[1];

  var muteRole = message.guild.roles.find("name", "Muted");
  if(!muteRole) {
    message.channel.send("No `Muted` role found, creating one")
    muteRole = await message.guild.createRole({color: "RED", name: "Muted"})
    muteRole.setPermissions(1115136)
  }

  if(member == undefined){
    message.channel.send('You must specify target')
    return
  }
  if(member.roles.has(muteRole.id)){
    message.channel.send(member + " is already muted!");
    return
  }
  if(time == undefined){
    message.channel.send('You must specify time!')
    return
  }
  member.addRole(muteRole.id).then(member => {
    message.channel.send('Successfully muted ' + member + ' for ' + time + 's')
    setTimeout(()=>{
      member.removeRole(muteRole.id).then(member => {
        message.channel.send('Successfully unmuted ' + member)
      }).catch(()=>{
        message.channel.send('Failed to unmute ' + member)
      })
    }, time*1000);
  }).catch((error)=>{
    message.channel.send('Failed to mute ' + member)
    if(error == "DiscordAPIError: Privilege is too low..."){
      message.channel.send("You don't have high enough privileges!")
    }
  })
}
exports.mute = async function(message, args){
  member = message.mentions.members.first();

  var muteRole = message.guild.roles.find("name", "Muted");
  if(!muteRole) {
    message.channel.send("No `Muted` role found, creating one")
    muteRole = await message.guild.createRole({color: "RED", name: "Muted"})
    muteRole.setPermissions(1115136)
  }


  if(member == undefined){
    message.channel.send('You must specify target')
    return
  }
  if(member.roles.has(muteRole.id)){
    message.channel.send(member + " is already muted!");
    return
  }
  member.addRole(muteRole.id).then(member => {
    message.channel.send('Successfully muted ' + member)
  }).catch((error)=>{
    message.channel.send('Failed to mute ' + member)
    if(error == "DiscordAPIError: Privilege is too low..."){
      message.channel.send("You don't have high enough privileges!")
    }
  })
}

exports.unmute = async function(message, args){
  member = message.mentions.members.first();
  var muteRole = message.guild.roles.find("name", "Muted");
  if(member == undefined){
    message.channel.send('You must specify target')
    return
  }
  if(!member.roles.has(muteRole.id)){
    message.channel.send(member + " is not muted!");
    return
  }
  member.removeRole(muteRole.id).then(member => {
    message.channel.send('Successfully unmuted ' + member)
  }).catch(error=>{
    message.channel.send('Failed to unmute ' + member)
    if(error == "DiscordAPIError: Privilege is too low..."){
      message.channel.send("You don't have high enough privileges!")
    }
  })
}

exports.clear = async function(message, args){
  member = message.mentions.members.first();
  if (message.channel.type != 'text') {
    message.channel.send("Incorrect channel type!")
    return;
  }
  message.delete();
  if (isNaN(args[0])) {
      message.channel.send('You entered wrong arguments');
      return;
  }
  message.delete().catch(error=>{})
  const fetched = await message.channel.fetchMessages({limit: args[0]}).catch(error => message.channel.send(`Error: ${error}`));
  await message.channel.bulkDelete(fetched).catch(error => message.channel.send(`Error: ${error}`));
  var nmess = await message.channel.send("Successfully cleared " + args[0] + " message" +((args[0]==1)? "" : "s") +  "!")
  setTimeout(()=>{
    nmess.delete()
  },3000)
}
