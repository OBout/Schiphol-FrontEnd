export function nodeToString(node) {
    // function for jest to compare proper html output
    
    let tmpNode = document.createElement("div");
    tmpNode.appendChild(node.cloneNode(true));
    const str = tmpNode.innerHTML;
    tmpNode = node = null; // prevent memory leaks
    return str;
}