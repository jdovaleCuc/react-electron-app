const { BrowserWindow, app } = require('electron')

function createWindow() {
    const window = new BrowserWindow({
        width: 1280,
        height: 800,
        frame: false,
        resizable: false
    })

    window.loadURL('http://localhost:3000')
}

async function initWindow() {
    await app.whenReady()
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

}

initWindow()
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit()
})