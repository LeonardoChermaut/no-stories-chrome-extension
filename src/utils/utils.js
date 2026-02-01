const locations = {
  facebook: { hostname: "www.facebook.com" },
  instagram: { hostname: "www.instagram.com" },
};

const elements = {
  get facebook() {
    return getElement("facebook");
  },
  get instagram() {
    return getElement("instagram");
  },
};

const createElement = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html;
  return document.body.appendChild(template.content.firstChild);
};

const getElement = (id) => document.getElementById(id);

const removeHtmlBySelector = (selectors) => {
  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);

    if (elements.length > 0) {
      elements.forEach((el) => el.remove());
      return true;
    }
  }
  return false;
};

if (typeof window !== "undefined") {
  window.removeHtmlBySelector = removeHtmlBySelector;
  window.locations = locations;
  window.elements = elements;
  window.createElement = createElement;
  window.getElement = getElement;
}

if (typeof module !== "undefined") {
  module.exports = {
    locations,
    elements,
    createElement,
    getElement,
    removeHtmlBySelector,
  };
}
