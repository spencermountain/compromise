module.exports = {
  Noun: {},
  // - singular
  Singular: {
    is: "Noun"
  },

  // -- people
  Person: {
    is: "Singular"
  },
  FirstName: {
    is: "Person"
  },
  MaleName: {
    is: "FirstName"
  },
  FemaleName: {
    is: "FirstName"
  },
  LastName: {
    is: "Person"
  },
  Honorific: {
    is: "Person"
  },
  Place: {
    is: "Singular"
  },

  // -- places
  Country: {
    is: "Place"
  },
  City: {
    is: "Place"
  },
  Region: {
    is: "Place"
  },
  Address: {
    is: "Place"
  },
  Organization: {
    is: "Singular"
  },
  SportsTeam: {
    is: "Organization"
  },
  Company: {
    is: "Organization"
  },
  School: {
    is: "Organization"
  },

  // - plural
  Plural: {
    is: "Noun"
  },
  Uncountable: {
    //(not plural or singular)
    is: "Noun"
  },
  Pronoun: {
    is: "Noun"
  },
  Actor: {
    is: "Noun"
  },
  Unit: {
    is: "Noun"
  },
  Demonym: {
    is: "Noun"
  },
  Possessive: {
    is: "Noun"
  }
};
