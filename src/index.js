module.exports = function check(str, bracketsConfig) {
  const openToClose = Object.create(null);
  const closeToOpen = Object.create(null);
  const mirror = Object.create(null);

  for (let i = 0; i < bracketsConfig.length; i += 1) {
    const open = bracketsConfig[i][0];
    const close = bracketsConfig[i][1];

    openToClose[open] = close;
    closeToOpen[close] = open;

    if (open === close) {
      mirror[open] = true;
    }
  }

  const stack = [];

  for (let i = 0; i < str.length; i += 1) {
    const ch = str[i];

    if (mirror[ch]) {
      if (stack.length > 0 && stack[stack.length - 1] === ch) {
        stack.pop();
      } else {
        stack.push(ch);
      }
    } else if (ch in openToClose) {
      stack.push(ch);
    } else if (ch in closeToOpen) {
      if (stack.length === 0 || stack.pop() !== closeToOpen[ch]) {
        return false;
      }
    } else {
      return false;
    }
  }

  return stack.length === 0;
};
