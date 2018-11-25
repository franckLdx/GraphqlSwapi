import { urlToId } from "../tools/functions";

function mapper(item) {
  const { url, ...data } = item;
  const obj = Object.assign({}, data, {
    id: urlToId(url),
  });
  return obj;
};