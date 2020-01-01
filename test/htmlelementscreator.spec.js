import {
    appendHtmlElementWithClass,
    appendHtmlElementWithClassAndText,
    appendHtmlElementWithClassAndPlaceholder
} from '../src/js/htmlelementscreator';

import { nodeToString } from './objecttostring'; // extra function to be able to test Objects as string

let mn; // main html tag in DOM

describe("Unit Testing htmlelementscreator.js", () => {

    beforeEach(() => {
        mn = document.createElement('main');
    });
    test('appendHtmlElementWithClass to return', () => {
        const element = appendHtmlElementWithClass('div', 'id123', ['class123'], mn);
        const elementString = nodeToString(element);
        expect(elementString).toEqual('<div id="id123" class="class123"></div>');
    });
    test('appendHtmlElementWithClassAndText to return', () => {
        const element = appendHtmlElementWithClassAndText('div', 'id123', 'schiphol ole ole',['class123'], mn);
        const elementString = nodeToString(element);
        expect(elementString).toEqual('<div id="id123" class="class123">schiphol ole ole</div>');
    });
    test('appendHtmlElementWithClass to return', () => {
        const element = appendHtmlElementWithClassAndPlaceholder('input', 'id123', 'place the holder', ['class123'], mn);
        const elementString = nodeToString(element);
        expect(elementString).toEqual('<input id="id123" placeholder="place the holder" class="class123">');
    });

});