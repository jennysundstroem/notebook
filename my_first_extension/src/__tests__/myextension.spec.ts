describe('My Extension', () => {
  describe('Document Information Extension', () => {
    it('should open the dropdown', async () => {
      const dropdownMenu = document.querySelector('#dropdown-menu');
      const fileMenu = dropdownMenu.querySelector('.file-menu'); 
      fileMenu.click();
      expect(dropdownMenu).toHaveClass('open');
    });

    it('should display Document Information button in dropdown menu', async () => {
      const dropdownMenu = document.querySelector('#dropdown-menu');
      const fileMenu = dropdownMenu.querySelector('.file-menu'); 
      fileMenu.click();
      const button = document.querySelector('#button-id'); 
      expect(button).toContain('Document Information');
    });

    it('should open dialog when the Document Information button is clicked', async () => {
      const dropdownMenu = document.querySelector('#dropdown-menu');
      const fileMenu = dropdownMenu.querySelector('.file-menu'); 
      fileMenu.click();
      const button = document.querySelector('#button-id'); 
      button.click();
      const dialog = document.querySelector('#dialog-id');
      expect(dialog).toBe;
  });

    it('should display the correct file information in dialog', () => {
      const dropdownMenu = document.querySelector('#dropdown-menu');
      const fileMenu = dropdownMenu.querySelector('.file-menu'); 
      fileMenu.click();
      const button = document.querySelector('#button-id'); 
      button.click();
      const dialog = document.querySelector('#dialog-id');
      expect(dialog).toContain('mockedDataForResponse');
    });
  });
});
