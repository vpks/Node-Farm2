module.exports = (templatecard, el) => {
  let output = templatecard.replace(/{%PRODUCTNAME%}/g, el.productName);
  output = output.replace(/{%IMAGE%}/g, el.image);
  output = output.replace(/{%QUANTITY%}/g, el.quantity);
  output = output.replace(/{%PRICE%}/g, el.price);
  output = output.replace(/{%ID%}/g, el.id);
  output = output.replace(/{%PRODUCTDESC%}/g, el.description);

  if (el.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "");
  } else output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  output = output.replace(/{%NUTRIENTS%}/g, el.nutrients);
  output = output.replace(/{%FROM%}/g, el.from);

  return output;
};
