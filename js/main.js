(function() {
  var prefix = 'TC',
      separator = '/',
      paddingChar = '0';

  var tcNumLen = 6,
      minText = 3,
      maxText = 14;

  function isInput(elm) { return elm.nodeName !== undefined && elm.nodeName == 'INPUT'; }
  function isETCM() { return location.hostname == 'etcm'; }

  function equipInput(input, submit) {
    if (!isInput(input))
      return;

    $(input).keypress(function(e) {
      switch(e.key) {

        case 'Enter':
          input.value = parseContent(input);
          submit.click();
          break;

        case '-':
          input.value = '';
          return false;
      }
    });
  }

  function parseContent(input) {
    var text = input.value;
    var textLen = text.length;
    var tcYear = '';

    if (text.substring(0, 2) == prefix)
      return text;

    tcYear = text.substring(textLen - 2, textLen);
    tcYear = (parseInt(tcYear) < 50 ? '20': '19') + tcYear;
    text = text.substring(0, textLen - 2);

    while (text.length < tcNumLen)
      text = paddingChar + text;

    return prefix + separator + text + separator + tcYear;
  }

  // if (!isETCM())
  //   return;

  // Initial configuration.
  console.log('We\'re at eTCM.');

  $('#submit').on('click', function() {
    console.log('Submitting value: ' + $('#inp')[0].value);
  });

  var input = $('#inp')[0];
  var submit = $('#submit')[0];
  equipInput(input, submit);
})();
