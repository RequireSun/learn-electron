/**
 * Created by kelvinsun on 2016/9/16.
 */
const Electron = require('electron');
const { app, BrowserWindow } = Electron;

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => mainWindow = null);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => 'darwin' !== process.platform && app.quit());

app.on('active', () => null === mainWindow && createWindow());