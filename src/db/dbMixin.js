
export const dbMixin = (base, db) => {
  const added = {
    findAll: () => {
      return db.findAll();
    },
    findOne: (selector) => {
      return db.find(selector);
    },
    findOneByUrl: (url) => {
      return db.findOne(item => item.url === url);
    },
    find: (selector) => {
      return db.filter(selector);
    },
    findString: (expectedValue, fieldName) => {
      const searched = expectedValue.toLowerCase();
      return added.find(item => item[fieldName].toLowerCase().indexOf(searched) !== -1);
    },
    findByUrls: (urls) => {
      if (!urls) {
        return [];
      }
      return urls.map(url => added.findOneByUrl(url));
    }
  }
  return Object.assign({}, base, added);
};