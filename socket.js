const io = require('socket.io')(4200, {
	cors: {
		origin: ['http://localhost:3000'],
	},
});

function updateValue(array, index, newValue) {
	array[index] = newValue;
	return array;
}
let messenger = [];

io.on('connection', (client) => {
	client.on('subscribeToTimer', (interval) => {
		console.log('client is subscribing to timer with interval ', interval);
		setInterval(() => {
			client.emit('timer', new Date().toLocaleTimeString());
		}, interval);
	});

	client.on('sendMessage', (msg) => {
		console.log(msg);
		messenger.push(msg);
		io.emit('getMessege', messenger);
	});

	client.on('deleteMessege', (id) => {
		const splicer = messenger.find((a) => a.id === id);

		console.log(splicer);

		if (splicer !== -1) {
			messenger.splice(splicer, 1);

			io.emit('getMessege', messenger);
		}

		// messenger.push(msg);
		// io.emit('getMessege', messenger);
	});

	client.on('getSpecificRecord', (message) => {
		console.log(message);
		io.emit('getValue', message);
		// const index = messenger.findIndex((x) => x.id === message.id);
		// messenger[index].id = data.id;
		// messenger[index].message = data.message;
		// io.emit('getMessege', messenger);
	});

	client.on('changeMessage', (value, data) => {
		console.log('value');

		console.log(value.id);
		console.log('messege');
		console.log(messenger);
		console.log('new');
		let index = messenger.findIndex((x) => x.id == value.id);
		if (value) {
			console.log(value.id);

			console.log(index);
			console.log(data);
			if (index !== -1) {
				messenger[index].message = data;
				io.emit('getMessege', messenger);
			}

			// console.log(messenger[index].message);
			// console.log(m);
			//
		}
		// io.emit('getMessege', messenger);
	});
});

function getIndex(items) {
	for (const [index, item] of items.entries()) {
		if (item.prop2 === 'yutu') {
			return index;
		}
	}
}
