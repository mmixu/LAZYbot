const config = require("../config.json");
const DBuser = require("./dbuser.js");
const DataManager = require("./datamanager.js")

class Parse {

  constructor(message) { //everything extends to here
    this.message = message;
    this.message.content = this.message.content && typeof this.message.content === "string" ?
      this.message.content
        .replace("’", "'")
        .replace("…", "...")
        .replace("“", "\"")
        .replace("”", "\"")
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
      : "";
    this.client = this.message.client;
    this.author = this.message.author;
    this.bot = this.author ? this.author.bot && message.embeds && message.embeds[0] : false;
    this.guild = this.message.guild || this.client.guilds.get(config.houseid);
    this.channel = this.message.channel;
    this.server = this.guild ? DataManager.getServer(this.guild.id) : "";
    this.reactionmessages = this.guild ? DataManager.getServer(this.guild.id, "./src/data/reactionmessages.json") : "";
    this.member = this.guild ? this.message.member : "";
    this.user = this.member ? this.member.user : "";
    this.reboot = this.client.reboot;
    this.httpboolean = this.client.httpboolean;
  }

  get Output () {
    if (!this._Output) {
      let OutputConstructor = require("./output.js");
      this._Output = new OutputConstructor(this.message);
    };
    return this._Output;
  }

  get Paginator () {
    if (!this._Paginator) {
      let PaginatorConstructor = require("../modules/paginator");
      this._Paginator = new PaginatorConstructor(this.message);
    };
    return this._Paginator;
  }

  get Search () {
    if (!this._Search) {
      let SearchConstructor = require("./search.js");
      this._Search = new SearchConstructor(this.message);
    };
    return this._Search;
  }

  get Check () {
    if (!this._Check) {
      let CheckConstructor = require("./check.js");
      return new CheckConstructor(this.message);
    };
    return this._Check;
  }

  get dbuser () {
    if (!this.user) return "";
    if (!this._dbuser) this._dbuser = DBuser.getUser(this.user);
    return this._dbuser;
  }

  get dbindex () {
    if (!this._dbindex) this._dbindex = this.dbuser ? DBuser.byIndex(this.dbuser) : "";
    return this._dbindex;
  }

  get command () {
    if(this.bot) {
      if(this.message.embeds[0].author) return this.message.embeds[0].author.name;
    } else {
      let args = this.message.content.slice(this.prefix.length).match(/[^\s]+/gi);
      if(args) return args.shift().toLowerCase();
    };
    return "";
  }

  get prefix () {
    for(let prefix in this.server.prefixes) {
      if(this.message.content.startsWith(this.server.prefixes[prefix])) return this.server.prefixes[prefix];
    };
    return "";
  }

  get args () {
    let firstargs = this.message.content.slice(this.prefix.length).match(/[^\s]+/gi) || [];
    return !!this.prefix ? firstargs.slice(1) : firstargs;
  }

  get argument () {
    return this.args.join(" ");
  }

  static command (message) {
    let cmdInfo = new Parse(message);
    return cmdInfo;
  }
  
}

module.exports = Parse;