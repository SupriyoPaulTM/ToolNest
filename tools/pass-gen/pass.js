const passField = document.getElementById('pass-gen-field');
const copyBtn = document.getElementById('copy-btn');
const passLengthSelector = document.getElementById('length-selector');
const numCheckBox = document.getElementById('num-check');
const smlLtrCheckBox = document.getElementById('sml-ltr-check');
const capLtrCheckBox = document.getElementById('cap-ltr-check');
const symblCheckBox = document.getElementById('symbl-check');
const prefixField = document.getElementById('prefix');
const suffixField = document.getElementById('suffix');
const genBtn = document.getElementById('gen-btn');

copyBtn.onclick = () => {
  if (passField.value.trim() !== "") {
    navigator.clipboard.writeText(passField.value);
  };
};

const cL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const sL = "abcdefghijklmnopqrstuvwxyz";
const nums = "012345678901234567890123456789";
const symbs = "!@#$%^&*()_+[]{}<>?";

genBtn.onclick = () => {
  let charPool = "";
  let prefix = prefixField.value.trim();
  let suffix = suffixField.value.trim();
  let genPass = prefix;
  let genCount = Number(passLengthSelector.value)-(prefix.length + suffix.length);
  
  if (numCheckBox.checked) {
    charPool += nums;
  };
  if (smlLtrCheckBox.checked) {
    charPool += sL;
  };
  if (capLtrCheckBox.checked) {
    charPool += cL;
  };
  if (symblCheckBox.checked) {
    charPool += symbs;
  };
  
  if (genCount < 0) {
    alert('Your inputs are longer than the selected password length.');
  } else if (charPool === "") {
    alert("Select at least one checkbox");
  } else {
    for (let i = 0; i < genCount; i++) {
      let rng = Math.floor(Math.random() * charPool.length);
      genPass += charPool[rng];
    };
    genPass += suffix;
    passField.value = genPass;
  };
};