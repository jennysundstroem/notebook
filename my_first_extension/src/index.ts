import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { showDialog, Dialog } from '@jupyterlab/apputils';
import { NotebookPanel } from '@jupyterlab/notebook';

console.log("test0")

  async function makeApiRequest(path : string) {
    try {
      const apiURL = 'http://localhost:8888/api/contents/' + path
      const response = await fetch(apiURL, {
      method:'GET',
    });
      if (!response.ok) {
        // Handle non-OK response (e.g., 404 or 500)
        throw new Error(`API request failed with status: ${response.status}`);
        console.log('Tear')
      }
      const data = await response.json();
      // Handle the response data here
      console.log('API Response:', data);
      return data
    } catch (error) {
      // Handle errors here
      console.error('API Error:', error);

    }
  }

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-apod',
  description: 'Display Notebook Document Details.',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab_apod is activated!');

    // Add an application command
    const command: string = 'apod:open';
    app.commands.addCommand(command, {

      label: 'Document Details',
      execute: async () => {
        const activeNotebook = app.shell.currentWidget as NotebookPanel;
        if (activeNotebook) {
          const notebookPath = activeNotebook.context.path;
        let data = await makeApiRequest(notebookPath);
          const result = await showDialog({
          title: 'Document Details',
          body: `
          Document Name: ${JSON.stringify(data?.name)}. \r\n
          Document Path: ${JSON.stringify(data?.path)}. \r\n
          Created: ${JSON.stringify(data?.created)} \r\n
          Last Modified: ${JSON.stringify(data?.last_modified)}
          `,

          buttons: [Dialog.okButton({ label: 'OK' })]
        });

        if (result.button.label === 'OK') {
          console.log('OK button clicked');
        }
      }
    }
    });

    // Add the command to the palette.
    palette.addItem({ command, category: 'Document Details' });
  }
};
export default plugin;
