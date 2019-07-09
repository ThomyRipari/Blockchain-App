const TodoList = artifacts.require('./TodoList.sol');

contract('TodoList', (accounts) => {
	before(async () => {
		this.todoList = await TodoList.deployed();
	})

	it('deploys succesfully', async () => {
		const address = await this.todoList.address;

		assert.notEqual(address, 0x0)
		assert.notEqual(address, '')
		assert.notEqual(address, null)
		assert.notEqual(address, undefined)
	})


	it('lists tasks', async () => {
		const taskCount = await this.todoList.taskCount();
		const task = await this.todoList.tasks(taskCount);
		console.log(task);
		assert.equal(task.id.toNumber(), taskCount.toNumber())
		assert.equal(task.content, "TAREA POR HACER #1");
		assert.equal(task.completed, false)
		assert.equal(taskCount.toNumber(), 1)
	})

	it('create new tasks', async () => {
		const result = await this.todoList.createTask('A new task');
		const taskCount = await this.todoList.taskCount();

		assert.equal(taskCount, 2);

		const event = result.logs[0].args;
		console.log(event);
		assert.equal(event.id.toNumber(), 2)
		assert.equal(event.content, 'A new task')
		assert.equal(event.completed, false)

	})
})