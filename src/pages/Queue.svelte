<script>
  export let queue = { name: "" };
</script>

<div>
  <h1>Queue {queue.name}</h1>
   {queue.active} {queue.waiting} {queue.delayed} {queue.paused} {queue.completed}
  {queue.failed}
</div>
