function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function updateCookieAnalyticsSettings(analytics) {
    let cookieSettings = getCookie('cookie_settings');
    if (!cookieSettings) {
        cookieSettings = { essential: true, analytics: false };
    } else {
        cookieSettings = JSON.parse(cookieSettings);
    }
    cookieSettings.analytics = analytics;
    setCookie('cookie_settings', JSON.stringify(cookieSettings), 365);
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {return parts.pop().split(';').shift();}
}

function checkCookiePreference() {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('cookie_preferences='))
        ?.split('=')[1];

    if (cookieValue === 'true') {
        const cookieBanner = document.querySelector('.js-cookies-banner');
        cookieBanner.setAttribute('hidden', 'hidden');
    }
}

function showNotificationBanner() {
    const notificationBanner = document.getElementById('notification-banner');
    notificationBanner.hidden = false;
    notificationBanner.setAttribute('tabindex', '-1');
    notificationBanner.focus();

    notificationBanner.addEventListener('blur', function() {
        notificationBanner.removeAttribute('tabindex');
    });
}

function init() {

    const acceptButton = document.querySelector('.js-cookies-button-accept');
    const rejectButton = document.querySelector('.js-cookies-button-reject');

    const acceptedBanner = document.querySelector('.js-cookies-accepted');
    const rejectedBanner = document.querySelector('.js-cookies-rejected');
    const questionBanner = document.querySelector('.js-question-banner');
    const cookieBanner = document.querySelector('.js-cookies-banner');

    function showBanner(banner) {
        questionBanner.setAttribute('hidden', 'hidden');
        banner.removeAttribute('hidden');

        banner.setAttribute('tabindex', '-1');
        banner.focus();

        banner.addEventListener('blur', function () {
            banner.removeAttribute('tabindex');
        });
    }

    acceptButton.addEventListener('click', function (event) {
        showBanner(acceptedBanner);
        updateCookieAnalyticsSettings(true);
        setCookie('cookie_preferences', 'true', 365);
        event.preventDefault();
    });

    rejectButton.addEventListener('click', function (event) {
        showBanner(rejectedBanner);
        updateCookieAnalyticsSettings(false);
        setCookie('cookie_preferences', 'true', 365);
        event.preventDefault();
    });

    acceptedBanner.querySelector('.js-hide').addEventListener('click', function () {
        cookieBanner.setAttribute('hidden', 'hidden');
    });

    rejectedBanner.querySelector('.js-hide').addEventListener('click', function () {
        cookieBanner.setAttribute('hidden', 'hidden');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (!getCookie('cookie_settings')) {
        updateCookieAnalyticsSettings(false);
    }
    const form = document.getElementById('cookie-settings-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const analytics = document.querySelector('input[name="cookie_preferences"]:checked').value === 'true';
        updateCookieAnalyticsSettings(analytics);
        setCookie('cookie_preferences', true, 365);
        showNotificationBanner();
    });
});

checkCookiePreference();
init();
