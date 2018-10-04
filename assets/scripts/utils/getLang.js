export default function () {

    let html = document.querySelector('html');

    return html.getAttribute('lang') != null ? html.getAttribute('lang') : 'en';
    
}