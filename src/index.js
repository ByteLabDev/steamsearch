const fetch = require(`node-fetch`);

module.exports = {

    /**
     * @function getSteamStore Finds and returns details about a Steam app.
     * @param {String} name Search
     * @param {"ae" | "ar" | "at" | "au" | "be" | "bg" | "br" | "ca" | "ch" | "cl" | "cn" | "co" | "cr" | "cy" | "cz" | "de" | "dk" | "ee" | "es" | "fi" | "fr" | "gb" | "gr" | "hk" | "hr" | "hu" | "id" | "ie" | "il" | "in" | "it" | "jp" | "kr" | "kw" | "kz" | "lt" | "lu" | "lv" | "nl" | "no" | "mt" | "mx" | "my" | "nz" | "pe" | "ph" | "pk" | "pl" | "pt" | "qa" | "ro" | "ru" | "sa" | "se" | "sg" | "si" | "sk" | "th" | "tr" | "tw" | "ua" | "uk" | "us" | "uy" | "vn" | "za"} country Country Code 
     * @returns {Promise.<GameDetails>} App Details
     */

    async steamSearch (name, country){
        return new Promise(function(res, rej){

            if(!name || typeof name != "string") rej(new Error(`Invalid search`));
            const store = fetch(`https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(name)}&l=english&cc=${country}`)
            .then(res=> res.json())
            .then(json=>{
                return json;
            }).catch(e=>{
                rej(e);
            })
        
            store.then((a) => {
                if(a[`items`].length === 0){
                    rej(new Error(`Not found`));
                    return;
                }
                const appInfo = fetch(`http://store.steampowered.com/api/appdetails?appids=${a[`items`][0][`id`]}&cc=${country}`)
                .then(res => res.json())
                .then(json=>{
                    var info = json[a[`items`][0][`id`]][`data`];
                    if(!info) rej(new Error(`Not found`));
                    res(info);
                }).catch(e=>{
                    rej(e);
                })
                
                
            });
        });
    },
}

class GameDetails{
    constructor(){
        this.type = ``;
        this.name = ``;
        this.steam_appid = 0;
        this.required_age = ``;
        this.is_free = false;
        this.controller_support = ``;
        this.dlc = [];
        this.detailed_description = ``;
        this.about_the_game = ``;
        this.short_description = ``;
        this.supported_languages = ``;
        this.header_image = ``;
        this.website = ``
        this.pc_requirements = {
            minimum: ``,
            recommended: ``
        },
        this.mac_requirements = [];
        this.linux_requirements = [];
        this.legal_notice = ``;
        this.developers = [];
        this.publishers = [];
        this.demos = [];
        this.price_overview = {
            currency: '',
            initial: 0,
            final: 0,
            discount_percent: 0,
            initial_formatted: '',
            final_formatted: ''
        },
        this.packages = [],
        this.package_groups = [
            {
                name: '',
                title: '',
                description: '',
                selection_text: '',
                save_text: '',
                display_type: 0,
                is_recurring_subscription: '',
                subs: []
            }
        ],
        this.platforms =  { windows: true, mac: false, linux: false },
        this.metacritic = {
            score: 0,
            url: ''
        },
        this.categories = [],
        this.genres = [],
        this.screenshots = [],
        this.recommendations = { total: 0 },
        this.achievements = {
            total: 0,
            highlighted: []
        },
        this.release_date = { coming_soon: false, date: '' },
        this.support_info = {
            url: '',
            email: ''
        },
        this.background = '',
        this.background_raw = '',
        this.content_descriptors = { ids: [], notes: null }
    }
}