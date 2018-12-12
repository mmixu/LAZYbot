class Server {
    constructor(id) {
        this._id = "433936141989969931";
        this.prefix = {
            "generic": "!",
            "nadeko": "."
        },
        this.states = {
            "election": {
                "register": true,
                "candidates": false,
                "voting": false,
                "count": false,
                "results": false
            },
            "trivia": false
        },
        this.channels = {
            "announcements": "announcements",
            "bot": "bot",
            "bot2": "bot",
            "modmail": "modmail",
            "log": "log",
            "join": "join",
            "leave": "leave",
            "trivia": "trivia",
            "welcome": "welcome"
        },
        this.colors = {
            "generic": 53380,
            "error": 15406156,
            "ratings": 9359868
        },
        this.roles = {
            "admin": "admin",
            "mod": "mod",
            "bot": "bot",
            "muted": "muted",
            "arena": "arena",
            "beta": "",
            "livenotifications": "live"
        }
    }
}