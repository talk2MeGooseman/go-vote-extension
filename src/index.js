import moment from 'moment';
import { getSettings, setSettings } from "./Ebs";
import './styles.scss';

const ELECTION_DAY = "2018-11-6";

const day = moment(ELECTION_DAY);

window.onload = function() {
  let twitchAuth, settings;
  let detailsEl = document.querySelector('.details');
  let ctaEl = document.querySelector('.cta');
  let thanksEl = document.querySelector('.thanks');
  let closeDetailsEl = document.querySelector('.close');
  let countDownEl = document.querySelector('.count-down');
  let selectorEl = document.querySelector('#position-select');
  let configContainerEl = document.querySelector('.configs');
  let heartLoaderEl = document.querySelector('.lds-heart');
  let panelLoaderEl = document.querySelector('.loader');
  let containerEl = document.querySelector('.container');

  // Listen for auth token event
  window.Twitch.ext.onAuthorized(async (auth) => {
      // On Twitch Auth fetch Channel Setting information
      if (!twitchAuth) {
        settings = await getSettings(auth);
        if (settings && selectorEl)
        {
          selectorEl.value = settings.position;
        }
      }

      twitchAuth = auth;

      if (configContainerEl) {
        configContainerEl.classList.remove('hide');
        heartLoaderEl.classList.add('hide');
      } else if (containerEl) {
        containerEl.classList.add(settings.position || 'right');
        panelLoaderEl.classList.add('hide')
        containerEl.classList.remove('hide');
      }

  });

  // If selection present, then that means were in the config view
  if (selectorEl){
    // Listen to config view dropdown
    selectorEl.onchange = (ev) => {
      let position = ev.target.value;
      // On change send POST to EBS
      setSettings(twitchAuth, { position: position})
    }

  }

  // video_component settings
  if (ctaEl) {
    countDownEl.innerHTML = moment().to(day, true);
    ctaEl.classList.add('slide-in');

    let electionHappened = moment().isSameOrAfter(ELECTION_DAY);

    if (electionHappened)
    {
      ctaEl.classList.remove('show');
      detailsEl.classList.remove('show')
      thanksEl.classList.add('show');
    } else
    {
      ctaEl.addEventListener('click', (e) => {
        e.target.classList.remove('slide-in');
        detailsEl.classList.add('slide-in');
      });

      closeDetailsEl.addEventListener('click', (e) => {
        ctaEl.classList.add('slide-in');
        detailsEl.classList.remove('slide-in');
      });
    }
  }
};