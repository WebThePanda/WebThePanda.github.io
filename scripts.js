const counterEl = document.getElementById("counter");

// detect returning user
const isReturning = localStorage.getItem("visited");

// increment only once per device
if (!isReturning) {
  fetch("https://api.counterapi.dev/v2/sanders-team-3869/wtp-gh-io-page-views/up")
    .catch(() => {});
  localStorage.setItem("visited", "true");
}

// always fetch value
fetch("https://api.counterapi.dev/v2/sanders-team-3869/wtp-gh-io-page-views")
  .then(res => res.json())
  .then(data => {
    animateCounter(counterEl, data.data.up_count, isReturning);
    console.log(data.data.up_count)
  });


// 🔥 animation function (terminal style)
function animateCounter(el, target, returning) {
  let current = 0;

  const prefix = returning
    ? "> returning entity detected\n> total anomalies: "
    : "> new entity detected\n> total anomalies: ";

  el.textContent = prefix + "0";

  const interval = setInterval(() => {
    current += Math.ceil(target / 50);

    if (current >= target) {
      current = target;
      clearInterval(interval);
    }

    el.textContent = prefix + current;
  }, 20);
}