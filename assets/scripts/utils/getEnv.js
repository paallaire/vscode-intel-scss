export default function () {

    let body = document.querySelector('body');
    let href = window.location.href;
    let isDev = href.includes('local') || href.includes('dev') || href.includes('stage') ? true : false;
    let classEnv = isDev ? 'is-dev' : 'is-prod';

    body.classList.add(classEnv);

    return isDev;

}