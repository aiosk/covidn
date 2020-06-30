const mqAtleast = (size) => {
  return Foundation.MediaQuery.atLeast(size);
};
const mqAtleastLarge = () => {
  return mqAtleast("xlarge");
};

const parseStyleToObject = (str) => {
  var styleObject = {};

  if (typeof str !== "string") {
    return styleObject;
  }

  str = str.trim().slice(1, -1); // browsers re-quote string style values

  if (!str) {
    return styleObject;
  }

  styleObject = str.split("&").reduce(function (ret, param) {
    var parts = param.replace(/\+/g, " ").split("=");
    var key = parts[0];
    var val = parts[1];
    key = decodeURIComponent(key);

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = typeof val === "undefined" ? null : decodeURIComponent(val);

    if (!ret.hasOwnProperty(key)) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
    return ret;
  }, {});

  return styleObject;
};

// const extractedStyles = getComputedStyle(
//   document.querySelector(".foundation-mq")
// );

// const namedQueries = parseStyleToObject(extractedStyles.fontFamily);
// const queries = [];

// for (var key in namedQueries) {
//   if (namedQueries.hasOwnProperty(key)) {
//     queries.push({
//       name: key,
//       value: `only screen and (min-width: ${namedQueries[key]})`,
//     });
//   }
// }
// console.log(queries);

export default { mqAtleast, mqAtleastLarge };
