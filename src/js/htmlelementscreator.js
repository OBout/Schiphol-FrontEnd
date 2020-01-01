const main = document.querySelector('main');

const createHtmlElementWithClassAnonymous = (ele, classnames) => {
    // populates main html tag
    const newHtmlElement = document.createElement(ele);
    classnames.forEach(classname => {
        newHtmlElement.classList.add(classname);
    });
    main.appendChild(newHtmlElement);
    return newHtmlElement;
};

const createHtmlElementWithClass = (ele, id, classnames) => {
    // populates main html tag
    const newHtmlElement = document.createElement(ele);
    newHtmlElement.id = id;
    classnames.forEach(classname => {
        newHtmlElement.classList.add(classname);
    });
    main.appendChild(newHtmlElement);
    return newHtmlElement;
};

const createHtmlElementWithClassAndText = (ele, id, text, classnames) => {
    // populates main html tag
    const newHtmlElement = document.createElement(ele);
    newHtmlElement.id = id;
    newHtmlElement.appendChild(document.createTextNode(text));
    classnames.forEach(classname => {
        newHtmlElement.classList.add(classname);
    });
    main.appendChild(newHtmlElement);
    return newHtmlElement;
};

const createHtmlElementWithClassAndPlaceholder = (ele, id, placeholder, classnames) => {
    // populates main html tag
    const newHtmlElement = document.createElement(ele);
    newHtmlElement.id = id;
    newHtmlElement.placeholder = placeholder;
    classnames.forEach(classname => {
        newHtmlElement.classList.add(classname);
    });
    main.appendChild(newHtmlElement);
    return newHtmlElement;
};