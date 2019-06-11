const removeSpans = data => {
  const regexSpan = /<span th:[^>]*>.*?<\/span>/g;
  const regexVariable = /\${[^$]*\}/;
  const matchedStrings = data.match(regexSpan);
  if (matchedStrings) {
    matchedStrings.forEach(matchedString => {
      const dynamicVariable = matchedString.match(regexVariable);
      data = data.replace(matchedString, dynamicVariable[0]);
    });
  }
  var data = "XYz ${acc} <span ${acc}>${acc}</span> ${acc}";
  let can = true,
    i = 0,
    ans = [];
  let str = data;
  while (i < data.length) {
    if (can && str[i] == "$" && str[i + 1] == "{") {
      let j = i;
      while (j < data.length && str[j] != "}") {
        j++;
      }
      ans.push({ start: i, end: j });
      i = j;
    } else if (str[i] == "<") {
      if (
        str[i + 1] == "s" &&
        str[i + 2] == "p" &&
        str[i + 3] == "a" &&
        str[i + 4] == "n"
      ) {
        can = false;
      } else if (
        str[i + 1] == "/" &&
        str[i + 2] == "s" &&
        str[i + 3] == "p" &&
        str[i + 4] == "a" &&
        str[i + 5] == "n"
      ) {
        can = true;
      }
    }
    i++;
  }
  ans.forEach(position => {
    const newData = `<span th:tag="remove" th:text="${data.substring(position["start"], position["end"]+1)}">${data.substring(position["start"], position["end"]+1)}</span>`;
    data =
      data.substring(0, position["start"]) +
      newData +
      data.substring(position["end"] + 1, data.length);
    const newAddition = newData.length - (position["end"] - position["start"]);
    ans.forEach(value=> {

      value["start"] = value["start"] + newAddition;
      value["end"] = value["end"] + newAddition;
    })
  });
  return data;
};

export default removeSpans;
