exports.commands = {
  "ping": {
    "usage": "ping --> Returns current server ping",
    "response": "cr.ping(message, args, client)",
  },
  "kick":{
    "usage": "kick @user [reason] --> Kicks user",
    "permission": 2,
    "response": "cr.kick(message, args)",
  },
  "ban":{
    "usage": "ban @user [reason] --> Bans user",
    "permission": 4,
    "response": "cr.ban(message, args)",
  },
  "unban":{
    "usage": "unban user [reason] --> Removes user from ban list",
    "permission": 4,
    "response": "cr.unban(message, args)",
  },
  "timeBan":{
    "usage": "timeBan @user <time in seconds> [reason] --> Bans user for specified time then invites him back",
    "permission": 4,
    "response": "cr.timeBan(message, args)",
  },
  "mute":{
    "usage": "mute @user [reason] --> Mutes user",
    "permission": 268435472,
    "response": "cr.mute(message, args)",
  },
  "unmute":{
    "usage": "unmute @user [reason] -- Unmutes user",
    "permission": 268435472,
    "response": "cr.unmute(message, args)",
  },
  "timeMute":{
    "usage": "timeMute @user <time in seconds> [reason] --> Mutes user for specified time",
    "permission": 268435472,
    "response": "cr.timeMute(message, args)",
  },
  "clear":{
    "usage": "clear count --> Erases specified number of last messages",
    "permission": 8192,
    "response": "cr.clear(message, args)",
  },
}
