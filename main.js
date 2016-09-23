/**
 * Created by kelvinsun on 2016/9/16.
 */
'use strict';

const Electron = require('electron');
const { app, BrowserWindow, ipcMain, Tray, Menu } = Electron;

let mainWindow;
let trayIcon;

const createTray = () => {
    const contextMenu = Menu.buildFromTemplate([
        { label: '显示面板', type: 'normal', click: () => app.emit('show-hide') },
        { type: 'separator' },
        { label: '退出', type: 'normal', click: () => app.quit() },
    ]);
    trayIcon = new Tray('./dist/image/tray_icon.png');
    trayIcon.setToolTip('自动申请访问外网后台运行中...');
    trayIcon.setContextMenu(contextMenu);
    trayIcon.on('click', () => { trayIcon.popUpContextMenu() });
    trayIcon.on('double-click', () => app.emit('show-hide'));
};

const createWindow = () => {
    mainWindow = new BrowserWindow({
        // width    : 200,
        // height   : 160,
        width    : 800,
        height   : 600,
        resizable: false,
        frame    : false,
    });
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => mainWindow = null);
};

app.on('ready', () => (createTray(), createWindow()));

app.on('active', () => null === mainWindow && createWindow());

app.on('show-hide', () => mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show());

// app.on('window-all-closed', () => 'darwin' !== process.platform && app.quit());

// ipcMain.on('close-main-window', () => (console.log(2), mainWindow.emit('close')));