function loadScript(callback) {
  var s = document.createElement('script');
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
  if (s.addEventListener) {
    s.addEventListener('load', callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
  var clickerGremlin = gremlins.species.clicker();
  clickerGremlin
    .clickTypes(['click'])
    .canClick(function(element) {
      return $(element).parents('gr__losestudiantes_co').length;
    });
  var formFillerGremlin = gremlins.species.formFiller();
  formFillerGremlin.canFillElement(function(element) { return true });
  function stop() {
    horde.stop();
    callback();
  }
  var horde = window.gremlins.createHorde();
  horde.seed(1234);

  horde.after(callback);
  window.onbeforeunload = stop;
  setTimeout(stop, ttl);
  horde.strategy(gremlins.strategies.distribution()
    .delay(20) 
    .distribution([0.3, 0.3, 0.2, 0.1,0.1])
  );
  horde.unleash();
}

describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('/');
    browser.click('button=Cerrar');

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' ')[2]);
    });
  });

});