import moment from 'moment';
import { getSettings, setSettings } from "./Ebs";
import isToday from 'date-fns/is_today'
import isBefore from 'date-fns/is_before'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import './styles.scss';

const ELECTION_DAY = "2018-11-6";

const electionDate = new Date(ELECTION_DAY);
const isElectionDay = isToday(electionDate);
const isBeforeElection = isBefore(new Date(), electionDate);

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
    ctaEl.classList.add('slide-in');

    if (isElectionDay)
    {
      countDownEl.innerHTML = "Elections Are Today, Nov. 6th 2018";
    } else if (isBeforeElection)
    {
      countDownEl.innerHTML = distanceInWordsToNow(electionDate) + " until Nov. 6th 2018 elections";
    } else
    {
      countDownEl.innerHTML = "Thanks for Voting!!";
    }

    ctaEl.addEventListener("click", e => {
      e.target.classList.remove("slide-in");
      detailsEl.classList.add("slide-in");
    });

    closeDetailsEl.addEventListener("click", e => {
      ctaEl.classList.add("slide-in");
      detailsEl.classList.remove("slide-in");
    });
  }
};