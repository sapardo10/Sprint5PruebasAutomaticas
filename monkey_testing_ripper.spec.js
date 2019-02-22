describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
    })
})
function randomClick(monkeysLeft) {

    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            setTimeout(randomClick, 1000, monkeysLeft);
        });
    }   
}

function randomEvent(monkeysLeft){
    var clickLink = 1;
    var fillEvent = 2;
    var comboEvent = 3;
    var clickButton = 4;


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    function doClickLink(){
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomEvent(monkeysLeft);
        });
    };

    function doFillEvent(){
        cy.get('input[type="text"]').then($fields => {
            var randomField = $fields.get(getRandomInt(0, $fields.length));
            if(!Cypress.dom.isHidden(randomField)) {
                cy.wrap(randomField).type(genRandomText(),{force:true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomEvent(monkeysLeft);
        });
    };

    function genRandomText() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

    function doComboEvent(){
        cy.get('input[type="checkbox"]').then($fields => {
            var randomField = $fields.get(getRandomInt(0, $fields.length));
            if(!Cypress.dom.isHidden(randomField)) {
                cy.wrap(randomField).click({force:true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomEvent(monkeysLeft);
        });
    }

    function doButtonEvent(){
        cy.get('button').then($buttons => {
            var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
            if(!Cypress.dom.isHidden(randomButton)) {
                cy.wrap(randomButton).click({force:true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomEvent(monkeysLeft);
        });
    }

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        var num = getRandomInt(1,4);
        if(num===1) {
            doClickLink(monkeysLeft);
        } else if(num===2){
            doFillEvent(monkeysLeft);
        } else if(num===3){
            doComboEvent(monkeysLeft);
        } else if(num===4){
            doButtonEvent(monkeysLeft);
        } else {
            randomEvent(monkeysLeft);
        }
    }
}