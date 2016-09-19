/**
 * Created by kelvinsun on 2016/9/16.
 */
'use strict';

const Electron = require('electron');
const { app, BrowserWindow, ipcMain, Tray, Menu } = Electron;

let mainWindow;
let trayIcon;

const createWindow = () => {
    const contextMenu = Menu.buildFronTemplate([]);
    trayIcon = new Tray('./dist/image/trayIcon.svg');
    trayIcon.setToolTip('自动申请访问外网后台运行中...');
    mainWindow = new BrowserWindow({
        // width    : 200,
        // height   : 160,
        width    : 800,
        height   : 600,
        resizable: false,
        frame    : false,
    });
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => mainWindow = null);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => 'darwin' !== process.platform && app.quit());

app.on('active', () => null === mainWindow && createWindow());

ipcMain.on('close-main-window', () => app.quit());