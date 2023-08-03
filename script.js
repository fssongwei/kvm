const noble = require('@abandonware/noble/with-custom-binding')({extended: true});
const { exec } = require('child_process');

// 初始化noble
noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    // 蓝牙已打开，可以开始扫描设备
    noble.startScanning([], true);
  } else {
    // 蓝牙不可用或已关闭
  }
});

// 发现设备
noble.on('discover', function(peripheral) {
  // 在这里处理发现的设备信息，比如连接设备
    // console.log('Discovered device:', peripheral.advertisement.localName, peripheral.id, "====");
    
    if (peripheral.advertisement.localName === "M585/M590") {
      // peripheral.reset();
      peripheral.connect([]);
      peripheral.once('connect', () => {
        console.log('Connected to device', peripheral.advertisement.localName, peripheral.id, "====");
        exec("./m1ddc set input 17")
      });
      peripheral.once('disconnect', () => {
        console.log('Disconnected to device', peripheral.advertisement.localName, peripheral.id, "====");
      });
    }
});