function getParentElements(node, stopElement) {
  const nodes = [];
  for (var pNode = node.parentNode; pNode; pNode = pNode.parentNode) {
    if (pNode === stopElement) break;
    nodes.push(pNode);
  }
  return nodes;
}

export default function htmlToTellraw(inputElement) {
  let json = [""];

  let text_nodes = document.createTreeWalker(
    inputElement,
    NodeFilter.SHOW_TEXT,
    null
  );
  while (text_nodes.nextNode()) {
    const node = text_nodes.currentNode;
    let current_json = { text: node.textContent };
    const parent_nodes = getParentElements(node, inputElement);

    parent_nodes.forEach((node) => {
      node.classList.forEach((class_name) => {
        switch (class_name) {
          case "bold":
            current_json.bold = true;
            break;
          case "italic":
            current_json.italic = true;
            break;
          case "underline":
            current_json.underlined = true;
            break;
          case "strike":
            current_json.strikethrough = true;
            break;
          case "obfuscated":
            current_json.obfuscated = true;
            break;
          default:
            current_json.color = class_name;
            break;
        }
      });
    });

    json.push(current_json);
  }
  return json;
}
