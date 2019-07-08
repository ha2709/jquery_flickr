// this codes call downloadSimulator, and calculate download speed.
// The goal is, ignore first 2 seconds and last 2 seconds, then calculate Download speed.
var downloadedAmount = 0;
const startTime = Date.now();
var arr=[];
var total_arr;
// status: 'data' - when data arrived. 'done' - when it finishes
downloadSimulator((status, receivedPacketByteSize) => {
    downloadedAmount += receivedPacketByteSize;
    arr.push( parseFloat(receivedPacketByteSize/1000).toFixed(2));
    console.log(`status: ${status}, PacketSize: ${ (receivedPacketByteSize/1000).toFixed(2)} kB, Downloaded: ${ (downloadedAmount/1000).toFixed(2)} kB`,' Array: ',arr)
    if (status === 'done') {
      arr.pop();
      arr.splice(0, 2);
      arr.pop();
        
        total_arr = arr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0); 

        console.log(arr) ;
        console.log('Total Goal MB ',total_arr) ;
          
        const speed = downloadedAmount / ( (Date.now() - startTime)/1000);
        console.log(`Download Speed : ${(speed/1000).toFixed(2)} kB/s`);
        // Goal: ignore first 2 seconds and last 2 seconds, then calculate Download speed.
        const speed_goal = total_arr / ( (Date.now() - startTime-4)/1000);
        console.log(`Download Speed Goal : ${(speed_goal/1000).toFixed(2)} MB/s`);
    }
});
function myFunc(total, num) {
  return total - num;
}
// Do not change below! >>>
function downloadSimulator(cb) {
    return new Promise(async( resolve ) => {
        const totalAmount = 50 * 1000 * 1000; // 50 MB
        let downloadedAmount = 0; //
        let status = 'data';
        while (downloadedAmount < totalAmount) {
            const timeOut = Math.random() * 300;
            await wait(timeOut);
            let packetSize = Math.random() * 1000 * 1000;
            if (packetSize + downloadedAmount >= totalAmount ) {
                packetSize = totalAmount - downloadedAmount;
                status = 'done';
            }
            cb(status, packetSize);
            // console.log(`PacketSize: ${ (packetSize/1024).toFixed(2)}, Downloaded: ${ (downloadedAmount/1024).toFixed(2)}`)
            downloadedAmount += packetSize;
        }
        resolve();
    });
}

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}