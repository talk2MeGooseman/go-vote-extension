import moment from 'moment';
import isToday from 'date-fns/is_today'
import isBefore from 'date-fns/is_before'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import './styles.scss';

const ELECTION_DAY = "2020-11-3";

const electionDate = new Date(ELECTION_DAY);
const momentDate = moment(electionDate);
const isElectionDay = isToday(electionDate);
const isBeforeElection = isBefore(new Date(), electionDate);

window.onload = function() {
  let twitchAuth, settings;
  let countDownEl = document.querySelector('.count-down');
  // let bodyEl = document.querySelector('body');

  // Listen for auth token event
  window.Twitch.ext.onAuthorized(async (auth) => {
      // On Twitch Auth fetch Channel Setting information
  });

  // video_component settings
  if (isElectionDay)
  {
    countDownEl.innerHTML = "Elections Are Today, " + momentDate.format('MMM. D, YYYY');
  } else if (isBeforeElection)
  {
    countDownEl.innerHTML = `${distanceInWordsToNow(electionDate)} until ${momentDate.format('MMM. D, YYYY')} elections`;
  } else
  {
    countDownEl.innerHTML = "Thanks for Voting!!";
  }

  // bodyEl.onclick = () => {
  //   window.open('https://vote.gov/')
  // }
};