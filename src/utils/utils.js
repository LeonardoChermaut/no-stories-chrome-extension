const Utils = {
  locations: {
    facebook: { hostname: "www.facebook.com" },
    instagram: { hostname: "www.instagram.com" },
  },

  elements: {
    get facebook() {
      return Utils.getElement("facebook");
    },
    get instagram() {
      return Utils.getElement("instagram");
    },
  },

  reloadPage: () => window.location.reload(),

  createElement: (html) => {
    const template = document.createElement("template");
    template.innerHTML = html;
    return document.body.appendChild(template.content.firstChild);
  },

  getElement: (id) => document.getElementById(id),

  removeHtmlBySelector: (selectors) => {
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);

      if (elements.length > 0) {
        elements.forEach((el) => el.remove());
        return true;
      }
    }
    return false;
  },
};

if (typeof module !== "undefined") module.exports = Utils;
if (typeof window !== "undefined") window.Utils = Utils;
