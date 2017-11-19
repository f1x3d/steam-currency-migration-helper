// TODO: OOP

var priceRegexp = /([0-9 ]+(,[0-9]{1,2})?)₴/gu; // TODO: add more currencies
var usdToUah = 26.6; // TODO: figure out how to get exchange rates from Steam

function appendUsdPrice(regexp, inputString)
{
	var regexpMatch = regexp.exec(inputString);

	while (regexpMatch !== null)
	{
		var oldPrice = regexpMatch[0];
		var priceString = regexpMatch[1];
		
		// TODO: use currency's thousands and decimal separators characters
		var priceFloat = parseFloat(priceString.replace(",", ".").replace(/ /g, ""));
		var usdPrice = priceFloat / usdToUah;
		var appendedString = oldPrice + " ($" + usdPrice.toFixed(2).toString() + ")";
		
		inputString = inputString.replace(oldPrice, appendedString);
		
		regexpMatch = regexp.exec(inputString);
	}
	
	return inputString;
}

// TODO: use XPath instead of for loop & if clause
// TODO: try to record all possible tags with prices?
var allTags = document.body.getElementsByTagName("*");
for (var i = 0, len = allTags.length; i < len; i++)
{
	var tag = allTags[i];
	var tagContent = tag.innerHTML;
	
	if (tag.children.length > 0 || !tagContent.includes("₴")) continue;
	
	tag.innerHTML = appendUsdPrice(priceRegexp, tagContent);
}
