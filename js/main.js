(function() {
  var prefix = 'TC',
      separator = '/',
      paddingChar = '0';

  var tcNumLen = 6,
      minText = 3,
      maxText = 14;

  function isInput(elm) { return elm.nodeName !== undefined && elm.nodeName == 'INPUT'; }
  function isETCM() { return location.hostname == 'etcm'; }

  function parseNum(tcNum) {
    var text = tcNum;

    while (text.length < tcNumLen)
      text = paddingChar + text;

    return text;
  }

  function parseYear(year) {
    if (year.length == 4)
      return year;

    return (parseInt(year) < 50 ? '20' : '19') + year;
  }

  function buildTCNum(tcNum, tcYear) { return prefix + separator + tcNum + separator + tcYear; }

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
    var tcNum = '',
        tcYear = '';

    if (textLen == 14 || text.substring(0, 2) == prefix)
      return text;

    if (text.indexOf(separator) !== -1)
      return parseDividedContent(input);

    tcYear = parseYear(text.substring(textLen - 2, textLen));
    tcNum = parseNum(text.substring(0, textLen - 2));

    return buildTCNum(tcNum, tcYear);
  }

  function parseDividedContent(input) {
    var text = input.value,
        values = text.split(separator),
        tcNum = parseNum(values[0]),
        tcYear = parseYear(values[1]);

    return buildTCNum(tcNum, tcYear);
  }

  // Domain check.
  // if (!isETCM())
  //   return;
  console.log('We\'re at eTCM.');

  // Default bindings.
  $('#submit').on('click', function() {
    console.log('Submitting value: ' + $('#inp')[0].value);
  });

  $('#open_window').on('click', function() {
    window.open('etcm.html', 'foo', 'menubar=no');
  });

  $('#close_window').on('click', function() {
    window.close();
  })

  // Disables window.close().
  window.close = function() { return false; }

  // Initial setup.
  var input = $('#input')[0];
  var submit = $('#submit')[0];
  equipInput(input, submit);
})();
