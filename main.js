const electron = require('electron')

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

});

const menuTemplate = [
  {
    label: 'Click',
    submenu: [
      {
        label: 'Add Task'
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

//Add one empty menu before Click menu
//if user is on MacOS
if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}
