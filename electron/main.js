const {app,BrowserWindow}=require('electron'),path=require('path');
app.whenReady().then(()=>{const w=new BrowserWindow({width:480,height:860,autoHideMenuBar:true,icon:path.join(__dirname,'..','www','icon-512.png')});w.loadFile(path.join(__dirname,'..','www','index.html'))});
app.on('window-all-closed',()=>app.quit());
