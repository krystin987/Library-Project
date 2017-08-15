module.exports = {
    "env": {
        "browser": true,
        "es6": true
        // "jquery": true
    },
    "plugins": [
        "html"
    ],
    "settings": {
        "html/indent": "0",   // code should start at the beginning of the line (no initial indentation).
        "html/indent": "tab", // indentation is one tab at the beginning of the line.
    },
    // "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
