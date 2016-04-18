import test from 'ava';
import waitFor from './helpers/wait-for-element.js';

test('should be able to create a component;', t => {

    const element = document.createElement('mars-weather');
    document.body.appendChild(element);

    return waitFor(element).then(() => {
        t.true(element.constructor === window.HTMLElement);
        t.is(element.querySelectorAll('var').length, 1);
    });

});

test('should be able to create a component with attributes;', t => {

    const element = document.createElement('mars-weather');
    element.setAttribute('data-unit', 'C');
    document.body.appendChild(element);

    return waitFor(element).then(() => {
        t.true(element.constructor === window.HTMLElement);
        t.is(element.getAttribute('data-unit'), 'C');
        t.is(element.querySelectorAll('var').length, 1);
    });

});

test('should only take the "data-" attributes;', t => {

    const element = document.createElement('mars-weather');
    element.setAttribute('data-unit', 'F');
    element.setAttribute('unit', 'C');
    document.body.appendChild(element);

    return waitFor(element).then(() => {
        const html = element.innerHTML;
        const matches = html.match(/<!-- react-text: 11 -->(.+?)<!-- \/react-text -->/i);
        t.is(matches[1], 'F');
    });

});
