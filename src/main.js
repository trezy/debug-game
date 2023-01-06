// Module imports
import {
	app,
	ipcMain,
} from 'electron'
import ElectronSquirrelStartup from 'electron-squirrel-startup'





// Local imports
import './helpers/configStore.js'
import { createWindow } from './helpers/createWindow.js'
import { handleActivate } from './helpers/handleActivate.js'
import { handleAllWindowsClosed } from './helpers/handleAllWindowsClosed.js'
import { handleExportTileset } from './helpers/handleExportTileset.js'
import { handleGetContentMeta } from './helpers/handleGetContentMeta.js'
import { handleGetDisplaysInformation } from './helpers/handleGetDisplaysInformation.js'
import { handleGetFonts } from './helpers/handleGetFonts.js'
import { handleInitialiseContentWatcher } from './helpers/handleInitialiseContentWatcher.js'
import { handleInitialiseDirectories } from './helpers/handleInitialiseDirectories.js'
import { handleSaveTileset } from './helpers/handleSaveTileset.js'





// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (ElectronSquirrelStartup) {
	app.quit()
}

app.on('activate', handleActivate)
app.on('ready', createWindow)
app.on('window-all-closed', handleAllWindowsClosed)

ipcMain.handle('getContentMeta', handleGetContentMeta)
ipcMain.handle('getDisplaysInformation', handleGetDisplaysInformation)
ipcMain.handle('getFonts', handleGetFonts)
ipcMain.handle('exportTileset', handleExportTileset)
ipcMain.handle('initialiseContentWatcher', handleInitialiseContentWatcher)
ipcMain.handle('initialiseDirectories', handleInitialiseDirectories)
ipcMain.handle('saveTileset', handleSaveTileset)
