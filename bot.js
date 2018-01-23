const Discord = require("discord.js");
const client = new Discord.Client();
const comChar = "$"
const commands = require('./commands.js')
const cr = require('./commandResponses.js')
const auth = require("./auth.json")




client.on("ready", () => {
  console.log("I am ready!");
  client.user.setPresence({ game: { name: '$help', type: 0 } });
});
client.on("message", (message) => {
  if (message.content.substring(0, 1) != comChar)
    return
  if(message.author.bot)
    return

  var args = message.content.substring(1).split(' ');
  var cmd = args[0];
  args = args.splice(1);
  args = args.filter(e => e !== '');

  if(cmd == 'help'){
    var help = "";
    Object.keys(commands.commands).forEach(function(key){
      help += comChar + commands.commands[key].usage + "\n"
    })
    message.channel.send(help);
  }

  Object.keys(commands.commands).forEach(function(key){
    if(key == cmd){
      if(commands.commands[key].permission != undefined){
        if(!message.member.hasPermission(commands.commands[key].permission)){
          message.channel.send('Insufficient permissions!')
          return;
        }
      }
      try{
        eval(commands.commands[key].response)
      }catch(error){
        message.channel.send(error)
      }
    }
  })

});
client.login(auth.token)
