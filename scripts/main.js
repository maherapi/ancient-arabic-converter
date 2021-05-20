let dottedLetters

function main() {
  const hideBtn = document.getElementById("hideBtn")
  hideBtn.addEventListener("click", handleHideClick)
  const convertBtn = document.getElementById("convertBtn")
  convertBtn.innerHTML = "جاري التحميل"
  convertBtn.disabled = true
  getDottedLetters().then((_) => {
    convertBtn.innerHTML = "حول النص"
    convertBtn.disabled = false
  })
  convertBtn.addEventListener("click", handleConvertClick)
}

function handleHideClick(e) {
  const inputTextElm = document.getElementById("inputText")
  inputTextElm.classList.toggle("hide")
  if (inputTextElm.classList.contains("hide")) {
    e.target.innerHTML = "أظهر النص"
  } else {
    e.target.innerHTML = "أخفِ النص"
  }
}

function handleConvertClick() {
  const { inputText } = getTextFromDocument()
  const converted = convertText(inputText)
  showTextOnDocument(converted)
}

function getTextFromDocument() {
  return {
    inputText: document.getElementById("inputText").value,
  }
}

function getDottedLetters() {
  return fetch("scripts/dotted-letters.json")
    .then((res) => res.json())
    .then((data) => {
      let result = {}
      data.forEach((l) => (result[l.letter] = l.replace))
      dottedLetters = result
      return data
    })
}

function convertText(text) {
  return text
    .split("")
    .map((letter) => dottedLetters[letter] || letter)
    .join("")
}

function showTextOnDocument(text) {
  document.getElementById("outputText").value = text
}

main()
