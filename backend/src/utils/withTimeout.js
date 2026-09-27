/**
 * Races a promise against a timer. If the timer wins, the returned
 * promise rejects with an Error whose message is "TIMEOUT" so callers
 * can distinguish a slow model from any other kind of failure.
 */
function withTimeout(promise, ms) {
  let timer;

  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("TIMEOUT")), ms);
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

module.exports = { withTimeout };
