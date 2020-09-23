import isToday from 'date-fns/isToday';
import isBefore from 'date-fns/isBefore';
import distanceInWordsToNow from 'date-fns/formatDistance';
import format from 'date-fns/format';
import './styles.scss';

const ELECTION_DAY = '2020-11-3';

const electionDate = new Date(ELECTION_DAY);
const formattedElectionDay = format(electionDate, 'PP');
const isElectionDay = isToday(electionDate);
const isBeforeElection = isBefore(new Date(), electionDate);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = function () {
  let twitchAuth, settings;
  let countDownEl = document.querySelector('.count-down');
  // let bodyEl = document.querySelector('body');

  // Listen for auth token event
  window.Twitch.ext.onAuthorized(async (auth) => {
    // On Twitch Auth fetch Channel Setting information
  });

  // video_component settings
  if (isElectionDay) {
    countDownEl.innerHTML = 'Elections Are Today, ' + formattedElectionDay;
  } else if (isBeforeElection) {
    countDownEl.innerHTML = `${capitalize(
      distanceInWordsToNow(electionDate, Date.now())
    )} until ${formattedElectionDay} elections`;
  } else {
    countDownEl.innerHTML = 'Thanks for Voting!!';
  }
};
