
describe('Verificar mi aplicaicon', () => {
  it('Verificar login con credenciales incorrectas', () => {
    
    cy.wait(3000);
    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#correo').invoke('val', 'jjjjj@duocuc.cl').should('have.value', 'jjjjj@duocuc.cl');
      cy.get('#password').invoke('val', '1111111');
      cy.contains('Ingreso').click();
      cy.intercept('ingreso').as('route').then(() => {
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DuocUC');
      });
    });
  });

  it('Verificar login con credenciales correctas', () => {

    cy.wait(3000);
    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#correo').invoke('val', 'jperez@duocuc.cl');
      cy.get('#password').invoke('val', '5678');
      cy.contains('Ingresar').click();
      cy.intercept('./inicio').as('route').then(() => {
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DuocUC');
        cy.get('#saludo').should('contain.text', '¡Bienvenido(a) Juan Pérez González!');
        cy.contains('Cerrar Sesión').click();
      });
    });
  });

  it('Verificar inicio de sesión con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
    });
  })

});
