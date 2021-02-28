'use strict';

const appServerKey = 'BCQjyPWX6qVFrel3PLw2_r_718LHt-EQSc8Y6rrCFDF-0BGHfeHioVZa3loSk56cpzHLliMNPFTqUuDzABFvIG0 ';

const pushWrapper = document.querySelector('.push-wrapper');
const pushButton = document.querySelector('.push-button');
const btn = document.querySelector('.btn');
const inp = document.querySelector('#in');
const bbody = document.querySelector('body');

let hasSubscription = false;
let serviceWorkerRegistration = null;
let subscriptionData = false;
let inputname=document.querySelector('#name');

 
     function sav(){
	 var nametext = document.getElementById('name').textContent;


localStorage.setItem('name',nametext);}


function gsav(){ inputname.textContent = inp.value;  sav() };
gsav();

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function updatePushButton() {
    pushWrapper.classList.remove('hidden');

    if (hasSubscription) {
        pushButton.textContent = `Отключить уведомления`;
    } else {
        pushButton.textContent = `Подписаться на уведомления`;
    }
}

function subscribeUser() {
    serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(appServerKey)
    })
        .then(function (subscription) {
let names=localStorage.getItem('name');
            fetch('/push/subscribe/'+names, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscription)
            })
                .then(function (response) {
                    return response;
                })
                .then(function (text) {
                    console.log('User is subscribed.');
                    hasSubscription = true;

                    updatePushButton();
                })
                .catch(function (error) {
                    hasSubscription = false;
                    console.error('error fetching subscribe', error);
                });

        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
        });
}

function unsubscribeUser() {
    serviceWorkerRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                subscriptionData = {
                    endpoint: subscription.endpoint
                };

                fetch('/push/unsubscribe', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(subscriptionData)
                })
                    .then(function (response) {
                        return response;
                    })
                    .then(function (text) {
                        hasSubscription = false;

                        updatePushButton();
                    })
                    .catch(function (error) {
                        hasSubscription = true;
                        console.error('error fetching subscribe', error);
                    });

                hasSubscription = false;

                updatePushButton();
                return subscription.unsubscribe();
            }
        });
}

function initPush() {

    pushButton.addEventListener('click', function () {
        if (hasSubscription) {
            unsubscribeUser();
        } else {
            subscribeUser();
        }
    });

    // Set the initial subscription value
    serviceWorkerRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            hasSubscription = !(subscription === null);

            updatePushButton();
        });
}

navigator.serviceWorker.register('sw.js')
    .then(function (sw) {
        serviceWorkerRegistration = sw;
        initPush();
    })
    .catch(function (error) {
        console.error('Service Worker Error', error);
    });