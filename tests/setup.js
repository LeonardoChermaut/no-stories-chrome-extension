const Utils = require("../src/utils/utils");
const Facebook = require("../src/modules/facebook/facebook");
const Instagram = require("../src/modules/instagram/instagram");

global.createElement = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html;
  return document.body.appendChild(template.content.firstChild);
};

global.chrome = {
  storage: {
    sync: {
      get: jest.fn((key, callback) => callback({})),
      set: jest.fn((data, callback) => {
        if (callback && typeof callback === "function") callback();
      }),
    },
    onChanged: {
      addListener: jest.fn(),
    },
  },
};

global.Facebook = Facebook;
global.Instagram = Instagram;
global.Utils = Utils;
