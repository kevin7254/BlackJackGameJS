import {JSDOM} from "jsdom";
const { window } = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost/'
});

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js'
};

global.Element = window.Element || class Element {};
global.HTMLVideoElement = window.HTMLVideoElement || class HTMLVideoElement {};
global.Image = window.Image || class Image {};
global.HTMLCanvasElement = window.HTMLCanvasElement || class HTMLCanvasElement {};
global.self = global;
global.window = global;
global.document = window.document;
global.window.addEventListener = () => {};
global.window.requestAnimationFrame = () => {};