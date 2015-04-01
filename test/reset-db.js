var fs = require('fs');

var data = {};

data.home = {
    source: [{
        jndi: 'SH_QA_Local',
        ip: '10.129.126.194',
        port: 1521,
        sid: 'dbpool1'
    }, { 
        jndi: 'SH_QA_BigData_Local', 
        ip: '10.129.126.152',
        port: 1521,
        sid: 'dbpool1' 
    }],
    target: [{
        jndi: 'SH1_SFUSER',
        ip: '10.129.126.150',
        port: 30015,
        prefix: ['AUTOMATION', 'SFUSER'] 
    }]
};

data.history = [
];

data.queue = [
];

fs.writeFile('routes/db.json', JSON.stringify(data));
