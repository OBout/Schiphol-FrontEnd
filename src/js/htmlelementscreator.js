export function appendHtmlElementWithClassAnonymous(ele, classnames, htmldoc) {
    // populates main htmldoc tag
    const newHtmlElement = document.createElement(ele);
    classnames.forEach(classname => {
        newHtmlElement.classList.add(classname);
    });
    htmldoc.appendChild(newHtmlElement);
    return newHtmlElement;
}
export function appendHtmlElementWithClass(ele, id, classnames, htmldoc) {
    // populates htmldoc html tag
    const newHtmlElement = document.createElement(ele);
    newHtmlElement.id = id;
    classnames.forEach(classname => {
        newHtmlElement.classList.add(classname);
    });
    htmldoc.appendChild(newHtmlElement);
    return newHtmlElement;
}
export function appendHtmlElementWithClassAndText(ele, id, text, classnames, htmldoc) {
    // populates htmldoc html tag
    const newHtmlElement = document.createElement(ele);
    newHtmlElement.id = id;
    newHtmlElement.appendChild(document.createTextNode(text));
    classnames.forEach(classname => {
        newHtmlElement.classList.add(classname);
    });
    htmldoc.appendChild(newHtmlElement);
    return newHtmlElement;
}
export function appendHtmlElementWithClassAndPlaceholder(ele, id, placeholder, classnames, htmldoc) {
    // populates htmldoc html tag
    const newHtmlElement = document.createElement(ele);
    newHtmlElement.id = id;
    newHtmlElement.placeholder = placeholder;
    classnames.forEach(classname => {
        newHtmlElement.classList.add(classname);
    });
    htmldoc.appendChild(newHtmlElement);
    return newHtmlElement;
}