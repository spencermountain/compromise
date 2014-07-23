//some regex borrowed from pksunkara/inflect
//https://github.com/pksunkara/inflect/blob/master/lib/defaults.js

inflect = (function() {
    var irregulars = [
        ['child', 'children'],
        ['person', 'people'],
        ['leaf', 'leaves'],
        ['database', 'databases'],
        ['quiz', 'quizzes'],
        ['child', 'children'],
        ['stomach', 'stomachs'],
        ['sex', 'sexes'],
        ['move', 'moves'],
        ['shoe', 'shoes'],
        ["goose", "geese"],
        ["phenomenon", "phenomena"],
        ['barracks', 'barracks'],
        ['deer', 'deer'],
        ['syllabus', 'syllabi'],
        ['index', 'indices'],
        ['appendix', 'appendices'],
        ['criterion', 'criteria'],
        ['i', 'we'],
        ['person', 'people'],
        ['man', 'men'],
        ['move', 'moves'],
        ['she', 'they'],
        ['he', 'they'],
        ['myself', 'ourselves'],
        ['yourself', 'yourselves'],
        ['himself', 'themselves'],
        ['herself', 'themselves'],
        ['themself', 'themselves'],
        ['mine', 'ours'],
        ['hers', 'theirs'],
        ['his', 'theirs'],
        ['its', 'theirs'],
        ['theirs', 'theirs'],
        ['sex', 'sexes'],
        ['photo', 'photos'],
        ['video', 'videos'],
        ['narrative', 'narratives'],
        ['rodeo', 'rodeos'],
        ['gas', 'gases'],
        ['epoch', 'epochs'],
        ['zero', 'zeros'],
        ['avocado', 'avocados'],
        ['halo', 'halos'],
        ['tornado', 'tornados'],
        ['tuxedo', 'tuxedos'],
        ['sombrero', 'sombreros'],
    ]

    var uncountables = {
        "aircraft": 1,
        "bass": 1,
        "bison": 1,
        "fowl": 1,
        "halibut": 1,
        "moose": 1,
        "salmon": 1,
        "spacecraft": 1,
        "tuna": 1,
        "trout": 1,
        "advice": 1,
        "help": 1,
        "information": 1,
        "knowledge": 1,
        "trouble": 1,
        "work": 1,
        "enjoyment": 1,
        "fun": 1,
        "recreation": 1,
        "relaxation": 1,
        "meat": 1,
        "rice": 1,
        "bread": 1,
        "cake": 1,
        "coffee": 1,
        "ice": 1,
        "water": 1,
        "oil": 1,
        "grass": 1,
        "hair": 1,
        "fruit": 1,
        "wildlife": 1,
        "equipment": 1,
        "machinery": 1,
        "furniture": 1,
        "mail": 1,
        "luggage": 1,
        "jewelry": 1,
        "clothing": 1,
        "money": 1,
        "mathematics": 1,
        "economics": 1,
        "physics": 1,
        "civics": 1,
        "ethics": 1,
        "mumps": 1,
        "measles": 1,
        "news": 1,
        "tennis": 1,
        "baggage": 1,
        "currency": 1,
        "travel": 1,
        "soap": 1,
        "toothpaste": 1,
        "food": 1,
        "sugar": 1,
        "butter": 1,
        "flour": 1,
        "progress": 1,
        "research": 1,
        "leather": 1,
        "wool": 1,
        "wood": 1,
        "coal": 1,
        "weather": 1,
        "homework": 1,
        "cotton": 1,
        "silk": 1,
        "patience": 1,
        "impatience": 1,
        "talent": 1,
        "energy": 1,
        "experience": 1,
        "vinegar": 1,
        "polish": 1,
        "air": 1,
        "alcohol": 1,
        "anger": 1,
        "art": 1,
        "beef": 1,
        "blood": 1,
        "cash": 1,
        "chaos": 1,
        "cheese": 1,
        "chewing": 1,
        "conduct": 1,
        "confusion": 1,
        "courage": 1,
        "damage": 1,
        "education": 1,
        "electricity": 1,
        "entertainment": 1,
        "fiction": 1,
        "forgiveness": 1,
        "gold": 1,
        "gossip": 1,
        "ground": 1,
        "happiness": 1,
        "history": 1,
        "honey": 1,
        "hope": 1,
        "hospitality": 1,
        "importance": 1,
        "jam": 1,
        "justice": 1,
        "laughter": 1,
        "leisure": 1,
        "lightning": 1,
        "literature": 1,
        "love": 1,
        "luck": 1,
        "melancholy": 1,
        "milk": 1,
        "mist": 1,
        "music": 1,
        "noise": 1,
        "oxygen": 1,
        "paper": 1,
        "pay": 1,
        "peace": 1,
        "peanut": 1,
        "pepper": 1,
        "petrol": 1,
        "plastic": 1,
        "pork": 1,
        "power": 1,
        "pressure": 1,
        "rain": 1,
        "recognition": 1,
        "sadness": 1,
        "safety": 1,
        "salt": 1,
        "sand": 1,
        "scenery": 1,
        "shopping": 1,
        "silver": 1,
        "snow": 1,
        "softness": 1,
        "space": 1,
        "speed": 1,
        "steam": 1,
        "sunshine": 1,
        "tea": 1,
        "thunder": 1,
        "time": 1,
        "traffic": 1,
        "trousers": 1,
        "violence": 1,
        "warmth": 1,
        "washing": 1,
        "wind": 1,
        "wine": 1,
        "steel": 1,
        "soccer": 1,
        "hockey": 1,
        "golf": 1,
        "fish": 1,
        "gum": 1,
        "liquid": 1,
        "series": 1,
        "sheep": 1,
        "species": 1,
        "fahrenheit": 1,
        "celcius": 1,
        "kelvin": 1,
        "hertz": 1,
    }

    var pluralize_rules = [{
        reg: /(ax|test)is$/i,
        repl: '$1es'
    }, {
        reg: /(octop|vir|radi|nucle|fung|cact|stimul)us$/i,
        repl: '$1i'
    }, {
        reg: /(octop|vir)i$/i,
        repl: '$1i'
    }, {
        reg: /([rl])f$/i,
        repl: '$1ves'
    }, {
        reg: /(alias|status)$/i,
        repl: '$1es'
    }, {
        reg: /(bu)s$/i,
        repl: '$1ses'
    }, {
        reg: /(al|ad|at|er|et|ed|ad)o$/i,
        repl: '$1oes'
    }, {
        reg: /([ti])um$/i,
        repl: '$1a'
    }, {
        reg: /([ti])a$/i,
        repl: '$1a'
    }, {
        reg: /sis$/i,
        repl: 'ses'
    }, {
        reg: /(?:([^f])fe|([lr])f)$/i,
        repl: '$1ves'
    }, {
        reg: /(hive)$/i,
        repl: '$1s'
    }, {
        reg: /([^aeiouy]|qu)y$/i,
        repl: '$1ies'
    }, {
        reg: /(x|ch|ss|sh|s|z)$/i,
        repl: '$1es'
    }, {
        reg: /(matr|vert|ind|cort)(ix|ex)$/i,
        repl: '$1ices'
    }, {
        reg: /([m|l])ouse$/i,
        repl: '$1ice'
    }, {
        reg: /([m|l])ice$/i,
        repl: '$1ice'
    }, {
        reg: /^(ox)$/i,
        repl: '$1en'
    }, {
        reg: /^(oxen)$/i,
        repl: '$1'
    }, {
        reg: /(quiz)$/i,
        repl: '$1zes'
    }, {
        reg: /(antenn|formul|nebul|vertebr|vit)a$/i,
        repl: '$1ae'
    }, {
        reg: /(sis)$/i,
        repl: 'ses'
    }, {
        reg: /^(?!talis|.*hu)(.*)man$/i,
        repl: '$1men'
    }, {
        reg: /(.*)/i,
        repl: '$1s'
    }]


    var pluralize = function(str) {
        var low = str.toLowerCase()
        //uncountable
        if (uncountables[low]) {
            return str
        }
        //irregular
        var found = irregulars.filter(function(r) {
            return r[0] == low
        })
        if (found[0]) {
            if (low == str) {
                return found[0][1]
            } else {
                return found[0][1].charAt(0).toUpperCase() + string.slice(1)
            }
        }
        //inflect first word of preposition-phrase
        if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
            var first = str.match(/^([a-z]*) (of|in|by|for) [a-z]/)[1]
            if (first) {
                var better_first = pluralize(first)
                return better_first + str.replace(first, '')
            }
        }
        //regular
        for (var i in pluralize_rules) {
            if (str.match(pluralize_rules[i].reg)) {
                return str.replace(pluralize_rules[i].reg, pluralize_rules[i].repl)
            }
        }
    }



    var singularize_rules = [{
        reg: /([^v])ies$/i,
        repl: '$1y'
    }, {
        reg: /ises$/i,
        repl: 'isis'
    }, {
        reg: /ives$/i,
        repl: 'ife'
    }, {
        reg: /(antenn|formul|nebul|vertebr|vit)ae$/i,
        repl: '$1a'
    }, {
        reg: /(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i,
        repl: '$1us'
    }, {
        reg: /(buffal|tomat|tornad)(oes)$/i,
        repl: '$1o'
    }, {
        reg: /((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i,
        repl: '$1sis'
    }, {
        reg: /(vert|ind|cort)(ices)$/i,
        repl: '$1ex'
    }, {
        reg: /(matr|append)(ices)$/i,
        repl: '$1ix'
    }, {
        reg: /(x|ch|ss|sh|s|z|o)es$/i,
        repl: '$1'
    }, {
        reg: /men$/i,
        repl: 'man'
    }, {
        reg: /(n)ews$/i,
        repl: '$1ews'
    }, {
        reg: /([ti])a$/i,
        repl: '$1um'
    }, {
        reg: /([^f])ves$/i,
        repl: '$1fe'
    }, {
        reg: /([lr])ves$/i,
        repl: '$1f'
    }, {
        reg: /([^aeiouy]|qu)ies$/i,
        repl: '$1y'
    }, {
        reg: /(s)eries$/i,
        repl: '$1eries'
    }, {
        reg: /(m)ovies$/i,
        repl: '$1ovie'
    }, {
        reg: /([m|l])ice$/i,
        repl: '$1ouse'
    }, {
        reg: /(cris|ax|test)es$/i,
        repl: '$1is'
    }, {
        reg: /(alias|status)es$/i,
        repl: '$1'
    },{
        reg: /(ss)$/i,
        repl: '$1'
    }, {
        reg: /s$/i,
        repl: ''
    }]


    var singularize = function(str) {
        var low = str.toLowerCase()
        //uncountable
        if (uncountables[low]) {
            return str
        }
        //irregular
        var found = irregulars.filter(function(r) {
            return r[1] == low
        })
        if (found[0]) {
            if (low == str) {
                return found[0][0]
            } else {
                return found[0][0].charAt(0).toUpperCase() + string.slice(1)
            }
        }
        //inflect first word of preposition-phrase
        if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
            var first = str.match(/^([a-z]*) (of|in|by|for) [a-z]/)[1]
            if (first) {
                var better_first = singularize(first)
                return better_first + str.replace(first, '')
            }
        }
        //regular
        for (var i in singularize_rules) {
            if (str.match(singularize_rules[i].reg)) {
                return str.replace(singularize_rules[i].reg, singularize_rules[i].repl)
            }
        }
        return str
    }


    var is_plural = function(str) {
        for (var i = 0; i < irregulars.length; i++) {
            if (irregulars[i][1] == str) {
                return true
            }
            if (irregulars[i][0] == str) {
                return false
            }
        }
        if (str.match(/s$/) && singularize(str)!=str) {
            return true
        }
        return false
    }

    var inflect = function(str) {
        if (is_plural(str)) {
            return {
                plural: str,
                singular: singularize(str),
            }
        } else {
            return {
                singular: str,
                plural: pluralize(str)
            }
        }
    }

    var methods = {
        inflect: inflect,
        is_plural: is_plural,
        singularize: singularize,
        pluralize: pluralize
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = methods;
    }
    return methods;
})();

// console.log(inflect.pluralize('kiss'))
// console.log(inflect.pluralize('twin'))
// console.log(inflect.pluralize('phantom of the opera'))
// console.log(inflect.pluralize('mayor of chicago'))
// console.log(inflect.pluralize('boy in the mall'))
// console.log(inflect.pluralize('maple leaf'))
// console.log(inflect.singularize('leaves'))
// console.log(inflect.singularize('mayors of toronto'))
// console.log(inflect.inflect('women'))


/*

bus
kiss
        console.log(nlp.noun('crisis').pluralize() == 'crises')
        console.log(nlp.noun('analysis').pluralize() == 'analyses')
        console.log(nlp.noun('neurosis').pluralize() == 'neuroses')
*/