describe('Verificar mi aplicaicon', () => {
  
  it('Verificar login con credenciales incorrectas', () => {
    
    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#correo').invoke('val', 'correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val', '1111111');
      cy.contains('Ingresar').click();
      cy.intercept('/ingresar').as('route').then(() => {
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
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DuocUC');
        cy.get('#saludo').should('contain.text', '¡Bienvenido(a) Juan Pérez González!');
        cy.contains('Cerrar Sesión').click();
      });
    });
  });
});
