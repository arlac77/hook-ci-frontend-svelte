<script>
  export let repositoryGroup;
</script>

<div class="card">
  <div class="card-content">
    <div class="card-title">{repositoryGroup.name}</div>
    {#if repositoryGroup.description}{repositoryGroup.description}{/if}
    {#if repositoryGroup.id}{repositoryGroup.id}{/if}
  </div>
</div>
