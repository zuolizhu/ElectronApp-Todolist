const electron = require('electron')

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let popupWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

});

function createPopupWindow() {
  popupWindow = new BrowserWindow({
    width: 300, height: 200, title: 'Add new task'
  });
  popupWindow.loadURL(`file://${__dirname}/popup.html`);
  popupWindow.on('closed', () => popupWindow = null);
}

ipcMain.on('addTask', (e, task) => {
  mainWindow.webContents.send('addTask', task);
  popupWindow.close();
});


const menuTemplate = [
  {
    label: 'Click',
    submenu: [
      {
        label: 'Add Task',
        click() { createPopupWindow() }
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

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Cmd+D' : 'Ctrl+D',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
