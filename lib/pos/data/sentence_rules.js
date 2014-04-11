var sentence_rules = (function() {


  //noun 'the' noun



  var main = {
    "VB": {
      "afters": {
        "value": "NN",
        "count": 14,
        "percent": "51.85"
      }
    },
    "VBD": {
      "afters": {
        "value": "NN",
        "count": 91,
        "percent": "34.73"
      },
      "befores": {
        "value": "NN",
        "count": 1428,
        "percent": "62.80"
      }
    },
    "VBN": {
      "afters": {
        "value": "NN",
        "count": 28,
        "percent": "35.90"
      },
      "befores": {
        "value": "VB",
        "count": 904,
        "percent": "56.57"
      }
    },
    "VBP": {
      "afters": {
        "value": "NN",
        "count": 41,
        "percent": "34.45"
      },
      "befores": {
        "value": "NN",
        "count": 545,
        "percent": "51.42"
      }
    },
    "VBZ": {
      "befores": {
        "value": "NN",
        "count": 868,
        "percent": "51.73"
      }
    },
    "MD": {
      "afters": {
        "value": "NN",
        "count": 14,
        "percent": "36.84"
      },
      "befores": {
        "value": "NN",
        "count": 369,
        "percent": "54.67"
      }
    },
    "RB": {
      "afters": {
        "value": "NN",
        "count": 48,
        "percent": "33.10"
      },
      "befores": {
        "value": "VB",
        "count": 761,
        "percent": "37.03"
      }
    },
    "JJ": {
      "afters": {
        "value": "NN",
        "count": 95,
        "percent": "32.65"
      }
    },
    "JJS": {
      "afters": {
        "value": "NN",
        "count": 6,
        "percent": "42.86"
      },
      "befores": {
        "value": "DT",
        "count": 61,
        "percent": "44.20"
      }
    },
    "RBR": {
      "befores": {
        "value": "VB",
        "count": 45,
        "percent": "42.06"
      }
    },
    "RBS": {
      "befores": {
        "value": "DT",
        "count": 16,
        "percent": "55.17"
      }
    },
    "NN": {
      "afters": {
        "value": "NN",
        "count": 203,
        "percent": "30.53"
      }
    },
    "NNP": {
      "afters": {
        "value": "NN",
        "count": 320,
        "percent": "36.78"
      },
      "befores": {
        "value": "NN",
        "count": 3399,
        "percent": "51.04"
      }
    },
    "NNPS": {
      "befores": {
        "value": "NN",
        "count": 114,
        "percent": "69.51"
      }
    },
    "NNS": {
      "afters": {
        "value": "NN",
        "count": 109,
        "percent": "36.21"
      }
    },
    "IN": {
      "afters": {
        "value": "NN",
        "count": 121,
        "percent": "34.18"
      },
      "befores": {
        "value": "NN",
        "count": 4118,
        "percent": "57.34"
      }
    },
    "CC": {
      "afters": {
        "value": "NN",
        "count": 24,
        "percent": "43.64"
      },
      "befores": {
        "value": "NN",
        "count": 1131,
        "percent": "72.64"
      }
    },
    "PRP": {
      "afters": {
        "value": "NN",
        "count": 48,
        "percent": "34.29"
      }
    },
    "DT": {
      "afters": {
        "value": "NN",
        "count": 174,
        "percent": "33.72"
      },
      "befores": {
        "value": "IN",
        "count": 2385,
        "percent": "42.82"
      }
    },
    "POS": {
      "afters": {
        "value": "NN",
        "count": 22,
        "percent": "36.07"
      },
      "befores": {
        "value": "NN",
        "count": 611,
        "percent": "99.35"
      }
    },
    "RP": {
      "befores": {
        "value": "VB",
        "count": 87,
        "percent": "88.78"
      }
    },
    "TO": {
      "afters": {
        "value": "NN",
        "count": 16,
        "percent": "37.21"
      }
    },
    "WDT": {
      "befores": {
        "value": "NN",
        "count": 266,
        "percent": "82.35"
      }
    },
    "WP": {
      "befores": {
        "value": "NN",
        "count": 128,
        "percent": "64.97"
      }
    },
    "WRB": {
      "afters": {
        "value": "NN",
        "count": 5,
        "percent": "38.46"
      },
      "befores": {
        "value": "NN",
        "count": 55,
        "percent": "41.98"
      }
    },


    //mine


  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }

  return main
})()