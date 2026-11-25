const joinTitle = document.querySelector('#join-title');
const joinCheck = document.querySelector('#join-check');
const application = document.querySelector('#join-application');
const answer = document.querySelector('#check-answer');

const left = 1 + Math.floor(Math.random() * 9);
const right = 1 + Math.floor(Math.random() * 9);
const expectedSum = left + right;
document.querySelector('#check-question').textContent = `What is ${left} + ${right}?`;
answer.addEventListener('input', () => answer.setCustomValidity(''));
joinCheck.addEventListener('submit', event => {
  event.preventDefault();
  if (Number(answer.value) !== expectedSum) {
    answer.setCustomValidity('Check the sum and try again.');
    answer.reportValidity();
    return;
  }
  joinCheck.hidden = true;
  application.hidden = false;
  joinTitle.textContent = 'Clan application';
  document.querySelector('#roblox-name').focus();
});

application.addEventListener('submit', event => {
  event.preventDefault();
  const username = document.querySelector('#roblox-name').value.trim();
  const level = document.querySelector('#rivals-level').value;
  const contents = `Prestige clan application\nRoblox username: ${username}\nRoblox Rivals experience: ${level}\n`;
  const link = document.createElement('a');
  link.download = 'prestige-clan-application.txt';
  link.href = URL.createObjectURL(new Blob([contents], { type: 'text/plain;charset=utf-8' }));
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
});
