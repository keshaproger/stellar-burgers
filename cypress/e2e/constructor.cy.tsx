describe('Проверка работы приложения', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.intercept('GET', 'api/auth/user', {
        fixture: 'userResponse.json'
      }).as(`${'getUserFromApi'}`);
      cy.visit('/');
    });
  
    it('Проверка открытия модального окна ингредиента', () => {
      cy.get('li p:nth(1)').click();
      cy.contains('Калории, ккал');
      cy.contains('Белки, г');
      cy.contains('Жиры, г');
      cy.contains('Углеводы, г');
    });

    it('Проверка закрытия модального окна по клику на кнопку', () => {
        cy.get('li p:nth(1)').as('ingredient');
        cy.get('@ingredient').click();
        cy.get(`[data-cy='close_modal']`).click();
        cy.get(`[data-cy='modal']`).should('not.exist');
      });

    it('Проверка добавления ингредиента в конструктор бургера', () => {
        const mains = cy.get('h3').contains('Начинки').next('ul');
        const addButton = mains.contains('Добавить');
        cy.get('div').contains('Выберите начинку').should('exist');
        addButton.click();
        cy.get('div').contains('Выберите начинку').should('not.exist');
      });
});

describe('Проверка создания заказа', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'accessToken');
    localStorage.setItem('refreshToken', 'refreshToken');
    cy.intercept('GET', 'api/auth/user', { fixture: 'userResponse.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Проверка отправки заказа и закрытия модального окна', () => {
      const bunsList = cy.get('h3').contains('Булки').next('ul');
      const addBunButton = bunsList.contains('Добавить');
      addBunButton.click();

      const mainsList = cy.get('h3').contains('Начинки').next('ul');
      const addMainButton = mainsList.contains('Добавить');
      addMainButton.click();

      const orderRequestButton = cy.contains('Оформить заказ');
      orderRequestButton.click();

      cy.contains(37864);

      cy.get('body').type('{esc}');

      cy.contains('37864').should('not.exist');
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
  });
});
  