let getLernaPackages = require("./scripts/get-lerna-packages").sync;

let createType = (value, description) => ({
  value,
  name: `${value}:  ${description}`
});

let types = {
  feat: "Adds a new feature",
  fix: "A bug fix",
  chore: `Changes to the build process or auxiliary tools
    and libraries such as documentation generation`,
  revert: "Revert to a commit",
  wip: "Work in progress",
  // More specific
  docs: "Documentation only changes",
  perf: "A code change that improves performance",
  test: "Adding tests",
  style: `Changes that do not affect the meaning of the code
    (white-space, formatting, missing semi-colons, etc)`
};

module.exports = {
  types: Object.entries(types).map(type => createType(...type)),
  scopes: JSON.parse(getLernaPackages()),

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: "TICKET-",
  ticketNumberRegExp: "\\d{1,5}",

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [

      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: "\nDenote the SCOPE of this change :",
    // used if allowCustomScopes is true
    customScope: "Denote the SCOPE of this change:",
    subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
    body:
      'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: "List any BREAKING CHANGES (optional):\n",
    footer:
      "List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?"
  },

  allowCustomScopes: false,
  allowBreakingChanges: ["feat", "fix"],
  // skip any questions you want
  skipQuestions: ["body"],

  // limit subject length
  subjectLimit: 100
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
