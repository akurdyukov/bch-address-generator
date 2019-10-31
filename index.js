const bitcore = require('bitcore-lib-cash');
const program = require('commander');

function parseIntLocal(value, dummyPrevious) {
    return parseInt(value);
}

program
    .option('-c, --count <number>', 'Number of keys to generate', parseIntLocal, 1)
    .option('-n, --network <network>', 'Network to use: live or test', 'live');

program.parse(process.argv);

var net;
if (program.network == 'live') {
    net = bitcore.Networks.mainnet;
} else {
    net = bitcore.Networks.testnet;
}

for (var i = 0; i < program.count; i++) {
    let privateKey = new bitcore.PrivateKey();
    let address = privateKey.toAddress(net);
    
    console.log("{\"wif\": \"" + privateKey.toWIF() + "\", \"address\": \"" + address.toString() + "\"}");
}

